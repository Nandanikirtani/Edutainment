// import { createContext, useContext, useState, useEffect } from 'react';

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(() => {
//     const saved = localStorage.getItem('user');
//     return saved ? JSON.parse(saved) : null;
//   });

//   useEffect(() => {
//     if (user) localStorage.setItem('user', JSON.stringify(user));
//     else localStorage.removeItem('user');
//   }, [user]);

//   const login = (userData) => setUser(userData);
//   const logout = () => setUser(null);

//   return (
//     <AuthContext.Provider value={{ user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);


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
    if (user) localStorage.setItem("user", JSON.stringify(user));
    else localStorage.removeItem("user");
  }, [user]);

  // Fetch profile if token/session exists
  useEffect(() => {
    const init = async () => {
      try {
        if (!user) return setLoading(false);
        const profile = await getProfile();

        // Merge profile without overwriting existing values with null/undefined
        const filteredProfile = Object.fromEntries(
          Object.entries(profile || {}).filter(([_, v]) => v !== undefined && v !== null)
        );

        // Merge persisted local userProfile (e.g., avatar) with higher priority than empty backend fields
        const savedProfileRaw = localStorage.getItem('userProfile');
        const savedProfile = savedProfileRaw ? JSON.parse(savedProfileRaw) : {};

        setUser((prev) => ({
          ...prev,
          ...filteredProfile,
          // Only apply saved avatar if backend didn't provide one
          avatar: (filteredProfile.avatar ?? prev?.avatar ?? savedProfile.avatar) || null,
          fullName: filteredProfile.fullName ?? prev?.fullName ?? savedProfile.fullName ?? prev?.fullName,
          phone: filteredProfile.phone ?? prev?.phone ?? savedProfile.phone ?? prev?.phone,
          rollNo: filteredProfile.rollNo ?? prev?.rollNo ?? savedProfile.rollNo ?? prev?.rollNo,
        }));
      } catch (err) {
        console.error("Auth init failed:", err.message);
        // Even if backend fails, try to populate from local userProfile
        const savedProfileRaw = localStorage.getItem('userProfile');
        const savedProfile = savedProfileRaw ? JSON.parse(savedProfileRaw) : null;
        if (savedProfile) setUser((prev) => ({ ...prev, ...savedProfile }));
      } finally {
        setLoading(false);
      }
    };
    init();
  }, []);

  // Called after OTP verification success
  const login = (userData) => {
    setUser(userData); // userData = { user, token, role }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  // Update user data (for profile updates)
  const updateUser = (updatedUserData) => {
    setUser(prev => {
      const merged = { ...prev, ...updatedUserData };
      // persist to local userProfile as well (for fields like avatar)
      try {
        const saved = localStorage.getItem('userProfile');
        const base = saved ? JSON.parse(saved) : {};
        localStorage.setItem('userProfile', JSON.stringify({ ...base, ...updatedUserData }));
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
