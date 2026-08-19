export default function Home() {
  return (
    <div style={{ backgroundColor: '#0d0d11', color: '#ffffff', fontFamily: 'sans-serif', minHeight: '100vh', padding: '2rem' }}>
      <header style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.8rem', fontWeight: '800', color: '#00ff88', margin: 0 }}>MiLarco</h1>
        <p style={{ color: '#8a8a9e', fontSize: '1.1rem', marginTop: '0.5rem' }}>Play. Compete. Prove. Win.</p>
      </header>

      <main style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', maxWidth: '1000px', margin: '0 auto' }}>
        
        {/* Free Fire Card */}
        <div style={{ background: '#16161e', border: '1px solid #232330', borderRadius: '12px', padding: '1.5rem', textAlign: 'center' }}>
          <h3 style={{ fontSize: '1.5rem', margin: '0 0 0.5rem 0' }}>Free Fire</h3>
          <span style={{ display: 'inline-block', padding: '0.25rem 0.75rem', borderRadius: '20px', fontSize: '0.8rem', marginBottom: '1rem', fontWeight: '600', background: 'rgba(255, 72, 0, 0.2)', color: '#ff4800' }}>
            Battle Royale
          </span>
          <div style={{ textAlign: 'left', background: '#0d0d11', padding: '1rem', borderRadius: '8px', fontSize: '0.85rem', color: '#b3b3c6', marginBottom: '1.5rem' }}>
            <ul style={{ paddingLeft: '1.2rem', margin: 0 }}>
              <li><strong>Format:</strong> Full Map / Clash Squad</li>
              <li><strong>Payout:</strong> Per-Kill Bounty + Booyah Bonus</li>
              <li><strong>Access:</strong> Room ID & Password sent in-app</li>
            </ul>
          </div>
          <button style={{ background: '#00ff88', color: '#000', border: 'none', padding: '0.75rem 1.5rem', borderRadius: '8px', fontWeight: '600', cursor: 'pointer', width: '100%' }}>
            Join Lobby
          </button>
        </div>

        {/* eFootball Card */}
        <div style={{ background: '#16161e', border: '1px solid #232330', borderRadius: '12px', padding: '1.5rem', textAlign: 'center' }}>
          <h3 style={{ fontSize: '1.5rem', margin: '0 0 0.5rem 0' }}>eFootball</h3>
          <span style={{ display: 'inline-block', padding: '0.25rem 0.75rem', borderRadius: '20px', fontSize: '0.8rem', marginBottom: '1rem', fontWeight: '600', background: 'rgba(0, 170, 255, 0.2)', color: '#00aaff' }}>
            1v1 Showdown
          </span>
          <div style={{ textAlign: 'left', background: '#0d0d11', padding: '1rem', borderRadius: '8px', fontSize: '0.85rem', color: '#b3b3c6', marginBottom: '1.5rem' }}>
            <ul style={{ paddingLeft: '1.2rem', margin: 0 }}>
              <li><strong>Format:</strong> 1v1 Direct Match (Winner Takes All)</li>
              <li><strong>Setup:</strong> Opponent User IDs shared automatically</li>
              <li><strong>Verification:</strong> Upload end-game screenshot</li>
            </ul>
          </div>
          <button style={{ background: '#00ff88', color: '#000', border: 'none', padding: '0.75rem 1.5rem', borderRadius: '8px', fontWeight: '600', cursor: 'pointer', width: '100%' }}>
            Find Match
          </button>
        </div>

      </main>
    </div>
  );
}
