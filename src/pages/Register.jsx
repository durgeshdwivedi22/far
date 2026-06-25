import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaUser, FaLock, FaEnvelope, FaArrowRight } from 'react-icons/fa';
import { generateId } from '../utils/storage';

/* ✅ Inline Input Component */
const InputField = ({
  label,
  type = 'text',
  value,
  onChange,
  onBlur,
  error,
  icon: Icon
}) => {
  return (
    <div className="w-full">
      <label className="block mb-1 text-sm font-medium text-gray-700">
        {label}
      </label>

      <div className="relative">
        {Icon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <Icon />
          </span>
        )}

        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)} // ✅ FIXED
          onBlur={onBlur}
          className={`w-full pl-10 pr-3 py-2 border rounded-lg outline-none transition
            ${error ? 'border-red-500' : 'border-gray-300 focus:border-green-500'}`}
        />
      </div>

      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

const Register = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  /* ✅ Validation */
  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Name is required';
    }

    if (!formData.email.includes('@')) {
      newErrors.email = 'Valid email required';
    }

    if (formData.password.length < 6) {
      newErrors.password = 'Minimum 6 characters required';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /* ✅ Handle Change */
  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });

    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
    }
  };

  const handleBlur = (field) => {
    setTouched({ ...touched, [field]: true });
  };

  /* ✅ Submit */
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    setTimeout(() => {
      const users = JSON.parse(localStorage.getItem('users') || '[]');

      if (users.find((u) => u.email === formData.email)) {
        alert('User already exists');
        setLoading(false);
        return;
      }

      const newUser = { ...formData, id: generateId() };
      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));

      alert('Registered Successfully');
      navigate('/login');
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md space-y-5"
      >
        <h2 className="text-2xl font-bold text-center text-green-600">
          Create Account
        </h2>

        <InputField
          label="Full Name"
          value={formData.fullName}
          onChange={(val) => handleChange('fullName', val)}
          onBlur={() => handleBlur('fullName')}
          error={touched.fullName && errors.fullName}
          icon={FaUser}
        />

        <InputField
          label="Email"
          value={formData.email}
          onChange={(val) => handleChange('email', val)}
          onBlur={() => handleBlur('email')}
          error={touched.email && errors.email}
          icon={FaEnvelope}
        />

        <InputField
          label="Password"
          type="password"
          value={formData.password}
          onChange={(val) => handleChange('password', val)}
          onBlur={() => handleBlur('password')}
          error={touched.password && errors.password}
          icon={FaLock}
        />

        <InputField
          label="Confirm Password"
          type="password"
          value={formData.confirmPassword}
          onChange={(val) => handleChange('confirmPassword', val)}
          onBlur={() => handleBlur('confirmPassword')}
          error={touched.confirmPassword && errors.confirmPassword}
          icon={FaLock}
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg flex items-center justify-center"
        >
          {loading ? 'Creating...' : (
            <>
              Create Account <FaArrowRight className="ml-2" />
            </>
          )}
        </button>

        <p className="text-sm text-center">
          Already have an account?{' '}
          <Link to="/login" className="text-green-600 font-medium">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;