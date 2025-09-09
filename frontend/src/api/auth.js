// const API_BASE = "http://localhost:5000/api/v1/user";

// // ------------- Login -------------
// export const loginUser = async (email, password,role) => {
//   try {
//     const res = await fetch(`${API_BASE}/login`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       credentials: "include",
//       body: JSON.stringify({ email, password,role }),
//     });
//     const data = await res.json();
//     if (!res.ok) throw new Error(data.message || "Login failed");
//     return data.data;
//   } catch (err) {
//     throw err;
//   }
// };

// // ------------- Register -------------
// export const registerUser = async ({ fullName, email, password,role }) => {
//   try {
//     const res = await fetch(`${API_BASE}/register`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ fullName, email, password,role }),
//     });
//     const data = await res.json();
//     if (!res.ok) throw new Error(data.message || "Registration failed");
//     return data.data;
//   } catch (err) {
//     throw err;
//   }
// };

// // ------------- Get Profile -------------
// export const getProfile = async () => {
//   try {
//     const res = await fetch(`${API_BASE}/profile`, { method: "GET", credentials: "include" });
//     const data = await res.json();
//     if (!res.ok) throw new Error(data.message || "Failed to fetch profile");
//     return data.data;
//   } catch (err) {
//     throw err;
//   }
// };

// // ------------- Update Profile -------------
// export const updateProfile = async (updates) => {
//   try {
//     const res = await fetch(`${API_BASE}/profile`, {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       credentials: "include",
//       body: JSON.stringify(updates),
//     });
//     const data = await res.json();
//     if (!res.ok) throw new Error(data.message || "Profile update failed");
//     return data.data;
//   } catch (err) {
//     throw err;
//   }
// };

// // ------------- Change Password -------------
// export const changePassword = async (oldPassword, newPassword) => {
//   try {
//     const res = await fetch(`${API_BASE}/change-password`, {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       credentials: "include",
//       body: JSON.stringify({ oldPassword, newPassword }),
//     });
//     const data = await res.json();
//     if (!res.ok) throw new Error(data.message || "Password change failed");
//     return data.message;
//   } catch (err) {
//     throw err;
//   }
// };



// const API_BASE = "http://localhost:5000/api/v1/user";

// // ------------- Login -------------
// export const loginUser = async (email, password, role) => {
//   try {
//     const res = await fetch(`${API_BASE}/login`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       credentials: "include",
//       body: JSON.stringify({ email, password, role }),
//     });
//     const data = await res.json();
//     if (!res.ok) throw new Error(data.message || "Login failed");
//     return data.data; // expect { tempUserId } or something like that
//   } catch (err) {
//     throw err;
//   }
// };

// // ------------- Verify OTP -------------
// export const verifyOtp = async (email, otp) => {
//   try {
//     const res = await fetch(`${API_BASE}/verify-otp`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       credentials: "include",
//       body: JSON.stringify({ email, otp }),
//     });
//     const data = await res.json();
//     if (!res.ok) throw new Error(data.message || "OTP verification failed");
//     return data.data; // expect { user, token }
//   } catch (err) {
//     throw err;
//   }
// };

// // ------------- Register -------------
// export const registerUser = async ({ fullName, email, password, role }) => {
//   try {
//     const res = await fetch(`${API_BASE}/register`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ fullName, email, password, role }),
//     });
//     const data = await res.json();
//     if (!res.ok) throw new Error(data.message || "Registration failed");
//     return data.data;
//   } catch (err) {
//     throw err;
//   }
// };

// // ------------- Get Profile -------------
// export const getProfile = async () => {
//   try {
//     const res = await fetch(`${API_BASE}/profile`, {
//       method: "GET",
//       credentials: "include",
//     });
//     const data = await res.json();
//     if (!res.ok) throw new Error(data.message || "Failed to fetch profile");
//     return data.data;
//   } catch (err) {
//     throw err;
//   }
// };

