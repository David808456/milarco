'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [loginData, setLoginData] = useState({ mobile: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers')) || [];
    
    // Fallback to single user storage if array isn't populated yet
    const singleUser = JSON.parse(localStorage.getItem('user'));
    if (singleUser) registeredUsers.push(singleUser);

    const validUser = registeredUsers.find(
      (u) => u.mobile === loginData.mobile && u.password === loginData.password
    );

    if (validUser) {
      localStorage.setItem('user', JSON.stringify(validUser));
      router.push('/dashboard');
    } else {
      setError('Invalid mobile number or password!');
    }
  };

  return (
    <div style={{ backgroundColor: '#0d0d11', color: '#ffffff', fontFamily: 'sans-serif', minHeight: '100vh' }}>
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 2rem', background: '#16161e', borderBottom: '1px solid #232330' }}>
        <h2 style={{ color: '#00ff88', margin: 0, fontWeight: '800' }}>MiLarco</h2>
      </nav>

      <div style={{ height: '180px', background: 'linear-gradient(rgba(0,0,0,0.7), rgba(13,13,17,1)), url("https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80")', backgroundSize: 'cover', backgroundPosition: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <h1 style={{ fontSize: '2.5rem', letterSpacing: '2px', textTransform: 'uppercase' }}>Login</h1>
      </div>

      <main style={{ display: 'flex', justifyContent: 'center', padding: '2rem 1rem' }}>
        <form onSubmit={handleLogin} style={{ background: '#16161e', border: '1px solid #232330', borderRadius: '12px', padding: '2rem', width: '100%', maxWidth: '400px' }}>
          {error && <p style={{ color: '#ff4800', fontSize: '0.85rem', marginBottom: '1rem', textAlign: 'center' }}>{error}</p>}
          
          <div style={{ marginBottom: '1.2rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', color: '#b3b3c6' }}>Mobile No *</label>
            <input type="tel" name="mobile" value={loginData.mobile} onChange={handleChange} placeholder="98XXXXXXXX" required style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid #232330', background: '#0d0d11', color: '#fff', boxSizing: 'border-box' }} />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', color: '#b3b3c6' }}>Password *</label>
            <input type="password" name="password" value={loginData.password} onChange={handleChange} placeholder="••••••••" required style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid #232330', background: '#0d0d11', color: '#fff', boxSizing: 'border-box' }} />
          </div>

          <button type="submit" style={{ width: '100%', background: '#00ff88', color: '#000', border: 'none', padding: '0.75rem', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>
            Sign In
          </button>
        </form>
      </main>
    </div>
  );
}
