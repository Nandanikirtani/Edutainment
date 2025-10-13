import { createContext, useContext, useState, useEffect } from "react";
import { getProfile } from "../api/auth.js";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });
  const [loading, setLoading] = useState(true);

  // Save/remove user in localStorage when state changes
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      if (user.accessToken) localStorage.setItem("token", user.accessToken);
    } else {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    }
  }, [user]);

  // Fetch profile if token/session exists
  useEffect(() => {
    const init = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return setLoading(false);

        const profile = await getProfile();

        // Filter out null/undefined fields from backend
        const filteredProfile = Object.fromEntries(
          Object.entries(profile || {}).filter(([_, v]) => v !== undefined && v !== null)
        );

        // Merge persisted local userProfile (e.g., avatar)
        const savedProfileRaw = localStorage.getItem("userProfile");
        const savedProfile = savedProfileRaw ? JSON.parse(savedProfileRaw) : {};

        setUser((prev) => ({
          ...prev,
          role: prev?.role || filteredProfile.role || "student", // ensure role
          accessToken: prev?.accessToken || token,
          ...filteredProfile,
          avatar: filteredProfile.avatar ?? prev?.avatar ?? savedProfile.avatar ?? null,
          fullName: filteredProfile.fullName ?? prev?.fullName ?? savedProfile.fullName ?? prev?.fullName,
          phone: filteredProfile.phone ?? prev?.phone ?? savedProfile.phone ?? prev?.phone,
          rollNo: filteredProfile.rollNo ?? prev?.rollNo ?? savedProfile.rollNo ?? prev?.rollNo,
        }));
      } catch (err) {
        console.error("Auth init failed:", err.message);
        const savedProfileRaw = localStorage.getItem("userProfile");
        const savedProfile = savedProfileRaw ? JSON.parse(savedProfileRaw) : null;
        if (savedProfile) setUser((prev) => ({ ...prev, ...savedProfile }));
      } finally {
        setLoading(false);
      }
    };
    init();
  }, []);

  // Called after login or OTP verification
  const login = (userData) => {
    if (!userData.accessToken && localStorage.getItem("token")) {
      userData.accessToken = localStorage.getItem("token");
    }
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  // Update user data (for profile updates)
  const updateUser = (updatedUserData) => {
    setUser((prev) => {
      const merged = { ...prev, ...updatedUserData };
      try {
        const saved = localStorage.getItem("userProfile");
        const base = saved ? JSON.parse(saved) : {};
        localStorage.setItem("userProfile", JSON.stringify({ ...base, ...updatedUserData }));
      } catch {}
      return merged;
    });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
