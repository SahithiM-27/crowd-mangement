// services/analytics.service.ts
import axios from "axios";

const API_BASE_URL = "https://hiring-dev.internal.kloudspot.com";

export interface RangeRequest {
  siteId: string;
  fromUtc: number;
  toUtc: number;
}

export interface FootfallResponse {
  siteId: string;
  fromUtc: number;
  toUtc: number;
  footfall: number;
}

export interface DwellResponse {
  siteId: string;
  fromUtc: number;
  toUtc: number;
  avgDwellMinutes: number;
  dwellRecords: number;
}

export interface Site {
  siteId: string;
  name: string;
  timezone: string;
  country: string;
  city: string;
}

const authHeader = (token: string) => ({
  Authorization: `Bearer ${token}`,
  "Content-Type": "application/json",
});

export const getFootfall = async (
  payload: RangeRequest,
  token: string
): Promise<FootfallResponse> => {
  const res = await axios.post(
    `${API_BASE_URL}/api/analytics/footfall`,
    payload,
    { headers: authHeader(token) }
  );
  return res.data;
};

export const getDwell = async (
  payload: RangeRequest,
  token: string
): Promise<DwellResponse> => {
  const res = await axios.post(
    `${API_BASE_URL}/api/analytics/dwell`,
    payload,
    { headers: authHeader(token) }
  );
  return res.data;
};

export const getSites = async (token: string): Promise<Site[]> => {
  const res = await axios.get(`${API_BASE_URL}/api/sites`, {
    headers: authHeader(token),
  });
  return res.data;
};
