import React, { useState, ReactNode } from "react";

type TabProps = {
  label: string;
  children: ReactNode;
};

export const Tab: React.FC<TabProps> = ({ children }) => {
  return <>{children}</>; // Tab component itself just holds content
};

type TabsProps = {
  children: React.ReactElement<TabProps>[]; // expecting multiple <Tab>
  initialIndex?: number;
};

export const Tabs: React.FC<TabsProps> = ({ children, initialIndex = 0 }) => {
  const [activeIndex, setActiveIndex] = useState(initialIndex);

  return (
    <div className="w-full">
      {/* Tab Headers */}
      <div className="flex space-x-2 border-b border-black">
        {children.map((child, index) => (
          <button
            key={index}
            className={`py-2 px-4 text-sm !border-none focus:!outline-none font-medium ${
              activeIndex === index ? "!font-bold" : ""
            }`}
            onClick={() => setActiveIndex(index)}
          >
            {child.props.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="mt-4">{children[activeIndex]}</div>
    </div>
  );
};
