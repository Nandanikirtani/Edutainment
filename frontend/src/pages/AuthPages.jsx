// import React, { useState } from "react";
// import { motion } from "framer-motion";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext.jsx";
// import { loginUser, registerUser, verifyOtp } from "../api/auth.js";

// // ---------- Role Tabs ----------
// const RoleTabs = ({ role, setRole }) => {
//   const roles = [
//     { id: "student", label: "Student" },
//     { id: "teacher", label: "Teacher" },
//     { id: "admin", label: "Admin" },
//   ];

//   return (
//     <div className="flex flex-wrap rounded-full text-black bg-white p-1 gap-1 w-full justify-center overflow-hidden">
//       {roles.map((r) => (
//         <button
//           key={r.id}
//           onClick={() => setRole(r.id)}
//           className={`relative z-10  flex-1 min-w-[70px] py-2 text-xs sm:text-sm font-medium transition-all rounded-full
//             ${
//               role === r.id
//                 ? "bg-red-200 text-black shadow-lg"
//                 : " hover:bg-white/5"
//             }`}
//           aria-pressed={role === r.id}
//         >
//           {r.label}
//         </button>
//       ))}
//     </div>
//   );
// };

// // ---------- Input ----------
// const Input = ({ id, label, type = "text", value, onChange }) => {
//   return (
//     <label className="block text-sm w-full">
//       <span className="text-black text-sm">{label}</span>
//       <motion.input
//         initial={{ opacity: 0, y: 8 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.35 }}
//         id={id}
//         type={type}
//         value={value}
//         onChange={onChange}
//         className="mt-1 block w-full rounded-lg bg-white border border-black text-black px-3 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-[#0C7489]"
//         placeholder={label}
//       />
//     </label>
//   );
// };

// // ---------- Login Form ----------
// const LoginForm = ({ role, onLogin, onOtpVerify, otpStep, email, setEmail }) => {
//   const [password, setPassword] = useState("");
//   const [otp, setOtp] = useState("");
//   const [loading, setLoading] = useState(false);

//   const submit = (e) => {
//     e.preventDefault();
//     setLoading(true);

//     if (!otpStep) {
//       // Step 1: Password login
//       onLogin({ email, password, role }).finally(() => setLoading(false));
//     } else {
//       // Step 2: OTP verify
//       onOtpVerify({ email, otp }).finally(() => setLoading(false));
//     }
//   };

//   return (
//     <motion.form
//       key={`login-${role}-${otpStep ? "otp" : "password"}`}
//       onSubmit={submit}
//       initial={{ opacity: 0, x: 20 }}
//       animate={{ opacity: 1, x: 0 }}
//       exit={{ opacity: 0, x: -20 }}
//       className="space-y-4"
//     >
//       {!otpStep ? (
//         <>
//           <Input
//             id="login-email"
//             label="Email"
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//           <Input
//             id="login-password"
//             label="Password"
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//           <div className="flex flex-wrap items-center justify-between text-xs text-black gap-2">
//             <label className="flex items-center gap-2">
//               <input type="checkbox" className="accent-[#0C7489]" />{" "}
//               <span>Remember me</span>
//             </label>
//             <button type="button" className="underline">
//               Forgot?
//             </button>
//           </div>
//         </>
//       ) : (
//         <>
//           <Input
//             id="otp"
//             label="Enter OTP"
//             type="text"
//             value={otp}
//             onChange={(e) => setOtp(e.target.value)}
//           />
//         </>
//       )}

//       <button
//         type="submit"
//         className="w-full py-2 rounded-lg bg-gradient-to-r from-green-400 to-teal-500 text-white font-semibold shadow-lg"
//         disabled={loading}
//       >
//         {loading
//           ? otpStep
//             ? "Verifying..."
//             : "Signing in..."
//           : otpStep
//           ? "Verify OTP"
//           : `Sign in as ${role.charAt(0).toUpperCase() + role.slice(1)}`}
//       </button>
//     </motion.form>
//   );
// };

// // ---------- Signup Form ----------
// const SignupForm = ({ role, onSignup }) => {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);

