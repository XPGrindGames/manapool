// Idle RPG: Core App Setup with Mana Orb
import React, { useState, useEffect } from 'react';

export default function IdleRPG() {
  const [mana, setMana] = useState(0);
  const [manaPerSecond, setManaPerSecond] = useState(1);
  const [level, setLevel] = useState(1);
  const [experience, setExperience] = useState(0);

  // Passive mana generation
  useEffect(() => {
    const interval = setInterval(() => {
      setMana(prev => prev + manaPerSecond);
    }, 1000);
    return () => clearInterval(interval);
  }, [manaPerSecond]);

  // Gain experience by spending mana
  const castSpell = () => {
    if (mana >= 10) {
      setMana(mana - 10);
      setExperience(exp => {
        const newExp = exp + 10;
        if (newExp >= level * 100) {
          setLevel(level + 1);
          return newExp - level * 100;
        }
        return newExp;
      });
    }
  };

  const manaPercentage = Math.min((mana / (level * 100)) * 100, 100);

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-2">Idle RPG: Magic Ascension</h1>
      <div className="mb-4">Mana: {mana}</div>
      <div className="mb-4">Level: {level} | EXP: {experience}/{level * 100}</div>
      <div className="relative w-32 h-32 mx-auto mb-4" style={{ position: 'relative', width: '128px', height: '128px' }}>
        <img src="/images/mana-orb.png" alt="Mana Orb" style={{ width: '100%', height: '100%', objectFit: 'contain', position: 'absolute' }} />
        <div
          className="absolute bottom-0 left-0 w-full bg-blue-500 opacity-70"
          style={{
            height: `${isNaN(manaPercentage) ? 0 : manaPercentage}%`,
            transition: 'height 0.5s',
            position: 'absolute'
          }}
        />
      </div>
      <button onClick={castSpell} disabled={mana < 10} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded">
        Cast Basic Spell (-10 Mana)
      </button>
    </div>
  );
}
