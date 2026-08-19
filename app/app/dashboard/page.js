'use client';

import { useEffect, useState } from 'react';

export default function DashboardPage() {
  const [user, setUser] = useState(null);
  const [balance, setBalance] = useState(150);
  const [activeTab, setActiveTab] = useState('all');

  const matches = [
    {
      id: 101,
      title: 'Free Fire Solo Clash',
      game: 'Free Fire',
      type: 'SOLO',
      map: 'Bermuda',
      time: '08:00 PM Today',
      entryFee: 25,
      prizePool: 300,
      perKill: 10,
      joined: 38,
      totalSeats: 48,
      status: 'OPEN'
    },
    {
      id: 102,
      title: 'Free Fire Squad Rush',
      game: 'Free Fire',
      type: 'SQUAD',
      map: 'Kalahari',
      time: '09:30 PM Today',
      entryFee: 100,
      prizePool: 1200,
      perKill: 20,
      joined: 8,
      totalSeats: 12,
      status: 'OPEN'
    },
    {
      id: 201,
      title: 'eFootball 1v1 Championship',
      game: 'eFootball',
      type: '1v1',
      map: 'Standard Match',
      time: '08:30 PM Today',
      entryFee: 50,
      prizePool: 90,
      perKill: 0,
      joined: 14,
      totalSeats: 16,
      status: 'UPCOMING'
    }
  ];

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem('user'));
    if (savedUser) {
      setUser(savedUser);
    }
  }, []);

  const handleJoin = (match) => {
    if (balance < match.entryFee) {
      alert('Insufficient wallet balance! Please top up your balance.');
      return;
    }
    setBalance(balance - match.entryFee);
    alert(`Successfully registered for ${match.title}! Room ID & Password will display 15 mins before match time.`);
  };

  const filteredMatches = activeTab === 'all' 
    ? matches 
    : matches.filter(m => m.game.toLowerCase().replace(' ', '') === activeTab);

  return (
    <div style={{ backgroundColor: '#0d0d11', color: '#ffffff', fontFamily: 'sans-serif', minHeight: '100vh', padding: '1.5rem 1rem' }}>
      
      {/* Top Bar with Branding & Wallet */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '1000px', margin: '0 auto 2rem auto', background: '#16161e', padding: '1rem 1.5rem', borderRadius: '12px', border: '1px solid #232330' }}>
        <div>
          <h2 style={{ color: '#00ff88', margin: 0, fontWeight: '800', fontSize: '1.6rem', letterSpacing: '1px' }}>MiLarco</h2>
          <span style={{ fontSize: '0.8rem', color: '#8a8a9e' }}>Player: {user ? user.username : 'Gamer'}</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ background: '#0d0d11', border: '1px solid #232330', padding: '0.5rem 1rem', borderRadius: '8px', textAlign: 'right' }}>
            <span style={{ fontSize: '0.75rem', color: '#8a8a9e', display: 'block' }}>Wallet Balance</span>
            <strong style={{ color: '#00ff88', fontSize: '1.1rem' }}>NPR {balance}</strong>
          </div>
          <button style={{ background: '#00ff88', color: '#000', border: 'none', padding: '0.6rem 1rem', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>
            + Add Cash
          </button>
        </div>
      </nav>

      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        
        {/* Game Filter Category Tabs */}
        <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem', borderBottom: '1px solid #232330', paddingBottom: '0.75rem' }}>
          {['all', 'freefire', 'efootball'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                background: activeTab === tab ? '#00ff88' : '#16161e',
                color: activeTab === tab ? '#000' : '#8a8a9e',
                border: '1px solid #232330',
                padding: '0.5rem 1.25rem',
                borderRadius: '6px',
                fontWeight: 'bold',
                cursor: 'pointer',
                textTransform: 'uppercase',
                fontSize: '0.85rem'
              }}
            >
              {tab === 'all' ? 'All Matches' : tab}
            </button>
          ))}
        </div>

        {/* Tournament / Match Listings */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
          {filteredMatches.map((match) => (
            <div key={match.id} style={{ background: '#16161e', border: '1px solid #232330', borderRadius: '12px', padding: '1.25rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                  <span style={{ background: '#232330', color: '#00ff88', padding: '0.25rem 0.6rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 'bold' }}>
                    {match.game} ({match.type})
                  </span>
                  <span style={{ background: '#00ff8822', color: '#00ff88', border: '1px solid #00ff88', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 'bold' }}>
                    {match.status}
                  </span>
                </div>

                <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.2rem', color: '#fff' }}>{match.title}</h3>
                <p style={{ color: '#8a8a9e', fontSize: '0.85rem', margin: '0 0 1rem 0' }}>⏰ {match.time} | Map: {match.map}</p>

                {/* Match Rewards Breakdown */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', background: '#0d0d11', borderRadius: '8px', padding: '0.75rem', marginBottom: '1rem', textAlign: 'center', gap: '0.5rem' }}>
                  <div>
                    <span style={{ fontSize: '0.7rem', color: '#8a8a9e', display: 'block' }}>PRIZE POOL</span>
                    <strong style={{ color: '#00ff88', fontSize: '0.9rem' }}>NPR {match.prizePool}</strong>
                  </div>
                  <div>
                    <span style={{ fontSize: '0.7rem', color: '#8a8a9e', display: 'block' }}>PER KILL</span>
                    <strong style={{ color: '#fff', fontSize: '0.9rem' }}>NPR {match.perKill}</strong>
                  </div>
                  <div>
                    <span style={{ fontSize: '0.7rem', color: '#8a8a9e', display: 'block' }}>ENTRY</span>
                    <strong style={{ color: '#ff4800', fontSize: '0.9rem' }}>NPR {match.entryFee}</strong>
                  </div>
                </div>

                {/* Spots Progress */}
                <div style={{ marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#8a8a9e', marginBottom: '0.25rem' }}>
                    <span>Spots Joined</span>
                    <span>{match.joined} / {match.totalSeats}</span>
                  </div>
                  <div style={{ background: '#0d0d11', height: '6px', borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{ width: `${(match.joined / match.totalSeats) * 100}%`, background: '#00ff88', height: '100%' }}></div>
                  </div>
                </div>
              </div>

              <button 
                onClick={() => handleJoin(match)}
                style={{ width: '100%', background: '#00ff88', color: '#000', border: 'none', padding: '0.75rem', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', fontSize: '0.95rem' }}
              >
                Join Match (NPR {match.entryFee})
              </button>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