//   const submit = (e) => {
//     e.preventDefault();
//     setLoading(true);
//     onSignup({ name, email, password, role }).finally(() => setLoading(false));
//   };

//   return (
//     <motion.form
//       key={`signup-${role}`}
//       onSubmit={submit}
//       initial={{ opacity: 0, x: -20 }}
//       animate={{ opacity: 1, x: 0 }}
//       exit={{ opacity: 0, x: 20 }}
//       className="space-y-4"
//     >
//       <Input
//         id="signup-name"
//         label="Full name"
//         value={name}
//         onChange={(e) => setName(e.target.value)}
//       />
//       <Input
//         id="signup-email"
//         label="Email"
//         type="email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//       />
//       <Input
//         id="signup-password"
//         label="Password"
//         type="password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//       />
//       <button
//         type="submit"
//         className="w-full py-2 rounded-lg bg-gradient-to-r from-green-400 to-teal-500 text-slate-900 font-semibold shadow-lg"
//         disabled={loading}
//       >
//         {loading
//           ? "Creating..."
//           : `Create ${role.charAt(0).toUpperCase() + role.slice(1)} account`}
//       </button>
//     </motion.form>
//   );
// };

// // ---------- Main Auth Card ----------
// export default function AuthPages() {
//   const [mode, setMode] = useState("login");
//   const [role, setRole] = useState("student");
//   const [message, setMessage] = useState(null);
//   const [otpStep, setOtpStep] = useState(false);
//   const [loginEmail, setLoginEmail] = useState("");
//   const navigate = useNavigate();
//   const { login } = useAuth();

//   // --------- Step 1: Login with password ----------
//   const handleLogin = async ({ email, password, role }) => {
//     setLoginEmail(email);
//     setMessage({ type: "loading", text: "Checking credentials..." });
//     try {
//       const userData = await loginUser(email, password,role);
//       login({ ...userData, role });
//       setMessage({ type: "success", text: "Login successful!" });
//       if (role === "teacher") {
//       navigate("/faculty/dashboard");
//     } else if (role === "student") {
//       navigate("/");
//     } else if (role === "admin") {
//       navigate("/admin/dashboard");
//     }
//     } catch (err) {
//       setMessage({ type: "error", text: err.message });
//     }
//   };

//   // --------- Signup ----------
//   const handleSignup = async ({ name, email, password, role }) => {
//     setMessage({ type: "loading", text: "Creating account..." });
//     try {
//       await registerUser({ fullName: name, email, password, role });
//       setMessage({ type: "success", text: "Account created successfully!" });
//       setMode("login");
//     } catch (err) {
//       setMessage({ type: "error", text: err.message });
//     }
//   };

//   return (
//     <div className="min-h-screen p-16 pt-24 md:pt-0 bg-black flex items-center justify-center relative overflow-x-hidden px-4">
//       {/* Background blobs */}
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 0.16 }}
//         className="pointer-events-none absolute inset-0 overflow-hidden"
//       >
//         <div className="absolute -left-32 -top-32 w-60 sm:w-72 h-60 sm:h-72 rounded-full bg-red-500 blur-3xl mix-blend-screen" />
//         <div className="absolute -right-32 -bottom-32 w-72 sm:w-96 h-72 sm:h-96 rounded-full bg-pink-500 blur-3xl mix-blend-screen" />
//       </motion.div>

//       <motion.div
//         initial={{ scale: 0.96, opacity: 0 }}
//         animate={{ scale: 1, opacity: 1 }}
//         transition={{ duration: 0.45 }}
//         className="relative z-10 w-full max-w-4xl bg-gradient-to-b from-red-500 to-red-700  rounded-2xl shadow-2xl overflow-hidden"
//       >
//         <div className="grid grid-cols-1 md:grid-cols-2">
//           {/* Left */}
//           <div className="p-6 sm:p-8 md:p-12 flex flex-col justify-center text-white bg-gradient-to-b from-transparent via-white/3 to-transparent">
//             <motion.h2
//               initial={{ y: -8, opacity: 0 }}
//               animate={{ y: 0, opacity: 1 }}
//               transition={{ delay: 0.1 }}
//               className="text-3xl font-extrabold"
//             >
//               Welcome back
//             </motion.h2>
//             <motion.p
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 0.2 }}
//               className="mt-2 text-md sm:text-base text-white/80 max-w-sm"
//             >
//               Access your dashboard and manage your classes, assignments, and
//               admin tasks — beautifully animated and role-aware.
//             </motion.p>

