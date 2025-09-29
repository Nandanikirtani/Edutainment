// frontend/src/pages/Dashboard.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FaTasks,
  FaCheckCircle,
  FaCalendarAlt,
  FaBars,
  FaSearch,
  FaPlus,
} from "react-icons/fa";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';

ChartJS.register(ArcElement, Tooltip, Legend);

const Sidebar = ({ selected, setSelected }) => {
  const menu = [
    "Dashboard",
    "Courses",
    "Tracking",
    "Work Status",
    "Quiz",
    "Certifications",
    "Inbox",
    "Settings",
    "Help",
  ];
  return (
    <aside className="w-64 bg-white rounded-r-2xl p-6 flex-shrink-0 shadow-md">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-full bg-teal-300 flex items-center justify-center font-semibold">M</div>
        <div>
          <div className="font-semibold">Mirha</div>
          <div className="text-xs text-gray-400">Student</div>
        </div>
      </div>

      <div className="mb-6">
        <select className="w-full bg-gray-50 p-2 rounded border">
          <option>Hope project</option>
        </select>
      </div>

      <nav className="space-y-3">
        {menu.map((m) => (
          <button
            key={m}
            onClick={() => setSelected(m)}
            className={`w-full text-left px-3 py-2 rounded-lg flex items-center gap-3 ${
              selected === m ? "bg-gradient-to-r from-cyan-200 to-indigo-100" : "hover:bg-gray-50"
            }`}
          >
            <span className="text-teal-500">●</span>
            <span className="capitalize text-sm">{m}</span>
          </button>
        ))}
      </nav>

      <div className="mt-6">
        <button className="w-full bg-cyan-400 text-white p-3 rounded-xl flex items-center justify-center gap-2">
          <FaPlus /> Add New Task
        </button>
      </div>
    </aside>
  );
};

const StatChip = ({ title, value, colorGradient }) => (
  <div className={`p-4 rounded-2xl shadow-md ${colorGradient}`}>
    <div className="text-xs text-gray-600">{title}</div>
    <div className="text-lg font-bold">{value ?? 0}</div>
  </div>
);

