// import React, { useState, useEffect } from 'react';
// import { useAuth } from '../context/AuthContext';
// import { useNavigate } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import DonutChart from '../components/DonutChart';
// import { 
//   User, 
//   BookOpen, 
//   Trophy, 
//   Calendar,
//   Bell,
//   Award,
//   Clock,
//   TrendingUp,
//   Target,
//   CheckCircle2,
//   PlayCircle,
//   Star,
//   Download,
//   CreditCard,
//   HelpCircle,
//   ChevronRight,
//   BarChart3,
//   PieChart,
//   Activity,
//   Zap,
//   Gift,
//   MessageSquare,
//   FileText,
//   ArrowLeft,
//   Home,
//   Facebook,
//   Linkedin,
//   MessageCircle
// } from 'lucide-react';

// const StudentDashboard = () => {
//   const { user } = useAuth();
//   const navigate = useNavigate();
//   const [dashboardData, setDashboardData] = useState({
//     enrolledCourses: [],
//     completedCourses: [],
//     badges: [],
//     recentActivity: [],
//     upcomingDeadlines: [],
//     announcements: [],
//     totalPoints: 0,
//     certificates: []
//   });
//   const [loading, setLoading] = useState(true);
//   const [activeTab, setActiveTab] = useState('overview');
//   const [showBadgesModal, setShowBadgesModal] = useState(false);

//   // Formats an ISO date or Date into a human-friendly "time ago" string
//   const formatTimeAgo = (input) => {
//     if (!input) return '';
//     const date = new Date(input);
//     if (isNaN(date.getTime())) return '';
//     const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
//     if (seconds < 60) return 'Just now';
//     const minutes = Math.floor(seconds / 60);
//     if (minutes < 60) return `${minutes} min${minutes > 1 ? 's' : ''} ago`;
//     const hours = Math.floor(minutes / 60);
//     if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
//     const days = Math.floor(hours / 24);
//     if (days < 7) return `${days} day${days > 1 ? 's' : ''} ago`;
//     const weeks = Math.floor(days / 7);
//     if (weeks < 4) return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
//     const months = Math.floor(days / 30);
//     if (months < 12) return `${months} month${months > 1 ? 's' : ''} ago`;
//     const years = Math.floor(days / 365);
//     return `${years} year${years > 1 ? 's' : ''} ago`;
//   };

//   useEffect(() => {
//     // Fetch once on mount; no auto-refresh
//     fetchDashboardData();
//     return () => {};
//   }, []);

//   const fetchDashboardData = async () => {
//     try {
//       setLoading(true);
      
//       // Fetch dashboard data from API
//       const token = localStorage.getItem('token');
//       console.log('🔑 Token from localStorage:', token ? 'Found' : 'Not found');
//       console.log('🔑 Token preview:', token ? token.substring(0, 20) + '...' : 'None');
      
//       if (!token) {
//         console.error('❌ No auth token found in localStorage');
//         return;
//       }

//       const apiUrl = `${import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1'}/dashboard/student`;
//       console.log('📡 API URL:', apiUrl);
      
//       const response = await fetch(apiUrl, {
//         method: 'GET',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json'
//         }
//       });

//       console.log('📡 API Response status:', response.status);
//       console.log('📡 API Response ok:', response.ok);

//       if (!response.ok) {
//         const errorText = await response.text();
//         console.error('❌ API Error Response:', errorText);
//         throw new Error(`Failed to fetch dashboard data: ${response.status} ${errorText}`);
//       }

//       const apiData = await response.json();
//       console.log('📊 API Data received:', apiData);
      
//       // Transform API data to match component structure
//       const transformedData = {
//         enrolledCourses: apiData.data.enrolledCourses || [],
//         badges: apiData.data.badges || [],
//         recentActivity: apiData.data.recentActivity || [],
//         upcomingDeadlines: apiData.data.upcomingDeadlines || [],
//         announcements: apiData.data.announcements || [],
//         totalPoints: apiData.data.statistics?.totalPoints || 0,
//         certificates: apiData.data.certificates || [],
//         statistics: apiData.data.statistics || {},
//         student: apiData.data.student || {},
//         weeklyActivity: apiData.data.weeklyActivity || []
//       };
      
