'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ username: '', mobile: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(''); // Clear error on typing
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 1. Mobile number validation (Must be exactly 10 digits)
    const mobileRegex = /^[0-9]{10}$/;
    if (!mobileRegex.test(formData.mobile)) {
      setError('Mobile number must be exactly 10 digits.');
      return;
    }

    // 2. Password validation (Must be at least 8 characters)
    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }

    // 3. Duplicate check in local storage
    const existingUsers = JSON.parse(localStorage.getItem('registeredUsers')) || [];
    const userExists = existingUsers.some((u) => u.mobile === formData.mobile);

    if (userExists) {
      alert('This mobile number is already registered! Redirecting to login page...');
      router.push('/login');
      return;
    }

    // Save user to array and save back to local storage
    existingUsers.push(formData);
    localStorage.setItem('registeredUsers', JSON.stringify(existingUsers));
    
    // Also save as current logged-in session user
    localStorage.setItem('user', JSON.stringify(formData));

    alert('Account created successfully!');
    router.push('/login');
  };

  return (
    <div style={{ backgroundColor: '#0d0d11', color: '#ffffff', fontFamily: 'sans-serif', minHeight: '100vh' }}>
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 2rem', background: '#16161e', borderBottom: '1px solid #232330' }}>
        <h2 style={{ color: '#00ff88', margin: 0, fontWeight: '800' }}>MiLarco</h2>
      </nav>

      <div style={{ height: '180px', background: 'linear-gradient(rgba(0,0,0,0.7), rgba(13,13,17,1)), url("https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80")', backgroundSize: 'cover', backgroundPosition: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <h1 style={{ fontSize: '2.5rem', letterSpacing: '2px', textTransform: 'uppercase' }}>Sign Up</h1>
      </div>

      <main style={{ display: 'flex', justifyContent: 'center', padding: '2rem 1rem' }}>
        <form onSubmit={handleSubmit} style={{ background: '#16161e', border: '1px solid #232330', borderRadius: '12px', padding: '2rem', width: '100%', maxWidth: '400px' }}>
          
          {error && <p style={{ color: '#ff4800', fontSize: '0.85rem', marginBottom: '1rem', textAlign: 'center' }}>{error}</p>}

          <div style={{ marginBottom: '1.2rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', color: '#b3b3c6' }}>User Name *</label>
            <input type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Enter username" required style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid #232330', background: '#0d0d11', color: '#fff', boxSizing: 'border-box' }} />
          </div>

          <div style={{ marginBottom: '1.2rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', color: '#b3b3c6' }}>Mobile No (10 Digits) *</label>
            <input type="tel" name="mobile" value={formData.mobile} onChange={handleChange} placeholder="98XXXXXXXX" required style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid #232330', background: '#0d0d11', color: '#fff', boxSizing: 'border-box' }} />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', color: '#b3b3c6' }}>Password (Min 8 Chars) *</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="••••••••" required style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid #232330', background: '#0d0d11', color: '#fff', boxSizing: 'border-box' }} />
          </div>

          <button type="submit" style={{ width: '100%', background: '#00ff88', color: '#000', border: 'none', padding: '0.75rem', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>Create Account</button>
        </form>
      </main>
    </div>
  );
}
