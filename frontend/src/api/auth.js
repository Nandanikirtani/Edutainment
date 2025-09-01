const API_BASE = "http://localhost:5000/api/v1/user";

// ------------- Login -------------
export const loginUser = async (email, password) => {
  try {
    const res = await fetch(`${API_BASE}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Login failed");
    return data.data;
  } catch (err) {
    throw err;
  }
};

// ------------- Register -------------
export const registerUser = async ({ fullName, email, password }) => {
  try {
    const res = await fetch(`${API_BASE}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fullName, email, password }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Registration failed");
    return data.data;
  } catch (err) {
    throw err;
  }
};

// ------------- Get Profile -------------
export const getProfile = async () => {
  try {
    const res = await fetch(`${API_BASE}/profile`, { method: "GET", credentials: "include" });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to fetch profile");
    return data.data;
  } catch (err) {
    throw err;
  }
};

// ------------- Update Profile -------------
export const updateProfile = async (updates) => {
  try {
    const res = await fetch(`${API_BASE}/profile`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(updates),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Profile update failed");
    return data.data;
  } catch (err) {
    throw err;
  }
};

// ------------- Change Password -------------
export const changePassword = async (oldPassword, newPassword) => {
  try {
    const res = await fetch(`${API_BASE}/change-password`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ oldPassword, newPassword }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Password change failed");
    return data.message;
  } catch (err) {
    throw err;
  }
};
