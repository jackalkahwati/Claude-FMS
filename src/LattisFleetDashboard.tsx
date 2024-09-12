import React, { useState } from 'react';
import { Bell, ChevronDown, Search, BarChart2, MapPin, Truck, FileText, Settings, HelpCircle, Sun, Moon, DollarSign, CreditCard, Users, Tag, Clock, AlertCircle, Bike, Wrench, Sliders, CreditCard as PaymentIcon, PieChart, Link, Percent, UserPlus, TrendingUp, TrendingDown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart as RePieChart, Pie, Cell, AreaChart, Area } from 'recharts';
import NotificationSystem from './components/NotificationSystem';

interface MenuItemProps {
  icon: React.ElementType;
  label: string;
  active: boolean;
  onClick: () => void;
}

const MenuItem: React.FC<MenuItemProps> = ({ icon: Icon, label, active, onClick }) => (
  <li 
    className={`flex items-center space-x-2 py-2 px-4 rounded-md cursor-pointer ${
      active ? 'bg-blue-600 text-white' : 'hover:bg-blue-500 hover:text-white'
    } transition-all duration-200`} 
    onClick={onClick}
  >
    <Icon size={20} />
    <span>{label}</span>
  </li>
);

const LattisFleetDashboard: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');

  // Dashboard data
  const [dashboardData, setDashboardData] = useState({
    kpis: {
      totalRides: { value: 1000, trend: 'up', percentage: 5 },
      totalRevenue: { value: 5000, trend: 'up', percentage: 8 },
      activeUsers: { value: 500, trend: 'up', percentage: 3 },
      fleetUtilization: { value: 75, trend: 'down', percentage: 2 },
      averageRideTime: { value: 15, trend: 'up', percentage: 1 },
      customerSatisfaction: { value: 4.5, trend: 'up', percentage: 0.5 },
    },
    graphs: {
      ridesOverTime: [
        { date: '2023-01-01', rides: 100 },
        { date: '2023-02-01', rides: 120 },
        { date: '2023-03-01', rides: 150 },
        { date: '2023-04-01', rides: 130 },
        { date: '2023-05-01', rides: 180 },
      ],
      revenueByVehicleType: [
        { type: 'E-Bike', revenue: 2000 },
        { type: 'Scooter', revenue: 1500 },
        { type: 'Moped', revenue: 1000 },
        { type: 'Car', revenue: 500 },
      ],
      userGrowth: [
        { date: '2023-01-01', users: 300 },
        { date: '2023-02-01', users: 350 },
        { date: '2023-03-01', users: 400 },
        { date: '2023-04-01', users: 450 },
        { date: '2023-05-01', users: 500 },
      ],
    },
    activityFeed: [
      { id: 1, type: 'ride_completed', user: 'John D.', vehicle: 'E-Bike 001', time: '2 minutes ago' },
      { id: 2, type: 'maintenance_required', vehicle: 'Scooter 003', issue: 'Low battery', time: '15 minutes ago' },
      { id: 3, type: 'new_user_registered', user: 'Sarah M.', time: '1 hour ago' },
      { id: 4, type: 'payment_received', user: 'Mike R.', amount: 25, time: '3 hours ago' },
      { id: 5, type: 'vehicle_relocated', vehicle: 'Moped 002', location: 'Downtown', time: '5 hours ago' },
    ],
  });

  const renderDashboard = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(dashboardData.kpis).map(([key, data]) => (
          <Card key={key} className={darkMode ? 'bg-gray-800 text-white' : ''}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</CardTitle>
              {data.trend === 'up' ? <TrendingUp className="h-4 w-4 text-green-500" /> : <TrendingDown className="h-4 w-4 text-red-500" />}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{typeof data.value === 'number' ? data.value.toLocaleString() : data.value}</div>
              <p className={`text-xs ${data.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                {data.trend === 'up' ? '+' : '-'}{data.percentage}%
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className={darkMode ? 'bg-gray-800 text-white' : ''}>
          <CardHeader>
            <CardTitle>Rides Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={dashboardData.graphs.ridesOverTime}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="rides" stroke="#8884d8" fill="#8884d8" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className={darkMode ? 'bg-gray-800 text-white' : ''}>
          <CardHeader>
            <CardTitle>Revenue by Vehicle Type</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={dashboardData.graphs.revenueByVehicleType}
                  dataKey="revenue"
                  nameKey="type"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  label
                />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card className={darkMode ? 'bg-gray-800 text-white' : ''}>
        <CardHeader>
          <CardTitle>User Growth</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={dashboardData.graphs.userGrowth}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="users" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className={darkMode ? 'bg-gray-800 text-white' : ''}>
        <CardHeader>
          <CardTitle>Activity Feed</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {dashboardData.activityFeed.map((activity) => (
              <li key={activity.id} className="flex items-center space-x-4">
                {activity.type === 'ride_completed' && <Bike className="h-6 w-6 text-green-500" />}
                {activity.type === 'maintenance_required' && <Wrench className="h-6 w-6 text-yellow-500" />}
                {activity.type === 'new_user_registered' && <UserPlus className="h-6 w-6 text-blue-500" />}
                {activity.type === 'payment_received' && <DollarSign className="h-6 w-6 text-green-500" />}
                {activity.type === 'vehicle_relocated' && <MapPin className="h-6 w-6 text-purple-500" />}
                <div>
                  <p className="text-sm font-medium">
                    {activity.type === 'ride_completed' && `${activity.user} completed a ride on ${activity.vehicle}`}
                    {activity.type === 'maintenance_required' && `${activity.vehicle} requires maintenance: ${activity.issue}`}
                    {activity.type === 'new_user_registered' && `${activity.user} registered as a new user`}
                    {activity.type === 'payment_received' && `Received $${activity.amount} payment from ${activity.user}`}
                    {activity.type === 'vehicle_relocated' && `${activity.vehicle} was relocated to ${activity.location}`}
                  </p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );

  const renderGeofencing = () => (
    <div>
      <h2 className="text-2xl font-bold mb-4">Geofencing</h2>
      <p>Geofencing settings and management will be implemented here.</p>
    </div>
  );

  const renderPenaltyFees = () => (
    <div>
      <h2 className="text-2xl font-bold mb-4">Penalty Fees</h2>
      <p>Penalty fee configuration and management will be implemented here.</p>
    </div>
  );

  const renderPayments = () => (
    <div>
      <h2 className="text-2xl font-bold mb-4">Payments</h2>
      <p>Payment processing and management will be implemented here.</p>
    </div>
  );

  const renderMembershipPlans = () => (
    <div>
      <h2 className="text-2xl font-bold mb-4">Membership Plans</h2>
      <p>Membership plan creation and management will be implemented here.</p>
    </div>
  );

  const renderPromotions = () => (
    <div>
      <h2 className="text-2xl font-bold mb-4">Promotions</h2>
      <p>Promotion creation and management will be implemented here.</p>
    </div>
  );

  const renderNotifications = () => (
    <div>
      <h2 className="text-2xl font-bold mb-4">Notifications</h2>
      <p>Notification settings and management will be implemented here.</p>
    </div>
  );

  const renderRideSettings = () => (
    <div>
      <h2 className="text-2xl font-bold mb-4">Ride Settings</h2>
      <p>Ride configuration and settings will be implemented here.</p>
    </div>
  );

  const renderFleetMaintenance = () => (
    <div>
      <h2 className="text-2xl font-bold mb-4">Fleet Maintenance</h2>
      <p>Fleet maintenance scheduling and management will be implemented here.</p>
    </div>
  );

  const renderAnalytics = () => (
    <div>
      <h2 className="text-2xl font-bold mb-4">Analytics</h2>
      <p>Detailed analytics and reporting will be implemented here.</p>
    </div>
  );

  const renderThirdPartyIntegrations = () => (
    <div>
      <h2 className="text-2xl font-bold mb-4">Third-Party Integrations</h2>
      <p>Integration with external services will be managed here.</p>
    </div>
  );

  const renderTaxManagement = () => (
    <div>
      <h2 className="text-2xl font-bold mb-4">Tax Management</h2>
      <p>Tax rate configuration and management will be implemented here.</p>
    </div>
  );

  const renderCustomerOnboarding = () => (
    <div>
      <h2 className="text-2xl font-bold mb-4">Customer Onboarding</h2>
      <p>Customer onboarding process and management will be implemented here.</p>
    </div>
  );

  const renderAdvancedSettings = () => (
    <div>
      <h2 className="text-2xl font-bold mb-4">Advanced Settings</h2>
      <p>Advanced configuration options will be implemented here.</p>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return renderDashboard();
      case 'geofencing':
        return renderGeofencing();
      case 'penaltyFees':
        return renderPenaltyFees();
      case 'payments':
        return renderPayments();
      case 'membershipPlans':
        return renderMembershipPlans();
      case 'promotions':
        return renderPromotions();
      case 'notifications':
        return renderNotifications();
      case 'rideSettings':
        return renderRideSettings();
      case 'fleetMaintenance':
        return renderFleetMaintenance();
      case 'analytics':
        return renderAnalytics();
      case 'thirdPartyIntegrations':
        return renderThirdPartyIntegrations();
      case 'taxManagement':
        return renderTaxManagement();
      case 'customerOnboarding':
        return renderCustomerOnboarding();
      case 'advancedSettings':
        return renderAdvancedSettings();
      default:
        return renderDashboard();
    }
  };

  return (
    <div className={`flex h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      {/* Sidebar */}
      <aside className={`w-64 ${darkMode ? 'bg-gray-800' : 'bg-white'} text-gray-400 p-4`}>
        <div className="flex items-center space-x-2 mb-6">
          <div className="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center">
            <span className="text-xl font-bold text-white">L</span>
          </div>
          <span className="text-xl font-semibold text-blue-500">Lattis</span>
        </div>
        <nav>
          <ul className="space-y-2">
            <MenuItem icon={BarChart2} label="Dashboard" active={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')} />
            <MenuItem icon={MapPin} label="Geofencing" active={activeTab === 'geofencing'} onClick={() => setActiveTab('geofencing')} />
            <MenuItem icon={DollarSign} label="Penalty Fees" active={activeTab === 'penaltyFees'} onClick={() => setActiveTab('penaltyFees')} />
            <MenuItem icon={CreditCard} label="Payments" active={activeTab === 'payments'} onClick={() => setActiveTab('payments')} />
            <MenuItem icon={Users} label="Membership Plans" active={activeTab === 'membershipPlans'} onClick={() => setActiveTab('membershipPlans')} />
            <MenuItem icon={Tag} label="Promotions" active={activeTab === 'promotions'} onClick={() => setActiveTab('promotions')} />
            <MenuItem icon={Bell} label="Notifications" active={activeTab === 'notifications'} onClick={() => setActiveTab('notifications')} />
            <MenuItem icon={Bike} label="Ride Settings" active={activeTab === 'rideSettings'} onClick={() => setActiveTab('rideSettings')} />
            <MenuItem icon={Wrench} label="Fleet Maintenance" active={activeTab === 'fleetMaintenance'} onClick={() => setActiveTab('fleetMaintenance')} />
            <MenuItem icon={PieChart} label="Analytics" active={activeTab === 'analytics'} onClick={() => setActiveTab('analytics')} />
            <MenuItem icon={Link} label="Integrations" active={activeTab === 'thirdPartyIntegrations'} onClick={() => setActiveTab('thirdPartyIntegrations')} />
            <MenuItem icon={Percent} label="Tax Management" active={activeTab === 'taxManagement'} onClick={() => setActiveTab('taxManagement')} />
            <MenuItem icon={UserPlus} label="Customer Onboarding" active={activeTab === 'customerOnboarding'} onClick={() => setActiveTab('customerOnboarding')} />
            <MenuItem icon={Sliders} label="Advanced Settings" active={activeTab === 'advancedSettings'} onClick={() => setActiveTab('advancedSettings')} />
          </ul>
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className={`h-16 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md flex items-center justify-between px-4`}>
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-semibold">Welcome back, Brandon</h1>
          </div>
          <div className="flex items-center space-x-4">
            <button onClick={() => setDarkMode(!darkMode)}>
              {darkMode ? <Sun size={24} /> : <Moon size={24} />}
            </button>
          </div>
        </header>

        {/* Main dashboard content */}
        <main className={`flex-1 overflow-x-hidden overflow-y-auto ${darkMode ? 'bg-gray-900' : 'bg-gray-100'} p-6`}>
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default LattisFleetDashboard;