//             <div className="mt-6 ">
//               <RoleTabs role={role} setRole={setRole} />

//               <p className="text-center mt-6 sm:mt-10 text-md">
//                 {mode === "signup" ? (
//                   <>
//                     Already have an account?{" "}
//                     <button
//                       onClick={() => setMode("login")}
//                       className="font-medium text-white hover:underline"
//                     >
//                       Login
//                     </button>
//                   </>
//                 ) : (
//                   <>
//                     Don't have an account?{" "}
//                     <button
//                       onClick={() => setMode("signup")}
//                       className="font-medium text-white hover:underline"
//                     >
//                       Sign Up
//                     </button>
//                   </>
//                 )}
//               </p>

//               {message && (
//                 <motion.div
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   className="mt-6 p-3 rounded-md bg-white/6 text-white text-sm"
//                 >
//                   {message.text}
//                 </motion.div>
//               )}
//             </div>
//           </div>

//           {/* Right */}
//           <div className="p-6 sm:p-8 md:p-12 bg-white flex items-center">
//             <div className="w-full max-w-sm mx-auto text-black">
//               <motion.div
//                 layout
//                 transition={{ type: "spring", stiffness: 300, damping: 30 }}
//                 className="bg-transparent"
//               >
//                 <h3 className="text-lg sm:text-xl font-bold mb-2">
//                   {mode === "login" ? (otpStep ? "Enter OTP" : "Sign in") : "Create account"}
//                 </h3>
//                 <p className="text-xs sm:text-sm text-[#0C7489] mb-4">
//                   Continue as <span className="font-semibold">{role}</span>
//                 </p>

//                 <motion.div key={mode} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
//                   {mode === "login" ? (
//                     <LoginForm
//                       role={role}
//                       onLogin={handleLogin}
//                       onOtpVerify={handleOtpVerify}
//                       otpStep={otpStep}
//                       email={loginEmail}
//                       setEmail={setLoginEmail} // ✅ pass setter
//                     />
//                   ) : (
//                     <SignupForm role={role} onSignup={handleSignup} />
//                   )}
//                 </motion.div>

//                 <div className="mt-4 text-center text-xs text-black">or continue with</div>
//                 <div className="mt-3 flex flex-wrap gap-3">
//                   <button className="flex-1 py-2 rounded-lg bg-white/6 border border-black text-black">
//                     Google
//                   </button>
//                   <button className="flex-1 py-2 rounded-lg bg-white/6 border border-black text-black">
//                     GitHub
//                   </button>
//                 </div>

//                 <div className="mt-4 text-xs text-black text-center">
//                   <span>
//                     By continuing you agree to our <u>Terms</u> and <u>Privacy</u>.
//                   </span>
//                 </div>
//               </motion.div>
//             </div>
//           </div>
//         </div>
//       </motion.div>
//     </div>
//   );
// }















// import React, { useState } from "react";
// import { motion } from "framer-motion";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext.jsx";
// import { loginUser, registerUser, verifyOtp } from "../api/auth.js";

// // ---------- Role Tabs ----------
// const RoleTabs = ({ role, setRole }) => {
//   const roles = [
//     { id: "student", label: "Student" },
//     { id: "teacher", label: "Teacher" },
//     { id: "admin", label: "Admin" },
//   ];

