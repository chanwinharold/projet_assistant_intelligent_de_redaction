const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000" || "http://localhost:3000";

export const apiRequest = async (endpoint, options = {}) => {
  // On s'assure qu'il n'y a qu'un seul slash entre l'URL et le endpoint
  const url = `${API_URL}${endpoint}`.replace(/([^:]\/)\/+/g, "$1");
  
  const response = await fetch(url, options); 
  const data = await response.json();
  
  if (!response.ok) throw new Error(data.message || data.error || "Erreur");
  return data;
};