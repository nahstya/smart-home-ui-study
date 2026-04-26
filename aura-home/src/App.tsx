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
  { id: '3', name: 'Термостат', room: 'Спальня', type: 'temp', status: 'on', value: 22 },
  { id: '4', name: 'Увлажнитель', room: 'Детская', type: 'temp', status: 'off', value: 45 },
  { id: '5', name: 'Кофемашина', room: 'Кухня', type: 'light', status: 'off' },
  { id: '6', name: 'Очиститель', room: 'Гостиная', type: 'temp', status: 'on', value: 12 }
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
      return () => clearInterval(timer);
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
        <button onClick={onBack} className="p-2 rounded-full hover:bg-[#f0f4f2] transition-colors"><ArrowLeft className="text-[#006d4c]" /></button>
        <h2 className="font-manrope font-black text-2xl text-[#1a1c1b]">Подключение Aura</h2>
      </header>

      <section className="text-center py-6">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-24 h-24 bg-[#006d4c]/10 rounded-3xl flex items-center justify-center mx-auto mb-4 text-[#006d4c]"
          >
            <Speaker size={48} />
          </motion.div>
          <h2 className="text-xl font-manrope font-bold text-[#1a1c1b]">Aura Smart Speaker</h2>
          <p className="mt-1 text-sm opacity-60 text-[#006d4c]/60">Умный дом • Музыка • Голосовой помощник</p>
      </section>

      <div className="space-y-6 flex-1 overflow-y-auto pb-6 scrollbar-hide">
        <div className="space-y-4">
          <h3 className="text-[10px] uppercase font-black tracking-widest text-[#006d4c]/40 px-2">Обязательные разрешения</h3>
          <div className="space-y-3">
             <div 
               onClick={() => togglePermission('bluetooth')}
               className="bg-white p-5 rounded-[2rem] border border-[#006d4c]/5 flex items-center justify-between cursor-pointer group hover:border-[#006d4c]/20 transition-colors shadow-sm"
             >
                <div className="flex items-center gap-4">
                   <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${permissions.bluetooth ? 'bg-[#006d4c]/10 text-[#006d4c]' : 'bg-[#f0f4f2] text-[#006d4c]/30'}`}>
                      <Bluetooth size={24} />
                   </div>
                   <div>
                      <h4 className="font-bold text-[#1a1c1b]">Bluetooth</h4>
                      <p className="text-[10px] text-[#006d4c]/60">Для поиска устройств поблизости</p>
                   </div>
                </div>
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${permissions.bluetooth ? 'bg-[#006d4c] border-[#006d4c] animate-scale-in' : 'border-[#006d4c]/20'}`}>
                   {permissions.bluetooth && <Check size={14} className="text-white" />}
                </div>
             </div>

             <div 
               onClick={() => togglePermission('network')}
               className="bg-white p-5 rounded-[2rem] border border-[#006d4c]/5 flex items-center justify-between cursor-pointer group hover:border-[#006d4c]/20 transition-colors shadow-sm"
             >
                <div className="flex items-center gap-4">
                   <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${permissions.network ? 'bg-[#006d4c]/10 text-[#006d4c]' : 'bg-[#f0f4f2] text-[#006d4c]/30'}`}>
                      <Network size={24} />
                   </div>
                   <div>
                      <h4 className="font-bold text-[#1a1c1b]">Локальная сеть</h4>
                      <p className="text-[10px] text-[#006d4c]/60">Для первичной настройки</p>
                   </div>
                </div>
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${permissions.network ? 'bg-[#006d4c] border-[#006d4c] animate-scale-in' : 'border-[#006d4c]/20'}`}>
                   {permissions.network && <Check size={14} className="text-white" />}
                </div>
             </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-[10px] uppercase font-black tracking-widest text-[#006d4c]/40 px-2">Дополнительно</h3>
          <div className="space-y-3">
             <div 
               onClick={() => togglePermission('mic')}
               className="bg-white p-5 rounded-[2rem] border border-[#006d4c]/5 flex items-center justify-between cursor-pointer group hover:border-[#006d4c]/20 transition-colors shadow-sm"
             >
                <div className="flex items-center gap-4">
                   <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${permissions.mic ? 'bg-[#006d4c]/10 text-[#006d4c]' : 'bg-[#f0f4f2] text-[#006d4c]/30'}`}>
                      <Mic size={24} />
                   </div>
                   <div>
                      <h4 className="font-bold text-[#1a1c1b]">Микрофон</h4>
                      <p className="text-[10px] text-[#006d4c]/60">Для голосовых команд</p>
                   </div>
                </div>
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${permissions.mic ? 'bg-[#006d4c] border-[#006d4c] animate-scale-in' : 'border-[#006d4c]/20'}`}>
                   {permissions.mic && <Check size={14} className="text-white" />}
                </div>
             </div>

             <div 
               onClick={() => togglePermission('music')}
               className="bg-white p-5 rounded-[2rem] border border-[#006d4c]/5 flex items-center justify-between cursor-pointer group hover:border-[#006d4c]/20 transition-colors shadow-sm"
             >
                <div className="flex items-center gap-4">
                   <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${permissions.music ? 'bg-[#006d4c]/10 text-[#006d4c]' : 'bg-[#f0f4f2] text-[#006d4c]/30'}`}>
                      <Music size={24} />
                   </div>
                   <div>
                      <h4 className="font-bold text-[#1a1c1b]">Музыка</h4>
                      <p className="text-[10px] text-[#006d4c]/60">Доступ к вашей библиотеке</p>
                   </div>
                </div>
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${permissions.music ? 'bg-[#006d4c] border-[#006d4c] animate-scale-in' : 'border-[#006d4c]/20'}`}>
                   {permissions.music && <Check size={14} className="text-white" />}
                </div>
             </div>
          </div>
        </div>

        <button className="flex items-center justify-center gap-2 text-[#006d4c] font-black text-[10px] uppercase tracking-widest mt-4">
          <FileText size={16} /> Полные правила соглашения
        </button>
      </div>

      <button 
        disabled={!isMandatoryFilled}
        onClick={() => setStep(2)}
        className={`w-full py-6 rounded-[2rem] font-manrope font-black text-lg shadow-2xl transition-all ${isMandatoryFilled ? 'bg-[#1a1c1b] text-white active:scale-[0.98] hover:bg-[#006d4c]' : 'bg-[#f0f4f2] text-[#006d4c]/30 cursor-not-allowed'}`}
      >
        Продолжить настройку
      </button>
    </div>
  );

  if (step === 2) return (
    <div className="flex flex-col items-center justify-center space-y-12 h-full py-20 px-4 text-center">
        <div className="space-y-4">
          <h2 className="text-4xl font-manrope font-black tracking-tight text-[#1a1c1b]">Поиск Aura</h2>
          <p className="text-[#006d4c]/60 font-medium text-lg">Пожалуйста, подождите...</p>
        </div>
        <div className="relative w-64 h-64 flex items-center justify-center">
          <motion.div 
            animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.1, 0.3] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-44 h-44 rounded-full bg-[#006d4c]/20 absolute m-auto"
          />
          <motion.div 
            animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0.2, 0.5] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-32 h-32 rounded-full bg-[#006d4c]/30 absolute m-auto"
          />
          <div className="w-40 h-40 rounded-[3rem] bg-white shadow-2xl flex items-center justify-center relative z-10 border border-[#006d4c]/5">
            <Speaker size={80} className="text-[#006d4c]" />
          </div>
        </div>
        <div className="bg-[#f0f4f2] px-8 py-4 rounded-full flex items-center gap-4">
          <div className="flex gap-1">
             <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1, delay: 0 }} className="w-1.5 h-1.5 bg-[#006d4c] rounded-full" />
             <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-1.5 h-1.5 bg-[#006d4c] rounded-full" />
             <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-1.5 h-1.5 bg-[#006d4c] rounded-full" />
          </div>
          <span className="text-[10px] font-black uppercase tracking-widest text-[#006d4c]/60">Сканирование сети</span>
        </div>
    </div>
  );

  if (step === 3) return (
    <div className="flex flex-col items-center justify-center h-full space-y-12 px-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-manrope font-black tracking-tight text-[#1a1c1b]">Создание пары...</h2>
        <p className="text-[#006d4c]/60 text-sm font-medium">Безопасное соединение</p>
      </div>
      <div className="w-full max-w-[280px] bg-[#f0f4f2] rounded-full h-4 overflow-hidden border border-[#006d4c]/5 shadow-inner">
        <motion.div 
          className="h-full bg-[#006d4c] shadow-[0_0_20px_rgba(0,109,76,0.6)]"
          initial={{ width: 0 }}
          animate={{ width: `${connectPercent}%` }}
        />
      </div>
      <div className="bg-[#006d4c]/10 px-6 py-2 rounded-2xl">
        <p className="text-[#006d4c] font-black text-2xl tracking-tighter">{connectPercent}%</p>
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
            className="absolute -right-4 -top-4 w-16 h-16 bg-[#006d4c] text-white rounded-2xl flex items-center justify-center shadow-lg transform rotate-12"
          >
            <Sparkles />
          </motion.div>
        </div>
        
        <div className="space-y-4 px-2">
          <h2 className="text-5xl font-manrope font-black tracking-tight text-[#1a1c1b]">Ура!</h2>
          <p className="text-[#006d4c]/60 font-medium leading-relaxed max-w-[300px] mx-auto text-lg opacity-80">
             Ваша акустическая система <span className="text-[#006d4c] font-black">Aura Smart</span> успешно добавлена в гостиную.
          </p>
        </div>

        <div className="w-full bg-white/50 p-6 rounded-[2.5rem] border border-[#006d4c]/5 flex items-center gap-6 shadow-sm">
           <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-[#006d4c] shadow-sm border border-[#006d4c]/10">
             <Speaker size={32} />
           </div>
           <div className="text-left flex-1 min-w-0">
             <h4 className="font-manrope font-black text-lg text-[#1a1c1b] truncate">Aura Speaker</h4>
             <p className="text-[10px] uppercase font-extrabold tracking-widest text-[#006d4c]/60">Гостиная • Онлайн</p>
           </div>
           <div className="bg-green-500 text-white p-2 rounded-full shadow-lg shrink-0">
             <CheckCircle2 size={24} />
           </div>
        </div>

        <button 
          onClick={onFinish}
          className="w-full bg-[#1a1c1b] text-white py-6 rounded-[2rem] font-manrope font-black text-lg shadow-2xl active:scale-[0.98] transition-all hover:bg-[#006d4c]"
        >
          Готово
        </button>
     </div>
  );
}

const BottomNav = ({ active, onChange }: { active: Screen, onChange: (s: Screen) => void }) => (
  <nav className="absolute bottom-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-t border-[#006d4c]/5 px-8 py-6 flex justify-between items-center z-40">
    <button onClick={() => onChange('home')} className={`p-2 transition-all ${active === 'home' ? 'text-[#006d4c] scale-110' : 'text-[#006d4c]/30 hover:text-[#006d4c]/50'}`}>
      <Home strokeWidth={active === 'home' ? 2.5 : 2} />
    </button>
    <button onClick={() => onChange('notifications')} className={`p-2 transition-all relative ${active === 'notifications' ? 'text-[#006d4c] scale-110' : 'text-[#006d4c]/30 hover:text-[#006d4c]/50'}`}>
      <Bell strokeWidth={active === 'notifications' ? 2.5 : 2} />
      <span className="absolute top-2 right-2 w-2 h-2 bg-orange-500 rounded-full border-2 border-white" />
    </button>
    <button onClick={() => onChange('settings')} className={`p-2 transition-all ${active === 'settings' ? 'text-[#006d4c] scale-110' : 'text-[#006d4c]/30 hover:text-[#006d4c]/50'}`}>
      <Settings strokeWidth={active === 'settings' ? 2.5 : 2} />
    </button>
  </nav>
);

const DeviceCard = ({ device }: { device: Device }) => (
  <motion.div 
    whileHover={{ y: -4 }}
    whileTap={{ scale: 0.98 }}
    className="bg-white p-5 rounded-[32px] shadow-sm border border-[#006d4c]/5 flex flex-col justify-between h-44 relative overflow-hidden group cursor-pointer"
    onClick={() => {
      if (device.type === 'light') {
        // Handle light control navigation
        console.log('Navigate to light control');
      }
    }}
  >
    <div className="flex justify-between items-start z-10">
      <div className={`p-3 rounded-2xl ${device.status === 'on' || device.status === 'unlocked' ? 'bg-[#006d4c] text-white' : 'bg-[#f0f4f2] text-[#006d4c]'}`}>
        {device.type === 'light' ? <Lightbulb size={22} /> : device.type === 'lock' ? <Lock size={22} /> : <Thermometer size={22} />}
      </div>
      <div className={`w-10 h-6 rounded-full p-1 transition-colors ${device.status === 'on' || device.status === 'unlocked' ? 'bg-[#006d4c]' : 'bg-[#e0e7e4]'}`}>
        <div className={`w-4 h-4 bg-white rounded-full transition-transform ${device.status === 'on' || device.status === 'unlocked' ? 'translate-x-4' : 'translate-x-0'}`} />
      </div>
    </div>
    
    <div className="z-10">
      <p className="text-[#006d4c]/40 text-xs font-bold uppercase tracking-widest mb-1">{device.room}</p>
      <h3 className="text-[#1a1c1b] font-bold text-lg">{device.name}</h3>
      {device.value && (
        <p className="text-[#006d4c] font-black text-sm mt-1">
          {device.type === 'temp' ? `${device.value}°C` : `${device.value}%`}
        </p>
      )}
    </div>

    <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-[#006d4c]/2 rounded-full blur-2xl group-hover:bg-[#006d4c]/5 transition-colors" />
  </motion.div>
);

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
    { type: 'door', label: 'Дверь', value: 'Состояние', iconName: 'Lock' },
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
      <div className="space-y-8">
        <div className="flex justify-between items-end mb-2">
          <div>
            <h2 className="text-[#1a1c1b] text-3xl font-black tracking-tight leading-none mb-2">Мой дом</h2>
            <p className="text-[#006d4c]/50 font-medium">{roomsCount} комнаты, {getDeviceLabel(totalDevices)}</p>
          </div>
          <button 
            onClick={toggleAwayMode}
            className={`px-5 py-3 rounded-full font-manrope font-black text-xs uppercase tracking-widest transition-all border shadow-sm ${isAwayMode ? 'bg-[#006d4c] text-white border-[#006d4c] shadow-[#006d4c]/20' : 'bg-white text-[#1a1c1b] border-[#006d4c]/10 hover:bg-[#f0f4f2]'}`}
          >
            <div className="flex items-center gap-2">
              <Moon size={14} fill={isAwayMode ? 'currentColor' : 'none'} />
              {isAwayMode ? 'Я дома' : 'Я ушел'}
            </div>
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {devices.map(device => (
            <DeviceCard key={device.id} device={device} />
          ))}
        </div>

        <div className="bg-white rounded-[40px] border border-[#006d4c]/5 overflow-hidden">
          <div className="flex justify-between items-center p-6 border-b border-[#006d4c]/5">
            <h3 className="text-[#1a1c1b] font-black text-xl">Автоматизации</h3>
            <button onClick={() => navigate('myAutomations')}><ChevronRight className="text-[#006d4c]/30" /></button>
          </div>
          <div className="p-6 space-y-4">
            {automations.map(auto => (
              <div key={auto.id} className="flex items-center justify-between p-4 rounded-3xl bg-[#f8faf9] hover:bg-[#f0f4f2] transition-colors cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-[#006d4c] shadow-sm">
                    <Sparkles size={20} />
                  </div>
                  <div>
                    <p className="font-bold text-[#1a1c1b]">{auto.name}</p>
                    <p className="text-xs text-[#006d4c]/40 font-bold uppercase tracking-wider">активен</p>
                  </div>
                </div>
                <button 
                  onClick={() => toggleAutomation(auto.id)}
                  className={`w-10 h-6 rounded-full p-1 transition-colors ${auto.isActive ? 'bg-[#006d4c]' : 'bg-[#e0e7e4]'}`}
                >
                  <div className={`w-4 h-4 bg-white rounded-full transition-transform ${auto.isActive ? 'translate-x-4' : 'translate-x-0'}`} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderNotifications = () => {
    const featuredNotif = notifications.find(n => n.type === 'info');
    const listNotifs = notifications.filter(n => n.id !== featuredNotif?.id);

    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-[#1a1c1b] text-3xl font-black">Уведомления</h2>
          <button onClick={goBack} className="p-2 rounded-full hover:bg-[#f0f4f2] transition-colors"><X className="text-[#006d4c]/60" /></button>
        </div>

        {featuredNotif && (
          <div className="bg-white p-7 rounded-[2.5rem] border border-[#006d4c]/5 shadow-sm space-y-5">
            <div className="flex items-center justify-between">
               <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#006d4c]/10 text-[#006d4c] rounded-full flex items-center justify-center shrink-0">
                    <Info size={20} />
                  </div>
                  <div>
                    <h3 className="font-manrope font-black text-base flex items-center gap-1.5 text-[#1a1c1b]">
                       Автоматическое действие
                       <Clock size={12} className="text-[#006d4c]/40" />
                    </h3>
                    <p className="text-[9px] text-[#006d4c]/40 font-extrabold uppercase tracking-widest">{featuredNotif.timestamp}</p>
                  </div>
               </div>
            </div>
            
            <p className="text-sm text-[#006d4c]/60 font-medium leading-relaxed">
               <span className="font-black text-[#1a1c1b]">{featuredNotif.message.split('был')[0]}</span>
               был {featuredNotif.message.split('был')[1]}
            </p>

            {featuredNotif.reason && (
              <div className="bg-[#006d4c]/5 px-4 py-1.5 rounded-full flex items-center self-start gap-2 text-[9px] uppercase font-black tracking-widest text-[#006d4c]">
                <span className="text-[#006d4c]/40">Причина:</span> {featuredNotif.reason}
              </div>
            )}

            <div className="flex items-center gap-3 pt-1">
               <button 
                 onClick={() => featuredNotif.automationId ? (setSelectedAutomation(automations.find(a => a.id === featuredNotif.automationId)!), navigate('explanation')) : null}
                 className="flex-1 bg-[#006d4c] text-white py-3.5 rounded-full font-manrope font-extrabold text-[11px] uppercase tracking-widest shadow-lg shadow-[#006d4c]/20 active:scale-[0.98] transition-all"
               >
                 Почему это произошло?
               </button>
               <button onClick={goBack} className="px-6 py-3.5 rounded-full border border-[#006d4c]/10 font-manrope font-extrabold text-[11px] uppercase tracking-widest active:scale-[0.98] transition-all text-[#006d4c]/60">
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
                className="bg-white p-5 rounded-[2rem] border border-[#006d4c]/5 shadow-sm"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#f0f4f2] flex items-center justify-center shrink-0">
                    <Icon size={20} className="text-[#006d4c]/60" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center mb-0.5">
                      <h3 className="font-manrope font-black text-sm text-[#1a1c1b] leading-tight">{notif.title}</h3>
                      <span className="text-[9px] text-[#006d4c]/40 font-black uppercase tracking-widest leading-none">{notif.timestamp}</span>
                    </div>
                    <p className="text-[11px] text-[#006d4c]/60 leading-relaxed font-medium truncate">{notif.message}</p>
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
        <header className="pt-4 pb-4 flex items-center justify-between">
           <div className="flex items-center gap-4">
             <button onClick={goBack} className="p-2 rounded-full hover:bg-[#f0f4f2] transition-colors"><ArrowLeft className="text-[#006d4c]" /></button>
             <h1 className="font-manrope font-black text-xl text-[#006d4c]">Умный дом</h1>
           </div>
           <button className="p-2 text-[#1a1c1b] opacity-70"><Info size={24} /></button>
        </header>

        <div className="space-y-2">
           <h2 className="text-3xl font-manrope font-black tracking-tight text-[#1a1c1b]">Почему это произошло?</h2>
           <p className="text-sm text-[#006d4c]/60 font-medium leading-relaxed max-w-[280px]">
             Понимание автоматических действий в вашем доме
           </p>
        </div>

        <div className="space-y-4 pt-4">
           <div className="bg-white p-6 rounded-[2.5rem] border border-[#006d4c]/5 shadow-sm flex items-center gap-6">
              <div className="w-14 h-14 bg-[#E8F5E9] text-[#2E7D32] rounded-2xl flex items-center justify-center shrink-0">
                <CheckCircle2 size={24} fill="currentColor" className="text-white fill-[#2E7D32]" />
              </div>
              <div>
                <p className="text-[10px] uppercase font-black text-[#006d4c]/40 tracking-[0.2em] mb-1">ЧТО ПРОИЗОШЛО</p>
                <p className="text-sm font-manrope font-bold text-[#1a1c1b] leading-snug">
                  Свет в гостиной был включен автоматически в 18:00
                </p>
              </div>
           </div>

           <div className="bg-white p-6 rounded-[2.5rem] border border-[#006d4c]/5 shadow-sm flex items-center gap-6">
              <div className="w-14 h-14 bg-[#FFF3E0] text-[#EF6C00] rounded-2xl flex items-center justify-center shrink-0">
                <Clock size={24} className="fill-[#EF6C00] text-white" fill="currentColor" />
              </div>
              <div>
                <p className="text-[10px] uppercase font-black text-[#006d4c]/40 tracking-[0.2em] mb-1">ТРИГГЕР</p>
                <p className="text-sm font-manrope font-bold text-[#1a1c1b] leading-snug">
                  Автоматизация <span className="text-[#006d4c] font-black">{selectedAutomation.name}</span> активировалась в 18:00
                </p>
              </div>
           </div>

           <div className="bg-white p-6 rounded-[2.5rem] border border-[#006d4c]/5 shadow-sm flex items-center gap-6">
              <div className="w-14 h-14 bg-[#E3F2FD] text-[#1565C0] rounded-2xl flex items-center justify-center shrink-0">
                <Calendar size={24} className="fill-[#1565C0] text-white" fill="currentColor" />
              </div>
              <div>
                <p className="text-[10px] uppercase font-black text-[#006d4c]/40 tracking-[0.2em] mb-1">КОГДА ЭТО ПРОИСХОДИТ</p>
                <p className="text-sm font-manrope font-bold text-[#006d4c]/60 leading-relaxed">
                  {selectedAutomation.explanation}
                </p>
              </div>
           </div>
        </div>

        <div className="bg-[#F8F9F9] p-10 rounded-[3rem] text-center space-y-6 mt-4">
           <p className="text-xs text-[#006d4c]/60 font-medium leading-relaxed max-w-[240px] mx-auto">
             Вы можете изменить настройки или отключить этот сценарий в любое время.
           </p>
           <button 
             onClick={() => navigate('myAutomations')}
             className="flex items-center gap-2 text-[#006d4c] font-manrope font-black text-sm uppercase tracking-widest mx-auto hover:gap-4 transition-all"
           >
             Перейти к настройкам <ChevronRight size={18} />
           </button>
        </div>
      </div>
    );
  };

  const renderSettings = () => (
    <div className="space-y-6">
      <h2 className="text-[#1a1c1b] text-3xl font-black mb-8">Настройки</h2>
      
      <div className="bg-white rounded-[40px] border border-[#006d4c]/5 overflow-hidden shadow-sm">
        <div className="p-6 flex items-center justify-between border-b border-[#006d4c]/5 cursor-pointer active:bg-[#f0f4f2] transition-colors group hover:bg-[#f8faf9]">
          <div className="flex items-center gap-5">
            <div className="w-12 h-12 bg-[#006d4c]/5 rounded-2xl flex items-center justify-center text-[#006d4c] group-hover:bg-[#006d4c] group-hover:text-white transition-all">
              <Crown size={22} />
            </div>
            <div>
              <p className="font-bold text-[#1a1c1b]">Премиум доступ</p>
              <p className="text-xs text-[#006d4c]/40 font-bold uppercase tracking-wider">Активен до 2027</p>
            </div>
          </div>
          <Star className="text-[#006d4c]/20" size={20} />
        </div>

        <button 
          onClick={() => navigate('myAutomations')}
          className="w-full p-6 flex items-center justify-between border-b border-[#006d4c]/5 cursor-pointer active:bg-[#f0f4f2] transition-colors group hover:bg-[#f8faf9] text-left"
        >
          <div className="flex items-center gap-5">
            <div className="w-12 h-12 bg-[#f0f4f2] rounded-2xl flex items-center justify-center text-[#006d4c]/40 group-hover:bg-[#006d4c]/5 group-hover:text-[#006d4c] transition-all">
              <Sparkles size={22} />
            </div>
            <div>
              <p className="font-bold text-[#1a1c1b]">Мои автоматизации</p>
              <p className="text-xs text-[#006d4c]/40 font-bold uppercase tracking-wider">{getAutomationLabel(automations.length)}</p>
            </div>
          </div>
          <ChevronRight className="text-[#006d4c]/20" />
        </button>

        <button 
          onClick={() => navigate('myDevices')}
          className="w-full p-6 flex items-center justify-between border-b border-[#006d4c]/5 cursor-pointer active:bg-[#f0f4f2] transition-colors group hover:bg-[#f8faf9] text-left"
        >
          <div className="flex items-center gap-5">
            <div className="w-12 h-12 bg-[#f0f4f2] rounded-2xl flex items-center justify-center text-[#006d4c]/40 group-hover:bg-[#006d4c]/5 group-hover:text-[#006d4c] transition-all">
              <Bolt size={22} />
            </div>
            <div>
              <p className="font-bold text-[#1a1c1b]">Мои устройства</p>
              <p className="text-xs text-[#006d4c]/40 font-bold uppercase tracking-wider">{getDeviceLabel(devices.length)} подключено</p>
            </div>
          </div>
          <ChevronRight className="text-[#006d4c]/20" />
        </button>

        {[
          { icon: <Clock />, label: 'Расписание', sub: 'Умный дом по графику' },
          { icon: <Network />, label: 'Сеть', sub: 'Wi-Fi, Bluetooth, Zigbee' },
          { icon: <Bell />, label: 'Звуки и пуши', sub: 'Настройка алертов' },
          { icon: <Info />, label: 'О системе', sub: 'Версия 2.4.0 (Stable)' }
        ].map((item, i) => (
          <div key={i} className="p-6 flex items-center justify-between border-b border-[#006d4c]/5 last:border-0 cursor-pointer active:bg-[#f0f4f2] transition-colors group hover:bg-[#f8faf9]">
            <div className="flex items-center gap-5">
              <div className="w-12 h-12 bg-[#f0f4f2] rounded-2xl flex items-center justify-center text-[#006d4c]/40 group-hover:bg-[#006d4c]/5 group-hover:text-[#006d4c] transition-all">
                {React.cloneElement(item.icon as React.ReactElement, { size: 22 })}
              </div>
              <div>
                <p className="font-bold text-[#1a1c1b]">{item.label}</p>
                <p className="text-xs text-[#006d4c]/40 font-bold uppercase tracking-wider">{item.sub}</p>
              </div>
            </div>
            <ChevronRight className="text-[#006d4c]/20" />
          </div>
        ))}
      </div>
      
      <button 
        onClick={toggleAwayMode}
        className="w-full bg-[#006d4c]/5 text-[#006d4c] py-6 rounded-[32px] font-black uppercase tracking-widest text-sm hover:bg-[#006d4c] hover:text-white transition-all shadow-sm"
      >
        {isAwayMode ? 'Выключить' : 'Включить'} режим «Я ушел»
      </button>
    </div>
  );

  const renderMyAutomations = () => (
    <div className="space-y-8 pb-10">
      <header className="pt-4 pb-4 flex items-center gap-4">
        <button onClick={goBack} className="p-2 rounded-full hover:bg-[#f0f4f2] transition-colors"><ArrowLeft className="text-[#006d4c]" /></button>
        <h1 className="font-manrope font-black text-2xl text-[#1a1c1b]">Мои автоматизации</h1>
      </header>
      
      <section className="space-y-6">
        {automations.map(auto => (
          <div key={auto.id} className="bg-white p-6 rounded-[2.5rem] border border-[#006d4c]/5 shadow-sm hover:shadow-md transition-all group">
            <div className="flex justify-between items-center gap-4 mb-6">
              <div className="flex items-center gap-4 flex-1 min-w-0">
                <div className={`w-14 h-14 rounded-3xl flex items-center justify-center shrink-0 transition-colors ${auto.isActive ? 'bg-[#006d4c]/10 text-[#006d4c]' : 'bg-[#f0f4f2] text-[#006d4c]/30'}`}>
                  <Sparkles size={24} fill={auto.isActive ? 'currentColor' : 'none'} className="transition-transform group-hover:scale-110" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-manrope font-extrabold text-lg text-[#1a1c1b] leading-tight">{auto.name}</h3>
                  <p className="text-[10px] uppercase tracking-widest font-black text-[#006d4c]/40 mt-1.5">{auto.trigger}</p>
                </div>
              </div>
              <button 
                onClick={() => toggleAutomation(auto.id)}
                className={`w-12 h-7 rounded-full relative flex items-center px-1 shrink-0 transition-all duration-500 ease-in-out ${auto.isActive ? 'bg-[#006d4c]' : 'bg-[#e0e7e4]'}`}
              >
                <motion.div 
                  layout
                  className="w-5 h-5 bg-white rounded-full shadow-lg"
                  animate={{ x: auto.isActive ? 20 : 0 }}
                />
              </button>
            </div>
            
            <div className="bg-[#f8faf9] p-5 rounded-[1.75rem] mb-6 border border-[#006d4c]/5">
               <p className="text-xs text-[#006d4c]/60 leading-relaxed font-medium italic">
                 {auto.explanation}
               </p>
            </div>

            <button className="w-full bg-[#f0f4f2] text-[#1a1c1b] py-4 rounded-2xl font-manrope font-black text-xs flex items-center justify-center gap-2 hover:bg-[#006d4c] hover:text-white transition-all active:scale-95 shadow-sm">
              <Pencil size={14} /> Настроить сценарий
            </button>
          </div>
        ))}

        <button 
          onClick={() => navigate('automationBuilder')}
          className="w-full py-6 bg-[#1a1c1b] text-white rounded-[2rem] font-manrope font-black text-lg flex items-center justify-center gap-3 shadow-xl active:scale-[0.98] transition-all hover:bg-[#006d4c]"
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
        <header className="pt-4 pb-4 flex items-center gap-4">
          <button onClick={goBack} className="p-2 rounded-full hover:bg-[#f0f4f2] transition-colors"><ArrowLeft className="text-[#006d4c]" /></button>
          <h1 className="font-manrope font-black text-2xl text-[#1a1c1b]">Мои устройства</h1>
        </header>

        {rooms.map(room => (
          <section key={room} className="space-y-4">
            <h3 className="text-[10px] uppercase font-black text-[#006d4c]/40 tracking-widest px-4 opacity-60">{room}</h3>
            <div className="space-y-3">
              {devices.filter(d => d.room === room).map(device => (
                <div key={device.id} className="bg-white p-5 rounded-[2rem] border border-[#006d4c]/5 flex items-center justify-between shadow-sm group hover:border-[#006d4c]/20 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 transition-colors ${
                      device.type === 'light' ? 'bg-[#006d4c]/10 text-[#006d4c]' : 
                      device.type === 'temp' ? 'bg-orange-100 text-orange-600' :
                      device.type === 'speaker' ? 'bg-[#006d4c]/10 text-[#006d4c]' :
                      'bg-[#f0f4f2] text-[#006d4c]/40'
                    }`}>
                       {device.type === 'light' ? <Lightbulb size={20} /> : 
                        device.type === 'temp' ? <Thermometer size={20} /> :
                        device.type === 'speaker' ? <Speaker size={20} /> :
                        <Lock size={20} />}
                    </div>
                    <div>
                      <h4 className="font-manrope font-bold text-[#1a1c1b]">{device.name}</h4>
                      <p className="text-[10px] uppercase font-black text-[#006d4c]/40 tracking-[0.1em]">{device.status === 'on' || device.status === 'unlocked' ? 'Активно' : 'Выключено'}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => toggleDevice(device.id)}
                    className={`w-10 h-6 rounded-full relative flex items-center px-0.5 transition-colors ${device.status === 'on' || device.status === 'unlocked' ? 'bg-[#006d4c]' : 'bg-[#e0e7e4]'}`}
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
          className="w-full py-6 mt-8 bg-[#1a1c1b] text-white rounded-[2rem] font-manrope font-black text-lg flex items-center justify-center gap-3 shadow-xl active:scale-[0.98] transition-all hover:bg-[#006d4c]"
        >
          <Plus size={24} strokeWidth={3} /> Добавить устройство
        </button>
      </div>
    );
  };

  const renderAddDevice = () => (
    <div className="space-y-8">
      <header className="pt-4 pb-4 flex items-center gap-4">
         <button onClick={goBack} className="p-2 rounded-full hover:bg-[#f0f4f2] transition-colors"><ArrowLeft className="text-[#006d4c]" /></button>
         <h1 className="font-manrope font-black text-2xl text-[#1a1c1b]">Добавить устройство</h1>
      </header>

      <section className="grid grid-cols-2 gap-4">
        <button 
          onClick={() => navigate('connectionFlow')}
          className="bg-white p-6 rounded-2xl shadow-sm border border-[#006d4c]/5 flex flex-col items-center gap-4 group hover:border-[#006d4c]/30 transition-all"
        >
          <div className="p-4 bg-[#006d4c]/10 rounded-xl text-[#006d4c] group-hover:scale-110 transition-transform">
            <Speaker />
          </div>
          <span className="font-bold text-[#1a1c1b]">Аудио</span>
        </button>
        <button 
          className="bg-white p-6 rounded-2xl shadow-sm border border-[#006d4c]/5 flex flex-col items-center gap-4 group hover:border-[#006d4c]/30 transition-all"
        >
          <div className="p-4 bg-[#006d4c]/10 rounded-xl text-[#006d4c] group-hover:scale-110 transition-transform">
            <Lightbulb />
          </div>
          <span className="font-bold text-[#1a1c1b]">Освещение</span>
        </button>
      </section>
    </div>
  );

  const renderAutomationBuilder = () => {
    return (
      <div className="space-y-10 pb-20 px-2">
        <header className="pt-4 pb-4 flex items-center gap-4">
          <button onClick={goBack} className="p-2 rounded-full hover:bg-[#f0f4f2] transition-colors">
            <ArrowLeft className="text-[#1a1c1b]" />
          </button>
          <h1 className="font-manrope font-black text-2xl text-[#1a1c1b]">Новый сценарий</h1>
        </header>

        <section className="space-y-6">
          <div className="bg-white p-7 rounded-[2.5rem] border border-[#006d4c]/5 shadow-sm">
             <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-[#006d4c]/10 text-[#006d4c] rounded-lg flex items-center justify-center">
                  <Pencil size={18} />
                </div>
                <h3 className="text-[10px] uppercase font-black tracking-widest text-[#006d4c]">Название сценария</h3>
             </div>
             <input 
               type="text" 
               placeholder="Введите название..."
               value={editingScenarioName === 'Без названия' ? '' : editingScenarioName}
               onChange={(e) => setEditingScenarioName(e.target.value)}
               className="w-full bg-[#f8faf9] p-5 rounded-2xl font-manrope font-black text-xl text-[#1a1c1b] outline-none border-2 border-transparent focus:border-[#006d4c]/30 transition-all placeholder:text-[#006d4c]/20"
             />
          </div>

          {/* IF SECTION */}
          <div className="relative pt-4">
            <div className="flex items-center gap-4 px-4 mb-5">
               <div className="w-12 h-12 bg-[#1a1c1b] text-white rounded-2xl flex items-center justify-center font-black text-xs shadow-sm">ЕСЛИ</div>
               <div className="h-[2px] bg-[#e0e7e4] flex-1 rounded-full opacity-30"></div>
            </div>
            
            <div className="space-y-4">
              {builderIfs.map((item) => {
                const Icon = IconMap[item.iconName] || Info;
                return (
                  <motion.div 
                    layout
                    key={item.id} 
                    onClick={() => setConfiguringItem({ id: item.id, type: 'if' })}
                    className="bg-white p-6 rounded-[2rem] border border-[#006d4c]/5 shadow-sm flex items-center justify-between group cursor-pointer hover:border-[#006d4c]/30 transition-all"
                  >
                    <div className="flex items-center gap-5">
                       <div className="w-12 h-12 bg-[#f0f4f2] text-[#1a1c1b] rounded-2xl flex items-center justify-center">
                         <Icon size={24} />
                       </div>
                       <div>
                         <h4 className="font-manrope font-black text-base text-[#1a1c1b] leading-tight">{item.label}</h4>
                         <p className="text-[10px] uppercase font-extrabold text-[#006d4c] tracking-widest mt-1.5">{item.value}</p>
                       </div>
                    </div>
                    <button 
                      onClick={(e) => { e.stopPropagation(); removeIf(item.id); }} 
                      className="w-10 h-10 rounded-full flex items-center justify-center text-[#006d4c]/40 hover:bg-red-50 hover:text-red-500 transition-all"
                    >
                      <X size={20} />
                    </button>
                  </motion.div>
                );
              })}
              
              <button 
                onClick={() => setPickerModal('if')}
                className="w-full bg-[#f8faf9] border-2 border-dashed border-[#006d4c]/10 p-6 rounded-[2rem] flex items-center justify-center gap-3 text-[#006d4c]/40 hover:border-[#006d4c]/30 hover:bg-white hover:text-[#006d4c] transition-all group"
              >
                <Plus size={20} className="group-hover:rotate-90 transition-transform" />
                <span className="font-manrope font-black text-[11px] uppercase tracking-[0.15em]">Добавить условие</span>
              </button>
            </div>
          </div>

          <div className="flex justify-center -my-3 relative z-10">
             <div className="w-10 h-10 bg-white border border-[#006d4c]/5 rounded-full flex items-center justify-center text-[#006d4c]/40 shadow-lg shadow-black/5">
                <ArrowDown size={18} />
             </div>
          </div>

          {/* THEN SECTION */}
          <div className="relative pt-6">
            <div className="flex items-center gap-4 px-4 mb-5">
               <div className="w-12 h-12 bg-[#006d4c] text-white rounded-2xl flex items-center justify-center font-black text-xs shadow-lg shadow-[#006d4c]/20">ТОГДА</div>
               <div className="h-[2px] bg-[#006d4c]/10 flex-1 rounded-full"></div>
            </div>

            <div className="space-y-4">
              {builderThens.map((item) => {
                const Icon = IconMap[item.iconName] || Info;
                return (
                  <motion.div 
                    layout
                    key={item.id} 
                    onClick={() => setConfiguringItem({ id: item.id, type: 'then' })}
                    className="bg-white p-6 rounded-[2rem] border border-[#006d4c]/5 shadow-sm flex items-center justify-between group cursor-pointer hover:border-[#006d4c]/30 transition-all"
                  >
                    <div className="flex items-center gap-5">
                       <div className="w-12 h-12 bg-[#006d4c]/10 text-[#006d4c] rounded-2xl flex items-center justify-center">
                         <Icon size={24} />
                       </div>
                       <div>
                         <h4 className="font-manrope font-black text-base text-[#1a1c1b] leading-tight">{item.label}</h4>
                         <p className="text-[10px] uppercase font-extrabold text-[#006d4c]/60 tracking-widest mt-1.5">{item.value}</p>
                       </div>
                    </div>
                    <button 
                      onClick={(e) => { e.stopPropagation(); removeThen(item.id); }} 
                      className="w-10 h-10 rounded-full flex items-center justify-center text-[#006d4c]/40 hover:bg-red-50 hover:text-red-500 transition-all"
                    >
                      <X size={20} />
                    </button>
                  </motion.div>
                );
              })}
              
              <button 
                onClick={() => setPickerModal('then')}
                className="w-full bg-[#006d4c]/5 border-2 border-dashed border-[#006d4c]/20 p-6 rounded-[2rem] flex items-center justify-center gap-3 text-[#006d4c] hover:bg-[#006d4c]/10 transition-all group"
              >
                <Plus size={20} className="group-hover:rotate-90 transition-transform" strokeWidth={3} />
                <span className="font-manrope font-black text-[11px] uppercase tracking-[0.15em]">Добавить действие</span>
              </button>
            </div>
          </div>
        </section>

        <button 
          onClick={saveScenario}
          className="w-full bg-[#1a1c1b] text-white py-7 rounded-[2.5rem] font-manrope font-black text-xl shadow-2xl active:scale-[0.98] transition-all hover:bg-[#006d4c]"
        >
          Сохранить сценарий
        </button>

        {/* Action Picker Modal */}
        <AnimatePresence>
          {pickerModal && (
            <div className="absolute inset-0 z-50 flex items-end justify-center">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setPickerModal(null)}
                className="absolute inset-0 bg-[#1a1c1b]/40 backdrop-blur-sm"
              />
              <motion.div 
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ y: '100%' }}
                className="relative w-full bg-white rounded-t-[3rem] p-8 space-y-8 shadow-2xl max-h-[80vh] overflow-y-auto"
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-2xl font-manrope font-black text-[#1a1c1b]">{pickerModal === 'if' ? 'Выберите условие' : 'Выберите действие'}</h3>
                  <button onClick={() => setPickerModal(null)} className="p-2"><X className="text-[#006d4c]/60" /></button>
                </div>
                <div className="grid grid-cols-2 gap-4 pb-10">
                  {(pickerModal === 'if' ? IF_OPTIONS : THEN_OPTIONS).map(opt => {
                    const Icon = IconMap[opt.iconName] || Info;
                    return (
                      <button 
                        key={opt.type}
                        onClick={() => pickerModal === 'if' ? addIf(opt) : addThen(opt)}
                        className="bg-[#f8faf9] p-6 rounded-[2rem] flex flex-col items-center gap-4 hover:bg-[#006d4c]/10 hover:text-[#006d4c] transition-all border border-transparent hover:border-[#006d4c]/20 group"
                      >
                         <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-[#006d4c]/40 group-hover:text-[#006d4c] shadow-sm transition-transform group-hover:scale-110">
                           <Icon size={28} />
                         </div>
                         <div className="text-center">
                            <span className="font-manrope font-black text-sm block leading-tight text-[#1a1c1b]">{opt.label}</span>
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
            <div className="absolute inset-0 z-50 flex items-end justify-center">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setConfiguringItem(null)}
                className="absolute inset-0 bg-[#1a1c1b]/60 backdrop-blur-md"
              />
              <motion.div 
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ y: '100%' }}
                className="relative w-full bg-white rounded-t-[3rem] p-8 space-y-8 shadow-2xl max-h-[90vh] overflow-y-auto"
              >
                <div className="flex justify-between items-center border-b border-[#006d4c]/5 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#006d4c]/10 text-[#006d4c] rounded-xl flex items-center justify-center">
                      <Settings size={20} />
                    </div>
                    <h3 className="text-xl font-manrope font-black text-[#1a1c1b]">Настройка</h3>
                  </div>
                  <button onClick={() => setConfiguringItem(null)} className="p-2 bg-[#f0f4f2] rounded-full"><X size={20} className="text-[#006d4c]/60" /></button>
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
                           <p className="text-sm font-manrope font-bold opacity-60 text-center text-[#1a1c1b]">Выберите временной интервал</p>
                           <div className="flex items-center bg-[#f8faf9] p-2 rounded-[2rem]">
                              {['after', 'before', 'between'].map(t => (
                                <button
                                  key={t}
                                  onClick={() => setTimeRange(prev => ({ ...prev, type: t }))}
                                  className={`flex-1 py-3 px-4 rounded-[1.5rem] text-[10px] uppercase font-black tracking-widest transition-all ${timeRange.type === t ? 'bg-white shadow-sm text-[#006d4c]' : 'text-[#006d4c]/40'}`}
                                >
                                  {t === 'after' ? 'Позже' : t === 'before' ? 'Раньше' : 'Диапазон'}
                                </button>
                              ))}
                           </div>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                           <div className="space-y-3">
                              <label className="text-[9px] uppercase font-black text-[#006d4c]/40 tracking-widest px-4 block">Начало</label>
                              <input 
                                type="time" 
                                value={timeRange.start}
                                onChange={(e) => setTimeRange(prev => ({ ...prev, start: e.target.value }))}
                                className="w-full bg-[#f8faf9] p-5 rounded-2xl font-black text-lg text-center focus:bg-white border-2 border-transparent focus:border-[#006d4c]/20 outline-none transition-all text-[#1a1c1b]"
                              />
                           </div>
                           {timeRange.type === 'between' && (
                             <div className="space-y-3">
                                <label className="text-[9px] uppercase font-black text-[#006d4c]/40 tracking-widest px-4 block">Конец</label>
                                <input 
                                  type="time" 
                                  value={timeRange.end}
                                  onChange={(e) => setTimeRange(prev => ({ ...prev, end: e.target.value }))}
                                  className="w-full bg-[#f8faf9] p-5 rounded-2xl font-black text-lg text-center focus:bg-white border-2 border-transparent focus:border-[#006d4c]/20 outline-none transition-all text-[#1a1c1b]"
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
                          className="w-full py-5 bg-[#006d4c] text-white rounded-[1.75rem] font-black uppercase tracking-widest text-xs shadow-lg shadow-[#006d4c]/20 active:scale-95 transition-all"
                        >
                          Сохранить время
                        </button>
                      </div>
                    );
                  }

                  if (item.type === 'motion') {
                    return (
                      <div className="space-y-6">
                        <p className="text-sm font-manrope font-bold opacity-60 text-[#1a1c1b]">Выберите датчик в комнате</p>
                        <div className="grid grid-cols-2 gap-3">
                          {['Коридор', 'Гостиная', 'Кухня', 'Ванная', 'Спальня'].map(room => (
                            <button 
                              key={room} 
                              onClick={() => {
                                updateItemConfig(item.id, configuringItem.type, { value: `Движение: ${room}` });
                                setConfiguringItem(null);
                              }}
                              className="p-5 bg-[#f8faf9] rounded-[1.5rem] font-bold text-sm text-left hover:bg-[#006d4c]/10 hover:border-[#006d4c]/20 border-2 border-transparent transition-all text-[#1a1c1b]"
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
                        <p className="text-sm font-manrope font-bold opacity-60 text-[#1a1c1b]">
                          {configuringItem.type === 'if' ? 'Укажите порог температуры' : 'Укажите целевую температуру'}
                        </p>
                        <div className="flex items-center justify-center gap-8 py-4">
                           <button className="w-12 h-12 bg-[#f8faf9] rounded-full flex items-center justify-center text-xl font-black text-[#1a1c1b]">-</button>
                           <span className="text-5xl font-manrope font-black text-[#1a1c1b]">22°C</span>
                           <button className="w-12 h-12 bg-[#f8faf9] rounded-full flex items-center justify-center text-xl font-black text-[#1a1c1b]">+</button>
                        </div>
                        <button 
                          onClick={() => {
                            updateItemConfig(item.id, configuringItem.type, { value: configuringItem.type === 'if' ? '> 22°C' : 'Установить 22°C' });
                            setConfiguringItem(null);
                          }}
                          className="w-full py-5 bg-[#006d4c] text-white rounded-[1.75rem] font-black uppercase tracking-widest text-xs shadow-lg shadow-[#006d4c]/20 active:scale-95 transition-all"
                        >
                          Подтвердить
                        </button>
                      </div>
                    );
                  }

                  if (item.type === 'light') {
                    return (
                      <div className="space-y-6">
                        <p className="text-sm font-manrope font-bold opacity-60 text-[#1a1c1b]">Действие со светом</p>
                        <div className="grid grid-cols-1 gap-3">
                          {['Включить в ванной', 'Выключить в ванной', 'Включить в гостиной', 'Выключить везде'].map(action => (
                            <button 
                              key={action} 
                              onClick={() => {
                                updateItemConfig(item.id, configuringItem.type, { value: action });
                                setConfiguringItem(null);
                              }}
                              className="p-5 bg-[#f8faf9] rounded-[1.5rem] font-bold text-sm text-left hover:bg-[#006d4c]/10 transition-all border-2 border-transparent text-[#1a1c1b]"
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
                       <Check size={48} className="mx-auto text-[#006d4c]" />
                       <p className="font-manrope font-black text-lg text-[#1a1c1b]">Параметр выбран</p>
                       <button 
                         onClick={() => setConfiguringItem(null)}
                         className="w-full bg-[#1a1c1b] text-white py-4 rounded-xl font-black uppercase tracking-widest text-xs"
                       >
                         Готово
                       </button>
                    </div>
                  );
                })()}

                <div className="pt-4">
                   <button 
                     onClick={() => setConfiguringItem(null)}
                     className="w-full bg-[#006d4c] text-white py-5 rounded-[2rem] font-manrope font-black text-lg shadow-xl"
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
    <div className="h-full bg-[#f8faf9] selection:bg-[#006d4c] selection:text-white font-manrope relative overflow-hidden">
      {/* Scrollable Area */}
      <div className="h-full overflow-y-auto no-scrollbar pb-32">
        {/* Header */}
        <header className="sticky top-0 z-30 bg-[#f8faf9]/80 backdrop-blur-md px-6 py-4 flex items-center justify-between border-b border-[#006d4c]/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-tr from-[#006d4c] to-[#58f1b4] rounded-2xl flex items-center justify-center text-white shadow-inner shadow-white/20">
              <Bolt size={20} fill="currentColor" />
            </div>
            <span className="font-black text-xl tracking-tighter text-[#1a1c1b]">TRUST<span className="text-[#006d4c]">LAB</span></span>
          </div>
          <div className="flex gap-2">
            <button className="p-3 text-[#006d4c]/40 hover:text-[#006d4c] transition-colors">
              <Search size={22} />
            </button>
            <button className="p-3 text-[#006d4c]/40 hover:text-[#006d4c] transition-colors">
              <Menu size={22} />
            </button>
          </div>
        </header>

        {/* Main Content inside Scroll */}
        <main className="p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentScreen}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              {currentScreen === 'home' && renderHome()}
              {currentScreen === 'notifications' && renderNotifications()}
              {currentScreen === 'explanation' && renderExplanation()}
              {currentScreen === 'settings' && renderSettings()}
              {currentScreen === 'myAutomations' && renderMyAutomations()}
              {currentScreen === 'myDevices' && renderMyDevices()}
              {currentScreen === 'addDevice' && renderAddDevice()}
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
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* Navigation - outside scroll */}
      <BottomNav active={currentScreen} onChange={setCurrentScreen} />

      {/* Away Mode Overlay - outside scroll */}
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
              <button 
                onClick={cancelAwayMode}
                className="bg-white text-black px-12 py-5 rounded-[28px] font-black uppercase tracking-widest text-xs hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-white/10"
              >
                Отмена
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
