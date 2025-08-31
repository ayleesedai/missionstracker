import React, { useState } from "react";
import { supabase } from "../supabase/supabaseClient";
import { Button, TextField } from "@radix-ui/themes";

type Mission = {
  id: string;
  name: string;
  created_at: string;
  // Add other fields as needed
};

function toCSV(data: Mission[]): string {
  if (data.length === 0) return "";
  const headers = Object.keys(data[0]);
  const rows = data.map((row) =>
    headers.map((field) => JSON.stringify((row as any)[field] ?? "")).join(",")
  );
  return [headers.join(","), ...rows].join("\r\n");
}

function downloadCSV(csv: string, filename: string) {
  const blob = new Blob([csv], { type: "text/csv" });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  window.URL.revokeObjectURL(url);
}

export const ReportsPage: React.FC = () => {
  const getMonthStart = () => {
    const now = new Date();
    // Create date in UTC and set time to 00:00:00
    const utcDate = new Date(now.getFullYear(), now.getMonth(), 1, 0, 0, 0, 0);
    // Return a local Date object with the same yyyy-mm-dd as UTC
    return new Date(utcDate.getUTCFullYear(), utcDate.getUTCMonth(), utcDate.getUTCDate(), 0, 0, 0, 0);
  };
  const getDayEnd = () => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999);
  };
  const [from, setFrom] = useState<Date | null>(getMonthStart());
  const [to, setTo] = useState<Date | null>(getDayEnd());
  const [missions, setMissions] = useState<Mission[]>([]);
  const [loading, setLoading] = useState(false);

  const handleFilter = async () => {
    if (!from || !to) return;
    setLoading(true);
    const { data, error } = await supabase
      .from("mission")
      .select("*")
      .gte("start_time", from.toISOString())
      .lte("start_time", to.toISOString());
    setLoading(false);
    if (error) {
      alert("Error loading missions");
      return;
    }
    setMissions(data as Mission[]);
  };

  const handleDownload = () => {
    const csv = toCSV(missions);
    downloadCSV(csv, "missions.csv");
  };

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: 24 }}>
      <h1>Reports</h1>
      <div style={{ display: "flex", gap: 16, alignItems: "flex-end", marginBottom: 24 }}>
        <div>
          <label htmlFor="from-date">From:</label>
          <TextField.Root
            id="from-date"
            type="datetime-local"
            value={from ? from.toISOString().slice(0,16) : ""}
            onChange={(e) => setFrom(e.target.value ? new Date(e.target.value) : null)}
          />
        </div>
        <div>
          <label htmlFor="to-date">To:</label>
          <TextField.Root
            id="to-date"
            type="datetime-local"
            value={to ? to.toISOString().slice(0,16) : ""}
            onChange={(e) => setTo(e.target.value ? new Date(e.target.value) : null)}
          />
        </div>
        <Button onClick={handleFilter} disabled={!from || !to || loading}>
          {loading ? "Loading..." : "Filter"}
        </Button>
      </div>
      {missions.length > 0 && (
        <Button onClick={handleDownload}>Download CSV</Button>
      )}
      {missions.length > 0 && (
        <div style={{ marginTop: 24 }}>
          <h2>Results</h2>
          <table border={1} cellPadding={8}>
            <thead>
              <tr>
                {Object.keys(missions[0]).map((key) => (
                  <th key={key}>{key}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {missions.map((mission) => (
                <tr key={mission.id}>
                  {Object.values(mission).map((value, idx) => (
                    <td key={idx}>{String(value)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ReportsPage;
