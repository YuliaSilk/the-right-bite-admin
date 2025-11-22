const API_BASE = "https://right-bite-store.onrender.com/api/v1";

// let accessToken = import.meta.env.VITE_ACCESS_TOKEN || localStorage.getItem("accessToken");
// let refreshToken = import.meta.env.VITE_REFRESH_TOKEN || localStorage.getItem("refreshToken");

const getAccessToken = () => localStorage.getItem("accessToken");
const getRefreshToken = () => localStorage.getItem("refreshToken");

export async function apiFetch(endpoint, options = {}) {
 const token = getAccessToken();

 const headers = {
  "Content-Type": "application/json",
  ...(token && {Authorization: `Bearer ${token}`}),
  ...options.headers,
 };

 let response = await fetch(`${API_BASE}${endpoint}`, {
  ...options,
  headers,
 });

 if (response.status === 401) {
  console.warn("⚠️ Access token expired. Trying to refresh...");

  const refreshed = await refreshAccessToken();

  if (refreshed) {
   const newToken = getAccessToken();
   const retryHeaders = {
    ...headers,
    Authorization: `Bearer ${newToken}`,
   };

   response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers: retryHeaders,
   });

   if (!response.ok) {
    const text = await response.text();
    throw new Error(`HTTP ${response.status}: ${text}`);
   }

   return response.json();
  } else {
   // Якщо refresh не вдався - редірект на логін
   localStorage.removeItem("accessToken");
   localStorage.removeItem("refreshToken");
   localStorage.removeItem("adminEmail");
   window.location.href = "/admin/login";
   throw new Error("Session expired. Please log in again.");
  }
 }

 if (!response.ok) {
  const text = await response.text();
  throw new Error(`HTTP ${response.status}: ${text}`);
 }

 return response.json();
}

async function refreshAccessToken() {
 const refreshToken = getRefreshToken();

 if (!refreshToken) {
  console.error("No refresh token found");
  return false;
 }

 try {
  const res = await fetch(`${API_BASE}/auth/refresh`, {
   method: "POST",
   headers: {"Content-Type": "application/json"},
   body: JSON.stringify({refreshToken}),
  });

  if (!res.ok) {
   console.error("Refresh token failed:", res.status);
   return false;
  }

  const data = await res.json();

  localStorage.setItem("accessToken", data.accessToken);

  if (data.refreshToken) {
   localStorage.setItem("refreshToken", data.refreshToken);
  }

  console.log("Access token refreshed successfully");
  return true;
 } catch (err) {
  console.error("Refresh token error:", err);
  return false;
 }
}

export const manualRefresh = refreshAccessToken;

// export async function apiFetch(endpoint, options = {}) {
//  const headers = {
//   "Content-Type": "application/json",
//   Authorization: accessToken ? `Bearer ${accessToken}` : undefined,
//   ...options.headers,
//  };

//  const response = await fetch(`${API_BASE}${endpoint}`, {
//   ...options,
//   headers,
//  });

//  if (response.status === 401 && refreshToken) {
//   console.warn("⚠️ Access token expired. Trying to refresh...");

//   const refreshed = await refreshAccessToken();
//   if (refreshed) {
//    const retryHeaders = {
//     ...headers,
//     Authorization: `Bearer ${accessToken}`,
//    };
//    const retryResponse = await fetch(`${API_BASE}${endpoint}`, {
//     ...options,
//     headers: retryHeaders,
//    });
//    return retryResponse.json();
//   } else {
//    throw new Error("❌ Unable to refresh token. Please log in again.");
//   }
//  }

//  if (!response.ok) {
//   const text = await response.text();
//   throw new Error(`HTTP ${response.status}: ${text}`);
//  }
//  //   console.log('orders:', response)

//  return response.json();
// }

// async function refreshAccessToken() {
//  try {
//   const res = await fetch(`${API_BASE}/auth/refresh`, {
//    method: "POST",
//    headers: {"Content-Type": "application/json"},
//    body: JSON.stringify({refreshToken}),
//   });

//   if (!res.ok) return false;

//   const data = await res.json();
//   accessToken = data.accessToken;

//   localStorage.setItem("accessToken", data.accessToken);
//   console.log("✅ Access token refreshed");

//   return true;
//  } catch (err) {
//   console.error("❌ Refresh token failed:", err);
//   localStorage.removeItem("accessToken");
//   localStorage.removeItem("refreshToken");
//   return false;
//  }
// }