//       setDashboardData(transformedData);
//     } catch (error) {
//       console.error('Error fetching dashboard data:', error);
//       // Fallback to mock data on error
//       const mockData = {
//         enrolledCourses: [],
//         badges: [],
//         recentActivity: [],
//         upcomingDeadlines: [],
//         announcements: [
//           { title: 'Welcome to your dashboard!', message: 'Start by enrolling in your first course.', time: 'now', important: false }
//         ],
//         totalPoints: 0,
//         certificates: [],
//         statistics: { activeCourses: 0, completedCourses: 0, totalPoints: 0, badgesEarned: 0 },
//         student: { fullName: user?.fullName || 'Student' },
//         weeklyActivity: []
//       };
//       setDashboardData(mockData);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Helpers to compute real changes
//   const isSameDay = (d1, d2) => d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth() && d1.getDate() === d2.getDate();
//   const now = new Date();
//   const pointsToday = (dashboardData.recentActivity || [])
//     .filter(a => a.type === 'quiz_completed' && a.date && isSameDay(new Date(a.date), now))
//     .reduce((sum, a) => sum + (a.points || 0), 0);
//   const badgesThisWeek = (dashboardData.badges || [])
//     .filter(b => b.earnedAt && (now - new Date(b.earnedAt)) <= 7 * 24 * 60 * 60 * 1000)
//     .length;

//   const StatCard = ({ icon: Icon, title, value, change, color = 'red', onClick }) => (
//     <motion.div 
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       whileHover={{ scale: 1.02 }}
//       transition={{ duration: 0.3 }}
//       onClick={onClick}
//       role={onClick ? 'button' : undefined}
//       tabIndex={onClick ? 0 : undefined}
//       className={`bg-gradient-to-br from-black via-red-950/30 to-gray-900 rounded-xl p-6 border border-red-900/50 shadow-lg shadow-red-900/20 hover:shadow-red-900/30${onClick ? ' cursor-pointer' : ''}`}
//     >
//       <div className="flex items-center justify-between">
//         <div>
//           <p className="text-gray-300 text-sm font-medium">{title}</p>
//           <p className="text-3xl font-bold text-red-400 mt-1">{value}</p>
//           {change && (
//             <p className="text-xs text-green-400 mt-1 flex items-center gap-1">
//               <TrendingUp className="w-3 h-3" />
//               {change}
//             </p>
//           )}
//         </div>
//         <div className="p-3 bg-red-600/20 rounded-lg border border-red-600/30">
//           <Icon className="w-6 h-6 text-red-400" />
//         </div>
//       </div>
//     </motion.div>
//   );

//   const CourseCard = ({ course }) => (
//     <motion.div
//       initial={{ opacity: 0, scale: 0.95 }}
//       animate={{ opacity: 1, scale: 1 }}
//       whileHover={{ scale: 1.02 }}
//       transition={{ duration: 0.3 }}
//       className="bg-gradient-to-br from-black via-red-950/30 to-gray-900 rounded-xl p-6 border border-red-800/50 shadow-lg shadow-red-900/10 hover:shadow-red-900/20"
//     >
//       <div className="flex items-start gap-4">
//         <img 
//           src={course.thumbnail || '/default-course.jpg'} 
//           alt={course.title}
//           className="w-16 h-16 rounded-lg object-cover"
//         />
//         <div className="flex-1">
//           <h3 className="font-semibold text-white mb-1">{course.title}</h3>
//           <p className="text-gray-400 text-sm mb-2">by {course.instructor}</p>
          
