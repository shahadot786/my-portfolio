import axios from "axios";
import api from "@/lib/api-client";
import { API_BASE_URL } from "@/config/api";
import { GuideConflictError, type Guide, type GuideInput, type GuideSummary, type GuidesClient } from "./types";

const toError = (err: unknown): Error => {
  if (axios.isAxiosError(err) && err.response?.status === 409) {
    return new GuideConflictError(err.response.data?.error);
  }
  return err instanceof Error ? err : new Error("Request failed");
};

export const guidesClient: GuidesClient = {
  async listAll() {
    const res = await api.get<{ guides: GuideSummary[] }>("/guides");
    return res.data.guides;
  },

  async listPublished() {
    const res = await fetch(`${API_BASE_URL}/guides`);
    if (!res.ok) throw new Error("Failed to load guides");
    const data: { guides: GuideSummary[] } = await res.json();
    return data.guides;
  },

  async get(id) {
    try {
      const res = await api.get<{ guide: Guide }>(`/guides/${id}`);
      return res.data.guide;
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.status === 404) return null;
      throw toError(err);
    }
  },

  async create(input: GuideInput) {
    try {
      const res = await api.post<{ guide: Guide }>("/guides", input);
      return res.data.guide;
    } catch (err) {
      throw toError(err);
    }
  },

  async update(id, input: GuideInput) {
    try {
      const res = await api.put<{ guide: Guide }>(`/guides/${id}`, input);
      return res.data.guide;
    } catch (err) {
      throw toError(err);
    }
  },

  async remove(id) {
    try {
      await api.delete(`/guides/${id}`);
    } catch (err) {
      throw toError(err);
    }
  },
};
