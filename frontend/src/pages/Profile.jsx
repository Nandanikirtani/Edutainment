import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Profile() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    dob: "",
  });

  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: "",
  });

  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState("");

  // Fetch user profile when component mounts
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("/api/user/profile", { withCredentials: true });
        setUser(res.data);
      } catch (err) {
        console.error(err);
        setMsg("Failed to load profile.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // Handle profile form submit
  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put("/api/user/profile", user, { withCredentials: true });
      setMsg("Profile updated successfully!");
      setUser(res.data.user);
    } catch (err) {
      console.error(err);
      setMsg("Error updating profile.");
    }
  };

  // Handle password change
  const handleChangePassword = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/user/change-password", passwords, { withCredentials: true });
      setMsg("Password changed successfully!");
      setPasswords({ oldPassword: "", newPassword: "" });
    } catch (err) {
      console.error(err);
      setMsg("Error changing password.");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="profile-container" style={styles.container}>
      <h2 style={styles.heading}>My Profile</h2>
      {msg && <p style={styles.message}>{msg}</p>}

      {/* Profile Form */}
      <form onSubmit={handleProfileUpdate} style={styles.form}>
        <label style={styles.label}>Name</label>
        <input type="text" value={user.name} readOnly style={styles.inputDisabled} />

        <label style={styles.label}>Email</label>
        <input type="email" value={user.email} readOnly style={styles.inputDisabled} />

        <label style={styles.label}>Phone</label>
        <input
          type="text"
          value={user.phone}
          onChange={(e) => setUser({ ...user, phone: e.target.value })}
          style={styles.input}
        />

        <label style={styles.label}>Date of Birth</label>
        <input
          type="date"
          value={user.dob ? user.dob.substring(0, 10) : ""}
          onChange={(e) => setUser({ ...user, dob: e.target.value })}
          style={styles.input}
        />

        <button type="submit" style={styles.button}>Update Profile</button>
      </form>

      {/* Change Password Form */}
      <form onSubmit={handleChangePassword} style={styles.form}>
        <h3 style={styles.subHeading}>Change Password</h3>

        <label style={styles.label}>Old Password</label>
        <input
          type="password"
          value={passwords.oldPassword}
          onChange={(e) => setPasswords({ ...passwords, oldPassword: e.target.value })}
          style={styles.input}
          required
        />

        <label style={styles.label}>New Password</label>
        <input
          type="password"
          value={passwords.newPassword}
          onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })}
          style={styles.input}
          required
        />

        <button type="submit" style={styles.button}>Change Password</button>
      </form>
    </div>
  );
}

// Inline Styles
const styles = {
  container: {
    maxWidth: "500px",
    margin: "50px auto",
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "10px",
    backgroundColor: "#f9f9f9",
  },
  heading: { textAlign: "center", marginBottom: "20px" },
  subHeading: { marginBottom: "10px" },
  form: { display: "flex", flexDirection: "column", marginBottom: "20px" },
  label: { marginBottom: "5px", fontWeight: "bold" },
  input: {
    marginBottom: "15px",
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  inputDisabled: {
    marginBottom: "15px",
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    backgroundColor: "#e9e9e9",
  },
  button: {
    padding: "10px",
    border: "none",
    borderRadius: "5px",
    backgroundColor: "#007bff",
    color: "white",
    cursor: "pointer",
  },
  message: { textAlign: "center", color: "green", marginBottom: "15px" },
};
