import { useState } from "react";

interface SwitchProps {
  enabledText?: string;
  disabledText?: string;
  enabledIcon?: React.ReactNode;
  disabledIcon?: React.ReactNode;
  onToggle?: (isEnabled: boolean) => void;
}

export default function TextToggle({
  enabledText,
  disabledText,
  enabledIcon,
  disabledIcon,
  onToggle,
}: SwitchProps) {
  const [enabled, setEnabled] = useState(false);

  const handleToggle = () => {
    setEnabled((prev) => {
      const newValue = !prev;
      if (onToggle) {
        onToggle(newValue);
      }
      return newValue;
    });
  };

  return (
    <button
      onClick={handleToggle}
      className={`${
        enabled ? "bg-blue-600" : "bg-gray-300"
      } relative inline-flex h-10 w-20 items-center justify-center rounded-full transition-colors focus:outline-none`}
    >
      <div className="flex items-center justify-center space-x-1">
        {enabled ? (
          <>
            {enabledIcon}
            {enabledText && (
              <span className="text-white text-sm">{enabledText}</span>
            )}
          </>
        ) : (
          <>
            {disabledIcon}
            {disabledText && (
              <span className="text-black text-sm">{disabledText}</span>
            )}
          </>
        )}
      </div>
      {/* Circle handle if you want to add it, optional */}
      <span
        className={`absolute top-1 left-1 h-8 w-8 transform rounded-full bg-white shadow-md transition ${
          enabled ? "translate-x-10" : "translate-x-0"
        }`}
      />
    </button>
  );
}