//   return (
//     <div className="flex flex-wrap rounded-full text-black bg-white p-1 gap-1 w-full justify-center overflow-hidden">
//       {roles.map((r) => (
//         <button
//           key={r.id}
//           onClick={() => setRole(r.id)}
//           className={`relative z-10  flex-1 min-w-[70px] py-2 text-xs sm:text-sm font-medium transition-all rounded-full
//             ${
//               role === r.id
//                 ? "bg-red-200 text-black shadow-lg"
//                 : " hover:bg-white/5"
//             }`}
//           aria-pressed={role === r.id}
//         >
//           {r.label}
//         </button>
//       ))}
//     </div>
//   );
// };

// // ---------- Input ----------
// const Input = ({ id, label, type = "text", value, onChange }) => {
//   return (
//     <label className="block text-sm w-full">
//       <span className="text-black text-sm">{label}</span>
//       <motion.input
//         initial={{ opacity: 0, y: 8 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.35 }}
//         id={id}
//         type={type}
//         value={value}
//         onChange={onChange}
//         className="mt-1 block w-full rounded-lg bg-white border border-black text-black px-3 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-[#0C7489]"
//         placeholder={label}
//       />
//     </label>
//   );
// };

// // ---------- Login Form ----------
// const LoginForm = ({ role, onLogin, onOtpVerify, otpStep, email, setEmail }) => {
//   const [password, setPassword] = useState("");
//   const [otp, setOtp] = useState("");
//   const [loading, setLoading] = useState(false);

//   const submit = (e) => {
//     e.preventDefault();
//     setLoading(true);

//     if (!otpStep) {
//       // Step 1: Password login
//       onLogin({ email, password, role }).finally(() => setLoading(false));
//     } else {
//       // Step 2: OTP verify
//       onOtpVerify({ email, otp }).finally(() => setLoading(false));
//     }
//   };

//   return (
//     <motion.form
//       key={`login-${role}-${otpStep ? "otp" : "password"}`}
//       onSubmit={submit}
//       initial={{ opacity: 0, x: 20 }}
//       animate={{ opacity: 1, x: 0 }}
//       exit={{ opacity: 0, x: -20 }}
//       className="space-y-4"
//     >
//       {!otpStep ? (
//         <>
//           <Input
//             id="login-email"
//             label="Email"
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//           <Input
//             id="login-password"
//             label="Password"
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//           <div className="flex flex-wrap items-center justify-between text-xs text-black gap-2">
//             <label className="flex items-center gap-2">
//               <input type="checkbox" className="accent-[#0C7489]" />{" "}
//               <span>Remember me</span>
//             </label>
//             <button type="button" className="underline">
//               Forgot?
//             </button>
//           </div>
//         </>
//       ) : (
//         <>
//           <Input
//             id="otp"
//             label="Enter OTP"
//             type="text"
//             value={otp}
//             onChange={(e) => setOtp(e.target.value)}
//           />
//         </>
//       )}

//       <button
//         type="submit"
//         className="w-full py-2 rounded-lg bg-gradient-to-r from-green-400 to-teal-500 text-white font-semibold shadow-lg"
//         disabled={loading}
//       >
//         {loading
//           ? otpStep
//             ? "Verifying..."
//             : "Signing in..."
//           : otpStep
//           ? "Verify OTP"
//           : `Sign in as ${role.charAt(0).toUpperCase() + role.slice(1)}`}
//       </button>
//     </motion.form>
//   );
// };

// // ---------- Signup Form ----------
// const SignupForm = ({ role, onSignup }) => {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);

//   const submit = (e) => {
//     e.preventDefault();
//     setLoading(true);
//     onSignup({ name, email, password, role }).finally(() => setLoading(false));
//   };

//   return (
//     <motion.form
//       key={`signup-${role}`}
//       onSubmit={submit}
//       initial={{ opacity: 0, x: -20 }}
//       animate={{ opacity: 1, x: 0 }}
//       exit={{ opacity: 0, x: 20 }}
//       className="space-y-4"
//     >
//       <Input
//         id="signup-name"
//         label="Full name"
//         value={name}
//         onChange={(e) => setName(e.target.value)}
//       />
//       <Input
//         id="signup-email"
//         label="Email"
//         type="email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//       />
//       <Input
//         id="signup-password"
//         label="Password"
//         type="password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//       />
//       <button
//         type="submit"
//         className="w-full py-2 rounded-lg bg-gradient-to-r from-green-400 to-teal-500 text-slate-900 font-semibold shadow-lg"
//         disabled={loading}
//       >
//         {loading
//           ? "Creating..."
//           : `Create ${role.charAt(0).toUpperCase() + role.slice(1)} account`}
//       </button>
//     </motion.form>
//   );
// };