// // ------------- Update Profile -------------
// export const updateProfile = async (updates) => {
//   try {
//     const res = await fetch(`${API_BASE}/profile`, {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       credentials: "include",
//       body: JSON.stringify(updates),
//     });
//     const data = await res.json();
//     if (!res.ok) throw new Error(data.message || "Profile update failed");
//     return data.data;
//   } catch (err) {
//     throw err;
//   }
// };

// // ------------- Change Password -------------
// export const changePassword = async (oldPassword, newPassword) => {
//   try {
//     const res = await fetch(`${API_BASE}/change-password`, {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       credentials: "include",
//       body: JSON.stringify({ oldPassword, newPassword }),
//     });
//     const data = await res.json();
//     if (!res.ok) throw new Error(data.message || "Password change failed");
//     return data.message;
//   } catch (err) {
//     throw err;
//   }
// };














// const API_BASE = "http://localhost:5000/api/v1/user";

// // ------------- Login (Step 1: send password, receive OTP) -------------
// export const loginUser = async (email, password, role) => {
//   try {
//     const res = await fetch(`${API_BASE}/login`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       credentials: "include",
//       body: JSON.stringify({ email, password, role }),
//     });
//     const data = await res.json();
//     if (!res.ok) throw new Error(data.message || "Login failed");
//     // data.data can be user info without password; OTP is sent to email
//     return data.data; 
//   } catch (err) {
//     throw err;
//   }
// };

// // ------------- Verify OTP (Step 2) -------------
// export const verifyOtp = async (email, otp) => {
//   try {
//     const res = await fetch(`${API_BASE}/verify-otp`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       credentials: "include",
//       body: JSON.stringify({ email, otp }),
//     });
//     const data = await res.json();
//     if (!res.ok) throw new Error(data.message || "OTP verification failed");
//     // data.data should include full user info and accessToken/refreshToken
//     return data.data; 
//   } catch (err) {
//     throw err;
//   }
// };

// // ------------- Register -------------
// export const registerUser = async ({ fullName, email, password, role }) => {
//   try {
//     const res = await fetch(`${API_BASE}/register`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ fullName, email, password, role }),
//     });
//     const data = await res.json();
//     if (!res.ok) throw new Error(data.message || "Registration failed");
//     return data.data;
//   } catch (err) {
//     throw err;
//   }
// }; 

// // ------------- Get Profile -------------
// export const getProfile = async () => {
//   try {
//     const res = await fetch(`${API_BASE}/profile`, {
//       method: "GET",
//       credentials: "include",
//     });
//     const data = await res.json();
//     if (!res.ok) throw new Error(data.message || "Failed to fetch profile");
//     return data.data;
//   } catch (err) {
//     throw err;
//   }
// };

// // ------------- Update Profile -------------
// export const updateProfile = async (updates) => {
//   try {
//     const res = await fetch(`${API_BASE}/profile`, {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       credentials: "include",
//       body: JSON.stringify(updates),
//     });
//     const data = await res.json();
//     if (!res.ok) throw new Error(data.message || "Profile update failed");
//     return data.data;
//   } catch (err) {
//     throw err;
//   }
// };

// // ------------- Change Password -------------
// export const changePassword = async (oldPassword, newPassword) => {
//   try {
//     const res = await fetch(`${API_BASE}/change-password`, {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       credentials: "include",
//       body: JSON.stringify({ oldPassword, newPassword }),
//     });
//     const data = await res.json();
//     if (!res.ok) throw new Error(data.message || "Password change failed");
//     return data.message;
//   } catch (err) {
//     throw err;
//   }
// };









const API_BASE = "http://localhost:5000/api/v1/user";

// ------------- Login (Step 1: send password, backend sends OTP) -------------
export const loginUser = async (email, password, role) => {
  try {
    const res = await fetch(`${API_BASE}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email, password, role }),
    });

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
