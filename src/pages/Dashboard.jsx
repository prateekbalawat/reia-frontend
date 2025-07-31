// src/pages/Dashboard.jsx
import { useState } from "react";
import DashboardForm from "../components/DashboardForm";
import Tabs from "../components/Tabs";
import SummaryTab from "../components/SummaryTab";
import ChartsTab from "../components/ChartsTab";
import PropertiesTab from "../components/PropertiesTab";
import FullScreenLoader from "../components/FullScreenLoader"; // NEW
import { useAuth } from "../context/AuthContext";
const API_BASE = import.meta.env.VITE_API_BASE;

const Dashboard = () => {
  const [area, setArea] = useState("Whitefield");
  const [city] = useState("Bangalore");
  const [investment, setInvestment] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [savingReport, setSavingReport] = useState(false);
  const [error, setError] = useState("");
  const [errorReport, setErrorReport] = useState("");
  const [reportSuccess, setReportSuccess] = useState("");
  const { user } = useAuth();

  const handleSaveReport = async () => {
    if (!user) {
      alert("You must be logged in to save reports.");
      return;
    }

    if (!result) {
      alert("No report data to save.");
      return;
    }

    try {
      setSavingReport(true);
      console.log("token", user.token);
      const response = await fetch(`${API_BASE}/api/save-report`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`, // 🔥 ADD THIS
        },
        body: JSON.stringify({
          report: { ...result, initial_investment: Number(investment) },
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to save report.");
      }
      setReportSuccess("Report saved successfully");
    } catch (err) {
      setErrorReport(err.message || "Something went wrong. Please try again.");
    } finally {
      setSavingReport(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setReportSuccess("");
    setErrorReport("");
    setResult(null);

    if (!investment) {
      setError("Please enter investment amount");
      return;
    }

    const location = `${area} ${city}`;
    console.log("investment, location", investment, location);

    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/api/submit-investment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          investment_amount: Number(investment),
          location,
        }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Server error");
      }

      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error("Submission failed", err);
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setResult(null);
    setInvestment("");
    setError("");
    setErrorReport("");
    setReportSuccess("");
  };

  return (
    <div className="p-6 max-w-4xl mx-auto relative">
      {(loading || savingReport) && <FullScreenLoader />}
      <h2 className="text-2xl font-bold mb-4">
        5-Year Investment Analysis for Real Estate
      </h2>

      <DashboardForm
        area={area}
        city={city}
        investment={investment}
        loading={loading}
        error={error}
        setArea={setArea}
        setInvestment={setInvestment}
        handleSubmit={handleSubmit}
        handleClear={handleClear}
        hasResult={!!result || !!error} // SHOW clear when either
      />
      {errorReport && (
        <div className="bg-red-100 text-red-700 px-4 py-2 rounded-md">
          {errorReport}
        </div>
      )}
      {reportSuccess && (
        <div className="bg-green-100 text-green-700 px-4 py-2 rounded-md">
          {reportSuccess}
        </div>
      )}

      {result && (
        <Tabs
          tabs={[
            {
              label: "Summary",
              content: (
                <SummaryTab
                  showSaveButton={true}
                  handleSaveReport={handleSaveReport}
                  result={result}
                />
              ),
            },
            {
              label: "Charts",
              content: (
                <ChartsTab
                  roi_projection={result.roi_projection}
                  nearby_properties={result.nearby_properties}
                />
              ),
            },
            {
              label: "Properties",
              content: (
                <PropertiesTab nearby_properties={result.nearby_properties} />
              ),
            },
          ]}
        />
      )}
    </div>
  );
};

export default Dashboard;