// // ---------- Main Auth Card ----------
// export default function AuthPages() {
//   const [mode, setMode] = useState("login");
//   const [role, setRole] = useState("student");
//   const [message, setMessage] = useState(null);
//   const [otpStep, setOtpStep] = useState(false);
//   const [loginEmail, setLoginEmail] = useState("");
//   const navigate = useNavigate();
//   const { login } = useAuth();

//   // --------- Step 1: Login with password ----------
//   const handleLogin = async ({ email, password, role }) => {
//     setLoginEmail(email);
//     setMessage({ type: "loading", text: "Checking credentials..." });
//     try {
//       const userData = await loginUser(email, password, role);
//       login({ ...userData, role });
//       setMessage({ type: "success", text: "Login successful!" });

//       if (role === "teacher") {
//         navigate("/faculty/dashboard");
//       } else if (role === "student") {
//         navigate("/");
//       } else if (role === "admin") {
//         navigate("/admin/dashboard");
//       }
//     } catch (err) {
//       setMessage({ type: "error", text: err.message });
//     }
//   };

//   // --------- Step 2: Verify OTP ----------
//   const handleOtpVerify = async ({ email, otp }) => {
//     setMessage({ type: "loading", text: "Verifying OTP..." });
//     try {
//       const userData = await verifyOtp(email, otp);
//       login(userData);
//       setMessage({ type: "success", text: "OTP verified successfully!" });

//       if (role === "teacher") {
//         navigate("/faculty/dashboard");
//       } else if (role === "student") {
//         navigate("/");
//       } else if (role === "admin") {
//         navigate("/admin/dashboard");
//       }
//     } catch (err) {
//       setMessage({ type: "error", text: err.message });
//     }
//   };

//   // --------- Signup ----------
//   const handleSignup = async ({ name, email, password, role }) => {
//     setMessage({ type: "loading", text: "Creating account..." });
//     try {
//       await registerUser({ fullName: name, email, password, role });
//       setMessage({ type: "success", text: "Account created successfully!" });
//       setMode("login");
//     } catch (err) {
//       setMessage({ type: "error", text: err.message });
//     }
//   };

//   return (
//     <div className="min-h-screen p-16 pt-24 md:pt-0 bg-black flex items-center justify-center relative overflow-x-hidden px-4">
//       {/* Background blobs */}
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 0.16 }}
//         className="pointer-events-none absolute inset-0 overflow-hidden"
//       >
//         <div className="absolute -left-32 -top-32 w-60 sm:w-72 h-60 sm:h-72 rounded-full bg-red-500 blur-3xl mix-blend-screen" />
//         <div className="absolute -right-32 -bottom-32 w-72 sm:w-96 h-72 sm:h-96 rounded-full bg-pink-500 blur-3xl mix-blend-screen" />
//       </motion.div>

//       <motion.div
//         initial={{ scale: 0.96, opacity: 0 }}
//         animate={{ scale: 1, opacity: 1 }}
//         transition={{ duration: 0.45 }}
//         className="relative z-10 w-full max-w-4xl bg-gradient-to-b from-red-500 to-red-700  rounded-2xl shadow-2xl overflow-hidden"
//       >
//         <div className="grid grid-cols-1 md:grid-cols-2">
//           {/* Left */}
//           <div className="p-6 sm:p-8 md:p-12 flex flex-col justify-center text-white bg-gradient-to-b from-transparent via-white/3 to-transparent">
//             <motion.h2
//               initial={{ y: -8, opacity: 0 }}
//               animate={{ y: 0, opacity: 1 }}
//               transition={{ delay: 0.1 }}
//               className="text-3xl font-extrabold"
//             >
//               Welcome back
//             </motion.h2>
//             <motion.p
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 0.2 }}
//               className="mt-2 text-md sm:text-base text-white/80 max-w-sm"
//             >
//               Access your dashboard and manage your classes, assignments, and
//               admin tasks — beautifully animated and role-aware.
//             </motion.p>

