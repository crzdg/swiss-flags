import { CH, ZH, NW, BE, VD } from '@swiss-flags/react';
import './App.css';

function App() {
  return (
    <div style={{ padding: '2rem', fontFamily: 'system-ui, sans-serif' }}>
      <h1 style={{ textAlign: 'center' }}>@swiss-flags/react</h1>
      <p style={{ textAlign: 'center', color: '#666' }}>
        A beautifully optimized collection of Swiss Canton flags.
      </p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
        gap: '2rem',
        marginTop: '3rem'
      }}>
        {/* Render your icons here! You can scale them using CSS width/height */}
        <div className="icon-card">
          <CH style={{ width: '80px', height: '80px' }} />
          <p>Switzerland</p>
        </div>
        <div className="icon-card">
          <ZH style={{ width: '80px', height: '80px' }} />
          <p>Zurich</p>
        </div>
        <div className="icon-card">
          <NW style={{ width: '80px', height: '80px' }} />
          <p>Nidwalden</p>
        </div>
        <div className="icon-card">
          <BE style={{ width: '80px', height: '80px' }} />
          <p>Bern</p>
        </div>
        <div className="icon-card">
          <VD style={{ width: '80px', height: '80px' }} />
          <p>Vaud</p>
        </div>
      </div>
    </div>
  )
}

export default App
