const mockBrandData = {
  1: {
    name: "Dinorado",
    totalStock: 150,
    soldStock: 90,
    pricePerSack: 1800,
    transactions: [
      { id: "T001", date: "2025-05-01", quantity: 20, price: 45 },
      { id: "T002", date: "2025-05-03", quantity: 15, price: 45 },
      { id: "T003", date: "2025-05-10", quantity: 5, price: 45 },
      { id: "T050", date: "2025-05-15", quantity: 30, price: 45 },
      { id: "T051", date: "2025-05-20", quantity: 20, price: 45 },
    ],
  },
  2: {
    name: "Sinandomeng",
    totalStock: 120,
    soldStock: 70,
    pricePerSack: 1700,
    transactions: [
      { id: "T004", date: "2025-05-02", quantity: 10, price: 42 },
      { id: "T005", date: "2025-05-07", quantity: 10, price: 42 },
      { id: "T006", date: "2025-05-11", quantity: 10, price: 42 },
      { id: "T052", date: "2025-05-13", quantity: 20, price: 42 },
      { id: "T053", date: "2025-05-17", quantity: 20, price: 42 },
    ],
  },
  3: {
    name: "Jasmine",
    totalStock: 90,
    soldStock: 50,
    pricePerSack: 1650,
    transactions: [
      { id: "T007", date: "2025-04-25", quantity: 15, price: 40 },
      { id: "T008", date: "2025-05-10", quantity: 5, price: 40 },
      { id: "T054", date: "2025-05-12", quantity: 10, price: 40 },
      { id: "T055", date: "2025-05-15", quantity: 10, price: 40 },
      { id: "T056", date: "2025-05-18", quantity: 10, price: 40 },
    ],
  },
  4: {
    name: "Well-Milled",
    totalStock: 110,
    soldStock: 65,
    pricePerSack: 1550,
    transactions: [
      { id: "T009", date: "2025-04-30", quantity: 25, price: 38 },
      { id: "T010", date: "2025-05-05", quantity: 20, price: 38 },
      { id: "T057", date: "2025-05-08", quantity: 10, price: 38 },
      { id: "T058", date: "2025-05-14", quantity: 10, price: 38 },
    ],
  },
  5: {
    name: "Premium",
    totalStock: 140,
    soldStock: 100,
    pricePerSack: 1850,
    transactions: [
      { id: "T011", date: "2025-05-01", quantity: 30, price: 48 },
      { id: "T012", date: "2025-05-09", quantity: 30, price: 48 },
      { id: "T059", date: "2025-05-15", quantity: 20, price: 48 },
      { id: "T060", date: "2025-05-20", quantity: 20, price: 48 },
    ],
  },
  6: {
    name: "Brown Rice",
    totalStock: 75,
    soldStock: 40,
    pricePerSack: 1750,
    transactions: [
      { id: "T013", date: "2025-04-20", quantity: 15, price: 43 },
      { id: "T014", date: "2025-05-03", quantity: 10, price: 43 },
      { id: "T061", date: "2025-05-10", quantity: 5, price: 43 },
      { id: "T062", date: "2025-05-16", quantity: 10, price: 43 },
    ],
  },
  7: {
    name: "Red Rice",
    totalStock: 55,
    soldStock: 30,
    pricePerSack: 1700,
    transactions: [
      { id: "T015", date: "2025-05-08", quantity: 15, price: 44 },
      { id: "T063", date: "2025-05-12", quantity: 10, price: 44 },
      { id: "T064", date: "2025-05-18", quantity: 5, price: 44 },
    ],
  },
  8: {
    name: "Glutinous",
    totalStock: 40,
    soldStock: 20,
    pricePerSack: 1900,
    transactions: [
      { id: "T016", date: "2025-04-27", quantity: 10, price: 50 },
      { id: "T065", date: "2025-05-10", quantity: 10, price: 50 },
    ],
  },
  9: {
    name: "Extra Brand",
    totalStock: 25,
    soldStock: 15,
    pricePerSack: 1500,
    transactions: [
      { id: "T017", date: "2025-05-12", quantity: 5, price: 35 },
      { id: "T066", date: "2025-05-14", quantity: 5, price: 35 },
      { id: "T067", date: "2025-05-16", quantity: 5, price: 35 },
    ],
  },
};

export default mockBrandData;