//             <div className="mt-6 ">
//               <RoleTabs role={role} setRole={setRole} />

//               <p className="text-center mt-6 sm:mt-10 text-md">
//                 {mode === "signup" ? (
//                   <>
//                     Already have an account?{" "}
//                     <button
//                       onClick={() => setMode("login")}
//                       className="font-medium text-white hover:underline"
//                     >
//                       Login
//                     </button>
//                   </>
//                 ) : (
//                   <>
//                     Don't have an account?{" "}
//                     <button
//                       onClick={() => setMode("signup")}
//                       className="font-medium text-white hover:underline"
//                     >
//                       Sign Up
//                     </button>
//                   </>
//                 )}
//               </p>

//               {message && (
//                 <motion.div
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   className="mt-6 p-3 rounded-md bg-white/6 text-white text-sm"
//                 >
//                   {message.text}
//                 </motion.div>
//               )}
//             </div>
//           </div>

//           {/* Right */}
//           <div className="p-6 sm:p-8 md:p-12 bg-white flex items-center">
//             <div className="w-full max-w-sm mx-auto text-black">
//               <motion.div
//                 layout
//                 transition={{ type: "spring", stiffness: 300, damping: 30 }}
//                 className="bg-transparent"
//               >
//                 <h3 className="text-lg sm:text-xl font-bold mb-2">
//                   {mode === "login" ? (otpStep ? "Enter OTP" : "Sign in") : "Create account"}
//                 </h3>
//                 <p className="text-xs sm:text-sm text-[#0C7489] mb-4">
//                   Continue as <span className="font-semibold">{role}</span>
//                 </p>

//                 <motion.div key={mode} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
//                   {mode === "login" ? (
//                     <LoginForm
//                       role={role}
//                       onLogin={handleLogin}
//                       onOtpVerify={handleOtpVerify}
//                       otpStep={otpStep}
//                       email={loginEmail}
//                       setEmail={setLoginEmail}
//                     />
//                   ) : (
//                     <SignupForm role={role} onSignup={handleSignup} />
//                   )}
//                 </motion.div>

//                 <div className="mt-4 text-center text-xs text-black">or continue with</div>
//                 <div className="mt-3 flex flex-wrap gap-3">
//                   <button className="flex-1 py-2 rounded-lg bg-white/6 border border-black text-black">
//                     Google
//                   </button>
//                   <button className="flex-1 py-2 rounded-lg bg-white/6 border border-black text-black">
//                     GitHub
//                   </button>
//                 </div>

//                 <div className="mt-4 text-xs text-black text-center">
//                   <span>
//                     By continuing you agree to our <u>Terms</u> and <u>Privacy</u>.
//                   </span>
//                 </div>
//               </motion.div>
//             </div>
//           </div>
//         </div>
//       </motion.div>
//     </div>
//   );
// }
















import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { loginUser, registerUser, verifyOtp } from "../api/auth.js";

// ---------- Role Tabs ----------
const RoleTabs = ({ role, setRole }) => {
  const roles = [
    { id: "student", label: "Student" },
    { id: "teacher", label: "Teacher" },
    { id: "admin", label: "Admin" },
  ];

  return (
    <div className="flex flex-wrap rounded-full text-black bg-white p-1 gap-1 w-full justify-center overflow-hidden">
      {roles.map((r) => (
        <button
          key={r.id}
          onClick={() => setRole(r.id)}
          className={`relative z-10 flex-1 min-w-[70px] py-2 text-xs sm:text-sm font-medium transition-all rounded-full
            ${
              role === r.id
                ? "bg-red-200 text-black shadow-lg"
                : "hover:bg-white/5"
            }`}
          aria-pressed={role === r.id}
        >
          {r.label}
        </button>
      ))}
    </div>
  );
};