//           {/* Progress Bar */}
//           <div className="mb-3">
//             <div className="flex justify-between text-xs mb-1">
//               <span className="text-gray-300">Progress</span>
//               <span className="text-red-400 font-semibold">{course.progress}%</span>
//             </div>
//             <div className="w-full bg-gray-800 rounded-full h-3 shadow-inner">
//               <div 
//                 className="bg-gradient-to-r from-red-500 to-red-400 h-3 rounded-full transition-all duration-500 shadow-lg shadow-red-500/20"
//                 style={{ width: `${course.progress}%` }}
//               ></div>
//             </div>
//           </div>
          
//           {course.status === 'ongoing' ? (
//             <div className="flex items-center justify-between">
//               <span className="text-xs text-gray-400">Next: {course.nextLesson}</span>
//               <button onClick={() => navigate(`/course/${course.id}`)} className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 px-4 py-2 rounded-lg text-xs font-semibold transition-all duration-300 flex items-center gap-1 shadow-lg shadow-red-600/30 hover:shadow-red-600/50">
//                 <PlayCircle className="w-4 h-4" />
//                 Resume
//               </button>
//             </div>
//           ) : (
//             <div className="flex items-center justify-between">
//               <span className="text-xs text-green-400">Completed on {course.completedDate}</span>
//               <CheckCircle2 className="w-5 h-5 text-green-400" />
//             </div>
//           )}
//         </div>
//       </div>
//     </motion.div>
//   );

//   const BadgeDisplay = ({ badges }) => (
//     <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
//       {badges.map((badge, index) => (
//         <motion.div
//           key={index}
//           initial={{ scale: 0, rotate: -180 }}
//           animate={{ scale: 1, rotate: 0 }}
//           transition={{ delay: index * 0.1 }}
//           whileHover={{ scale: 1.1, rotate: 5 }}
//           className="relative group cursor-pointer"
//         >
//           <img
//             src={`/Badge-${badge.badgeType}.${badge.badgeType === '50' ? 'jpeg' : 'jpg'}`}
//             alt={`${badge.badgeType}% Badge`}
//             className="w-20 h-20 object-contain rounded-lg drop-shadow-lg"
//           />
//           <motion.div
//             initial={{ opacity: 0, y: 10 }}
//             whileHover={{ opacity: 1, y: 0 }}
//             className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-black/90 text-white text-xs px-2 py-1 rounded whitespace-nowrap pointer-events-none"
//           >
//             {badge.courseName}
//           </motion.div>
//         </motion.div>
//       ))}
//     </div>
//   );

//   // Simple Badges Modal for viewing and sharing earned badges
//   const BadgesModal = ({ badges, onClose }) => {
//     // Open platform share with prefilled message about completion
//     const handleShare = (platform, badge) => {
//       const studentName = user?.fullName ? `${user.fullName}` : 'A student';
//       const course = badge.courseName || badge.courseTitle || 'a course';
//       const shareUrl = `${window.location.origin}/#/course/${badge.courseId || ''}`;
//       const shareText = `🎉 ${studentName} completed "${course}" at Manav Rachna Edutainment and earned the ${badge.badgeType}% badge! 🏆`;
//       const encodedText = encodeURIComponent(shareText);
//       const encodedUrl = encodeURIComponent(shareUrl);
//       let shareLink = '';
//       switch (platform) {
//         case 'facebook':
//           shareLink = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedText}`;
//           break;
//         case 'whatsapp':
//           shareLink = `https://wa.me/?text=${encodedText}%20${encodedUrl}`;
//           break;
//         case 'linkedin':
//           shareLink = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
//           break;
//         case 'instagram':
//           navigator.clipboard.writeText(`${shareText}\n\n${shareUrl}`);
//           alert('Text copied to clipboard! You can now paste it on Instagram 📋');
//           return;
//         default:
//           return;
//       }
//       window.open(shareLink, '_blank', 'width=600,height=400');
//     };

