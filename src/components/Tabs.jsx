import { useState } from "react";

const Tabs = ({ tabs }) => {
  const [active, setActive] = useState(tabs[0].label);

  return (
    <div className="mt-6 bg-white rounded-xl shadow-md">
      <div className="flex border-b">
        {tabs.map((tab) => (
          <button
            key={tab.label}
            onClick={() => setActive(tab.label)}
            className={`px-4 py-2 font-medium ${
              active === tab.label
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-500"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="p-4">{tabs.find((t) => t.label === active)?.content}</div>
    </div>
  );
};

export default Tabs;
