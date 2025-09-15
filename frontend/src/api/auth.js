const API_BASE = "http://localhost:5000/api/v1/user";

// ------------- Login (Step 1: send password, backend sends OTP) -------------
// ------------- Login -------------
export const loginUser = async (email, password, role) => {
  try {
    const res = await fetch(`${API_BASE}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email, password, role }),
    });

    const contentType = res.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      const text = await res.text();
      throw new Error("Invalid response: " + text);
    }

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Login failed");

    // Step 1 returns success message; OTP sent to email
    return data.data || { message: data.message };
  } catch (err) {
    throw err;
  }
};

// ------------- Verify OTP (Step 2) -------------
export const verifyOtp = async (email, otp, role) => {
  try {
    const res = await fetch(`${API_BASE}/verify-otp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email, otp, role }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "OTP verification failed");

    // Returns user info + accessToken/refreshToken
    return data.data;
  } catch (err) {
    throw err;
  }
};

// ------------- Register -------------
export const registerUser = async ({ fullName, email, password, role }) => {
  try {
    const res = await fetch(`${API_BASE}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fullName, email, password, role }),
    });

    const contentType = res.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      const text = await res.text();
      throw new Error("Invalid response: " + text);
    }

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
    const res = await fetch(`${API_BASE}/profile`, {
      method: "GET",
      credentials: "include",
    });

    const contentType = res.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      const text = await res.text();
      throw new Error("Invalid response: " + text);
    }

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

    const contentType = res.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      const text = await res.text();
      throw new Error("Invalid response: " + text);
    }

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

    const contentType = res.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      const text = await res.text();
      throw new Error("Invalid response: " + text);
    }

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Password change failed");

    return data.message;
  } catch (err) {
    throw err;
  }
};