// ---------- Input ----------
const Input = ({ id, label, type = "text", value, onChange }) => {
  return (
    <label className="block text-sm w-full">
      <span className="text-black text-sm">{label}</span>
      <motion.input
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        className="mt-1 block w-full rounded-lg bg-white border border-black text-black px-3 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-[#0C7489]"
        placeholder={label}
      />
    </label>
  );
};

// ---------- Login Form ----------
const LoginForm = ({ role, onLogin, onOtpVerify, otpStep, email, setEmail }) => {
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    setLoading(true);

    if (!otpStep) {
      // Step 1: Password login (OTP send)
      onLogin({ email, password, role }).finally(() => setLoading(false));
    } else {
      // Step 2: OTP verify
      onOtpVerify({ email, otp }).finally(() => setLoading(false));
    }
  };

  return (
    <motion.form
      key={`login-${role}-${otpStep ? "otp" : "password"}`}
      onSubmit={submit}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-4"
    >
      {!otpStep ? (
        <>
          <Input
            id="login-email"
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            id="login-password"
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="flex flex-wrap items-center justify-between text-xs text-black gap-2">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="accent-[#0C7489]" />{" "}
              <span>Remember me</span>
            </label>
            <button type="button" className="underline">
              Forgot?
            </button>
          </div>
        </>
      ) : (
        <>
          <Input
            id="otp"
            label="Enter OTP"
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
        </>
      )}

      <button
        type="submit"
        className="w-full py-2 rounded-lg bg-gradient-to-r from-green-400 to-teal-500 text-white font-semibold shadow-lg"
        disabled={loading}
      >
        {loading
          ? otpStep
            ? "Verifying..."
            : "Signing in..."
          : otpStep
          ? "Verify OTP"
          : `Sign in as ${role.charAt(0).toUpperCase() + role.slice(1)}`}
      </button>
    </motion.form>
  );
};

// ---------- Signup Form ----------
const SignupForm = ({ role, onSignup }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    setLoading(true);
    onSignup({ name, email, password, role }).finally(() => setLoading(false));
  };

  return (
    <motion.form
      key={`signup-${role}`}
      onSubmit={submit}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="space-y-4"
    >
      <Input
        id="signup-name"
        label="Full name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Input
        id="signup-email"
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        id="signup-password"
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        type="submit"
        className="w-full py-2 rounded-lg bg-gradient-to-r from-green-400 to-teal-500 text-slate-900 font-semibold shadow-lg"
        disabled={loading}
      >
        {loading
          ? "Creating..."
          : `Create ${role.charAt(0).toUpperCase() + role.slice(1)} account`}
      </button>
    </motion.form>
  );
};

