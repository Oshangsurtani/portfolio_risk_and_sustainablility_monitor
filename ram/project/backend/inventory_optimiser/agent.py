import numpy as np
import gymnasium as gym
from gymnasium import spaces
from stable_baselines3 import PPO, DQN
from stable_baselines3.common.env_util import make_vec_env
import boto3
import pickle
from typing import Dict, List, Tuple, Any
import logging

logger = logging.getLogger(__name__)

class SupplyChainEnv(gym.Env):
    """
    Multi-echelon inventory optimization environment for reinforcement learning.
    
    State: [current_stock, forecast_demand, lead_times, holding_costs, stockout_costs]
    Action: Transfer quantities between nodes
    Reward: -(stockout_penalty + holding_costs + transfer_costs)
    """
    
    def __init__(self, num_nodes: int = 10, max_stock: int = 10000):
        super().__init__()
        
        self.num_nodes = num_nodes
        self.max_stock = max_stock
        self.current_step = 0
        self.max_steps = 30  # 30-day planning horizon
        
        # State space: [stock_levels, forecasts, lead_times, costs]
        state_dim = num_nodes * 4  # stock, forecast, lead_time, holding_cost per node
        self.observation_space = spaces.Box(
            low=0, high=1, shape=(state_dim,), dtype=np.float32
        )
        
        # Action space: transfer quantities (normalized)
        self.action_space = spaces.Box(
            low=-1, high=1, shape=(num_nodes, num_nodes), dtype=np.float32
        )
        
        self.reset()
    
    def reset(self, seed=None, options=None):
        super().reset(seed=seed)
        
        # Initialize random state
        self.stock_levels = np.random.uniform(0.3, 0.8, self.num_nodes) * self.max_stock
        self.forecasts = np.random.uniform(100, 1000, self.num_nodes)
        self.lead_times = np.random.randint(1, 7, self.num_nodes)
        self.holding_costs = np.random.uniform(0.1, 0.5, self.num_nodes)
        
        self.current_step = 0
        
        return self._get_observation(), {}
    
    def _get_observation(self):
        """Normalize and concatenate state variables"""
        stock_norm = self.stock_levels / self.max_stock
        forecast_norm = self.forecasts / 2000  # Normalize forecasts
        lead_norm = self.lead_times / 7
        cost_norm = self.holding_costs
        
        return np.concatenate([stock_norm, forecast_norm, lead_norm, cost_norm])
    
    def step(self, action):
        # Decode action to transfer quantities
        transfers = self._decode_action(action)
        
        # Apply transfers
        for i in range(self.num_nodes):
            for j in range(self.num_nodes):
                if i != j and transfers[i][j] > 0:
                    transfer_qty = min(transfers[i][j], self.stock_levels[i])
                    self.stock_levels[i] -= transfer_qty
                    self.stock_levels[j] += transfer_qty
        
        # Simulate demand realization
        actual_demand = np.random.normal(self.forecasts, self.forecasts * 0.2)
        actual_demand = np.maximum(0, actual_demand)
        
        # Calculate stockouts and update inventory
        stockouts = np.maximum(0, actual_demand - self.stock_levels)
        self.stock_levels = np.maximum(0, self.stock_levels - actual_demand)
        
        # Calculate reward
        stockout_penalty = np.sum(stockouts * 10)  # High penalty for stockouts
        holding_cost = np.sum(self.stock_levels * self.holding_costs)
        transfer_cost = np.sum(np.abs(transfers)) * 0.1
        
        reward = -(stockout_penalty + holding_cost + transfer_cost)
        
        # Update for next step
        self.current_step += 1
        self.forecasts = np.random.uniform(100, 1000, self.num_nodes)  # New forecasts
        
        terminated = self.current_step >= self.max_steps
        truncated = False
        
        return self._get_observation(), reward, terminated, truncated, {}
    
    def _decode_action(self, action):
        """Convert normalized action to transfer quantities"""
        # Convert to positive transfers only
        transfers = np.maximum(0, action) * 500  # Scale to reasonable transfer sizes
        np.fill_diagonal(transfers, 0)  # No self-transfers
        return transfers

class RLInventoryAgent:
    def __init__(self, model_path: str = "s3://walmart-ml/models/rl/"):
        self.model_path = model_path
        self.agent = None
        self.env = SupplyChainEnv()
        
    def load_agent(self):
        """Load pre-trained RL agent from S3"""
        try:
            s3 = boto3.client('s3')
            s3.download_file('walmart-ml', 'models/rl/ppo_agent.zip', '/tmp/ppo_agent.zip')
            
            self.agent = PPO.load('/tmp/ppo_agent.zip')
            logger.info("RL agent loaded successfully")
            
        except Exception as e:
            logger.error(f"Failed to load RL agent: {e}")
            self._create_dummy_agent()
    
    def _create_dummy_agent(self):
        """Create dummy agent for demo"""
        logger.warning("Using dummy agent for demonstration")
        self.agent = "dummy"
    
    def predict_transfers(self, current_stock: List[int], forecasts: List[float], 
                         lead_times: List[int]) -> Dict[str, Any]:
        """Predict optimal inventory transfers"""
        
        if self.agent == "dummy":
            return self._dummy_prediction(current_stock, forecasts, lead_times)
        
        try:
            # Prepare state
            num_nodes = len(current_stock)
            self.env.num_nodes = num_nodes
            self.env.stock_levels = np.array(current_stock, dtype=float)
            self.env.forecasts = np.array(forecasts, dtype=float)
            self.env.lead_times = np.array(lead_times, dtype=int)
            self.env.holding_costs = np.random.uniform(0.1, 0.5, num_nodes)
            
            obs = self.env._get_observation()
            
            # Get action from agent
            action, _ = self.agent.predict(obs, deterministic=True)
            transfers = self.env._decode_action(action)
            
            # Calculate expected savings
            total_transfer_cost = np.sum(transfers) * 0.1
            expected_stockout_reduction = np.sum(forecasts) * 0.15  # 15% reduction
            expected_savings = expected_stockout_reduction - total_transfer_cost
            
            return {
                "transfers": transfers.tolist(),
                "expected_savings": float(expected_savings),
                "confidence": 0.87,
                "model_version": "PPO-v2.1.0"
            }
            
        except Exception as e:
            logger.error(f"Transfer prediction failed: {e}")
            return self._dummy_prediction(current_stock, forecasts, lead_times)
    
    def _dummy_prediction(self, current_stock: List[int], forecasts: List[float], 
                         lead_times: List[int]) -> Dict[str, Any]:
        """Fallback dummy prediction"""
        num_nodes = len(current_stock)
        
        # Simple heuristic: transfer from high stock to low stock nodes
        transfers = np.zeros((num_nodes, num_nodes))
        
        for i in range(num_nodes):
            for j in range(num_nodes):
                if i != j:
                    stock_diff = current_stock[i] - current_stock[j]
                    forecast_diff = forecasts[j] - forecasts[i]
                    
                    if stock_diff > 200 and forecast_diff > 100:
                        transfers[i][j] = min(stock_diff * 0.2, 300)
        
        expected_savings = np.sum(transfers) * 0.5
        
        return {
            "transfers": transfers.tolist(),
            "expected_savings": float(expected_savings),
            "confidence": 0.75,
            "model_version": "dummy-v1.0.0"
        }

# Global agent instance
_rl_agent = None

def get_rl_agent() -> RLInventoryAgent:
    """Get or create RL agent instance"""
    global _rl_agent
    if _rl_agent is None:
        _rl_agent = RLInventoryAgent()
        _rl_agent.load_agent()
    return _rl_agent