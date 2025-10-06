const API_BASE = "https://right-bite-store.onrender.com/api/v1";

let accessToken = import.meta.env.VITE_ACCESS_TOKEN || localStorage.getItem("accessToken");
let refreshToken = import.meta.env.VITE_REFRESH_TOKEN || localStorage.getItem("refreshToken");

// Універсальний запит
export async function apiFetch(endpoint, options = {}) {
  const headers = {
    "Content-Type": "application/json",
    Authorization: accessToken ? `Bearer ${accessToken}` : undefined,
    ...options.headers,
  };

  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers,
  });

  // Якщо токен прострочений — оновлюємо
  if (response.status === 401 && refreshToken) {
    console.warn("⚠️ Access token expired. Trying to refresh...");

    const refreshed = await refreshAccessToken();
    if (refreshed) {
      // Повторюємо запит з оновленим токеном
      const retryHeaders = {
        ...headers,
        Authorization: `Bearer ${accessToken}`,
      };
      const retryResponse = await fetch(`${API_BASE}${endpoint}`, {
        ...options,
        headers: retryHeaders,
      });
      return retryResponse.json();
    } else {
      throw new Error("❌ Unable to refresh token. Please log in again.");
    }
  }

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`HTTP ${response.status}: ${text}`);
  }
//   console.log('orders:', response)

  return response.json();
}

// 🔁 Функція оновлення accessToken
async function refreshAccessToken() {
  try {
    const res = await fetch(`${API_BASE}/auth/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken }),
    });

    if (!res.ok) return false;

    const data = await res.json();
    accessToken = data.accessToken;

    // зберігаємо оновлений токен
    localStorage.setItem("accessToken", data.accessToken);
    console.log("✅ Access token refreshed");

    return true;
  } catch (err) {
    console.error("❌ Refresh token failed:", err);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    return false;
  }
}