// ---------- Main Auth Card ----------
export default function AuthPages() {
  const [mode, setMode] = useState("login");
  const [role, setRole] = useState("student");
  const [message, setMessage] = useState(null);
  const [otpStep, setOtpStep] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  // --------- Step 1: Login with password ----------
  const handleLogin = async ({ email, password, role }) => {
    setLoginEmail(email);
    setMessage({ type: "loading", text: "Checking credentials..." });

    try {
      // Call backend to send OTP
      await loginUser(email, password, role);

      // Enable OTP step
      setOtpStep(true);
      setMessage({
        type: "success",
        text: `OTP sent to ${email}. Please check your email.`,
      });
    } catch (err) {
      setMessage({ type: "error", text: err.message });
    }
  };

  // --------- Step 2: Verify OTP ----------
  const handleOtpVerify = async ({ email, otp }) => {
    setMessage({ type: "loading", text: "Verifying OTP..." });
    try {
      const userData = await verifyOtp(email, otp);

      login(userData);
      setMessage({ type: "success", text: "OTP verified successfully!" });

      if (role === "teacher") {
        navigate("/faculty/dashboard");
      } else if (role === "student") {
        navigate("/");
      } else if (role === "admin") {
        navigate("/admin/dashboard");
      }
    } catch (err) {
      setMessage({ type: "error", text: err.message });
    }
  };

  // --------- Signup ----------
  const handleSignup = async ({ name, email, password, role }) => {
    setMessage({ type: "loading", text: "Creating account..." });
    try {
      await registerUser({ fullName: name, email, password, role });
      setMessage({ type: "success", text: "Account created successfully!" });
      setMode("login");
    } catch (err) {
      setMessage({ type: "error", text: err.message });
    }
  };

  return (
    <div className="min-h-screen p-16 pt-24 md:pt-0 bg-black flex items-center justify-center relative overflow-x-hidden px-4">
      {/* Background blobs */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.16 }}
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute -left-32 -top-32 w-60 sm:w-72 h-60 sm:h-72 rounded-full bg-red-500 blur-3xl mix-blend-screen" />
        <div className="absolute -right-32 -bottom-32 w-72 sm:w-96 h-72 sm:h-96 rounded-full bg-pink-500 blur-3xl mix-blend-screen" />
      </motion.div>

      <motion.div
        initial={{ scale: 0.96, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.45 }}
        className="relative z-10 w-full max-w-4xl bg-gradient-to-b from-red-500 to-red-700 rounded-2xl shadow-2xl overflow-hidden"
      >
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left */}
          <div className="p-6 sm:p-8 md:p-12 flex flex-col justify-center text-white bg-gradient-to-b from-transparent via-white/3 to-transparent">
            <motion.h2
              initial={{ y: -8, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="text-3xl font-extrabold"
            >
              Welcome back
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mt-2 text-md sm:text-base text-white/80 max-w-sm"
            >
              Access your dashboard and manage your classes, assignments, and
              admin tasks — beautifully animated and role-aware.
            </motion.p>

            <div className="mt-6 ">
              <RoleTabs role={role} setRole={setRole} />

              <p className="text-center mt-6 sm:mt-10 text-md">
                {mode === "signup" ? (
                  <>
                    Already have an account?{" "}
                    <button
                      onClick={() => setMode("login")}
                      className="font-medium text-white hover:underline"
                    >
                      Login
                    </button>
                  </>
                ) : (
                  <>
                    Don't have an account?{" "}
                    <button
                      onClick={() => setMode("signup")}
                      className="font-medium text-white hover:underline"
                    >
                      Sign Up
                    </button>
                  </>
                )}
              </p>

              {message && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-6 p-3 rounded-md bg-white/6 text-white text-sm"
                >
                  {message.text}
                </motion.div>
              )}
            </div>
          </div>

          {/* Right */}
          <div className="p-6 sm:p-8 md:p-12 bg-white flex items-center">
            <div className="w-full max-w-sm mx-auto text-black">
              <motion.div
                layout
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="bg-transparent"
              >
                <h3 className="text-lg sm:text-xl font-bold mb-2">
                  {mode === "login"
                    ? otpStep
                      ? "Enter OTP"
                      : "Sign in"
                    : "Create account"}
                </h3>
                <p className="text-xs sm:text-sm text-[#0C7489] mb-4">
                  Continue as <span className="font-semibold">{role}</span>
                </p>

                <motion.div
                  key={mode}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  {mode === "login" ? (
                    <LoginForm
                      role={role}
                      onLogin={handleLogin}
                      onOtpVerify={handleOtpVerify}
                      otpStep={otpStep}
                      email={loginEmail}
                      setEmail={setLoginEmail}
                    />
                  ) : (
                    <SignupForm role={role} onSignup={handleSignup} />
                  )}
                </motion.div>

                <div className="mt-4 text-center text-xs text-black">
                  or continue with
                </div>
                <div className="mt-3 flex flex-wrap gap-3">
                  <button className="flex-1 py-2 rounded-lg bg-white/6 border border-black text-black">
                    Google
                  </button>
                  <button className="flex-1 py-2 rounded-lg bg-white/6 border border-black text-black">
                    GitHub
                  </button>
                </div>

                <div className="mt-4 text-xs text-black text-center">
                  <span>
                    By continuing you agree to our <u>Terms</u> and{" "}
                    <u>Privacy</u>.
                  </span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
