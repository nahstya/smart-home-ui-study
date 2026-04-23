export type DeviceStatus = 'on' | 'off' | 'locked' | 'unlocked';

export interface Device {
  id: string;
  name: string;
  room: string;
  type: 'light' | 'thermostat' | 'lock' | 'speaker' | 'sensor' | 'fan';
  status: DeviceStatus;
  value?: number | string; // Brightness percentage, Temperature, etc.
}

export interface Automation {
  id: string;
  name: string;
  trigger: string;
  condition: string;
  action: string;
  isActive: boolean;
  explanation: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  type: 'info' | 'alert' | 'success';
  reason?: string;
  automationId?: string;
}

export type Screen = 'home' | 'room' | 'lightControl' | 'addDevice' | 'notifications' | 'explanation' | 'settings' | 'automationBuilder' | 'connectionFlow' | 'myAutomations' | 'myDevices';
