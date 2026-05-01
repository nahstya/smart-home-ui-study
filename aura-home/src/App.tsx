/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Home, 
  Bell, 
  Settings, 
  ArrowLeft, 
  MoreVertical, 
  Lightbulb, 
  Thermometer, 
  Lock, 
  ChevronRight, 
  Plus, 
  Info, 
  CheckCircle, 
  Clock, 
  Network, 
  Bluetooth, 
  Mic, 
  Music,
  FileText,
  MapPin, 
  Activity, 
  Search, 
  Timer, 
  Bolt, 
  Menu,
  X,
  ScanEye,
  Moon,
  ArrowDown,
  CheckCircle2,
  Speaker,
  Soup,
  Droplets,
  Zap,
  Crown,
  Pencil,
  Sparkles,
  Calendar,
  Check,
  Star,
  ExternalLink,
  Sun,
  HelpCircle,
  Fan,
  Wind
} from 'lucide-react';
import { Device, Automation, Notification, Screen, DeviceStatus } from './types';

// Mock Data
const INITIAL_DEVICES: Device[] = [
  { id: '1', name: 'Свет', room: 'Гостиная', type: 'light', status: 'on', value: 85 },
  { id: '2', name: 'Дверь', room: 'Гостиная', type: 'lock', status: 'locked' },
  { id: '3', name: 'Термостат', room: 'Гостиная', type: 'thermostat', status: 'on', value: '21 °C' },
  { id: '4', name: 'Кухонная лампа', room: 'Кухня', type: 'light', status: 'off', value: 0 },
  { id: 'k2', name: 'Вытяжка', room: 'Кухня', type: 'fan', status: 'off', value: 0 },
  { id: '5', name: 'Свет в ванной', room: 'Ванная', type: 'light', status: 'off', value: 0 },
];

const INITIAL_AUTOMATIONS: Automation[] = [
  { 
    id: 'a1', 
    name: 'Вечерний режим', 
    trigger: 'Время 18:00', 
    condition: 'Каждый день', 
    action: 'Включить свет, Термостат 21°C', 
    isActive: true,
    explanation: 'Запускается каждый день в 18:00 для подготовки дома к вечеру и создания комфортной атмосферы.'
  }
];

const INITIAL_NOTIFICATIONS: Notification[] = [
  { 
    id: 'n1', 
    title: 'Автоматическое действие', 
    message: 'Свет в гостиной был включен автоматически', 
    timestamp: 'Сегодня в 18:00', 
    type: 'info', 
    reason: 'активен вечерний режим',
    automationId: 'a1'
  },
  { 
    id: 'n2', 
    title: 'Режим охраны', 
    message: 'Все двери заперты и датчики активированы', 
    timestamp: 'Сегодня в 12:45', 
    type: 'success' 
  },
  { 
    id: 'n3', 
    title: 'Климат-контроль', 
    message: 'Комфортная температура 22°C установлена в спальне', 
    timestamp: 'Сегодня в 09:30', 
    type: 'success'
  },
  { 
    id: 'n4', 
    title: 'Движение', 
    message: 'Обнаружено движение в прихожей', 
    timestamp: 'Вчера в 23:10', 
    type: 'info'
  },
];

interface ConnectionFlowProps {
  onBack: () => void;
  onFinish: () => void;
}

