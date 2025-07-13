from fastapi import APIRouter, HTTPException, WebSocket, WebSocketDisconnect
from pydantic import BaseModel, Field
from typing import List, Dict, Any, Optional
import asyncio
import json
import logging
from datetime import datetime, timedelta
import numpy as np

logger = logging.getLogger(__name__)
router = APIRouter()

class SystemMetric(BaseModel):
    metric_name: str
    current_value: float
    target_value: float
    unit: str
    status: str = Field(..., regex="^(healthy|warning|critical)$")
    last_updated: datetime

class Alert(BaseModel):
    alert_id: str
    severity: str = Field(..., regex="^(info|warning|critical)$")
    component: str
    message: str
    timestamp: datetime
    location: Optional[str] = None
    resolved: bool = False

class SupplyChainComponent(BaseModel):
    component_id: str
    name: str
    status: str = Field(..., regex="^(healthy|warning|critical|maintenance)$")
    uptime_percent: float
    latency_ms: int
    throughput: float
    last_health_check: datetime

class RegionalMetrics(BaseModel):
    region_id: str
    region_name: str
    orders_processed: int
    efficiency_percent: float
    active_issues: int
    last_updated: datetime

class MonitoringDashboard(BaseModel):
    system_overview: Dict[str, Any]
    component_health: List[SupplyChainComponent]
    active_alerts: List[Alert]
    regional_performance: List[RegionalMetrics]
    key_metrics: List[SystemMetric]

