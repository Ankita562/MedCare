// src/data/fakeData.js

export const fakePatientDetails = {
  id: "P001",
  name: "Aarav Sharma",
  age: 62,
  gender: "Male",
  contact: "9876543210",
  email: "aarav.sharma@example.com",
  weight: 70,
  allergies: "None",
  emergencyContact: {
    name: "Riya Sharma",
    relation: "Daughter",
    phone: "9123456780"
  },
  conditions: ["Diabetes", "Hypertension"],
  lastCheckup: "2025-08-15"
};

export const fakeMedicines = [
  // Example:
  // {
  //   id: "M001",
  //   name: "Metformin",
  //   dosage: "500mg",
  //   frequency: "Twice a day",
  //   startDate: "2025-09-01",
  //   endDate: "2025-12-01",
  //   notes: "Take after meals"
  // }
];

export const fakeHistory = [
  // Example:
  // {
  //   id: "H001",
  //   title: "Diabetes Checkup",
  //   date: "2025-06-10",
  //   notes: "HbA1c levels slightly elevated. Advised dietary changes."
  // }
];

export const fakeReports = [
  // Example:
  // {
  //   id: "R001",
  //   title: "Blood Test Report",
  //   url: "https://via.placeholder.com/300"
  // }
];

export const fakeContacts = [
  // Example:
  // {
  //   id: "C001",
  //   name: "Riya Sharma",
  //   relation: "Daughter",
  //   phone: "9123456780"
  // }
];

export const fakeReminders = [
  // Example:
  // {
  //   id: "RM001",
  //   medicine: "Metformin",
  //   time: "08:00",
  //   repeat: "Daily",
  //   alertType: "Popup"
  // }
];