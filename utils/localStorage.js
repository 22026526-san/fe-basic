import candidateData from '../data/candidate-data.js';

const KEY = 'candidate_data';

export function initializeData() { 
  localStorage.setItem(KEY, JSON.stringify(candidateData));
}

export function getCandidatesFromLocalStorage() {
  const data = localStorage.getItem(KEY);
  if (data) {
    console.log("Lấy dữ liệu từ LocalStorage:", JSON.parse(data));
    return JSON.parse(data); 
  }
  return []; 
}

initializeData();