//     return (
//       <div className="fixed inset-0 z-50 flex items-center justify-center">
//         <div className="absolute inset-0 bg-black/70" onClick={onClose} />
//         <div className="relative z-10 w-full max-w-3xl mx-4 bg-gray-900 border border-red-800/40 rounded-2xl p-6 text-white">
//           <div className="flex items-center justify-between mb-4">
//             <h3 className="text-xl font-bold text-red-400">My Badges</h3>
//             <button onClick={onClose} className="px-3 py-1 rounded bg-red-600/20 border border-red-600/40 hover:bg-red-600/30">Close</button>
//           </div>
//           {(!badges || badges.length === 0) ? (
//             <p className="text-gray-400">No badges earned yet.</p>
//           ) : (
//             <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
//               {badges.map((badge, idx) => (
//                 <div key={idx} className="bg-black/40 border border-red-800/30 rounded-xl p-3 flex flex-col items-center gap-2">
//                   <img
//                     src={`/Badge-${badge.badgeType}.${(badge.badgeType === '50') ? 'jpeg' : 'jpg'}`}
//                     alt={`${badge.badgeType}% Badge`}
//                     className="w-20 h-20 object-contain rounded-lg"
//                   />
//                   <div className="text-center text-xs text-gray-300">
//                     {badge.courseName || badge.courseTitle || 'Course'}
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <button onClick={() => handleShare('facebook', badge)} className="p-2 bg-blue-600 hover:bg-blue-700 rounded-full" title="Facebook">
//                       <Facebook className="w-4 h-4 text-white" />
//                     </button>
//                     <button onClick={() => handleShare('whatsapp', badge)} className="p-2 bg-green-600 hover:bg-green-700 rounded-full" title="WhatsApp">
//                       <MessageCircle className="w-4 h-4 text-white" />
//                     </button>
//                     <button onClick={() => handleShare('linkedin', badge)} className="p-2 bg-blue-700 hover:bg-blue-800 rounded-full" title="LinkedIn">
//                       <Linkedin className="w-4 h-4 text-white" />
//                     </button>
//                     <button onClick={() => handleShare('instagram', badge)} className="p-2 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 rounded-full" title="Instagram (copy)">
//                       <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     );
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-black flex items-center justify-center">
//         <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-500"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-black text-white" style={{backgroundColor: '#000000'}}>
//       {/* Header */}
//       <div className="bg-gradient-to-r from-black via-red-950/40 to-black border-b border-red-800/50 shadow-lg shadow-red-900/10">
//         <div className="max-w-7xl mx-auto px-4 py-8">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-6">
//               {/* Back to Home Button */}
//               <motion.button
//                 onClick={() => navigate('/')}
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 rounded-lg text-white font-medium transition-all duration-300 shadow-lg shadow-red-600/30 hover:shadow-red-600/50"
//               >
//                 <ArrowLeft className="w-4 h-4" />
//                 <Home className="w-4 h-4" />
//                 <span>Home</span>
//               </motion.button>
//               <div className="relative">
//                 {user?.avatar ? (
//                   <img
//                     src={user.avatar}
//                     alt={user?.fullName}
//                     className="w-20 h-20 rounded-full object-cover border-4 border-red-500 shadow-lg shadow-red-500/30"
//                   />
//                 ) : (
//                   <div className="w-20 h-20 rounded-full border-4 border-red-500 shadow-lg shadow-red-500/30 bg-gray-800 flex items-center justify-center">
//                     <User className="w-10 h-10 text-gray-400" />
//                   </div>
//                 )}
//                 <div className="absolute -bottom-1 -right-1 bg-green-500 w-6 h-6 rounded-full border-2 border-black flex items-center justify-center">
//                   <Zap className="w-3 h-3 text-white" />
//                 </div>
//               </div>
//               <div>
//                 <h1 className="text-3xl font-bold text-white">Welcome back, {user?.fullName || user?.data?.fullName || username || "User Name"}!</h1>
//                 <p className="text-gray-400 mt-1">Ready to continue your learning journey?</p>
//                 <div className="flex items-center gap-4 mt-2">
//                   <div className="flex items-center gap-1 text-yellow-400">
//                     <Trophy className="w-4 h-4" />
//                     <span className="text-sm font-medium">{dashboardData.totalPoints} Points</span>
//                   </div>
//                   <div className="flex items-center gap-1 text-green-400">
//                     <Award className="w-4 h-4" />
//                     <span className="text-sm font-medium">{dashboardData.badges.length} Badges</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
            
