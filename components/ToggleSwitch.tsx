import React from 'react';

interface ToggleSwitchProps {
  label: string;
  enabled: boolean;
  onChange: (enabled: boolean) => void;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ label, enabled, onChange }) => {
  return (
    <div className="flex items-center">
      <div 
        onClick={() => onChange(!enabled)}
        className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ease-in-out ${enabled ? 'bg-cyan-500' : 'bg-gray-700'}`}
      >
        <div 
          className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ease-in-out ${enabled ? 'translate-x-6' : ''}`}
        />
      </div>
      <label className="ml-3 text-sm font-medium text-gray-300 select-none">{label}</label>
    </div>
  );
};

export default ToggleSwitch;
