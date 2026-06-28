export const API_URL =
  import.meta.env.VITE_API_URL || "https://jauntsolutions.net";

/**
 * Custom fetch wrapper that automatically appends the admin authorization headers
 * and redirects the user to the login screen if they encounter a 401/403 session expiration.
 */
export const authenticatedFetch = async (url: string, options: RequestInit = {}) => {
  const token = localStorage.getItem("adminToken");
  const headers = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const response = await fetch(url, { ...options, headers });

  if (response.status === 401 || response.status === 403) {
    localStorage.removeItem("adminToken");
    
    // Clear and redirect if we're not already on the login page to avoid redirect loops
    if (!window.location.pathname.includes("/admin/login")) {
      window.location.href = "/admin/login";
    }
    
    throw new Error("Session expired. Please log in again.");
  }

  return response;
};
