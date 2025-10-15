import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
  User,
  Camera,
  Phone,
  IdCard,
  Mail,
  Save,
  ArrowLeft,
  X,
  Check,
  AlertCircle
} from 'lucide-react';

export default function Profile() {
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState({
    fullName: '',
    email: '',
    phone: '',
    rollNo: '',
    avatar: null
  });
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  // Redirect if not authenticated
  useEffect(() => {
    if (!user) {
      navigate('/auth');
    }
  }, [user, navigate]);

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user]);

  const fetchProfile = async () => {
    try {
      // For now, use localStorage data
      const savedProfile = localStorage.getItem('userProfile');
      if (savedProfile) {
        const profileData = JSON.parse(savedProfile);
        setProfileData({
          fullName: profileData.fullName || user?.fullName || '',
          email: profileData.email || user?.email || '',
          phone: profileData.phone || '',
          rollNo: profileData.rollNo || '',
          avatar: profileData.avatar || user?.avatar || null
        });
      } else {
        // Initialize with auth user data
        setProfileData({
          fullName: user?.fullName || '',
          email: user?.email || '',
          phone: '',
          rollNo: '',
          avatar: user?.avatar || null
        });
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setUpdating(true);
    
    try {
      // Save to localStorage for now
      const updatedProfile = {
        fullName: profileData.fullName,
        email: profileData.email,
        phone: profileData.phone,
        rollNo: profileData.rollNo,
        avatar: profileData.avatar
      };
      
      localStorage.setItem('userProfile', JSON.stringify(updatedProfile));
      
      // Update auth context
      updateUser({ 
        ...user, 
        fullName: profileData.fullName,
        phone: profileData.phone,
        rollNo: profileData.rollNo,
        avatar: profileData.avatar
      });
      
      setMessage({ type: 'success', text: 'Profile updated successfully!' });
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to update profile. Please try again.' });
    } finally {
      setUpdating(false);
    }
  };

  const selectAvatar = async (avatarPath) => {
    setUploadingAvatar(true);
    
    try {
      // Update profile data
      const updatedProfile = {
        ...profileData,
        avatar: avatarPath
      };
      
      setProfileData(updatedProfile);
      
      // Save to localStorage
      localStorage.setItem('userProfile', JSON.stringify(updatedProfile));
      
      // Update user in auth context with new avatar
      updateUser({ ...user, avatar: avatarPath });
      
      setMessage({ type: 'success', text: 'Profile picture updated successfully!' });
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to update profile picture' });
    } finally {
      setUploadingAvatar(false);
    }
  };

  const removeAvatar = () => {
    setProfileData(prev => ({ ...prev, avatar: null }));
    updateUser({ ...user, avatar: null });
    setMessage({ type: 'success', text: 'Profile picture removed successfully!' });
    setTimeout(() => setMessage({ type: '', text: '' }), 3000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#95F3EA]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white" style={{backgroundColor: '#000000'}}>
      {/* Header */}
      <div className="bg-gradient-to-r from-black via-[#95F3EA]/40 to-black border-b border-[#95F3EA]/50 shadow-lg shadow-[#95F3EA]/10">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <motion.button
                onClick={() => navigate(-1)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#95F3EA] to-[#95F3EA] hover:from-[#95F3EA] hover:to-[#95F3EA] rounded-lg text-white font-medium transition-all duration-300 shadow-lg shadow-[#95F3EA]/30 hover:shadow-[#95F3EA]/50"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </motion.button>
              <h1 className="text-3xl font-bold text-white">My Profile</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Message */}
        {message.text && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mb-6 p-4 rounded-lg flex items-center gap-3 ${
              message.type === 'success' 
                ? 'bg-green-900/20 border border-green-500/30 text-green-400'
                : 'bg-red-900/20 border border-red-500/30 text-red-400'
            }`}
          >
            {message.type === 'success' ? <Check className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
            {message.text}
          </motion.div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Avatar Section */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-gradient-to-br from-black via-[#95F3EA]/20 to-gray-900 rounded-xl p-6 border border-[#95F3EA]/40 shadow-lg shadow-[#95F3EA]/10"
            >
              <h3 className="text-xl font-bold text-[#95F3EA] mb-6 flex items-center gap-3">
                <Camera className="w-6 h-6" />
                Profile Picture
              </h3>
              
              <div className="flex flex-col items-center">
                <div className="relative mb-6">
                  <div className="w-32 h-32 rounded-full border-4 border-[#95F3EA] shadow-lg shadow-[#95F3EA]/30 overflow-hidden bg-gray-800">
                    {profileData.avatar ? (
                      <img
                        src={profileData.avatar}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <User className="w-16 h-16 text-gray-400" />
                      </div>
                    )}
                  </div>
                  
                  {uploadingAvatar && (
                    <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#95F3EA]"></div>
                    </div>
                  )}
                </div>
                
                {/* Avatar Selection Options */}
                <div className="space-y-4">
                  <h4 className="text-sm font-medium text-gray-300 text-center">Choose Profile Picture</h4>
                  <div className="flex justify-center gap-4">
                    <button
                      onClick={() => selectAvatar('/Boy.jpg')}
                      disabled={uploadingAvatar}
                      className="relative group"
                    >
                      <div className="w-16 h-16 rounded-full border-2 border-blue-500 hover:border-blue-400 overflow-hidden transition-all duration-300 group-hover:scale-105">
                        <img
                          src="/Boy.jpg"
                          alt="Boy Avatar"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="text-xs text-blue-400 block text-center mt-1">Boy</span>
                    </button>
                    
                    <button
                      onClick={() => selectAvatar('/Girl.webp')}
                      disabled={uploadingAvatar}
                      className="relative group"
                    >
                      <div className="w-16 h-16 rounded-full border-2 border-pink-500 hover:border-pink-400 overflow-hidden transition-all duration-300 group-hover:scale-105">
                        <img
                          src="/Girl.webp"
                          alt="Girl Avatar"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="text-xs text-pink-400 block text-center mt-1">Girl</span>
                    </button>
                  </div>
                  
                  {profileData.avatar && (
                    <div className="text-center">
                      <button
                        onClick={removeAvatar}
                        className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center gap-2 mx-auto"
                      >
                        <X className="w-4 h-4" />
                        Remove Picture
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Profile Form */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-gradient-to-br from-black via-[#95F3EA]/20 to-gray-900 rounded-xl p-6 border border-[#95F3EA]/40 shadow-lg shadow-[#95F3EA]/10"
            >
              <h3 className="text-xl font-bold text-[#95F3EA] mb-6 flex items-center gap-3">
                <User className="w-6 h-6" />
                Personal Information
              </h3>
              
              <form onSubmit={handleProfileUpdate} className="space-y-6">
                {/* Full Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={profileData.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#95F3EA] focus:border-transparent text-white"
                    required
                  />
                </div>

                {/* Email (Read-only) */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    <Mail className="w-4 h-4 inline mr-2" />
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={profileData.email}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-400 cursor-not-allowed"
                    readOnly
                  />
                  <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    <Phone className="w-4 h-4 inline mr-2" />
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={profileData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#95F3EA] focus:border-transparent text-white"
                    placeholder="Enter your phone number"
                  />
                </div>

                {/* Roll Number */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    <IdCard className="w-4 h-4 inline mr-2" />
                    University Roll Number
                  </label>
                  <input
                    type="text"
                    value={profileData.rollNo}
                    onChange={(e) => handleInputChange('rollNo', e.target.value)}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#95F3EA] focus:border-transparent text-white"
                    placeholder="Enter your roll number"
                  />
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={updating}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-[#95F3EA] to-[#95F3EA] hover:from-[#95F3EA] hover:to-[#95F3EA] disabled:from-gray-600 disabled:to-gray-700 px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2"
                >
                  {updating ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  ) : (
                    <>
                      <Save className="w-5 h-5" />
                      Save Changes
                    </>
                  )}
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
