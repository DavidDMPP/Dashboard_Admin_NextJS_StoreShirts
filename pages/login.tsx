import React, { useState } from 'react';
import { AlertCircle } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('https://medieval-jacquenetta-daviddmpp-a0d98830.koyeb.app/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log('Login response:', data);

      if (!response.ok) {
        throw new Error(data.message || 'Login gagal');
      }

      // Check if data.data exists and contains the token
      if (data.success && data.data && data.data.token) {
        localStorage.setItem('token', data.data.token);
        window.location.href = '/beranda';
      } else {
        setError('Login gagal: Token tidak valid');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Email atau password salah');
    } finally {
      setIsLoading(false);
    }
  };

  // Function to register admin
  const handleRegisterAdmin = async () => {
    try {
      setIsLoading(true);
      setError('');

      const response = await fetch('https://medieval-jacquenetta-daviddmpp-a0d98830.koyeb.app/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: "Admin User",
          email: "admin@example.com",
          password: "admin123"
        }),
      });

      const data = await response.json();
      console.log('Register response:', data);

      if (!response.ok) {
        throw new Error(data.message || 'Register failed');
      }

      alert('Admin registered successfully. Please login with email: admin@example.com and password: admin123');
      setEmail('admin@example.com');
      setPassword('admin123');
    } catch (err) {
      console.error('Register error:', err);
      setError('Gagal melakukan registrasi');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
      <div className="w-full max-w-md p-6 bg-gray-800 border border-gray-700 rounded-lg">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-white">Login Admin</h1>
          <p className="text-gray-400 mt-2">Masuk ke dashboard admin</p>
        </div>

        {error && (
          <div className="mb-4 bg-red-900/50 border border-red-900 text-red-300 p-3 rounded-lg">
            <div className="flex items-center">
              <AlertCircle className="h-4 w-4 mr-2" />
              <p className="text-sm">{error}</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-200" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="admin@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 rounded-md bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-200" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 rounded-md bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button 
            type="submit" 
            className={`w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              isLoading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={isLoading}
          >
            {isLoading ? 'Loading...' : 'Login'}
          </button>
        </form>

        {/* Register button for first-time setup */}
        <div className="mt-4 text-center">
          <p className="text-gray-400 text-sm">Belum punya akun admin?</p>
          <button
            onClick={handleRegisterAdmin}
            className="mt-2 text-blue-400 hover:text-blue-300 text-sm"
            disabled={isLoading}
          >
            Daftar Admin Baru
          </button>
        </div>
      </div>
    </div>
  );
}