//             {/* Profile Button - Top Right */}
//             <motion.button
//               onClick={() => navigate('/profile')}
//               whileHover={{ scale: 1.1 }}
//               whileTap={{ scale: 0.95 }}
//               className="flex items-center justify-center w-12 h-12 rounded-full border-2 border-red-500 overflow-hidden bg-gray-800 text-white transition-all duration-300 shadow-lg shadow-red-600/30 hover:shadow-red-600/50"
//             >
//               {user?.avatar ? (
//                 <img 
//                   src={user.avatar} 
//                   alt="Profile" 
//                   className="w-full h-full object-cover" 
//                 />
//               ) : (
//                 <User className="w-6 h-6" />
//               )}
//             </motion.button>
//           </div>
//         </div>
//       </div>

//       <div className="max-w-7xl mx-auto px-4 py-8">
//         {/* Quick Stats */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//           <StatCard
//             icon={BookOpen}
//             title="Active Courses"
//             value={dashboardData.statistics?.activeCourses || dashboardData.enrolledCourses.filter(c => c.status === 'ongoing').length}
//           />
         
//           <StatCard
//             icon={CheckCircle2}
//             title="Completed Courses"
//             value={dashboardData.statistics?.completedCourses || dashboardData.enrolledCourses.filter(c => c.status === 'completed').length}
//           />
          
//           <StatCard
//             icon={Trophy}
//             title="Total Points"
//             value={(dashboardData.statistics?.totalPoints || dashboardData.totalPoints || 0).toLocaleString()}
//             change={pointsToday > 0 ? `+${pointsToday} today` : undefined}
//           />
         
//           <StatCard
//             icon={Award}
//             title="Badges Earned"
//             value={dashboardData.statistics?.badgesEarned || dashboardData.badges.length}
//             change={badgesThisWeek > 0 ? `+${badgesThisWeek} this week` : undefined}
//             onClick={() => setShowBadgesModal(true)}
//           />
        
//         </div>

//         {/* Main Content Grid */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           {/* Left Column */}
//           <div className="lg:col-span-2 space-y-8">
//             {/* My Courses */}
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.4 }}
//               className="bg-gradient-to-br from-black via-red-950/20 to-gray-900 rounded-xl p-6 border border-red-800/40 shadow-lg shadow-red-900/10"
//             >
//               <div className="flex items-center justify-between mb-6">
//                 <h2 className="text-2xl font-bold text-red-400 flex items-center gap-3">
//                   <BookOpen className="w-7 h-7" />
//                   My Courses ({dashboardData.enrolledCourses.length})
//                 </h2>
//                 <button onClick={() => navigate('/courses')} className="text-red-400 hover:text-red-300 text-sm flex items-center gap-1">
//                   View All <ChevronRight className="w-4 h-4" />
//                 </button>
//               </div>
//               <div className="space-y-4">
//                 {dashboardData.enrolledCourses.slice(0, 3).map(course => (
//                   <CourseCard key={course.id} course={course} />
//                 ))}
//               </div>
//             </motion.div>

