import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { GraduationCap, Mail, Lock } from 'lucide-react';
import { motion } from 'framer-motion';
import apiClient from '../services/api';

export function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('admin@university.edu');
  const [password, setPassword] = useState('password123');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await apiClient.post('/auth/login', { email, password });
      const { token, name, email: userEmail, role } = response.data.data;
      if (token) {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify({ name, email: userEmail, role }));
        navigate('/profile');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to login. Check your credentials.');
    } finally {
      setLoading(false);
    }
  };