class ConnectionManager:
    def __init__(self):
        self.active_connections: List[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        self.active_connections.remove(websocket)

    async def broadcast(self, message: str):
        for connection in self.active_connections:
            try:
                await connection.send_text(message)
            except:
                # Remove disconnected clients
                self.active_connections.remove(connection)

manager = ConnectionManager()

class RealTimeMonitor:
    def __init__(self):
        self.system_metrics = self._initialize_metrics()
        self.alerts = []
        self.components = self._initialize_components()
        self.regional_data = self._initialize_regional_data()
        
    def _initialize_metrics(self) -> List[SystemMetric]:
        """Initialize system metrics with realistic values"""
        return [
            SystemMetric(
                metric_name="Orders Processed",
                current_value=45678,
                target_value=50000,
                unit="orders",
                status="healthy",
                last_updated=datetime.now()
            ),
            SystemMetric(
                metric_name="System Uptime",
                current_value=99.94,
                target_value=99.9,
                unit="percent",
                status="healthy",
                last_updated=datetime.now()
            ),
            SystemMetric(
                metric_name="Processing Rate",
                current_value=1247,
                target_value=1200,
                unit="orders/hour",
                status="healthy",
                last_updated=datetime.now()
            ),
            SystemMetric(
                metric_name="Active Alerts",
                current_value=3,
                target_value=5,
                unit="alerts",
                status="healthy",
                last_updated=datetime.now()
            )
        ]
    
    def _initialize_components(self) -> List[SupplyChainComponent]:
        """Initialize supply chain components"""
        return [
            SupplyChainComponent(
                component_id="demand_forecast",
                name="Demand Forecasting",
                status="healthy",
                uptime_percent=99.8,
                latency_ms=45,
                throughput=1250.5,
                last_health_check=datetime.now()
            ),
            SupplyChainComponent(
                component_id="inventory_mgmt",
                name="Inventory Management",
                status="healthy",
                uptime_percent=99.9,
                latency_ms=32,
                throughput=2100.3,
                last_health_check=datetime.now()
            ),
            SupplyChainComponent(
                component_id="route_optimizer",
                name="Route Optimization",
                status="warning",
                uptime_percent=97.2,
                latency_ms=78,
                throughput=890.7,
                last_health_check=datetime.now()
            ),
            SupplyChainComponent(
                component_id="warehouse_ops",
                name="Warehouse Operations",
                status="healthy",
                uptime_percent=99.7,
                latency_ms=28,
                throughput=1850.2,
                last_health_check=datetime.now()
            ),
            SupplyChainComponent(
                component_id="last_mile",
                name="Last-Mile Delivery",
                status="healthy",
                uptime_percent=98.9,
                latency_ms=55,
                throughput=1420.8,
                last_health_check=datetime.now()
            ),
            SupplyChainComponent(
                component_id="drone_ops",
                name="Drone Operations",
                status="maintenance",
                uptime_percent=95.4,
                latency_ms=95,
                throughput=245.1,
                last_health_check=datetime.now()
            )
        ]
    
    def _initialize_regional_data(self) -> List[RegionalMetrics]:
        """Initialize regional performance data"""
        return [
            RegionalMetrics(
                region_id="north_texas",
                region_name="North Texas",
                orders_processed=12340,
                efficiency_percent=96.2,
                active_issues=1,
                last_updated=datetime.now()
            ),
            RegionalMetrics(
                region_id="south_texas",
                region_name="South Texas",
                orders_processed=8950,
                efficiency_percent=94.7,
                active_issues=0,
                last_updated=datetime.now()
            ),
            RegionalMetrics(
                region_id="east_texas",
                region_name="East Texas",
                orders_processed=7680,
                efficiency_percent=91.3,
                active_issues=2,
                last_updated=datetime.now()
            ),
            RegionalMetrics(
                region_id="west_texas",
                region_name="West Texas",
                orders_processed=9430,
                efficiency_percent=97.8,
                active_issues=0,
                last_updated=datetime.now()
            ),
            RegionalMetrics(
                region_id="central_texas",
                region_name="Central Texas",
                orders_processed=11250,
                efficiency_percent=95.1,
                active_issues=1,
                last_updated=datetime.now()
            )
        ]
    
    def update_metrics(self):
        """Simulate real-time metric updates"""
        for metric in self.system_metrics:
            if metric.metric_name == "Orders Processed":
                metric.current_value += np.random.randint(10, 50)
            elif metric.metric_name == "Processing Rate":
                metric.current_value += np.random.randint(-50, 100)
            elif metric.metric_name == "System Uptime":
                metric.current_value = max(99.0, min(100.0, 
                    metric.current_value + np.random.uniform(-0.01, 0.01)))
            
            metric.last_updated = datetime.now()
        
        # Update component latencies
        for component in self.components:
            component.latency_ms = max(20, min(150, 
                component.latency_ms + np.random.randint(-10, 15)))
            component.last_health_check = datetime.now()
        
        # Update regional data
        for region in self.regional_data:
            region.orders_processed += np.random.randint(5, 25)
            region.efficiency_percent = max(85, min(100,
                region.efficiency_percent + np.random.uniform(-0.5, 0.5)))
            region.last_updated = datetime.now()
    
    def generate_alert(self):
        """Generate random alerts for demonstration"""
        if np.random.random() < 0.1:  # 10% chance of new alert
            alert_types = [
                ("info", "System optimization completed successfully"),
                ("warning", "High latency detected in Route Optimization service"),
                ("critical", "Inventory stockout predicted for Electronics category"),
                ("info", "Drone delivery corridor maintenance scheduled"),
                ("warning", "Weather conditions affecting delivery times")
            ]
            
            severity, message = np.random.choice(alert_types)
            
            alert = Alert(
                alert_id=f"ALT-{datetime.now().strftime('%Y%m%d%H%M%S')}-{np.random.randint(1000, 9999)}",
                severity=severity,
                component=np.random.choice(["Forecasting", "Inventory", "Routes", "Warehouse", "Delivery"]),
                message=message,
                timestamp=datetime.now(),
                location=np.random.choice(["Dallas DC", "Houston Hub", "Austin Center", "System Wide"]),
                resolved=False
            )
            
            self.alerts.insert(0, alert)  # Add to beginning
            self.alerts = self.alerts[:10]  # Keep only latest 10 alerts
    
    def get_dashboard_data(self) -> MonitoringDashboard:
        """Get complete dashboard data"""
        system_overview = {
            "total_orders": int(self.system_metrics[0].current_value),
            "processing_rate": int(self.system_metrics[2].current_value),
            "system_uptime": round(self.system_metrics[1].current_value, 2),
            "active_alerts": int(self.system_metrics[3].current_value),
            "regions_monitored": len(self.regional_data),
            "data_points_per_second": np.random.randint(14000, 16000)
        }
        
        return MonitoringDashboard(
            system_overview=system_overview,
            component_health=self.components,
            active_alerts=self.alerts,
            regional_performance=self.regional_data,
            key_metrics=self.system_metrics
        )

# Global monitor instance
_monitor = RealTimeMonitor()

@router.get("/dashboard", response_model=MonitoringDashboard)
async def get_monitoring_dashboard():
    """
    Get comprehensive real-time monitoring dashboard data.
    
    Returns current system status, component health, active alerts,
    and regional performance metrics.
    """
    try:
        return _monitor.get_dashboard_data()
    except Exception as e:
        logger.error(f"Failed to get dashboard data: {e}")
        raise HTTPException(status_code=500, detail="Dashboard data unavailable")

@router.get("/alerts", response_model=List[Alert])
async def get_active_alerts():
    """Get all active alerts in the system"""
    return _monitor.alerts

@router.post("/alerts/{alert_id}/resolve")
async def resolve_alert(alert_id: str):
    """Mark an alert as resolved"""
    for alert in _monitor.alerts:
        if alert.alert_id == alert_id:
            alert.resolved = True
            return {"message": f"Alert {alert_id} resolved successfully"}
    
    raise HTTPException(status_code=404, detail="Alert not found")

@router.get("/components", response_model=List[SupplyChainComponent])
async def get_component_health():
    """Get health status of all supply chain components"""
    return _monitor.components

@router.get("/metrics", response_model=List[SystemMetric])
async def get_system_metrics():
    """Get current system performance metrics"""
    return _monitor.system_metrics

@router.get("/regions", response_model=List[RegionalMetrics])
async def get_regional_performance():
    """Get performance metrics by region"""
    return _monitor.regional_data

@router.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    """
    WebSocket endpoint for real-time monitoring updates.
    
    Sends live updates of system metrics, alerts, and component health
    to connected clients every 2 seconds.
    """
    await manager.connect(websocket)
    try:
        while True:
            # Update metrics and generate alerts
            _monitor.update_metrics()
            _monitor.generate_alert()
            
            # Get latest dashboard data
            dashboard_data = _monitor.get_dashboard_data()
            
            # Send to all connected clients
            await manager.broadcast(dashboard_data.json())
            
            # Wait 2 seconds before next update
            await asyncio.sleep(2)
            
    except WebSocketDisconnect:
        manager.disconnect(websocket)
    except Exception as e:
        logger.error(f"WebSocket error: {e}")
        manager.disconnect(websocket)

# Background task to continuously update metrics
async def background_monitoring():
    """Background task for continuous monitoring"""
    while True:
        try:
            _monitor.update_metrics()
            _monitor.generate_alert()
            await asyncio.sleep(5)  # Update every 5 seconds
        except Exception as e:
            logger.error(f"Background monitoring error: {e}")
            await asyncio.sleep(10)  # Wait longer on error

# Start background monitoring (would be called from main.py in production)
# asyncio.create_task(background_monitoring())