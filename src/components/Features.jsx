const features = [
  {
    title: "Data-Driven Insights",
    description:
      "Get accurate price estimates and ROI based on real-time data.",
  },
  {
    title: "Compare Localities",
    description:
      "Benchmark your investment against similar areas to make smarter decisions.",
  },
  {
    title: "Anywhere Access",
    description:
      "Use REIA from any device — your investment dashboard stays synced.",
  },
];

const Features = () => {
  return (
    <section className="py-16 bg-gray-50 text-center">
      <h2 className="text-3xl font-bold text-gray-900 mb-4">
        Why Choose REIA?
      </h2>
      <p className="text-gray-600 max-w-xl mx-auto mb-10">
        Empower your real estate investments with confidence and clarity.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto px-4">
        {features.map((feat, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl shadow p-6 hover:shadow-md transition"
          >
            <h3 className="text-xl font-semibold mb-2">{feat.title}</h3>
            <p className="text-gray-600">{feat.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
