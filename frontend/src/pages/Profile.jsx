import React, { useEffect, useState } from "react";

export default function Profile() {
  const [user, setUser] = useState({
    name: localStorage.getItem("username") || "",
    email: localStorage.getItem("email") || "",
    phone: "",
    dob: "",
  });

  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: "",
  });

  const [msg, setMsg] = useState({ type: "", text: "" });

  // Update localStorage when name changes (to update Navbar)
  useEffect(() => {
    localStorage.setItem("username", user.name);
    localStorage.setItem("email", user.email);
    window.dispatchEvent(new Event("storage")); // trigger Navbar update
  }, [user.name, user.email]);

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    setMsg({ type: "success", text: "Profile updated successfully!" });
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    setPasswords({ oldPassword: "", newPassword: "" });
    setMsg({ type: "success", text: "Password changed successfully!" });
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>My Profile</h2>

      {msg.text && (
        <p style={{ ...styles.message, color: msg.type === "error" ? "red" : "green" }}>
          {msg.text}
        </p>
      )}

      <form onSubmit={handleProfileUpdate} style={styles.form}>
        <label style={styles.label}>Name</label>
        <input
          type="text"
          value={user.name}
          onChange={(e) => setUser({ ...user, name: e.target.value })}
          style={styles.input}
          required
        />

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
          value={user.dob}
          onChange={(e) => setUser({ ...user, dob: e.target.value })}
          style={styles.input}
        />

        <button type="submit" style={styles.button}>
          Update Profile
        </button>
      </form>

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

        <button type="submit" style={styles.button}>
          Change Password
        </button>
      </form>
    </div>
  );
}

const styles = {
  container: { maxWidth: "500px", margin: "50px auto", padding: "20px", border: "1px solid #ddd", borderRadius: "10px", backgroundColor: "#fff", boxShadow: "0px 4px 10px rgba(0,0,0,0.1)" },
  heading: { textAlign: "center", marginBottom: "20px" },
  subHeading: { marginBottom: "10px" },
  form: { display: "flex", flexDirection: "column", marginBottom: "20px" },
  label: { marginBottom: "5px", fontWeight: "bold" },
  input: { marginBottom: "15px", padding: "10px", borderRadius: "5px", border: "1px solid #ccc" },
  inputDisabled: { marginBottom: "15px", padding: "10px", borderRadius: "5px", border: "1px solid #ccc", backgroundColor: "#f0f0f0" },
  button: { padding: "10px", border: "none", borderRadius: "5px", backgroundColor: "#007bff", color: "white", fontWeight: "bold", cursor: "pointer" },
  message: { textAlign: "center", marginBottom: "15px" },
};
