const SummaryTab = ({
  result,
  handleSaveReport,
  handleEmail,
  showHandleEmail = false,
  showSaveButton,
}) => {
  const downloadCSV = () => {
    const {
      location,
      current_price_per_sqft,
      average_property_size_sqft,
      expected_5_year_gain,
      cagr,
      roi_projection,
      nearby_properties,
    } = result;

    let csvContent = `Location,${location}\n`;
    csvContent += `Price per sqft,${current_price_per_sqft}\n`;
    csvContent += `Estimated Size (sqft),${average_property_size_sqft}\n`;
    csvContent += `Expected 5-Year Gain,${expected_5_year_gain}\n`;
    csvContent += `CAGR,${cagr}\n\n`;

    csvContent += "Year,Estimated Value (INR)\n";
    roi_projection.forEach((item) => {
      csvContent += `${item.year},${item.estimated_value}\n`;
    });

    csvContent += "\nNearby Properties\nName,Price per sqft\n";
    nearby_properties.forEach((p) => {
      csvContent += `${p.name},${p.price_per_sqft}\n`;
    });

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${location.replace(" ", "_")}_ROI_Report.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col md:flex-row justify-between items-start gap-4">
      <div className="flex-1">
        <h3 className="text-xl font-bold mb-2">{result.location}</h3>
        <p className="mb-2">Property Type: {result.property_type}</p>
        <p className="mb-2">
          Avg. Price per sqft: ₹{result.current_price_per_sqft}
        </p>
        <p className="mb-2">
          Estimated Size: {result.average_property_size_sqft} sqft
        </p>
        <p className="mb-4 text-green-700 font-semibold">
          Expected 5-Year Gain: ₹{result.expected_5_year_gain.toLocaleString()}
        </p>
        <p className="mb-4 text-blue-700">
          CAGR Based on Projection:{" "}
          <span className="font-semibold">{result.cagr}</span>
        </p>

        <h4 className="text-md font-semibold mb-1">Year-wise ROI Projection</h4>
        <ul className="list-disc pl-5">
          {result.roi_projection.map((r) => (
            <li key={r.year}>
              Year {r.year}: ₹{r.estimated_value.toLocaleString()}
            </li>
          ))}
        </ul>
      </div>

      <button
        onClick={downloadCSV}
        className="self-stretch md:self-auto md:h-fit bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
      >
        Download CSV
      </button>
      {showSaveButton && (
        <button
          onClick={handleSaveReport}
          className="self-stretch md:self-auto md:h-fit bg-amber-600 text-white px-4 py-2 rounded-md hover:bg-amber-600"
        >
          Save report
        </button>
      )}
      {showHandleEmail && (
        <button
          onClick={handleEmail}
          className="self-stretch md:self-auto md:h-fit bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Email Report
        </button>
      )}
    </div>
  );
};

export default SummaryTab;
