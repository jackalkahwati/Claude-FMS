import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface NotificationPreference {
  vehicleTheft: boolean;
  vehicleDamage: boolean;
  maintenance: boolean;
  parkingViolations: boolean;
  lowBattery: boolean;
}

interface NotificationSystemProps {
  darkMode: boolean;
}

const NotificationSystem: React.FC<NotificationSystemProps> = ({ darkMode }) => {
  const [preferences, setPreferences] = useState<NotificationPreference>({
    vehicleTheft: false,
    vehicleDamage: false,
    maintenance: false,
    parkingViolations: false,
    lowBattery: false,
  });

  const handlePreferenceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setPreferences(prev => ({ ...prev, [name]: checked }));
  };

  const savePreferences = () => {
    // Here you would typically save the preferences to a backend or local storage
    console.log('Saving preferences:', preferences);
    // TODO: Implement actual saving logic
  };

  const notificationDescriptions: Record<keyof NotificationPreference, string> = {
    vehicleTheft: "Alert when suspicious activity is detected",
    vehicleDamage: "Notify about potential damage to vehicles",
    maintenance: "Updates on scheduled and required maintenance",
    parkingViolations: "Alerts for vehicles parked in restricted areas",
    lowBattery: "Notification when vehicle battery is below 20%",
  };

  return (
    <Card className={darkMode ? 'bg-gray-800 text-white' : ''}>
      <CardHeader>
        <CardTitle>Notification Preferences</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {Object.entries(preferences).map(([key, value]) => (
            <div key={key} className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  type="checkbox"
                  id={key}
                  name={key}
                  checked={value}
                  onChange={handlePreferenceChange}
                  className={`form-checkbox h-4 w-4 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor={key} className={`font-medium ${darkMode ? 'text-white' : 'text-gray-700'}`}>
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </label>
                <p className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  {notificationDescriptions[key as keyof NotificationPreference]}
                </p>
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={savePreferences}
          className={`mt-6 ${
            darkMode
              ? 'bg-blue-600 hover:bg-blue-700'
              : 'bg-blue-500 hover:bg-blue-600'
          } text-white px-4 py-2 rounded transition-colors duration-200`}
        >
          Save Preferences
        </button>
      </CardContent>
    </Card>
  );
};

export default NotificationSystem;