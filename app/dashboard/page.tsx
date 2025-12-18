"use client";

import { useEffect, useState } from "react";
import {
  getSites,
  getFootfall,
  getDwell,
  type Site,
  type RangeRequest,
  type FootfallResponse,
  type DwellResponse,
} from "../../services/analytics.service";

const DashboardPage = () => {
  const [sites, setSites] = useState<Site[]>([]);
  const [selectedSite, setSelectedSite] = useState<string>("");
  const [footfall, setFootfall] = useState<FootfallResponse | null>(null);
  const [dwell, setDwell] = useState<DwellResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadSites = async () => {
      try {
        const token = localStorage.getItem("token") ?? "";
        const data = await getSites(token);
        setSites(data);
        if (data.length > 0) setSelectedSite(data[0].siteId);
      } catch {
        setError("Failed to load sites");
      }
    };
    loadSites();
  }, []);

  useEffect(() => {
    const loadAnalytics = async () => {
      if (!selectedSite) return;
      try {
        setLoading(true);
        setError(null);
        const token = localStorage.getItem("token") ?? "";

        const now = Date.now();
        const sixHours = 6 * 60 * 60 * 1000;
        const payload: RangeRequest = {
          siteId: selectedSite,
          fromUtc: now - sixHours,
          toUtc: now,
        };

        const [ff, dw] = await Promise.all([
          getFootfall(payload, token),
          getDwell(payload, token),
        ]);

        setFootfall(ff);
        setDwell(dw);
      } catch {
        setError("Failed to load analytics");
      } finally {
        setLoading(false);
      }
    };
    loadAnalytics();
  }, [selectedSite]);

  return (
    <main style={{ padding: 24 }}>
      <h1>Crowd Analytics Dashboard</h1>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <label>
        Site:
        <select
          value={selectedSite}
          onChange={(e) => setSelectedSite(e.target.value)}
        >
          {sites.map((s) => (
            <option key={s.siteId} value={s.siteId}>
              {s.name}
            </option>
          ))}
        </select>
      </label>

      {loading && <p>Loading analytics...</p>}

      {footfall && dwell && (
        <section style={{ marginTop: 16 }}>
          <p>Footfall: {footfall.footfall}</p>
          <p>Average dwell (min): {dwell.avgDwellMinutes}</p>
        </section>
      )}
    </main>
  );
};

export default DashboardPage;

