import { useState } from "react";
import Tabs from "./Tabs";
import SummaryTab from "./SummaryTab";
import ChartsTab from "./ChartsTab";
import PropertiesTab from "./PropertiesTab";
import { useAuth } from "../context/AuthContext";
import FullScreenLoader from "./FullScreenLoader";
const API_BASE = import.meta.env.VITE_API_BASE;

const FilteredReports = ({ reports, onDelete }) => {
  const { user } = useAuth();
  const [filter, setFilter] = useState({ location: "", property_type: "" });
  const [sort, setSort] = useState("newest");
  const [expandedId, setExpandedId] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleEmail = async (report) => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/reports/${report._id}/email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ report }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Email sending failed");

      alert("Email sent successfully!");
    } catch (err) {
      console.error("Email error:", err.message);
      alert(err.message || "Something went wrong while emailing the report.");
    } finally {
      setLoading(false);
    }
  };

  const filteredReports = reports
    .filter((r) => {
      const locationMatch = !filter.location || r.location === filter.location;
      const typeMatch =
        !filter.property_type || r.property_type === filter.property_type;
      return locationMatch && typeMatch;
    })
    .sort((a, b) => {
      return sort === "newest"
        ? new Date(b.createdAt) - new Date(a.createdAt)
        : new Date(a.createdAt) - new Date(b.createdAt);
    });

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        {loading && <FullScreenLoader />}
        <div className="flex gap-4 flex-wrap">
          <select
            className="border px-3 py-2 rounded-md"
            value={filter.location}
            onChange={(e) =>
              setFilter((prev) => ({ ...prev, location: e.target.value }))
            }
          >
            <option value="">All Locations</option>
            {[...new Set(reports.map((r) => r.location))].map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>

          <select
            className="border px-3 py-2 rounded-md"
            value={filter.property_type}
            onChange={(e) =>
              setFilter((prev) => ({ ...prev, property_type: e.target.value }))
            }
          >
            <option value="">All Property Types</option>
            {[...new Set(reports.map((r) => r.property_type))].map((pt) => (
              <option key={pt} value={pt}>
                {pt}
              </option>
            ))}
          </select>
        </div>

        <select
          className="border px-3 py-2 rounded-md"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
        </select>
      </div>

      <ul className="space-y-6">
        {filteredReports.map((report) => (
          <li
            key={report._id}
            className="border p-4 rounded-md bg-white shadow-sm relative"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold">{report.location}</h3>
                <p className="text-sm text-gray-600 mb-2">
                  Saved on: {new Date(report.createdAt).toLocaleDateString()}
                </p>
                <p>
                  Investment: ₹{report.initial_investment?.toLocaleString()}
                </p>
                <p>
                  5-Year Gain: ₹{report.expected_5_year_gain?.toLocaleString()}
                </p>
                <p>CAGR: {report.cagr}</p>
              </div>
              <div className="space-x-2">
                <button
                  onClick={() =>
                    setExpandedId((prev) =>
                      prev === report._id ? null : report._id
                    )
                  }
                  className="text-sm text-blue-600 hover:underline"
                >
                  {expandedId === report._id ? "Hide Details" : "View Details"}
                </button>
                <button
                  onClick={() => onDelete(report._id)}
                  className="text-sm text-red-600 hover:underline"
                >
                  Delete
                </button>
              </div>
            </div>

            {expandedId === report._id && (
              <div className="mt-6">
                <Tabs
                  tabs={[
                    {
                      label: "Summary",
                      content: (
                        <SummaryTab
                          result={report}
                          showSaveButton={false}
                          showHandleEmail={true}
                          handleEmail={() => handleEmail(report)}
                        />
                      ),
                    },
                    {
                      label: "Charts",
                      content: (
                        <ChartsTab
                          roi_projection={report.roi_projection}
                          nearby_properties={report.nearby_properties}
                        />
                      ),
                    },
                    {
                      label: "Properties",
                      content: (
                        <PropertiesTab
                          nearby_properties={report.nearby_properties}
                        />
                      ),
                    },
                  ]}
                />
              </div>
            )}
          </li>
        ))}
      </ul>
    </>
  );
};

export default FilteredReports;
