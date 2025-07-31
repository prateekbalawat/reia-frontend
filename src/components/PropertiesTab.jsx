// src/components/PropertiesTab.jsx

const PropertiesTab = ({ nearby_properties }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="text-left p-2 border">#</th>
            <th className="text-left p-2 border">Property Name</th>
            <th className="text-left p-2 border">Price per Sqft (₹)</th>
          </tr>
        </thead>
        <tbody>
          {nearby_properties.map((prop, idx) => (
            <tr key={prop.name} className="hover:bg-gray-50">
              <td className="p-2 border">{idx + 1}</td>
              <td className="p-2 border">{prop.name}</td>
              <td className="p-2 border">₹{prop.price_per_sqft}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PropertiesTab;
