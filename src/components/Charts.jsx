import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  Legend,
  ResponsiveContainer,
} from "recharts";

const Charts = ({ roi_projection, nearby_properties }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
      {/* Line Chart for ROI */}
      <div className="bg-white p-4 rounded-xl shadow-md">
        <h3 className="text-lg font-semibold mb-2">5-Year Price Trend</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={roi_projection}
            margin={{ top: 20, right: 30, left: 60, bottom: 5 }} // ⬅️ Add this
          >
            <CartesianGrid stroke="#ccc" />
            <XAxis
              dataKey="year"
              type="number"
              domain={[1, 5]}
              allowDecimals={false}
            />
            <YAxis
              domain={[
                (dataMin) => Math.max(0, dataMin - 100000),
                (dataMax) => dataMax + 100000,
              ]}
            />

            <Tooltip />
            <Line type="monotone" dataKey="estimated_value" stroke="#2563eb" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Bar Chart for Nearby Properties */}
      <div className="bg-white p-4 rounded-xl shadow-md">
        <h3 className="text-lg font-semibold mb-2">Nearby Property Prices</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={nearby_properties}>
            <Bar dataKey="price_per_sqft" fill="#10b981" />
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="name" hide />
            <YAxis />
            <Tooltip />
            <Legend />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Charts;