//             {/* Progress Tracking */}
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.1, duration: 0.4 }}
//               className="bg-gradient-to-br from-black via-red-950/15 to-gray-900 rounded-xl p-6 border border-red-800/30 shadow-lg shadow-red-900/10"
//             >
//               <h2 className="text-2xl font-bold text-red-400 flex items-center gap-3 mb-6">
//                 <BarChart3 className="w-7 h-7" />
//                 Progress Analytics
//               </h2>
              
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 {/* Weekly Activity */}
//                 <div className="flex flex-col">
//                   <div className="flex items-center h-12 mb-6">
//                     <h3 className="text-xl font-bold text-red-400">Weekly Activity</h3>
//                   </div>
//                   <div className="flex-1">
//                     <div className="space-y-2">
//                       {(dashboardData.weeklyActivity || []).map((dayData, index) => {
//                         const dayShort = dayData.day?.substring(0, 3) || ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][index];
//                         return (
//                           <div key={dayData.day || index} className="flex items-center gap-3">
//                             <span className="text-xs text-gray-400 w-8">{dayShort}</span>
//                             <div className="flex-1 bg-gray-800 rounded-full h-2 shadow-inner">
//                               <div 
//                                 className="bg-gradient-to-r from-red-500 to-red-400 h-2 rounded-full transition-all duration-500 shadow-sm shadow-red-500/20"
//                                 style={{ width: `${dayData.activity || 0}%` }}
//                               ></div>
//                             </div>
//                             <span className="text-xs text-gray-500 w-12 text-right">{dayData.hoursSpent || 0}h</span>
//                           </div>
//                         );
//                       })}
//                     </div>
//                   </div>
//                 </div>

//                 {/* Overall Progress - Large Donut Chart */}
//                 <div className="flex flex-col">
//                   <div className="flex items-center h-12 mb-6">
//                     <h3 className="text-xl font-bold text-red-400">Overall Learning Progress</h3>
//                   </div>
//                   <div className="flex-1">
//                     <div className="flex justify-center items-center py-4">
//                       <div className="text-center">
//                         <DonutChart 
//                           percentage={
//                             dashboardData.enrolledCourses.length > 0 
//                               ? dashboardData.enrolledCourses.reduce((sum, course) => sum + course.progress, 0) / dashboardData.enrolledCourses.length 
//                               : 0
//                           }
//                           size={200}
//                           strokeWidth={16}
//                           color="#ef4444"
//                           label="Overall Progress"
//                         />
//                         <div className="mt-4">
//                           <p className="text-lg text-gray-300 font-medium mb-2">
//                             {dashboardData.enrolledCourses.filter(c => c.status === 'ongoing').length} Active Courses
//                           </p>
//                           <p className="text-sm text-gray-400">
//                             {dashboardData.enrolledCourses.filter(c => c.status === 'completed').length} Completed • {dashboardData.enrolledCourses.length} Total
//                           </p>
//                         </div>
//                       </div>
//                     </div>
                    
//                     {/* Course List Summary */}
//                     <div className="mt-4">
//                       <h4 className="text-sm font-medium text-gray-400 mb-4">Course Progress Details</h4>
//                       <div className="space-y-3">
//                         {dashboardData.enrolledCourses.filter(c => c.status === 'ongoing').slice(0, 3).map(course => (
//                           <div key={course.id} className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg">
//                             <div>
//                               <p className="text-sm text-gray-300 font-medium">{course.title}</p>
//                               <p className="text-xs text-gray-500">{course.instructor}</p>
//                             </div>
//                             <div className="text-right">
//                               <span className="text-lg font-bold text-red-400">{course.progress}%</span>
//                               <p className="text-xs text-gray-500">Complete</p>
//                             </div>
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </motion.div>