function ConnectionFlow({ onBack, onFinish }: ConnectionFlowProps) {
  const [step, setStep] = useState(1);
  const [connectPercent, setConnectPercent] = useState(0);
  const [permissions, setPermissions] = useState({
    bluetooth: false,
    network: false,
    mic: false,
    music: false
  });

  useEffect(() => {
    if (step === 2) {
      const timer = setTimeout(() => {
        setStep(3);
      }, 5000);
      return () => clearTimeout(timer);
    }
    if (step === 3) {
      const interval = setInterval(() => {
        setConnectPercent(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => setStep(4), 1000);
            return 100;
          }
          return prev + 5;
        });
      }, 100);
      return () => clearInterval(interval);
    }
  }, [step]);

  const togglePermission = (key: keyof typeof permissions) => {
    setPermissions(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const isMandatoryFilled = permissions.bluetooth && permissions.network;

  if (step === 1) return (
    <div className="flex flex-col h-full space-y-8 py-6 px-4">
      <header className="flex items-center gap-4">
        <button onClick={onBack} className="p-2 rounded-full hover:bg-surface-container-low transition-colors"><ArrowLeft /></button>
        <h2 className="font-manrope font-black text-2xl">Подключение Aura</h2>
      </header>

      <section className="text-center py-6">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-24 h-24 bg-primary/10 rounded-3xl flex items-center justify-center mx-auto mb-4 text-primary"
          >
            <Speaker size={48} />
          </motion.div>
          <h2 className="text-xl font-manrope font-bold">Aura Smart Speaker</h2>
          <p className="mt-1 text-sm opacity-60">Умный дом • Музыка • Голосовой помощник</p>
      </section>

      <div className="space-y-6 flex-1 overflow-y-auto pb-6 scrollbar-hide">
        <div className="space-y-4">
          <h3 className="text-[10px] uppercase font-black tracking-widest text-on-surface-variant opacity-60 px-2">Обязательные разрешения</h3>
          <div className="space-y-3">
             <div 
               onClick={() => togglePermission('bluetooth')}
               className="bg-surface-container-lowest p-5 rounded-[2rem] border border-surface-container flex items-center justify-between cursor-pointer group hover:border-primary/30 transition-colors"
             >
                <div className="flex items-center gap-4">
                   <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${permissions.bluetooth ? 'bg-primary/10 text-primary' : 'bg-surface-container-high text-outline'}`}>
                      <Bluetooth size={24} />
                   </div>
                   <div>
                      <h4 className="font-bold text-on-surface">Bluetooth</h4>
                      <p className="text-[10px] text-on-surface-variant opacity-70">Для поиска устройств поблизости</p>
                   </div>
                </div>
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${permissions.bluetooth ? 'bg-primary border-primary animate-scale-in' : 'border-outline/30'}`}>
                   {permissions.bluetooth && <Check size={14} className="text-white" />}
                </div>
             </div>

             <div 
               onClick={() => togglePermission('network')}
               className="bg-surface-container-lowest p-5 rounded-[2rem] border border-surface-container flex items-center justify-between cursor-pointer group hover:border-primary/30 transition-colors"
             >
                <div className="flex items-center gap-4">
                   <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${permissions.network ? 'bg-primary/10 text-primary' : 'bg-surface-container-high text-outline'}`}>
                      <Network size={24} />
                   </div>
                   <div>
                      <h4 className="font-bold text-on-surface">Локальная сеть</h4>
                      <p className="text-[10px] text-on-surface-variant opacity-70">Для первичной настройки</p>
                   </div>
                </div>
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${permissions.network ? 'bg-primary border-primary animate-scale-in' : 'border-outline/30'}`}>
                   {permissions.network && <Check size={14} className="text-white" />}
                </div>
             </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-[10px] uppercase font-black tracking-widest text-on-surface-variant opacity-60 px-2">Дополнительно</h3>
          <div className="space-y-3">
             <div 
               onClick={() => togglePermission('mic')}
               className="bg-surface-container-lowest p-5 rounded-[2rem] border border-surface-container flex items-center justify-between cursor-pointer group hover:border-primary/30 transition-colors"
             >
                <div className="flex items-center gap-4">
                   <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${permissions.mic ? 'bg-primary/10 text-primary' : 'bg-surface-container-high text-outline'}`}>
                      <Mic size={24} />
                   </div>
                   <div>
                      <h4 className="font-bold text-on-surface">Микрофон</h4>
                      <p className="text-[10px] text-on-surface-variant opacity-70">Для голосовых команд</p>
                   </div>
                </div>
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${permissions.mic ? 'bg-primary border-primary animate-scale-in' : 'border-outline/30'}`}>
                   {permissions.mic && <Check size={14} className="text-white" />}
                </div>
             </div>

             <div 
               onClick={() => togglePermission('music')}
               className="bg-surface-container-lowest p-5 rounded-[2rem] border border-surface-container flex items-center justify-between cursor-pointer group hover:border-primary/30 transition-colors"
             >
                <div className="flex items-center gap-4">
                   <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${permissions.music ? 'bg-primary/10 text-primary' : 'bg-surface-container-high text-outline'}`}>
                      <Music size={24} />
                   </div>
                   <div>
                      <h4 className="font-bold text-on-surface">Музыка</h4>
                      <p className="text-[10px] text-on-surface-variant opacity-70">Доступ к вашей библиотеке</p>
                   </div>
                </div>
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${permissions.music ? 'bg-primary border-primary animate-scale-in' : 'border-outline/30'}`}>
                   {permissions.music && <Check size={14} className="text-white" />}
                </div>
             </div>
          </div>
        </div>

        <button className="flex items-center justify-center gap-2 text-primary font-black text-[10px] uppercase tracking-widest mt-4">
          <FileText size={16} /> Полные правила соглашения
        </button>
      </div>

      <button 
        disabled={!isMandatoryFilled}
        onClick={() => setStep(2)}
        className={`w-full py-6 rounded-[2rem] font-manrope font-black text-lg shadow-2xl transition-all ${isMandatoryFilled ? 'bg-on-surface text-surface active:scale-[0.98]' : 'bg-surface-container-high text-outline cursor-not-allowed opacity-50'}`}
      >
        Продолжить настройку
      </button>
    </div>
  );

  if (step === 2) return (
    <div className="flex flex-col items-center justify-center space-y-12 h-full py-20 px-4 text-center">
        <div className="space-y-4">
          <h2 className="text-4xl font-manrope font-black tracking-tight">Поиск Aura</h2>
          <p className="text-on-surface-variant font-medium text-lg">Пожалуйста, подождите...</p>
        </div>
        <div className="relative w-64 h-64 flex items-center justify-center">
          <motion.div 
            animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.1, 0.3] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-44 h-44 rounded-full bg-primary/20 absolute m-auto"
          />
          <motion.div 
            animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0.2, 0.5] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-32 h-32 rounded-full bg-primary/30 absolute m-auto"
          />
          <div className="w-40 h-40 rounded-[3rem] bg-surface-container-lowest shadow-2xl flex items-center justify-center relative z-10 border border-surface-container">
            <Speaker size={80} className="text-primary" />
          </div>
        </div>
        <div className="bg-surface-container-low px-8 py-4 rounded-full flex items-center gap-4">
          <div className="flex gap-1">
             <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1, delay: 0 }} className="w-1.5 h-1.5 bg-primary rounded-full" />
             <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-1.5 h-1.5 bg-primary rounded-full" />
             <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-1.5 h-1.5 bg-primary rounded-full" />
          </div>
          <span className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant opacity-60">Сканирование сети</span>
        </div>
    </div>
  );

  if (step === 3) return (
    <div className="flex flex-col items-center justify-center h-full space-y-12 px-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-manrope font-black tracking-tight">Создание пары...</h2>
        <p className="text-on-surface-variant text-sm font-medium">Безопасное соединение</p>
      </div>
      <div className="w-full max-w-[280px] bg-surface-container-high rounded-full h-4 overflow-hidden border border-surface-container shadow-inner">
        <motion.div 
          className="h-full bg-primary shadow-[0_0_20px_rgba(var(--color-primary),0.6)]"
          initial={{ width: 0 }}
          animate={{ width: `${connectPercent}%` }}
        />
      </div>
      <div className="bg-primary/10 px-6 py-2 rounded-2xl">
        <p className="text-primary font-black text-2xl tracking-tighter">{connectPercent}%</p>
      </div>
    </div>
  );

  return (
     <div className="flex flex-col items-center justify-center h-full text-center space-y-12 py-10 px-4">
        <div className="relative">
          <motion.div 
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            className="w-48 h-48 rounded-[3.5rem] bg-[#e8f5e9] shadow-2xl flex items-center justify-center text-[#2e7d32] border-4 border-white"
          >
            <CheckCircle2 size={100} strokeWidth={2.5} />
          </motion.div>
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3 }}
            className="absolute -right-4 -top-4 w-16 h-16 bg-primary text-white rounded-2xl flex items-center justify-center shadow-lg transform rotate-12"
          >
            <Sparkles />
          </motion.div>
        </div>
        
        <div className="space-y-4 px-2">
          <h2 className="text-5xl font-manrope font-black tracking-tight text-on-surface">Ура!</h2>
          <p className="text-on-surface-variant font-medium leading-relaxed max-w-[300px] mx-auto text-lg opacity-80">
             Ваша акустическая система <span className="text-primary font-black">Aura Smart</span> успешно добавлена в гостиную.
          </p>
        </div>

        <div className="w-full bg-surface-container-low/50 p-6 rounded-[2.5rem] border border-surface-container flex items-center gap-6">
           <div className="w-16 h-16 bg-surface-container-lowest rounded-2xl flex items-center justify-center text-primary shadow-sm border border-surface-container/50">
             <Speaker size={32} />
           </div>
           <div className="text-left flex-1 min-w-0">
             <h4 className="font-manrope font-black text-lg truncate">Aura Speaker</h4>
             <p className="text-[10px] uppercase font-extrabold tracking-widest text-on-surface-variant opacity-60">Гостиная • Онлайн</p>
           </div>
           <div className="bg-green-500 text-white p-2 rounded-full shadow-lg shrink-0">
             <CheckCircle2 size={24} />
           </div>
        </div>

        <button 
          onClick={onFinish}
          className="w-full bg-on-surface text-surface py-6 rounded-[2rem] font-manrope font-black text-lg shadow-2xl active:scale-[0.98] transition-all hover:shadow-primary/20"
        >
          Готово
        </button>
     </div>
  );
}

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [devices, setDevices] = useState<Device[]>(INITIAL_DEVICES);
  const [automations, setAutomations] = useState<Automation[]>(INITIAL_AUTOMATIONS);
  const [notifications, setNotifications] = useState<Notification[]>(INITIAL_NOTIFICATIONS);
  const [history, setHistory] = useState<Screen[]>(['home']);
  const [selectedAutomation, setSelectedAutomation] = useState<Automation | null>(null);
  
  // "I'm out" logic state
  const [isAwayMode, setIsAwayMode] = useState(false);
  const [showAwayTimer, setShowAwayTimer] = useState(false);
  const [awayTimeLeft, setAwayTimeLeft] = useState(10);
  const [prevDeviceStates, setPrevDeviceStates] = useState<Device[]>([]);
  
  // Automation Builder state
  const [builderIfs, setBuilderIfs] = useState<{id: string, type: string, label: string, value: string, iconName: string, config?: any}[]>([]);
  const [builderThens, setBuilderThens] = useState<{id: string, type: string, label: string, value: string, iconName: string, config?: any}[]>([]);
  const [editingScenarioName, setEditingScenarioName] = useState('Без названия');
  const [pickerModal, setPickerModal] = useState<'if' | 'then' | null>(null);
  const [configuringItem, setConfiguringItem] = useState<{id: string, type: 'if' | 'then'} | null>(null);

  // Time sub-state for range selection
  const [timeRange, setTimeRange] = useState({ start: '22:00', end: '06:00', type: 'after' });

  const IF_OPTIONS = [
    { type: 'time', label: 'Время', value: 'Выберите период', iconName: 'Clock' },
    { type: 'motion', label: 'Датчик движения', value: 'Зона обнаружения', iconName: 'ScanEye' },
    { type: 'temp', label: 'Температура', value: 'Указать порог', iconName: 'Thermometer' },
    { type: 'door', label: 'Дверь', value: 'Состояние', iconName: 'Lock', disabled: true },
  ];

  const THEN_OPTIONS = [
    { type: 'light', label: 'Освещение', value: 'Действие со светом', iconName: 'Lightbulb' },
    { type: 'temp', label: 'Климат', value: 'Установить температуру', iconName: 'Thermometer' },
    { type: 'sound', label: 'Аудио', value: 'Включить звук', iconName: 'Speaker' },
  ];

  const saveScenario = () => {
    if (builderIfs.length > 0 && builderThens.length > 0) {
      const newAuto: Automation = {
        id: Math.random().toString(36).substr(2, 9),
        name: editingScenarioName || 'Автоматизация',
        trigger: builderIfs.map(i => i.value).join(' + '),
        condition: 'Если условия соблюдены',
        action: builderThens.map(t => t.value).join(', '),
        isActive: true,
        explanation: `Сценарий активируется при срабатывании: ${builderIfs.map(i => i.value).join(' и ')}.`
      };
      setAutomations(prev => [...prev, newAuto]);
      // Reset builder
      setBuilderIfs([]);
      setBuilderThens([]);
      setEditingScenarioName('Без названия');
      goBack();
    }
  };

  const IconMap: Record<string, any> = {
    Clock, Calendar, ScanEye, Thermometer, Lock, Lightbulb, Speaker, Bell, Moon, Plus, Sun, ArrowLeft, ArrowDown, Settings, Info, CheckCircle2, ChevronRight, Zap, Crown, Pencil, Sparkles, Activity, HelpCircle, Music, FileText, Bolt, Home, Soup, Droplets, X, Fan, Wind, Check
  };

  const addIf = (option: typeof IF_OPTIONS[0]) => {
    const newItem = { ...option, id: Math.random().toString(36).substr(2, 9) };
    setBuilderIfs(prev => [...prev, newItem]);
    setPickerModal(null);
    setConfiguringItem({ id: newItem.id, type: 'if' });
  };

  const addThen = (option: typeof THEN_OPTIONS[0]) => {
    const newItem = { ...option, id: Math.random().toString(36).substr(2, 9) };
    setBuilderThens(prev => [...prev, newItem]);
    setPickerModal(null);
    setConfiguringItem({ id: newItem.id, type: 'then' });
  };

  const updateItemConfig = (id: string, type: 'if' | 'then', updates: any) => {
    if (type === 'if') setBuilderIfs(prev => prev.map(i => i.id === id ? { ...i, ...updates } : i));
    else setBuilderThens(prev => prev.map(t => t.id === id ? { ...t, ...updates } : t));
  };

  const removeIf = (id: string) => setBuilderIfs(prev => prev.filter(i => i.id !== id));
  const removeThen = (id: string) => setBuilderThens(prev => prev.filter(t => t.id !== id));

  const updateItemValue = (id: string, type: 'if' | 'then', value: string) => {
    if (type === 'if') setBuilderIfs(prev => prev.map(i => i.id === id ? { ...i, value } : i));
    else setBuilderThens(prev => prev.map(t => t.id === id ? { ...t, value } : t));
  };

  const navigate = (screen: Screen) => {
    setHistory(prev => [...prev, screen]);
    setCurrentScreen(screen);
  };

  const goBack = () => {
    if (history.length > 1) {
      const newHistory = [...history];
      newHistory.pop();
      setHistory(newHistory);
      setCurrentScreen(newHistory[newHistory.length - 1]);
    }
  };

  // Away Mode Countdown
  useEffect(() => {
    let timer: any;
    if (showAwayTimer && awayTimeLeft > 0) {
      timer = setInterval(() => {
        setAwayTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (awayTimeLeft === 0 && showAwayTimer) {
      // Execute Away Mode
      setPrevDeviceStates([...devices]);
      setDevices(prev => prev.map(d => ({ ...d, status: d.type === 'lock' ? 'locked' : 'off' })));
      setShowAwayTimer(false);
      setIsAwayMode(true);
    }
    return () => clearInterval(timer);
  }, [showAwayTimer, awayTimeLeft, devices]);

  const toggleAwayMode = () => {
    if (!isAwayMode) {
      setAwayTimeLeft(10);
      setShowAwayTimer(true);
    } else {
      setIsAwayMode(false);
    }
  };

  const cancelAwayMode = () => {
    setShowAwayTimer(false);
    setAwayTimeLeft(10);
  };

  const updateLightBrightness = (id: string, value: number) => {
    setDevices(prev => prev.map(d => d.id === id ? { ...d, value, status: value > 0 ? 'on' : 'off' } : d));
  };

  const toggleDevice = (id: string) => {
    setDevices(prev => prev.map(d => {
      if (d.id === id) {
        let newStatus: DeviceStatus = d.status === 'on' ? 'off' : 'on';
        if (d.type === 'lock') newStatus = d.status === 'locked' ? 'unlocked' : 'locked';
        return { ...d, status: newStatus };
      }
      return d;
    }));
  };

  const toggleAutomation = (id: string) => {
    setAutomations(prev => prev.map(a => a.id === id ? { ...a, isActive: !a.isActive } : a));
  };

  // Pluralization helpers
  const getDeviceLabel = (count: number) => {
    const mod10 = count % 10;
    const mod100 = count % 100;
    if (mod10 === 1 && mod100 !== 11) return `${count} устройство`;
    if ([2, 3, 4].includes(mod10) && ![12, 13, 14].includes(mod100)) return `${count} устройства`;
    return `${count} устройств`;
  };

  const getAutomationLabel = (count: number) => {
    const mod10 = count % 10;
    const mod100 = count % 100;
    if (mod10 === 1 && mod100 !== 11) return `${count} сценарий активен`;
    if ([2, 3, 4].includes(mod10) && ![12, 13, 14].includes(mod100)) return `${count} сценария активны`;
    return `${count} сценариев активны`;
  };

  // --- Screens ---

  const renderHome = () => {
    const totalDevices = devices.length;
    const roomsCount = new Set(devices.map(d => d.room)).size;

    return (
      <div className="space-y-6">
        <header className="pt-8 pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div>
                <h1 className="text-3xl font-manrope font-extrabold tracking-tight">Мой дом</h1>
                <p className="text-sm text-on-surface-variant font-medium">{roomsCount} комнаты, {getDeviceLabel(totalDevices)}</p>
              </div>
            </div>
            <button 
              onClick={toggleAwayMode}
              className={`px-6 py-3 rounded-full font-manrope font-black text-xs uppercase tracking-widest transition-all border ${isAwayMode ? 'bg-primary text-white border-primary shadow-lg shadow-primary/30' : 'bg-surface-container-lowest text-on-surface border-surface-container hover:bg-surface-container-low'}`}
            >
              <div className="flex items-center gap-2">
                <Moon size={14} fill={isAwayMode ? 'currentColor' : 'none'} />
                {isAwayMode ? 'Я дома' : 'Я ушел'}
              </div>
            </button>
          </div>
        </header>

        <section className="space-y-4">
          {[
            { name: 'Гостиная', icon: Home, color: 'bg-primary-container/20', text: 'text-primary', interactive: true },
            { name: 'Кухня', icon: Soup, color: 'bg-secondary-container/30', text: 'text-secondary', interactive: false },
            { name: 'Ванная', icon: Droplets, color: 'bg-tertiary-container/30', text: 'text-tertiary', interactive: false }
          ].map((room) => {
            const roomDevices = devices.filter(d => d.room === room.name).length;
            return (
              <div 
                key={room.name}
                onClick={() => room.interactive ? navigate('room') : null}
                className="bg-surface-container-lowest p-6 rounded-lg shadow-sm border border-surface-container flex items-center justify-between hover:bg-surface-container-low transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-6">
                  <div className={`w-16 h-16 rounded-lg ${room.color} flex items-center justify-center ${room.text}`}>
                     <room.icon />
                  </div>
                  <div>
                    <h3 className="text-xl font-manrope font-bold">{room.name}</h3>
                    <p className="text-sm text-on-surface-variant">{getDeviceLabel(roomDevices)}</p>
                  </div>
                </div>
                <ChevronRight className="text-outline transition-transform group-hover:translate-x-1" />
              </div>
            );
          })}
        </section>
      </div>
    );
  };

  const renderRoom = () => {
    const roomDevices = devices.filter(d => d.room === 'Гостиная');
    return (
      <div className="space-y-6">
        <header className="pt-8 pb-4 flex items-center gap-4">
          <button onClick={goBack} className="p-2 rounded-full hover:bg-surface-container-low transition-colors"><ArrowLeft className="text-primary" /></button>
          <div>
            <h1 className="text-2xl font-manrope font-bold">Гостиная</h1>
            <p className="text-sm text-on-surface-variant">{getDeviceLabel(roomDevices.length)}</p>
          </div>
        </header>

        <div className="space-y-4">
          {roomDevices.map(device => (
            <div key={device.id} className="bg-surface-container-low p-1 rounded-lg">
              <div 
                onClick={() => device.type === 'light' ? navigate('lightControl') : null}
                className="bg-surface-container-lowest p-6 rounded-lg shadow-sm flex items-center justify-between cursor-pointer"
              >
                <div className="flex items-center gap-5">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
                      device.type === 'light' ? 'bg-secondary-container/40 text-secondary' : 
                      device.type === 'thermostat' ? 'bg-orange-100 text-orange-600' :
                      device.type === 'speaker' ? 'bg-primary-container/20 text-primary animate-pulse' :
                      'bg-gray-100 text-gray-600'
                    }`}>
                    {device.type === 'light' ? <Lightbulb fill={device.status === 'on' ? 'currentColor' : 'none'} /> : 
                     device.type === 'thermostat' ? <Thermometer fill={device.status === 'on' ? 'currentColor' : 'none'} /> :
                     device.type === 'speaker' ? <Speaker fill={device.status === 'on' ? 'currentColor' : 'none'} /> :
                     <Lock fill={device.status === 'locked' ? 'currentColor' : 'none'} />}
                  </div>
                  <div>
                    <h3 className="font-manrope font-bold text-lg">{device.name}</h3>
                    <p className={`text-sm font-semibold ${device.status === 'on' || device.status === 'unlocked' ? 'text-primary' : 'text-on-surface-variant'}`}>
                      {device.status === 'on' ? 'Включен' : device.status === 'off' ? 'Выключен' : device.status === 'locked' ? 'Заперта' : 'Открыта'}
                    </p>
                  </div>
                </div>
                <ChevronRight className="text-outline" />
              </div>
              <div className="px-6 py-4 flex items-center justify-between">
                <span className="text-sm font-medium text-on-surface-variant">Быстрое управление</span>
                <button 
                  onClick={() => toggleDevice(device.id)}
                  className={`w-12 h-6 rounded-full relative flex items-center px-1 transition-colors ${device.status === 'on' || device.status === 'unlocked' ? 'bg-primary' : 'bg-outline-variant'}`}
                >
                  <div className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${device.status === 'on' || device.status === 'unlocked' ? 'translate-x-[24px]' : 'translate-x-0'}`}></div>
                </button>
              </div>
            </div>
          ))}
        </div>

        <button 
          onClick={() => navigate('addDevice')}
          className="w-full bg-primary py-4 rounded-lg text-on-primary font-manrope font-bold text-lg flex items-center justify-center gap-3 active:scale-[0.98] transition-transform shadow-lg shadow-primary/20"
        >
          <Plus /> Добавить устройство
        </button>
      </div>
    );
  };

  const renderLightControl = () => {
    const light = devices.find(d => d.id === '1')!;
    return (
      <div className="space-y-8">
        <header className="pt-8 pb-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={goBack} className="p-2 rounded-full hover:bg-surface-container-low"><ArrowLeft className="text-primary" /></button>
            <div>
              <h1 className="text-xl font-manrope font-bold">Свет</h1>
              <p className="text-on-surface-variant text-xs">{light.room}</p>
            </div>
          </div>
        </header>

        <section className="flex flex-col items-center">
          <div className={`w-48 h-48 rounded-full flex items-center justify-center transition-all duration-500 ${light.status === 'on' ? 'bg-[#FFC107] shadow-[0_20px_40px_rgba(255,193,7,0.3)]' : 'bg-surface-container-low'}`}>
            <Lightbulb size={64} className={light.status === 'on' ? 'text-white' : 'text-outline'} fill={light.status === 'on' ? 'white' : 'none'} />
          </div>
          <h2 className="mt-8 font-manrope font-extrabold text-3xl tracking-tight">
            {light.status === 'on' ? 'Свет включен' : 'Свет выключен'}
          </h2>
        </section>

        <section className="bg-surface-container-lowest p-6 rounded-2xl border border-surface-container space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-lg font-semibold">Питание</span>
            <button 
              onClick={() => toggleDevice(light.id)}
              className={`w-14 h-8 rounded-full relative flex items-center px-1 transition-colors ${light.status === 'on' ? 'bg-primary' : 'bg-outline-variant'}`}
            >
              <div className={`w-6 h-6 bg-white rounded-full shadow-md transition-transform ${light.status === 'on' ? 'translate-x-[24px]' : 'translate-x-0'}`}></div>
            </button>
          </div>
          <p className="text-on-surface-variant text-xs">Переключите для включения или выключения света</p>
        </section>

        <section className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="font-manrope font-bold text-lg">Яркость</h3>
            <div className="flex items-center text-primary">
              <input 
                type="number" 
                value={light.value} 
                onChange={(e) => {
                  const val = parseInt(e.target.value);
                  if (!isNaN(val)) {
                    updateLightBrightness(light.id, Math.min(100, Math.max(0, val)));
                  }
                }}
                className="w-12 bg-transparent font-bold text-xl text-right outline-none appearance-none"
              />
              <span className="font-bold text-xl">%</span>
            </div>
          </div>
          <div className="relative h-12 flex items-center">
            <div className="absolute w-full h-3 bg-surface-container-high rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary transition-all duration-300"
                style={{ width: `${light.value}%` }}
              />
            </div>
            <input 
              type="range" 
              min="0" 
              max="100" 
              value={light.value as number} 
              onChange={(e) => updateLightBrightness(light.id, parseInt(e.target.value))}
              className="absolute w-full h-full opacity-0 cursor-pointer z-10"
            />
          </div>
        </section>
      </div>
    );
  };

  const renderAddDevice = () => (
    <div className="space-y-8">
      <header className="pt-8 pb-4 flex items-center">
         <button onClick={goBack} className="p-2 rounded-full hover:bg-surface-container-low mr-4"><ArrowLeft /></button>
         <h1 className="font-manrope font-bold text-xl">Добавить устройство</h1>
      </header>

      <section className="grid grid-cols-2 gap-4">
        <button 
          onClick={() => navigate('connectionFlow')}
          className="bg-surface-container-lowest p-6 rounded-2xl shadow-sm border border-surface-container flex flex-col items-center gap-4 group hover:border-primary transition-all"
        >
          <div className="p-4 bg-primary-container/20 rounded-xl text-primary group-hover:scale-110 transition-transform">
            <Speaker />
          </div>
          <span className="font-bold">Аудио</span>
        </button>
        <button 
          className="bg-surface-container-lowest p-6 rounded-2xl shadow-sm border border-surface-container flex flex-col items-center gap-4 group hover:border-outline transition-all"
        >
          <div className="p-4 bg-secondary-container/20 rounded-xl text-secondary group-hover:scale-110 transition-transform">
            <Lightbulb />
          </div>
          <span className="font-bold">Освещение</span>
        </button>
      </section>
    </div>
  );

  const renderNotifications = () => {
    const featuredNotif = notifications.find(n => n.type === 'info');
    const listNotifs = notifications.filter(n => n.id !== featuredNotif?.id);

    return (
      <div className="space-y-6 pb-20">
        <header className="pt-8 pb-4 flex items-start justify-between">
           <div className="space-y-1">
             <h1 className="font-manrope font-black text-3xl text-on-surface">Уведомления</h1>
             <p className="text-sm text-on-surface-variant font-medium opacity-60">Последняя активность</p>
           </div>
           <button onClick={goBack} className="p-2 rounded-full hover:bg-surface-container-low"><X size={24} /></button>
        </header>

        {featuredNotif && (
          <div className="bg-white p-7 rounded-[2.5rem] border border-surface-container shadow-sm space-y-5">
            <div className="flex items-center justify-between">
               <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 text-primary rounded-full flex items-center justify-center shrink-0">
                    <Info size={20} />
                  </div>
                  <div>
                    <h3 className="font-manrope font-black text-base flex items-center gap-1.5">
                       Автоматическое действие
                       <Clock size={12} className="text-outline" />
                    </h3>
                    <p className="text-[9px] text-outline font-extrabold uppercase tracking-widest">{featuredNotif.timestamp}</p>
                  </div>
               </div>
            </div>
            
            <p className="text-sm text-on-surface-variant font-medium leading-relaxed">
               <span className="font-black text-on-surface">{featuredNotif.message.split('был')[0]}</span>
               был {featuredNotif.message.split('был')[1]}
            </p>

            {featuredNotif.reason && (
              <div className="bg-primary/5 px-4 py-1.5 rounded-full flex items-center self-start gap-2 text-[9px] uppercase font-black tracking-widest text-[#00A884]">
                <span className="text-outline/60">Причина:</span> {featuredNotif.reason}
              </div>
            )}

            <div className="flex items-center gap-3 pt-1">
               <button 
                 onClick={() => featuredNotif.automationId ? (setSelectedAutomation(automations.find(a => a.id === featuredNotif.automationId)!), navigate('explanation')) : null}
                 className="flex-1 bg-[#00A884] text-white py-3.5 rounded-full font-manrope font-extrabold text-[11px] uppercase tracking-widest shadow-lg shadow-[#00A884]/10 active:scale-[0.98] transition-all"
               >
                 Почему это произошло?
               </button>
               <button onClick={goBack} className="px-6 py-3.5 rounded-full border border-surface-container font-manrope font-extrabold text-[11px] uppercase tracking-widest active:scale-[0.98] transition-all text-on-surface-variant">
                 Закрыть
               </button>
            </div>
          </div>
        )}

        <div className="space-y-3">
          {listNotifs.map(notif => {
            const isLock = notif.title.toLowerCase().includes('режим') || notif.title.toLowerCase().includes('охраны');
            const isTemp = notif.title.toLowerCase().includes('климат');
            const Icon = isLock ? Lock : (isTemp ? Thermometer : Activity);
            
            return (
              <div 
                key={notif.id} 
                className="bg-white p-5 rounded-[2rem] border border-surface-container shadow-[0_2px_8px_rgba(0,0,0,0.02)]"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-surface-container-low flex items-center justify-center shrink-0">
                    <Icon size={20} className="text-outline/80" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center mb-0.5">
                      <h3 className="font-manrope font-black text-sm text-on-surface leading-tight">{notif.title}</h3>
                      <span className="text-[9px] text-outline font-black uppercase tracking-widest leading-none">{notif.timestamp}</span>
                    </div>
                    <p className="text-[11px] text-on-surface-variant leading-relaxed font-medium opacity-80 truncate">{notif.message}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderExplanation = () => {
    if (!selectedAutomation) return null;
    return (
      <div className="space-y-8 pb-20">
        <header className="pt-8 pb-4 flex items-center justify-between">
           <div className="flex items-center gap-4">
             <button onClick={goBack} className="p-2 rounded-full hover:bg-surface-container-low transition-colors"><ArrowLeft /></button>
             <h1 className="font-manrope font-black text-xl text-[#00A884]">Умный дом</h1>
           </div>
           <button className="p-2 text-on-surface opacity-70"><Info size={24} /></button>
        </header>

        <div className="space-y-2">
           <h2 className="text-3xl font-manrope font-black tracking-tight text-on-surface">Почему это произошло?</h2>
           <p className="text-sm text-on-surface-variant font-medium opacity-60 leading-relaxed max-w-[280px]">
             Понимание автоматических действий в вашем доме
           </p>
        </div>

        <div className="space-y-4 pt-4">
           {/* Step 1 */}
           <div className="bg-surface-container-lowest p-6 rounded-[2.5rem] border border-surface-container shadow-sm flex items-center gap-6">
              <div className="w-14 h-14 bg-[#E8F5E9] text-[#2E7D32] rounded-2xl flex items-center justify-center shrink-0">
                <CheckCircle2 size={24} fill="currentColor" className="text-white fill-[#2E7D32]" />
              </div>
              <div>
                <p className="text-[10px] uppercase font-black text-outline tracking-[0.2em] mb-1">ЧТО ПРОИЗОШЛО</p>
                <p className="text-sm font-manrope font-bold text-on-surface leading-snug">
                  Свет в гостиной был включен автоматически в 18:00
                </p>
              </div>
           </div>

           {/* Step 2 */}
           <div className="bg-surface-container-lowest p-6 rounded-[2.5rem] border border-surface-container shadow-sm flex items-center gap-6">
              <div className="w-14 h-14 bg-[#FFF3E0] text-[#EF6C00] rounded-2xl flex items-center justify-center shrink-0">
                <Clock size={24} className="fill-[#EF6C00] text-white" fill="currentColor" />
              </div>
              <div>
                <p className="text-[10px] uppercase font-black text-outline tracking-[0.2em] mb-1">ТРИГГЕР</p>
                <p className="text-sm font-manrope font-bold text-on-surface leading-snug">
                  Автоматизация <span className="text-[#00A884] font-black">{selectedAutomation.name}</span> активировалась в 18:00
                </p>
              </div>
           </div>

           {/* Step 3 */}
           <div className="bg-surface-container-lowest p-6 rounded-[2.5rem] border border-surface-container shadow-sm flex items-center gap-6">
              <div className="w-14 h-14 bg-[#E3F2FD] text-[#1565C0] rounded-2xl flex items-center justify-center shrink-0">
                <Calendar size={24} className="fill-[#1565C0] text-white" fill="currentColor" />
              </div>
              <div>
                <p className="text-[10px] uppercase font-black text-outline tracking-[0.2em] mb-1">КОГДА ЭТО ПРОИСХОДИТ</p>
                <p className="text-sm font-manrope font-bold text-on-surface-variant leading-relaxed">
                  {selectedAutomation.explanation}
                </p>
              </div>
           </div>
        </div>

        <div className="bg-[#F8F9F9] p-10 rounded-[3rem] text-center space-y-6 mt-4">
           <p className="text-xs text-on-surface-variant font-medium leading-relaxed opacity-60 max-w-[240px] mx-auto">
             Вы можете изменить настройки или отключить этот сценарий в любое время.
           </p>
           <button 
             onClick={() => navigate('myAutomations')}
             className="flex items-center gap-2 text-[#00A884] font-manrope font-black text-sm uppercase tracking-widest mx-auto hover:gap-4 transition-all"
           >
             Перейти к настройкам <ChevronRight size={18} />
           </button>
        </div>
      </div>
    );
  };

  const renderSettings = () => (
    <div className="space-y-8">
      <header className="pt-8 pb-4">
        <h1 className="text-3xl font-manrope font-black tracking-tight text-on-surface">Настройки</h1>
      </header>
      
      <section className="space-y-4 px-4">
        {/* Account Status Block */}
        <div className="bg-surface-container-lowest p-6 rounded-[2.5rem] border border-surface-container shadow-sm flex items-center justify-between group">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-primary/10 text-primary rounded-2xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-110">
              <Crown size={24} fill="currentColor" />
            </div>
            <div className="text-left">
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-manrope font-black text-on-surface leading-tight">Премиум доступ</h3>
                <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse"></span>
              </div>
              <p className="text-[10px] uppercase font-black text-outline tracking-widest mt-1">Активен до 2027</p>
            </div>
          </div>
          <Star className="text-primary/40" size={20} fill="currentColor" />
        </div>

        {/* Navigation Blocks */}
        <button 
          onClick={() => navigate('myAutomations')}
          className="w-full group bg-surface-container-lowest p-6 rounded-[2.5rem] border border-surface-container shadow-sm hover:shadow-md transition-all flex items-center justify-between"
        >
          <div className="flex items-center gap-4 overflow-hidden">
            <div className="w-12 h-12 bg-primary/10 text-primary rounded-2xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-110">
              <Sparkles size={24} />
            </div>
            <div className="text-left min-w-0">
              <h3 className="text-xl font-manrope font-black text-on-surface leading-tight">Мои автоматизации</h3>
              <p className="text-[10px] uppercase font-black text-outline tracking-widest mt-1">
                {getAutomationLabel(automations.length)}
              </p>
            </div>
          </div>
          <ChevronRight className="text-outline transition-transform group-hover:translate-x-2 shrink-0" />
        </button>

        <button 
          onClick={() => navigate('myDevices')}
          className="w-full group bg-surface-container-lowest p-6 rounded-[2.5rem] border border-surface-container shadow-sm hover:shadow-md transition-all flex items-center justify-between"
        >
          <div className="flex items-center gap-4 overflow-hidden">
            <div className="w-12 h-12 bg-secondary-container/40 text-secondary rounded-2xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-110">
              <Bolt size={24} />
            </div>
            <div className="text-left min-w-0">
              <h3 className="text-xl font-manrope font-bold text-on-surface leading-tight">Мои устройства</h3>
              <p className="text-[10px] uppercase font-black text-outline tracking-widest mt-1">
                {getDeviceLabel(devices.length)} подключено
              </p>
            </div>
          </div>
          <ChevronRight className="text-outline transition-transform group-hover:translate-x-2 shrink-0" />
        </button>
      </section>
    </div>
  );

  const renderMyAutomations = () => (
    <div className="space-y-8 pb-10">
      <header className="pt-8 pb-4 flex items-center gap-4 px-2">
        <button onClick={goBack} className="p-2 rounded-full hover:bg-surface-container-low transition-colors"><ArrowLeft /></button>
        <h1 className="font-manrope font-black text-2xl">Мои автоматизации</h1>
      </header>
      
      <section className="space-y-6">
        {automations.map(auto => (
          <div key={auto.id} className="bg-surface-container-lowest p-6 rounded-[2.5rem] border border-surface-container shadow-sm hover:shadow-md transition-all group">
            <div className="flex justify-between items-center gap-4 mb-6">
              <div className="flex items-center gap-4 flex-1 min-w-0">
                <div className={`w-14 h-14 rounded-3xl flex items-center justify-center shrink-0 transition-colors ${auto.isActive ? 'bg-primary/10 text-primary' : 'bg-surface-container-high text-outline'}`}>
                  <Sparkles size={24} fill={auto.isActive ? 'currentColor' : 'none'} className="transition-transform group-hover:scale-110" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-manrope font-extrabold text-lg text-on-surface leading-tight">{auto.name}</h3>
                  <p className="text-[10px] uppercase tracking-widest font-black text-outline mt-1.5">{auto.trigger}</p>
                </div>
              </div>
              <button 
                onClick={() => toggleAutomation(auto.id)}
                className={`w-12 h-7 rounded-full relative flex items-center px-1 shrink-0 transition-all duration-500 ease-in-out ${auto.isActive ? 'bg-primary' : 'bg-surface-container-highest'}`}
              >
                <motion.div 
                  layout
                  className="w-5 h-5 bg-white rounded-full shadow-lg"
                  animate={{ x: auto.isActive ? 20 : 0 }}
                />
              </button>
            </div>
            
            <div className="bg-surface-container-low/30 p-5 rounded-[1.75rem] mb-6 border border-surface-container/30">
               <p className="text-xs text-on-surface-variant leading-relaxed font-medium italic">
                 {auto.explanation}
               </p>
            </div>

            <button className="w-full bg-surface-container-low text-on-surface py-4 rounded-2xl font-manrope font-black text-xs flex items-center justify-center gap-2 hover:bg-primary hover:text-on-primary transition-all active:scale-95 shadow-sm">
              <Pencil size={14} /> Настроить сценарий
            </button>
          </div>
        ))}

        <button 
          onClick={() => navigate('automationBuilder')}
          className="w-full py-6 bg-primary text-on-primary rounded-[2rem] font-manrope font-black text-lg flex items-center justify-center gap-3 shadow-xl active:scale-[0.98] transition-all"
        >
          <Plus size={24} strokeWidth={3} /> Добавить автоматизацию
        </button>
      </section>
    </div>
  );

  const renderMyDevices = () => {
    const rooms = Array.from(new Set(devices.map(d => d.room)));
    return (
      <div className="space-y-8 pb-10">
        <header className="pt-8 pb-4 flex items-center gap-4 px-2">
          <button onClick={goBack} className="p-2 rounded-full hover:bg-surface-container-low transition-colors"><ArrowLeft /></button>
          <h1 className="font-manrope font-black text-2xl">Мои устройства</h1>
        </header>

        {rooms.map(room => (
          <section key={room} className="space-y-4">
            <h3 className="text-[10px] uppercase font-black text-outline tracking-widest px-4 opacity-60">{room}</h3>
            <div className="space-y-3">
              {devices.filter(d => d.room === room).map(device => (
                <div key={device.id} className="bg-white p-5 rounded-[2rem] border border-surface-container flex items-center justify-between shadow-sm group hover:border-primary/30 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 transition-colors ${
                      device.type === 'light' ? 'bg-secondary-container/30 text-secondary' : 
                      device.type === 'thermostat' ? 'bg-orange-100 text-orange-600' :
                      device.type === 'speaker' ? 'bg-primary-container/20 text-primary' :
                      device.type === 'fan' ? 'bg-cyan-100 text-cyan-600' :
                      'bg-surface-container-high text-outline'
                    }`}>
                       {device.type === 'light' ? <Lightbulb size={20} /> : 
                        device.type === 'thermostat' ? <Thermometer size={20} /> :
                        device.type === 'speaker' ? <Speaker size={20} /> :
                        device.type === 'fan' ? <Fan size={20} className={device.status === 'on' ? 'animate-spin' : ''} /> :
                        <Lock size={20} />}
                    </div>
                    <div>
                      <h4 className="font-manrope font-bold text-on-surface">{device.name}</h4>
                      <p className="text-[10px] uppercase font-black text-outline tracking-[0.1em]">{device.status === 'on' || device.status === 'unlocked' ? 'Активно' : 'Выключено'}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => toggleDevice(device.id)}
                    className={`w-10 h-6 rounded-full relative flex items-center px-0.5 transition-colors ${device.status === 'on' || device.status === 'unlocked' ? 'bg-primary' : 'bg-surface-container-highest'}`}
                  >
                    <motion.div 
                      layout
                      className="w-5 h-5 bg-white rounded-full shadow-md"
                      animate={{ x: device.status === 'on' || device.status === 'unlocked' ? 16 : 0 }}
                    />
                  </button>
                </div>
              ))}
            </div>
          </section>
        ))}

        <button 
          onClick={() => navigate('addDevice')}
          className="w-full py-6 mt-8 bg-on-surface text-surface rounded-[2rem] font-manrope font-black text-lg flex items-center justify-center gap-3 shadow-xl active:scale-[0.98] transition-all"
        >
          <Plus size={24} strokeWidth={3} /> Добавить устройство
        </button>
      </div>
    );
  };

  const renderAutomationBuilder = () => {
    return (
      <div className="space-y-10 pb-20 px-2">
        <header className="pt-8 pb-4 flex items-center gap-4">
          <button onClick={goBack} className="p-2 rounded-full hover:bg-surface-container-low transition-colors">
            <ArrowLeft className="text-on-surface" />
          </button>
          <h1 className="font-manrope font-black text-2xl">Новый сценарий</h1>
        </header>

        <section className="space-y-6">
          <div className="bg-white p-7 rounded-[2.5rem] border border-surface-container shadow-sm">
             <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-primary/10 text-primary rounded-lg flex items-center justify-center">
                  <Pencil size={18} />
                </div>
                <h3 className="text-[10px] uppercase font-black tracking-widest text-[#00A884]">Название сценария</h3>
             </div>
             <input 
               type="text" 
               placeholder="Введите название..."
               value={editingScenarioName === 'Без названия' ? '' : editingScenarioName}
               onChange={(e) => setEditingScenarioName(e.target.value)}
               className="w-full bg-surface-container-low p-5 rounded-2xl font-manrope font-black text-xl text-on-surface outline-none border-2 border-transparent focus:border-[#00A884]/30 transition-all placeholder:text-outline/30"
             />
          </div>

          {/* IF SECTION */}
          <div className="relative pt-4">
            <div className="flex items-center gap-4 px-4 mb-5">
               <div className="w-12 h-12 bg-on-surface text-surface rounded-2xl flex items-center justify-center font-black text-xs">ЕСЛИ</div>
               <div className="h-[2px] bg-surface-container-highest flex-1 rounded-full opacity-30"></div>
            </div>
            
            <div className="space-y-4">
              {builderIfs.map((item) => {
                const Icon = IconMap[item.iconName] || Info;
                return (
                  <motion.div 
                    layout
                    key={item.id} 
                    onClick={() => setConfiguringItem({ id: item.id, type: 'if' })}
                    className="bg-white p-6 rounded-[2rem] border border-surface-container shadow-[0_4px_12px_rgba(0,0,0,0.03)] flex items-center justify-between group cursor-pointer hover:border-[#00A884]/40 transition-all"
                  >
                    <div className="flex items-center gap-5">
                       <div className="w-12 h-12 bg-surface-container-low text-on-surface rounded-2xl flex items-center justify-center">
                         <Icon size={24} />
                       </div>
                       <div>
                         <h4 className="font-manrope font-black text-base text-on-surface leading-tight">{item.label}</h4>
                         <p className="text-[10px] uppercase font-extrabold text-[#00A884] tracking-widest mt-1.5">{item.value}</p>
                       </div>
                    </div>
                    <button 
                      onClick={(e) => { e.stopPropagation(); removeIf(item.id); }} 
                      className="w-10 h-10 rounded-full flex items-center justify-center text-outline hover:bg-red-50 hover:text-red-500 transition-all"
                    >
                      <X size={20} />
                    </button>
                  </motion.div>
                );
              })}
              
              <button 
                onClick={() => setPickerModal('if')}
                className="w-full bg-surface-container-low/50 border-2 border-dashed border-surface-container p-6 rounded-[2rem] flex items-center justify-center gap-3 text-outline hover:border-[#00A884]/30 hover:bg-white hover:text-[#00A884] transition-all group"
              >
                <Plus size={20} className="group-hover:rotate-90 transition-transform" />
                <span className="font-manrope font-black text-[11px] uppercase tracking-[0.15em]">Добавить условие</span>
              </button>
            </div>
          </div>

          <div className="flex justify-center -my-3 relative z-10">
             <div className="w-10 h-10 bg-white border border-surface-container rounded-full flex items-center justify-center text-outline shadow-lg shadow-black/5">
                <ArrowDown size={18} />
             </div>
          </div>

          {/* THEN SECTION */}
          <div className="relative pt-6">
            <div className="flex items-center gap-4 px-4 mb-5">
               <div className="w-12 h-12 bg-[#00A884] text-white rounded-2xl flex items-center justify-center font-black text-xs shadow-lg shadow-[#00A884]/20">ТОГДА</div>
               <div className="h-[2px] bg-[#00A884]/12 flex-1 rounded-full"></div>
            </div>

            <div className="space-y-4">
              {builderThens.map((item) => {
                const Icon = IconMap[item.iconName] || Info;
                return (
                  <motion.div 
                    layout
                    key={item.id} 
                    onClick={() => setConfiguringItem({ id: item.id, type: 'then' })}
                    className="bg-white p-6 rounded-[2rem] border border-surface-container shadow-[0_4px_12px_rgba(0,0,0,0.03)] flex items-center justify-between group cursor-pointer hover:border-[#00A884]/40 transition-all"
                  >
                    <div className="flex items-center gap-5">
                       <div className="w-12 h-12 bg-[#00A884]/10 text-[#00A884] rounded-2xl flex items-center justify-center">
                         <Icon size={24} />
                       </div>
                       <div>
                         <h4 className="font-manrope font-black text-base text-on-surface leading-tight">{item.label}</h4>
                         <p className="text-[10px] uppercase font-extrabold text-outline tracking-widest mt-1.5">{item.value}</p>
                       </div>
                    </div>
                    <button 
                      onClick={(e) => { e.stopPropagation(); removeThen(item.id); }} 
                      className="w-10 h-10 rounded-full flex items-center justify-center text-outline hover:bg-red-50 hover:text-red-500 transition-all"
                    >
                      <X size={20} />
                    </button>
                  </motion.div>
                );
              })}
              
              <button 
                onClick={() => setPickerModal('then')}
                className="w-full bg-[#00A884]/5 border-2 border-dashed border-[#00A884]/20 p-6 rounded-[2rem] flex items-center justify-center gap-3 text-[#00A884] hover:bg-[#00A884]/10 transition-all group"
              >
                <Plus size={20} className="group-hover:rotate-90 transition-transform" strokeWidth={3} />
                <span className="font-manrope font-black text-[11px] uppercase tracking-[0.15em]">Добавить действие</span>
              </button>
            </div>
          </div>
        </section>

        <button 
          onClick={saveScenario}
          className="w-full bg-on-surface text-surface py-7 rounded-[2.5rem] font-manrope font-black text-xl shadow-2xl active:scale-[0.98] transition-all hover:bg-[#00A884]"
        >
          Сохранить сценарий
        </button>

        {/* Action Picker Modal */}
        <AnimatePresence>
          {pickerModal && (
            <div className="fixed inset-0 z-50 flex items-end justify-center">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setPickerModal(null)}
                className="absolute inset-0 bg-on-surface/40 backdrop-blur-sm"
              />
              <motion.div 
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ y: '100%' }}
                className="relative w-full bg-surface rounded-t-[3rem] p-8 space-y-8 shadow-[0_-20px_40px_rgba(0,0,0,0.1)] max-h-[80vh] overflow-y-auto"
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-2xl font-manrope font-black">{pickerModal === 'if' ? 'Выберите условие' : 'Выберите действие'}</h3>
                  <button onClick={() => setPickerModal(null)} className="p-2"><X /></button>
                </div>
                <div className="grid grid-cols-2 gap-4 pb-10">
                  {(pickerModal === 'if' ? IF_OPTIONS : THEN_OPTIONS).map(opt => {
                    const Icon = IconMap[opt.iconName] || Info;
                    return (
                      <button 
                        key={opt.type}
                        onClick={() => pickerModal === 'if' ? addIf(opt) : addThen(opt)}
                        className="bg-surface-container-low p-6 rounded-[2rem] flex flex-col items-center gap-4 hover:bg-primary/10 hover:text-primary transition-all border border-transparent hover:border-primary/20 group"
                      >
                         <div className="w-14 h-14 bg-surface rounded-2xl flex items-center justify-center text-outline group-hover:text-primary shadow-sm transition-transform group-hover:scale-110">
                           <Icon size={28} />
                         </div>
                         <div className="text-center">
                            <span className="font-manrope font-black text-sm block leading-tight">{opt.label}</span>
                         </div>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Configuring Item Modal */}
        <AnimatePresence>
          {configuringItem && (
            <div className="fixed inset-0 z-50 flex items-end justify-center">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setConfiguringItem(null)}
                className="absolute inset-0 bg-on-surface/60 backdrop-blur-md"
              />
              <motion.div 
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ y: '100%' }}
                className="relative w-full bg-surface rounded-t-[3rem] p-8 space-y-8 shadow-2xl max-h-[90vh] overflow-y-auto"
              >
                <div className="flex justify-between items-center border-b border-surface-container pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 text-primary rounded-xl flex items-center justify-center">
                      <Settings size={20} />
                    </div>
                    <h3 className="text-xl font-manrope font-black">Настройка</h3>
                  </div>
                  <button onClick={() => setConfiguringItem(null)} className="p-2 bg-surface-container-low rounded-full"><X size={20} /></button>
                </div>

                {(() => {
                  const item = configuringItem.type === 'if' 
                    ? builderIfs.find(i => i.id === configuringItem.id) 
                    : builderThens.find(t => t.id === configuringItem.id);
                  
                  if (!item) return null;

                  if (item.type === 'time') {
                    return (
                      <div className="space-y-8">
                        <div className="space-y-4">
                           <p className="text-sm font-manrope font-bold opacity-60 text-center">Выберите временной интервал</p>
                           <div className="flex items-center bg-surface-container-low p-2 rounded-[2rem]">
                              {['after', 'before', 'between'].map(t => (
                                <button
                                  key={t}
                                  onClick={() => setTimeRange(prev => ({ ...prev, type: t }))}
                                  className={`flex-1 py-3 px-4 rounded-[1.5rem] text-[10px] uppercase font-black tracking-widest transition-all ${timeRange.type === t ? 'bg-white shadow-sm text-[#00A884]' : 'text-outline/60'}`}
                                >
                                  {t === 'after' ? 'Позже' : t === 'before' ? 'Раньше' : 'Диапазон'}
                                </button>
                              ))}
                           </div>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                           <div className="space-y-3">
                              <label className="text-[9px] uppercase font-black text-outline tracking-widest px-4 block">Начало</label>
                              <input 
                                type="time" 
                                value={timeRange.start}
                                onChange={(e) => setTimeRange(prev => ({ ...prev, start: e.target.value }))}
                                className="w-full bg-surface-container-low p-5 rounded-2xl font-black text-lg text-center focus:bg-white border-2 border-transparent focus:border-[#00A884]/20 outline-none transition-all"
                              />
                           </div>
                           {timeRange.type === 'between' && (
                             <div className="space-y-3">
                                <label className="text-[9px] uppercase font-black text-outline tracking-widest px-4 block">Конец</label>
                                <input 
                                  type="time" 
                                  value={timeRange.end}
                                  onChange={(e) => setTimeRange(prev => ({ ...prev, end: e.target.value }))}
                                  className="w-full bg-surface-container-low p-5 rounded-2xl font-black text-lg text-center focus:bg-white border-2 border-transparent focus:border-[#00A884]/20 outline-none transition-all"
                                />
                             </div>
                           )}
                        </div>

                        <button 
                          onClick={() => {
                            const val = timeRange.type === 'after' ? `Позже ${timeRange.start}` : timeRange.type === 'before' ? `Раньше ${timeRange.start}` : `${timeRange.start} – ${timeRange.end}`;
                            updateItemConfig(item.id, configuringItem.type, { value: val });
                            setConfiguringItem(null);
                          }}
                          className="w-full py-5 bg-[#00A884] text-white rounded-[1.75rem] font-black uppercase tracking-widest text-xs shadow-lg shadow-[#00A884]/20 active:scale-95 transition-all"
                        >
                          Сохранить время
                        </button>
                      </div>
                    );
                  }

                  if (item.type === 'motion') {
                    return (
                      <div className="space-y-6">
                        <p className="text-sm font-manrope font-bold opacity-60">Выберите датчик в комнате</p>
                        <div className="grid grid-cols-2 gap-3">
                          {['Коридор', 'Гостиная', 'Кухня', 'Ванная', 'Спальня'].map(room => (
                            <button 
                              key={room} 
                              onClick={() => {
                                updateItemConfig(item.id, configuringItem.type, { value: `Движение: ${room}` });
                                setConfiguringItem(null);
                              }}
                              className="p-5 bg-surface-container-low rounded-[1.5rem] font-bold text-sm text-left hover:bg-[#00A884]/10 hover:border-[#00A884]/20 border-2 border-transparent transition-all"
                            >
                              {room}
                            </button>
                          ))}
                        </div>
                      </div>
                    );
                  }

                  if (item.type === 'temp') {
                    return (
                      <div className="space-y-6">
                        <p className="text-sm font-manrope font-bold opacity-60">
                          {configuringItem.type === 'if' ? 'Укажите порог температуры' : 'Укажите целевую температуру'}
                        </p>
                        <div className="flex items-center justify-center gap-8 py-4">
                           <button className="w-12 h-12 bg-surface-container-low rounded-full flex items-center justify-center text-xl font-black">-</button>
                           <span className="text-5xl font-manrope font-black">22°C</span>
                           <button className="w-12 h-12 bg-surface-container-low rounded-full flex items-center justify-center text-xl font-black">+</button>
                        </div>
                        <button 
                          onClick={() => {
                            updateItemConfig(item.id, configuringItem.type, { value: configuringItem.type === 'if' ? '> 22°C' : 'Установить 22°C' });
                            setConfiguringItem(null);
                          }}
                          className="w-full py-5 bg-[#00A884] text-white rounded-[1.75rem] font-black uppercase tracking-widest text-xs shadow-lg shadow-[#00A884]/20 active:scale-95 transition-all"
                        >
                          Подтвердить
                        </button>
                      </div>
                    );
                  }

                  if (item.type === 'light') {
                    return (
                      <div className="space-y-6">
                        <p className="text-sm font-manrope font-bold opacity-60">Действие со светом</p>
                        <div className="grid grid-cols-1 gap-3">
                          {['Включить в ванной', 'Выключить в ванной', 'Включить в гостиной', 'Выключить везде'].map(action => (
                            <button 
                              key={action} 
                              onClick={() => {
                                updateItemConfig(item.id, configuringItem.type, { value: action });
                                setConfiguringItem(null);
                              }}
                              className="p-5 bg-surface-container-low rounded-[1.5rem] font-bold text-sm text-left hover:bg-[#00A884]/10 transition-all border-2 border-transparent"
                            >
                              {action}
                            </button>
                          ))}
                        </div>
                      </div>
                    );
                  }

                  return (
                    <div className="p-10 text-center space-y-4">
                       <Check size={48} className="mx-auto text-primary" />
                       <p className="font-manrope font-black text-lg">Параметр выбран</p>
                       <button 
                         onClick={() => setConfiguringItem(null)}
                         className="w-full bg-on-surface text-surface py-4 rounded-xl font-black uppercase tracking-widest text-xs"
                       >
                         Готово
                       </button>
                    </div>
                  );
                })()}

                <div className="pt-4">
                   <button 
                     onClick={() => setConfiguringItem(null)}
                     className="w-full bg-primary text-on-primary py-5 rounded-[2rem] font-manrope font-black text-lg shadow-xl"
                   >
                     Сохранить выбор
                   </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-surface">
      
      <div id="root" className="relative max-w-md mx-auto min-h-screen bg-white flex flex-col">
        
        <main className="flex-1 overflow-y-auto scrollable-content px-4">
          <div className="pt-4">
            {currentScreen === 'home' && renderHome()}
            {currentScreen === 'room' && renderRoom()}
            {currentScreen === 'lightControl' && renderLightControl()}
            {currentScreen === 'addDevice' && renderAddDevice()}
            {currentScreen === 'notifications' && renderNotifications()}
            {currentScreen === 'explanation' && renderExplanation()}
            {currentScreen === 'settings' && renderSettings()}
            {currentScreen === 'myAutomations' && renderMyAutomations()}
            {currentScreen === 'myDevices' && renderMyDevices()}
            {currentScreen === 'automationBuilder' && renderAutomationBuilder()}
            {currentScreen === 'connectionFlow' && (
              <ConnectionFlow 
                onBack={goBack} 
                onFinish={() => {
                  const newSpeaker: Device = {
                    id: Math.random().toString(36).substr(2, 9),
                    name: 'Aura Speaker',
                    room: 'Гостиная',
                    type: 'speaker',
                    status: 'on',
                    value: 65
                  };
                  setDevices(prev => [...prev, newSpeaker]);
                  navigate('settings');
                  setTimeout(() => navigate('home'), 100);
                }} 
              />
            )}
          </div>
          
          <div className="h-32" />
        </main>

        {currentScreen !== 'connectionFlow' && (
          <nav className="absolute bottom-0 left-0 w-full glass-panel pt-4 pb-8 px-8 border-t border-surface-container flex justify-around items-center z-40 rounded-t-[3rem] shadow-2xl">
            <button 
              onClick={() => navigate('home')}
              className={`flex flex-col items-center gap-1 transition-all ${currentScreen === 'home' || currentScreen === 'room' || currentScreen === 'lightControl' ? 'text-primary' : 'text-on-surface-variant/40'}`}
            >
              <Home fill={currentScreen === 'home' ? 'currentColor' : 'none'} />
              <span className="text-[10px] font-bold uppercase tracking-widest">Дом</span>
            </button>
            <button 
              onClick={() => navigate('notifications')}
              className={`flex flex-col items-center gap-1 transition-all ${currentScreen === 'notifications' ? 'text-primary' : 'text-on-surface-variant/40'}`}
            >
              <Bell fill={currentScreen === 'notifications' ? 'currentColor' : 'none'} />
              <span className="text-[10px] font-bold uppercase tracking-widest">Уведомления</span>
            </button>
            <button 
              onClick={() => navigate('settings')}
              className={`flex flex-col items-center gap-1 transition-all ${currentScreen === 'settings' || currentScreen === 'myAutomations' || currentScreen === 'myDevices' ? 'text-primary' : 'text-on-surface-variant/40'}`}
            >
              <Settings fill={currentScreen === 'settings' ? 'currentColor' : 'none'} />
              <span className="text-[10px] font-bold uppercase tracking-widest">Настройки</span>
            </button>
          </nav>
        )}

        <AnimatePresence>
          {showAwayTimer && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-50 bg-[#1a1c1b]/95 backdrop-blur-xl flex flex-col items-center justify-center p-8 text-center text-white"
            >
              <motion.div 
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className="space-y-12"
              >
                <h2 className="text-4xl font-manrope font-black leading-tight">Активация режима<br/>«Я ушел»</h2>
                <div className="relative flex items-center justify-center">
                  <svg className="w-48 h-48 -rotate-90">
                    <circle cx="94" cy="94" r="80" fill="none" stroke="currentColor" strokeWidth="4" className="opacity-10" />
                    <motion.circle 
                       cx="94" cy="94" r="80" fill="none" stroke="#2e7d32" strokeWidth="8" strokeDasharray="503"
                       animate={{ strokeDashoffset: 503 - (503 * awayTimeLeft) / 10 }}
                    />
                  </svg>
                  <div className="absolute text-7xl font-manrope font-black">{awayTimeLeft}</div>
                </div>
                <p className="text-white/70 max-w-[240px] mx-auto text-sm">Система выключит все устройства и активирует защиту.</p>
                <button onClick={cancelAwayMode} className="bg-white text-black px-12 py-5 rounded-full font-manrope font-black text-lg">Отменить</button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
