// src/pages/Reports.jsx
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import FilteredReports from "../components/FilteredReports";
import FullScreenLoader from "../components/FullScreenLoader"; // NEW
const API_BASE = import.meta.env.VITE_API_BASE;

const Reports = () => {
  const { user } = useAuth();
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/my-reports`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to fetch reports");

        setReports(data);
        setError(false);
      } catch (err) {
        console.error("Error fetching reports:", err.message);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, [user]);

  const handleDelete = async (reportId) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this report?"
    );
    if (!confirm) return;

    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/api/reports/${reportId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Delete failed");

      setReports((prev) => prev.filter((r) => r._id !== reportId));
    } catch (err) {
      console.error("Error deleting report:", err.message);
      alert(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center py-5">
        My Saved Reports
      </h2>
      {error && <div className="text-center">Token expired. Login again.</div>}

      {loading ? (
        <FullScreenLoader />
      ) : reports.length === 0 ? (
        <p class="text-center">No saved reports found.</p>
      ) : (
        <FilteredReports reports={reports} onDelete={handleDelete} />
      )}
    </div>
  );
};

export default Reports;
