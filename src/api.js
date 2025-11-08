// src/api.js
import { fakeMedicines, fakeHistory, fakeContacts, fakeReports } from './data/fakeData';

const USE_MOCK = true;

// When using mock mode, we'll mutate these arrays to simulate a backend.
const meds = fakeMedicines;
const history = fakeHistory;
const contacts = fakeContacts;
const reports = fakeReports;

export const api = {
  medicines: {
    list: () => USE_MOCK ? Promise.resolve({ data: meds }) : Promise.resolve({ data: [] }),
    get: (id) => USE_MOCK ? Promise.resolve({ data: meds.find(m => m.id === id) }) : Promise.resolve({ data: null }),
    create: (payload) => {
      const item = { ...payload, id: Date.now().toString() };
      meds.push(item);
      return Promise.resolve({ data: item });
    },
    update: (id, payload) => {
      const idx = meds.findIndex(m => m.id === id);
      if (idx === -1) return Promise.resolve({ data: null });
      meds[idx] = { ...payload, id };
      return Promise.resolve({ data: meds[idx] });
    },
    remove: (id) => {
      const idx = meds.findIndex(m => m.id === id);
      if (idx !== -1) meds.splice(idx, 1);
      return Promise.resolve({ data: { ok: true } });
    }
  },

  history: {
    list: () => Promise.resolve({ data: history })
  },

  contacts: {
    list: () => Promise.resolve({ data: contacts }),
    create: (payload) => {
      const item = { ...payload, id: Date.now().toString() };
      contacts.push(item);
      return Promise.resolve({ data: item });
    }
  },

  reports: {
    list: () => Promise.resolve({ data: reports }),
    upload: (formData) => {
      const fakeUrl = formData && formData.get && formData.get('file')
        ? URL.createObjectURL(formData.get('file'))
        : 'https://via.placeholder.com/300';
      const item = { id: Date.now().toString(), title: formData.get('title') || 'Report', url: fakeUrl };
      reports.push(item);
      return Promise.resolve({ data: item });
    }
  }
};