//             {/* Recent Activity */}
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.2, duration: 0.4 }}
//               className="bg-gradient-to-br from-black via-red-950/15 to-gray-900 rounded-xl p-6 border border-red-800/30 shadow-lg shadow-red-900/10"
//             >
//               <h2 className="text-2xl font-bold text-red-400 flex items-center gap-3 mb-6">
//                 <Activity className="w-7 h-7" />
//                 Recent Activity
//               </h2>
//               <div className="space-y-4">
//                 {dashboardData.recentActivity.map((activity, index) => (
//                   <div key={index} className="flex items-center gap-4 p-4 bg-gray-800/60 rounded-lg border border-red-800/20 hover:bg-gray-800/80 transition-all duration-300">
//                     <div className="p-2 bg-red-600/20 rounded-lg border border-red-600/30">
//                       {activity.type === 'quiz_completed' && <CheckCircle2 className="w-4 h-4 text-green-400" />}
//                       {activity.type === 'badge_earned' && <Award className="w-4 h-4 text-yellow-400" />}
//                       {activity.type === 'lesson_completed' && <PlayCircle className="w-4 h-4 text-blue-400" />}
//                     </div>
//                     <div className="flex-1">
//                       <p className="text-sm text-white">
//                         {activity.type === 'quiz_completed' && `Completed quiz in ${activity.course} (+${activity.points} points)`}
//                         {activity.type === 'badge_earned' && `Earned ${activity.badge} badge`}
//                         {activity.type === 'lesson_completed' && `Completed "${activity.lesson}" in ${activity.course}`}
//                       </p>
//                       <p className="text-xs text-gray-400">{formatTimeAgo(activity.date) || activity.time}</p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </motion.div>
//           </div>

//           {/* Right Column */}
//           <div className="space-y-8">
//             {/* Achievements & Badges */}
//             <motion.div
//               initial={{ opacity: 0, x: 20 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.4 }}
//               className="bg-gradient-to-br from-black via-red-950/20 to-gray-900 rounded-xl p-6 border border-red-800/40 shadow-lg shadow-red-900/10"
//             >
//               <h2 className="text-2xl font-bold text-red-400 flex items-center gap-3 mb-6">
//                 <Trophy className="w-7 h-7" />
//                 My Badges ({dashboardData.badges.length})
//               </h2>
//               <BadgeDisplay badges={dashboardData.badges} />
//               <div className="mt-6 text-center">
//                 <button onClick={() => setShowBadgesModal(true)} className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 px-6 py-3 rounded-lg text-sm font-semibold transition-all duration-300 shadow-lg shadow-red-600/30 hover:shadow-red-600/50">
//                   View All Badges
//                 </button>
//               </div>
//             </motion.div>

//             {/* Upcoming Deadlines */}
//             <motion.div
//               initial={{ opacity: 0, x: 20 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ delay: 0.1, duration: 0.4 }}
//               className="bg-gradient-to-br from-black via-red-950/15 to-gray-900 rounded-xl p-6 border border-red-800/30 shadow-lg shadow-red-900/10"
//             >
//               <h2 className="text-2xl font-bold text-red-400 flex items-center gap-3 mb-6">
//                 <Clock className="w-7 h-7" />
//                 Upcoming Deadlines
//               </h2>
//               <div className="space-y-3">
//                 {dashboardData.upcomingDeadlines.map((deadline, index) => (
//                   <div key={index} className={`p-3 rounded-lg border-l-4 ${
//                     deadline.priority === 'high' 
//                       ? 'bg-red-900/20 border-red-500' 
//                       : 'bg-yellow-900/20 border-yellow-500'
//                   }`}>
//                     <div className="flex items-center justify-between">
//                       <div>
//                         <p className="text-sm font-medium text-white">{deadline.title}</p>
//                         <p className="text-xs text-gray-400">{deadline.course}</p>
//                       </div>
//                       <span className={`text-xs px-2 py-1 rounded ${
//                         deadline.priority === 'high' 
//                           ? 'bg-red-600 text-white' 
//                           : 'bg-yellow-600 text-white'
//                       }`}>
//                         {deadline.due}
//                       </span>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </motion.div>

