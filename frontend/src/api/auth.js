  const API_BASE = `${import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1'}/user`;

  export const loginUser = async ({ email, password }) => {
      console.log("Logging in with:", { email, password });
    try {
      const res = await fetch(`${API_BASE}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }), // remove role
      });

      const data = await res.json().catch(async () => {
        const text = await res.text();
        throw new Error("Invalid response: " + text);
      });

      if (!res.ok) throw new Error(data.message || "Login failed");
      return data;
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

  // ------------- Send OTP for Registration -------------
  export const sendRegistrationOTP = async ({ fullName, email, password, }) => {
    try {
      const res = await fetch(`${API_BASE}/send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, email, password, role: "student" }),
      });

      const contentType = res.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const text = await res.text();
        throw new Error("Invalid response: " + text);
      }

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to send OTP");

      return data;
    } catch (err) {
      throw err;
    }
  };

  // ------------- Verify OTP and Register -------------
  export const verifyOTPAndRegister = async ({ email, otp }) => {
    try {
      const res = await fetch(`${API_BASE}/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });

      const contentType = res.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const text = await res.text();
        throw new Error("Invalid response: " + text);
      }

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "OTP verification failed");

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
