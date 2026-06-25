import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaUser, FaLock, FaEnvelope, FaSeedling, FaArrowRight } from "react-icons/fa";
import { storage } from "../utils/storage";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    fullName: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // ✅ check login
  useEffect(() => {
    const user = storage.getUser();
    if (user) navigate("/dashboard");
  }, [navigate]);

  // ✅ handle input
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  // ✅ validation
  const validate = () => {
    let err = {};

    if (!formData.email.includes("@")) err.email = "Valid email required";
    if (formData.password.length < 6) err.password = "Min 6 characters";

    if (!isLogin) {
      if (formData.fullName.length < 3) err.fullName = "Enter valid name";
      if (formData.password !== formData.confirmPassword)
        err.confirmPassword = "Passwords not match";
    }

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  // ✅ submit
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    setLoading(true);

    setTimeout(() => {
      let users = JSON.parse(localStorage.getItem("users") || "[]");

      if (isLogin) {
        const user = users.find(
          (u) =>
            u.email === formData.email &&
            u.password === formData.password
        );

        if (!user) {
          alert("Invalid login");
          setLoading(false);
          return;
        }

        storage.saveUser(user);
        alert("Login successful");
        navigate("/dashboard");
      } else {
        if (users.find((u) => u.email === formData.email)) {
          alert("User already exists");
          setLoading(false);
          return;
        }

        users.push(formData);
        localStorage.setItem("users", JSON.stringify(users));

        alert("Account created");
        setIsLogin(true);
      }

      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white w-full max-w-md p-8 rounded-xl shadow-lg space-y-5">
        
        {/* Header */}
        <div className="text-center">
          <div className="flex justify-center mb-3 text-green-600 text-3xl">
            <FaSeedling />
          </div>
          <h2 className="text-2xl font-bold">
            {isLogin ? "Login" : "Create Account"}
          </h2>
          <p className="text-gray-500 text-sm">
            {isLogin
              ? "Welcome back"
              : "Join smart farmers platform"}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">

          {!isLogin && (
            <div>
              <div className="flex items-center border rounded px-3 py-2">
                <FaUser className="text-gray-400 mr-2" />
                <input
                  type="text"
                  name="fullName"
                  placeholder="Full Name"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full outline-none"
                />
              </div>
              <p className="text-red-500 text-sm">{errors.fullName}</p>
            </div>
          )}

          {/* Email */}
          <div>
            <div className="flex items-center border rounded px-3 py-2">
              <FaEnvelope className="text-gray-400 mr-2" />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full outline-none"
              />
            </div>
            <p className="text-red-500 text-sm">{errors.email}</p>
          </div>

          {/* Password */}
          <div>
            <div className="flex items-center border rounded px-3 py-2">
              <FaLock className="text-gray-400 mr-2" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full outline-none"
              />
            </div>
            <p className="text-red-500 text-sm">{errors.password}</p>
          </div>

          {/* Confirm Password */}
          {!isLogin && (
            <div>
              <div className="flex items-center border rounded px-3 py-2">
                <FaLock className="text-gray-400 mr-2" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full outline-none"
                />
              </div>
              <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
            </div>
          )}

          {/* Show Password */}
          <div className="flex items-center text-sm">
            <input
              type="checkbox"
              onChange={(e) => setShowPassword(e.target.checked)}
              className="mr-2"
            />
            Show Password
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded flex justify-center items-center"
          >
            {loading ? "Please wait..." : (
              <>
                {isLogin ? "Login" : "Signup"}
                <FaArrowRight className="ml-2" />
              </>
            )}
          </button>
        </form>

        {/* Toggle */}
        <p className="text-center text-sm">
          {isLogin ? "No account?" : "Already have account?"}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-green-600 ml-2"
          >
            {isLogin ? "Signup" : "Login"}
          </button>
        </p>

        {/* Quick Access */}
        <div className="text-center text-sm text-gray-500">
          <p>Explore without login:</p>
          <div className="space-x-3 mt-1">
            <Link to="/market" className="text-green-600">Market</Link>
            <span>|</span>
            <Link to="/weather" className="text-green-600">Weather</Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Login;