//             {/* Announcements */}
//             <motion.div
//               initial={{ opacity: 0, x: 20 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ delay: 0.2, duration: 0.4 }}
//               className="bg-gradient-to-br from-black via-red-950/15 to-gray-900 rounded-xl p-6 border border-red-800/30 shadow-lg shadow-red-900/10"
//             >
//               <h2 className="text-2xl font-bold text-red-400 flex items-center gap-3 mb-6">
//                 <Bell className="w-7 h-7" />
//                 Announcements
//               </h2>
//               <div className="space-y-3">
//                 {dashboardData.announcements.map((announcement, index) => (
//                   <div key={index} className={`p-3 rounded-lg ${
//                     announcement.important 
//                       ? 'bg-red-900/20 border border-red-700/30' 
//                       : 'bg-gray-800/50'
//                   }`}>
//                     <div className="flex items-start gap-3">
//                       {announcement.important && (
//                         <div className="p-1 bg-red-600/20 rounded">
//                           <Bell className="w-3 h-3 text-red-400" />
//                         </div>
//                       )}
//                       <div className="flex-1">
//                         <p className="text-sm font-medium text-white">{announcement.title}</p>
//                         <p className="text-xs text-gray-400 mt-1">{announcement.message}</p>
//                         <p className="text-xs text-gray-500 mt-2">{announcement.time}</p>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </motion.div>

//             {/* Quick Actions */}
//             <motion.div
//               initial={{ opacity: 0, x: 20 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ delay: 0.3, duration: 0.4 }}
//               className="bg-gradient-to-br from-black via-red-950/10 to-gray-900 rounded-xl p-6 border border-red-800/30 shadow-lg shadow-red-900/10"
//             >
//               <h2 className="text-2xl font-bold text-red-400 flex items-center gap-3 mb-6">
//                 <Target className="w-7 h-7" />
//                 Quick Actions
//               </h2>
//               <div className="grid grid-cols-2 gap-4">
//                 <button onClick={() => navigate('/profile')} className="flex flex-col items-center gap-3 p-4 bg-red-600/20 hover:bg-red-600/30 rounded-lg transition-all duration-300 border border-red-600/40 hover:border-red-500/60 group">
//                   <Download className="w-6 h-6 text-red-400 group-hover:text-red-300 transition-colors" />
//                   <span className="text-sm text-red-400 group-hover:text-red-300 font-medium">Certificates</span>
//                 </button>
//                 <button onClick={() => navigate('/faqs')} className="flex flex-col items-center gap-3 p-4 bg-red-700/20 hover:bg-red-700/30 rounded-lg transition-all duration-300 border border-red-700/40 hover:border-red-600/60 group">
//                   <CreditCard className="w-6 h-6 text-red-300 group-hover:text-red-200 transition-colors" />
//                   <span className="text-sm text-red-300 group-hover:text-red-200 font-medium">Payments</span>
//                 </button>
//                 <button onClick={() => navigate('/faqs')} className="flex flex-col items-center gap-3 p-4 bg-red-800/20 hover:bg-red-800/30 rounded-lg transition-all duration-300 border border-red-800/40 hover:border-red-700/60 group">
//                   <MessageSquare className="w-6 h-6 text-red-300 group-hover:text-red-200 transition-colors" />
//                   <span className="text-sm text-red-300 group-hover:text-red-200 font-medium">Support</span>
//                 </button>
//                 <button onClick={() => navigate('/faqs')} className="flex flex-col items-center gap-3 p-4 bg-red-900/20 hover:bg-red-900/30 rounded-lg transition-all duration-300 border border-red-900/40 hover:border-red-800/60 group">
//                   <HelpCircle className="w-6 h-6 text-red-400 group-hover:text-red-300 transition-colors" />
//                   <span className="text-sm text-red-400 group-hover:text-red-300 font-medium">Help Center</span>
//                 </button>
//               </div>
//             </motion.div>
//           </div>
//         </div>
//       </div>
//       {showBadgesModal && (
//         <BadgesModal badges={dashboardData.badges} onClose={() => setShowBadgesModal(false)} />
//       )}
//     </div>
//   );
// };

// export default StudentDashboard;






