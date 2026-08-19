'use client';

import { useEffect, useState } from 'react';

export default function DashboardPage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem('user'));
    if (savedUser) {
      setUser(savedUser);
    }
  }, []);

  return (
    <div style={{ backgroundColor: '#0d0d11', color: '#ffffff', fontFamily: 'sans-serif', minHeight: '100vh', padding: '2rem' }}>
      <header style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.8rem', fontWeight: '800', color: '#00ff88', margin: 0 }}>
          Welcome, {user ? user.username : 'Gamer'}!
        </h1>
        <p style={{ color: '#8a8a9e', fontSize: '1.1rem', marginTop: '0.5rem' }}>Select a lobby below to start playing.</p>
      </header>

      <main style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', maxWidth: '1000px', margin: '0 auto' }}>
        <div style={{ background: '#16161e', border: '1px solid #232330', borderRadius: '12px', padding: '1.5rem', textAlign: 'center' }}>
          <h3>Free Fire</h3>
          <button style={{ background: '#00ff88', color: '#000', border: 'none', padding: '0.75rem 1.5rem', borderRadius: '8px', fontWeight: '600', cursor: 'pointer', width: '100%', marginTop: '1rem' }}>
            Enter Room
          </button>
        </div>

        <div style={{ background: '#16161e', border: '1px solid #232330', borderRadius: '12px', padding: '1.5rem', textAlign: 'center' }}>
          <h3>eFootball</h3>
          <button style={{ background: '#00ff88', color: '#000', border: 'none', padding: '0.75rem 1.5rem', borderRadius: '8px', fontWeight: '600', cursor: 'pointer', width: '100%', marginTop: '1rem' }}>
            Matchmaking
          </button>
        </div>
      </main>
    </div>
  );
}
