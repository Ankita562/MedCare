// src/api.js
import {
  fakePatientDetails,
  fakeMedicines,
  fakeHistory,
  fakeContacts,
  fakeReports,
} from "./data/fakeData";

// In-memory mock database
let patient = { ...fakePatientDetails };
let medicines = [...fakeMedicines.length ? fakeMedicines : [
  {
    id: "M001",
    name: "Paracetamol",
    dosage: "500mg",
    frequency: "Twice daily",
    startDate: "2025-11-01",
    endDate: "2025-12-01",
    notes: "Take after meals",
  }
]];
let history = [...fakeHistory];
let contacts = [...fakeContacts];
let reports = [...fakeReports];

// Simulated delay
const delay = (ms = 300) => new Promise((res) => setTimeout(res, ms));

export const api = {
  // 🧍 Patient APIs
  patient: {
    get: async () => {
      await delay();
      return { data: patient };
    },
    submit: async (payload) => {
      await delay();
      patient = { ...payload, id: Date.now().toString() };
      return { data: patient };
    },
  },

  // 💊 Medicine APIs
  medicines: {
    list: async () => {
      await delay();
      return { data: [...medicines] };
    },
    get: async (id) => {
      await delay();
      const item = medicines.find((m) => m.id === id) || null;
      return { data: item };
    },
    create: async (payload) => {
      await delay();
      if (!payload.name) throw new Error("Medicine name is required");
      const newItem = { ...payload, id: Date.now().toString() };
      medicines = [...medicines, newItem];
      return { data: newItem };
    },
    update: async (id, payload) => {
      await delay();
      const idx = medicines.findIndex((m) => m.id === id);
      if (idx === -1) return { data: null };
      medicines[idx] = { ...medicines[idx], ...payload, id };
      return { data: medicines[idx] };
    },
    remove: async (id) => {
      await delay();
      const exists = medicines.some((m) => m.id === id);
      if (!exists) return { data: { ok: false } };
      medicines = medicines.filter((m) => m.id !== id);
      return { data: { ok: true } };
    },
  },

  // 🩺 History APIs
  history: {
    list: async () => {
      await delay();
      return { data: [...history] };
    },
  },

  // ☎️ Emergency Contacts APIs
  contacts: {
    list: async () => {
      await delay();
      return { data: [...contacts] };
    },
    create: async (payload) => {
      await delay();
      const newItem = { ...payload, id: Date.now().toString() };
      contacts = [...contacts, newItem];
      return { data: newItem };
    },
  },

  // 📄 Reports APIs
  reports: {
    list: async () => {
      await delay();
      return { data: [...reports] };
    },
    upload: async (formData) => {
      await delay();
      try {
        const file = formData?.get?.("file");
        const title = formData?.get?.("title") || "Report";
        const fakeUrl = file
          ? URL.createObjectURL(file)
          : "https://via.placeholder.com/300";
        const newReport = {
          id: Date.now().toString(),
          title,
          url: fakeUrl,
          uploadedAt: new Date().toISOString(),
        };
        reports = [...reports, newReport];
        return { data: newReport };
      } catch (error) {
        console.error("Error uploading report:", error);
        return { data: null, error: true };
      }
    },
  },

  // 🧹 Optional Reset Utility
  reset: async () => {
    await delay();
    patient = { ...fakePatientDetails };
    medicines = [...fakeMedicines];
    history = [...fakeHistory];
    contacts = [...fakeContacts];
    reports = [...fakeReports];
    return { ok: true };
  },
};
