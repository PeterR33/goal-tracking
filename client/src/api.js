import axios from "axios";
const api = axios.create({ baseURL: "/api" });

export const GoalsAPI = {
  list: async () => {
    try {
      const r = await api.get("/goals");
      return Array.isArray(r.data) ? r.data : []; // always array
    } catch (e) {
      console.error(
        "GET /api/goals failed:",
        e?.response?.status,
        e?.response?.data
      );
      return []; // keep UI safe
    }
  },
  create: async (data) => {
    const r = await api.post("/goals", data);
    return r.data;
  },
  update: async (id, data) => {
    const r = await api.patch(`/goals/${id}`, data);
    return r.data;
  },
  remove: async (id) => {
    const r = await api.delete(`/goals/${id}`);
    return r.data;
  },
};
