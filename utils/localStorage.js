import candidateData from '../data/candidate-data.js';

const KEY = 'candidate_data';

export function initializeData() { 
  localStorage.setItem(KEY, JSON.stringify(candidateData));
}

export function getCandidatesFromLocalStorage() {
  const data = localStorage.getItem(KEY);
  if (data) {
    return JSON.parse(data); 
  }
  return []; 
}