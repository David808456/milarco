'use client';

import { useState } from 'react';

export default function AuthPage() {
  const [formData, setFormData] = useState({
    username: '',
    mobile: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('User Registered:', formData);
    alert(`Account created for ${formData.username}!`);
  };

  return (
    <div style={{ backgroundColor: '#0d0d11', color: '#ffffff', fontFamily: 'sans-serif', minHeight: '100vh' }}>
      
      {/* Top Navbar */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 2rem', background: '#16161e', borderBottom: '1px solid #232330' }}>
        <h2 style={{ color: '#00ff88', margin: 0, fontWeight: '800' }}>MiLarco</h2>
        <div style={{ display: 'flex', gap: '1.5rem', color: '#8a8a9e', fontSize: '0.9rem' }}>
          <span>Home</span>
          <span>Tournaments</span>
          <span>Contact</span>
          <span style={{ color: '#00ff88' }}>Account</span>
        </div>
      </nav>

      {/* Hero Banner Header */}
      <div style={{ 
        height: '200px', 
        background: 'linear-gradient(rgba(0,0,0,0.7), rgba(13,13,17,1)), url("https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80")', 
        backgroundSize: 'cover', 
        backgroundPosition: 'center',
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center' 
      }}>
        <h1 style={{ fontSize: '2.5rem', letterSpacing: '2px', textTransform: 'uppercase' }}>Sign Up</h1>
      </div>

      {/* Form Container */}
      <main style={{ display: 'flex', justifyContent: 'center', padding: '2rem 1rem' }}>
        <form onSubmit={handleSubmit} style={{ background: '#16161e', border: '1px solid #232330', borderRadius: '12px', padding: '2rem', width: '100%', maxWidth: '400px' }}>
          
          <div style={{ marginBottom: '1.2rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', color: '#b3b3c6' }}>User Name *</label>
            <input 
              type="text" 
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter username" 
              required
              style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid #232330', background: '#0d0d11', color: '#fff', boxSizing: 'border-box' }} 
            />
          </div>

          <div style={{ marginBottom: '1.2rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', color: '#b3b3c6' }}>Mobile No *</label>
            <input 
              type="tel" 
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              placeholder="+977 98XXXXXXXX" 
              required
              style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid #232330', background: '#0d0d11', color: '#fff', boxSizing: 'border-box' }} 
            />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', color: '#b3b3c6' }}>Password *</label>
            <input 
              type="password" 
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••" 
              required
              style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid #232330', background: '#0d0d11', color: '#fff', boxSizing: 'border-box' }} 
            />
          </div>

          <button type="submit" style={{ width: '100%', background: '#00ff88', color: '#000', border: 'none', padding: '0.75rem', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>
            Create Account
          </button>
        </form>
      </main>

    </div>
  );
}
