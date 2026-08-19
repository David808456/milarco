'use client';

import { useEffect, useState } from 'react';

export default function DashboardPage() {
  const [user, setUser] = useState(null);
  const [balance, setBalance] = useState(0);
  const [activeTab, setActiveTab] = useState('all');
  const [matches, setMatches] = useState([]);

  // Host Match State
  const [showHostForm, setShowHostForm] = useState(false);
  const [hostGame, setHostGame] = useState('Free Fire');
  const [matchTitle, setMatchTitle] = useState('');
  const [matchType, setMatchType] = useState('SOLO');
  const [entryFee, setEntryFee] = useState('');
  const [prizePool, setPrizePool] = useState('');
  const [perKill, setPerKill] = useState('');
  const [matchTime, setMatchTime] = useState('');

  // Admin Coin Dispenser State
  const [targetMobile, setTargetMobile] = useState('');
  const [coinsToAdd, setCoinsToAdd] = useState('');

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem('user'));
    if (savedUser) {
      setUser(savedUser);

      // Check if user is Admin
      const checkAdmin = 
        savedUser.username?.toLowerCase() === 'admin' || 
        savedUser.mobile === '9999999999' || 
        savedUser.password === '00000000';

      const balances = JSON.parse(localStorage.getItem('userBalances')) || {};

      if (checkAdmin) {
        // Admin gets 999,999,999 coins by default if not set
        if (balances[savedUser.mobile] === undefined) {
          balances[savedUser.mobile] = 999999999;
          localStorage.setItem('userBalances', JSON.stringify(balances));
        }
        setBalance(balances[savedUser.mobile]);
      } else {
        // Regular users start at 0
        setBalance(balances[savedUser.mobile] || 0);
      }
    }

    const savedMatches = JSON.parse(localStorage.getItem('milarcoMatches')) || [];
    setMatches(savedMatches);
  }, []);

  const handleHostMatch = (e) => {
    e.preventDefault();
    if (!matchTitle || !entryFee || !prizePool || !matchTime) {
      alert('Please fill in all required match details.');
      return;
    }

    const hostCost = 50;
    if (balance < hostCost) {
      alert(`Insufficient balance! Hosting costs NPR ${hostCost}. Ask Admin to send coins to your mobile number.`);
      return;
    }

    const newMatch = {
      id: Date.now(),
      host: user ? user.username : 'Gamer',
      title: matchTitle,
      game: hostGame,
      type: hostGame === 'eFootball' ? '1v1 Strictly' : matchType,
      time: matchTime,
      entryFee: parseInt(entryFee, 10),
      prizePool: parseInt(prizePool, 10),
      perKill: hostGame === 'eFootball' ? null : parseInt(perKill || 0, 10),
      joined: 1,
      totalSeats: hostGame === 'eFootball' ? 2 : (matchType === 'SOLO' ? 48 : 12),
      status: 'OPEN'
    };

    const updatedMatches = [newMatch, ...matches];
    setMatches(updatedMatches);
    localStorage.setItem('milarcoMatches', JSON.stringify(updatedMatches));

    const updatedBalance = balance - hostCost;
    setBalance(updatedBalance);
    const balances = JSON.parse(localStorage.getItem('userBalances')) || {};
    balances[user.mobile] = updatedBalance;
    localStorage.setItem('userBalances', JSON.stringify(balances));

    alert('Match hosted successfully!');
    setShowHostForm(false);
    setMatchTitle('');
    setEntryFee('');
    setPrizePool('');
    setPerKill('');
    setMatchTime('');
  };

  const handleJoin = (match) => {
    if (balance < match.entryFee) {
      alert('Insufficient wallet balance! Ask Admin to send coins to your mobile number.');
      return;
    }

    if (match.joined >= match.totalSeats) {
      alert('This match is full!');
      return;
    }

    const newBalance = balance - match.entryFee;
    setBalance(newBalance);

    const balances = JSON.parse(localStorage.getItem('userBalances')) || {};
    balances[user.mobile] = newBalance;
    localStorage.setItem('userBalances', JSON.stringify(balances));

    const updatedMatches = matches.map(m => m.id === match.id ? { ...m, joined: m.joined + 1 } : m);
    setMatches(updatedMatches);
    localStorage.setItem('milarcoMatches', JSON.stringify(updatedMatches));

    alert(`Successfully joined ${match.title}!`);
  };

  // Transfer coins from Admin to user by mobile number
  const handleSendCoinsByAdmin = (e) => {
    e.preventDefault();
    if (!targetMobile || !coinsToAdd) {
      alert('Please enter a target mobile number and amount of coins.');
      return;
    }

    const amount = parseInt(coinsToAdd, 10);
    if (isNaN(amount) || amount <= 0) {
      alert('Enter a valid coin amount.');
      return;
    }

    if (balance < amount) {
      alert('Admin does not have enough coins to complete this transfer.');
      return;
    }

    const balances = JSON.parse(localStorage.getItem('userBalances')) || {};
    
    // Deduct from Admin
    const updatedAdminBalance = balance - amount;
    balances[user.mobile] = updatedAdminBalance;
    setBalance(updatedAdminBalance);

    // Add to recipient's mobile number balance
    const currentTargetBal = balances[targetMobile] || 0;
    balances[targetMobile] = currentTargetBal + amount;

    localStorage.setItem('userBalances', JSON.stringify(balances));

    alert(`Successfully sent NPR ${amount} coins to Mobile No: ${targetMobile}!`);
    setTargetMobile('');
    setCoinsToAdd('');
  };

  const isAdmin = user && (
    user.username?.toLowerCase() === 'admin' || 
    user.mobile === '9999999999' || 
    user.password === '00000000'
  );

  const filteredMatches = activeTab === 'all' 
    ? matches 
    : matches.filter(m => m.game.toLowerCase().replace(' ', '') === activeTab);

  return (
    <div style={{ backgroundColor: '#0d0d11', color: '#ffffff', fontFamily: 'sans-serif', minHeight: '100vh', padding: '1.5rem 1rem' }}>
      
      {/* Navigation */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '1000px', margin: '0 auto 2rem auto', background: '#16161e', padding: '1rem 1.5rem', borderRadius: '12px', border: '1px solid #232330' }}>
        <div>
          <h2 style={{ color: '#00ff88', margin: 0, fontWeight: '800', fontSize: '1.6rem', letterSpacing: '1px' }}>MiLarco</h2>
          <span style={{ fontSize: '0.8rem', color: '#8a8a9e' }}>
            Player: {user ? user.username : 'Gamer'} {isAdmin && '👑 (Admin)'}
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ background: '#0d0d11', border: '1px solid #232330', padding: '0.5rem 1rem', borderRadius: '8px', textAlign: 'right' }}>
            <span style={{ fontSize: '0.75rem', color: '#8a8a9e', display: 'block' }}>Wallet Balance</span>
            <strong style={{ color: '#00ff88', fontSize: '1.1rem' }}>NPR {balance.toLocaleString()}</strong>
          </div>
        </div>
      </nav>

      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        
        {/* Admin Coin Sender */}
        {isAdmin && (
          <div style={{ background: '#1e1b18', border: '1px solid #ff9900', borderRadius: '12px', padding: '1.25rem', marginBottom: '2rem' }}>
            <h3 style={{ color: '#ff9900', margin: '0 0 0.25rem 0', fontSize: '1.1rem' }}>👑 Admin Coin Dispenser</h3>
            <p style={{ color: '#8a8a9e', fontSize: '0.8rem', margin: '0 0 1rem 0' }}>Send coins directly to users using their 10-digit mobile number.</p>
            
            <form onSubmit={handleSendCoinsByAdmin} style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <input
                type="tel"
                placeholder="User Mobile No (e.g. 9812345678)"
                value={targetMobile}
                onChange={(e) => setTargetMobile(e.target.value)}
                style={{ flex: 1, padding: '0.6rem', borderRadius: '6px', border: '1px solid #333', background: '#0d0d11', color: '#fff' }}
              />
              <input
                type="number"
                placeholder="Coins (NPR)"
                value={coinsToAdd}
                onChange={(e) => setCoinsToAdd(e.target.value)}
                style={{ width: '130px', padding: '0.6rem', borderRadius: '6px', border: '1px solid #333', background: '#0d0d11', color: '#fff' }}
              />
              <button type="submit" style={{ background: '#ff9900', color: '#000', border: 'none', padding: '0.6rem 1.25rem', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>
                Send Coins
              </button>
            </form>
          </div>
        )}

        {/* Host Match Section */}
        <div style={{ background: '#16161e', border: '1px solid #232330', borderRadius: '12px', padding: '1.25rem', marginBottom: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h3 style={{ margin: 0, color: '#fff' }}>Host Your Own Match</h3>
              <p style={{ margin: '0.2rem 0 0 0', color: '#8a8a9e', fontSize: '0.85rem' }}>Create custom room tournaments for other players (Cost: NPR 50)</p>
            </div>
            <button 
              onClick={() => setShowHostForm(!showHostForm)} 
              style={{ background: '#00ff88', color: '#000', border: 'none', padding: '0.6rem 1.25rem', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}
            >
              {showHostForm ? 'Cancel' : '+ Host Match'}
            </button>
          </div>

          {showHostForm && (
            <form onSubmit={handleHostMatch} style={{ marginTop: '1.25rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', borderTop: '1px solid #232330', paddingTop: '1.25rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: '#8a8a9e', marginBottom: '0.3rem' }}>Select Game</label>
                <select value={hostGame} onChange={(e) => setHostGame(e.target.value)} style={{ width: '100%', padding: '0.6rem', borderRadius: '6px', border: '1px solid #232330', background: '#0d0d11', color: '#fff' }}>
                  <option value="Free Fire">Free Fire</option>
                  <option value="eFootball">eFootball</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: '#8a8a9e', marginBottom: '0.3rem' }}>Match Title</label>
                <input type="text" placeholder="e.g. Midnight Clash 1v1" value={matchTitle} onChange={(e) => setMatchTitle(e.target.value)} required style={{ width: '100%', padding: '0.6rem', borderRadius: '6px', border: '1px solid #232330', background: '#0d0d11', color: '#fff', boxSizing: 'border-box' }} />
              </div>

              {hostGame === 'Free Fire' && (
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: '#8a8a9e', marginBottom: '0.3rem' }}>Mode</label>
                  <select value={matchType} onChange={(e) => setMatchType(e.target.value)} style={{ width: '100%', padding: '0.6rem', borderRadius: '6px', border: '1px solid #232330', background: '#0d0d11', color: '#fff' }}>
                    <option value="SOLO">SOLO</option>
                    <option value="SQUAD">SQUAD</option>
                  </select>
                </div>
              )}

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: '#8a8a9e', marginBottom: '0.3rem' }}>Match Time</label>
                <input type="text" placeholder="e.g. 08:30 PM Today" value={matchTime} onChange={(e) => setMatchTime(e.target.value)} required style={{ width: '100%', padding: '0.6rem', borderRadius: '6px', border: '1px solid #232330', background: '#0d0d11', color: '#fff', boxSizing: 'border-box' }} />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: '#8a8a9e', marginBottom: '0.3rem' }}>Entry Fee (NPR)</label>
                <input type="number" placeholder="50" value={entryFee} onChange={(e) => setEntryFee(e.target.value)} required style={{ width: '100%', padding: '0.6rem', borderRadius: '6px', border: '1px solid #232330', background: '#0d0d11', color: '#fff', boxSizing: 'border-box' }} />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: '#8a8a9e', marginBottom: '0.3rem' }}>Prize Pool (NPR)</label>
                <input type="number" placeholder="100" value={prizePool} onChange={(e) => setPrizePool(e.target.value)} required style={{ width: '100%', padding: '0.6rem', borderRadius: '6px', border: '1px solid #232330', background: '#0d0d11', color: '#fff', boxSizing: 'border-box' }} />
              </div>

              {hostGame === 'Free Fire' && (
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: '#8a8a9e', marginBottom: '0.3rem' }}>Per Kill Reward (NPR)</label>
                  <input type="number" placeholder="10" value={perKill} onChange={(e) => setPerKill(e.target.value)} style={{ width: '100%', padding: '0.6rem', borderRadius: '6px', border: '1px solid #232330', background: '#0d0d11', color: '#fff', boxSizing: 'border-box' }} />
                </div>
              )}

              <div style={{ gridColumn: 'span 2' }}>
                <button type="submit" style={{ width: '100%', background: '#00ff88', color: '#000', border: 'none', padding: '0.75rem', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>
                  Create Match (Pay NPR 50)
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Filter Navigation */}
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

        {/* Matches Grid */}
        {filteredMatches.length === 0 ? (
          <div style={{ background: '#16161e', padding: '3rem 1rem', borderRadius: '12px', border: '1px solid #232330', textAlign: 'center' }}>
            <p style={{ color: '#8a8a9e', margin: '0 0 0.5rem 0' }}>No active matches right now.</p>
            <p style={{ color: '#fff', fontSize: '0.9rem', margin: 0 }}>Ask Admin to send coins to your mobile number to host a match!</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
            {filteredMatches.map((match) => (
              <div key={match.id} style={{ background: '#16161e', border: '1px solid #232330', borderRadius: '12px', padding: '1.25rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                    <span style={{ background: '#232330', color: '#00ff88', padding: '0.25rem 0.6rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 'bold' }}>
                      {match.game} ({match.type})
                    </span>
                    <span style={{ fontSize: '0.75rem', color: '#8a8a9e' }}>Host: {match.host}</span>
                  </div>

                  <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.2rem', color: '#fff' }}>{match.title}</h3>
                  <p style={{ color: '#8a8a9e', fontSize: '0.85rem', margin: '0 0 1rem 0' }}>⏰ {match.time}</p>

                  <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: match.perKill !== null ? '1fr 1fr 1fr' : '1fr 1fr', 
                    background: '#0d0d11', 
                    borderRadius: '8px', 
                    padding: '0.75rem', 
                    marginBottom: '1rem', 
                    textAlign: 'center', 
                    gap: '0.5rem' 
                  }}>
                    <div>
                      <span style={{ fontSize: '0.7rem', color: '#8a8a9e', display: 'block' }}>PRIZE POOL</span>
                      <strong style={{ color: '#00ff88', fontSize: '0.9rem' }}>NPR {match.prizePool}</strong>
                    </div>
                    
                    {match.perKill !== null && (
                      <div>
                        <span style={{ fontSize: '0.7rem', color: '#8a8a9e', display: 'block' }}>PER KILL</span>
                        <strong style={{ color: '#fff', fontSize: '0.9rem' }}>NPR {match.perKill}</strong>
                      </div>
                    )}

                    <div>
                      <span style={{ fontSize: '0.7rem', color: '#8a8a9e', display: 'block' }}>ENTRY</span>
                      <strong style={{ color: '#ff4800', fontSize: '0.9rem' }}>NPR {match.entryFee}</strong>
                    </div>
                  </div>

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
        )}

      </div>
    </div>
  );
}