export default function Dashboard() {
  const [selected, setSelected] = useState("Dashboard");
  const [stats, setStats] = useState({});
  const [courses, setCourses] = useState([]);
  const [progress, setProgress] = useState([
    { title: "Dashboard Design", percent: 60 },
    { title: "App UI UX Design", percent: 45 },
  ]);
  const [taskPercentage, setTaskPercentage] = useState({
    total: 1220,
    running: 4,
    pending: 2,
  });
  const [date, setDate] = useState(new Date());
  const studentId = localStorage.getItem("studentId") || 1; // fallback

  useEffect(() => {
    // Fetch dashboard data
    axios
      .get(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/dashboard/${studentId}`)
      .then((res) => {
        setStats(res.data.stats || {});
        setCourses(res.data.courses || []);
        // derive some sample chart values (safeguard)
        setTaskPercentage({
          total: res.data.stats?.totalTasks ?? 0,
          running: res.data.stats?.inProgress ?? 0,
          pending: res.data.stats?.pending ?? 0,
        });
      })
      .catch((err) => {
        console.error(err);
        // fallback demo data if backend not running
        setStats({ totalTasks: 1220, inProgress: 7, pending: 43, completed: 1550, xpPoints: 2400 });
        setCourses([
          { course_name: "C++ programming online course", level: "Beginner to Advance", image: "/public/cpp.jpg" },
          { course_name: "Java Programming Online Course", level: "Beginner to Advance", image: "/public/java.jpg" },
          { course_name: "HTML online course", level: "Beginner to Advance", image: "/public/html.jpg" },
        ]);
      });
  }, [studentId]);

  const doughnutData = {
    labels: ["Completed", "Running", "Pending"],
    datasets: [
      {
        data: [stats.completed ?? 0, stats.inProgress ?? 0, stats.pending ?? 0],
        // Chart will use default colors (we don't set custom colors per instructions)
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-[1400px] mx-auto flex gap-6">
        {/* <Sidebar selected={selected} setSelected={setSelected} /> */}

        <main className="flex-1">
          {/* Top bar */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <button className="p-2 rounded bg-white shadow"><FaBars /></button>
              <div>
                <h1 className="text-2xl font-bold">Dashboard</h1>
                <div className="text-xs text-gray-500">10 AUGUST 2025</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="bg-white p-2 rounded flex items-center gap-2 shadow">
                <FaSearch className="text-gray-400" />
                <input placeholder="Search" className="outline-none text-sm" />
              </div>
            </div>
          </div>

          {/* Hero + Right column */}
          <div className="grid grid-cols-3 gap-6 mb-6">
            <div className="col-span-2 bg-gradient-to-r from-cyan-100 to-white p-6 rounded-2xl shadow-md">
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-sm text-gray-500">Welcome To</div>
                  <h2 className="text-2xl font-extrabold">Your Task Management Area</h2>
                  <p className="text-gray-600 mt-2">Lorem ipsum dolor sit amet consectetur. Bibendum risus urna tortor praesent.</p>

                  <button className="mt-4 bg-indigo-500 text-white px-4 py-2 rounded-full text-sm">Learn More</button>
                </div>
                <img src="/illustration.png" alt="illustration" className="w-48 h-36 object-contain" />
              </div>

              {/* small stat chips */}
              <div className="flex gap-4 mt-6">
                <StatChip title="Total Task" value={stats.totalTasks} colorGradient="bg-gradient-to-r from-sky-300 to-indigo-200" />
                <StatChip title="InProgress" value={stats.inProgress} colorGradient="bg-gradient-to-r from-pink-200 to-rose-100" />
                <StatChip title="Pending" value={stats.pending} colorGradient="bg-gradient-to-r from-purple-200 to-purple-100" />
                <StatChip title="Completed" value={stats.completed} colorGradient="bg-gradient-to-r from-green-200 to-emerald-100" />
              </div>
            </div>

            {/* Right column (XP card / Calendar / small controls) */}
            <aside className="space-y-4">
              <div className="bg-purple-100 rounded-2xl p-4 shadow-md flex flex-col justify-between">
                <div>
                  <div className="text-xs text-gray-600">2400 XP</div>
                  <div className="text-xl font-bold">{stats.xpPoints ?? 2400} Point</div>
                </div>
                <div className="mt-4 flex gap-2">
                  <button className="bg-white px-3 py-2 rounded-full text-sm shadow">Redeem</button>
                  <button className="bg-white px-3 py-2 rounded-full text-sm shadow">Collect Point</button>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-4 shadow-md">
                <div className="text-xs text-gray-500 mb-2">AUGUST 2025</div>
                <div className="text-sm mb-2">10 AUGUST 2025</div>
                <Calendar onChange={setDate} value={date} />
              </div>
            </aside>
          </div>
          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-1 bg-white rounded-2xl p-4 shadow-md">
              <h4 className="font-bold mb-4">Work Progress</h4>
              {progress.map((p, idx) => (
                <div key={idx} className="mb-4">
                  <div className="flex justify-between mb-1">
                    <div className="text-sm">{p.title}</div>
                    <div className="text-sm font-semibold">{p.percent}%</div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div className="h-3 rounded-full bg-cyan-400" style={{ width: `${p.percent}%` }}></div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-2xl p-4 shadow-md flex flex-col items-center">
              <h4 className="font-bold mb-2">Working Status</h4>
              <div className="w-36 h-36 flex items-center justify-center">
                <svg viewBox="0 0 36 36" className="w-36 h-36">
                  <path
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#f0f0f0"
                    strokeWidth="4"
                  />
                  <path
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831"
                    fill="none"
                    stroke="#06b6d4"
                    strokeWidth="4"
                    strokeDasharray={`${(70 / 100) * 100} 100`}
                    strokeLinecap="round"
                  />
                  <text x="18" y="20" textAnchor="middle" className="text-sm" fontSize="5" fill="#111">70%</text>
                </svg>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-4 shadow-md">
              <h4 className="font-bold mb-4">Task Percentage</h4>
              <div style={{ maxWidth: 200 }}>
                <Doughnut data={doughnutData} />
              </div>

              <div className="mt-4 text-sm space-y-1">
                <div className="flex items-center justify-between"><div>Total Tasks</div><div>{taskPercentage.total}</div></div>
                <div className="flex items-center justify-between"><div>Running</div><div>{taskPercentage.running}</div></div>
                <div className="flex items-center justify-between"><div>Pending</div><div>{taskPercentage.pending}</div></div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
