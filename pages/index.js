import React, { useState, useEffect } from 'react';
import Image from 'next/image';

export default function IdleRPG() {
  const [mana, setMana] = useState(0);
  const [manaPerSecond, setManaPerSecond] = useState(1);
  const [level, setLevel] = useState(1);
  const [experience, setExperience] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMana(prev => prev + manaPerSecond);
    }, 1000);
    return () => clearInterval(interval);
  }, [manaPerSecond]);

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
      <div className="relative w-32 h-32 mx-auto mb-4">
        <Image src="/images/mana-orb.png" alt="Mana Orb" fill style={{ objectFit: 'contain' }} />
        <div className="absolute bottom-0 left-0 w-full bg-blue-500 opacity-70" style={{ height: `${manaPercentage}%`, transition: 'height 0.5s' }} />
      </div>
      <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded" onClick={castSpell} disabled={mana < 10}>
        Cast Basic Spell (-10 Mana)
      </button>
    </div>
  );
}
