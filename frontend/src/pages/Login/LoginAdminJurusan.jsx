import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { LoginUser, reset } from "../../features/authSlice";
import { FaLongArrowAltRight } from "react-icons/fa";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { HiMiniUser, HiLockClosed } from "react-icons/hi2";
import { Users } from "lucide-react";

const LoginAdminJurusan = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState({ username: false, password: false });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isSuccess, isLoading, error } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user || isSuccess) {
      if (user?.role === "admin_jurusan") {
        navigate("/dashboard/admin/jurusan");
      } else {
        // Redirect to appropriate dashboard based on actual role
        if (user?.role === "admin") {
          navigate("/dashboard/admin");
        } else if (user?.role === "dosen") {
          navigate("/dashboard/dosen");
        }
      }
    }

    return () => {
      dispatch(reset());
    };
  }, [user, isSuccess, dispatch, navigate]);

  const handleFocus = (field) => {
    setIsFocused({ ...isFocused, [field]: true });
  };

  const handleBlur = (field) => {
    setIsFocused({ ...isFocused, [field]: false });
  };

  const Auth = async (e) => {
    e.preventDefault();
    dispatch(LoginUser({ username, password }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back to Portal Link */}
        <div className="mb-6 text-center">
          <Link 
            to="/" 
            className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors"
          >
            ← Back to Portal
          </Link>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
          {/* Header Section */}
          <div className="px-8 pt-8 pb-6 text-center bg-gradient-to-r from-blue-500 to-cyan-500">
            {/* Logo */}
            <div className="w-16 h-16 mx-auto mb-6 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">Admin Jurusan</h1>
            <p className="text-blue-100 text-sm">Portal Administrator Tingkat Jurusan</p>
          </div>

          {/* Form Section */}
          <div className="px-8 pb-8 space-y-6">
            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                <div className="flex items-center space-x-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  <span>{error}</span>
                </div>
              </div>
            )}

            <form onSubmit={Auth} className="space-y-5">
              {/* Username Field */}
              <div className="space-y-2 mt-5">
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                  Username
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <HiMiniUser className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    onFocus={() => handleFocus("username")}
                    onBlur={() => handleBlur("username")}
                    required
                    placeholder="Enter your username"
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                      isFocused.username ? "border-blue-500 shadow-sm" : "border-gray-300"
                    }`}
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <HiLockClosed className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => handleFocus("password")}
                    onBlur={() => handleBlur("password")}
                    required
                    placeholder="Enter your password"
                    className={`w-full pl-10 pr-12 py-3 border rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                      isFocused.password ? "border-blue-500 shadow-sm" : "border-gray-300"
                    }`}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <HiEyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" />
                    ) : (
                      <HiEye className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" />
                    )}
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                    Remember me
                  </label>
                </div>
                <div className="text-sm">
                  <Link 
                    to="/forgot/password" 
                    className="font-medium text-blue-600 hover:text-blue-500 transition-colors"
                  >
                    Forgot password?
                  </Link>
                </div>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full flex justify-center items-center gap-3 py-3 px-4 rounded-lg font-semibold text-white transition-all duration-200 ${
                  isLoading 
                    ? "bg-gray-400 cursor-not-allowed" 
                    : "bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-sm hover:shadow-md"
                }`}
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Signing in...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In</span>
                    <FaLongArrowAltRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-8 py-6 border-t border-gray-200">
            <div className="text-center">
              <p className="text-sm text-gray-600">
                © {new Date().getFullYear()} Administrasi Bisnis
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Politeknik Negeri Manado
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginAdminJurusan;