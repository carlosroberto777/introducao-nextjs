'use client';

import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const now = new Date();

  const dateFormatted = now.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  const timeFormatted = now.toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });

  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const currentClass = document.body.className;
    const otherClasses = currentClass
      .split(' ')
      .filter(c => c !== 'light' && c !== 'dark')
      .join(' ');

    document.body.className = `${isDarkMode ? 'dark' : 'light'} ${otherClasses}`;
  }, [isDarkMode]);

  return (
    <div className="space-y-4">
      <p className="text-lg">
        Hoje é: <span className="font-semibold">{dateFormatted}</span>, e o horário exato é: <span className="font-semibold">{timeFormatted}</span>
      </p>
      <button
        onClick={() => setIsDarkMode(prev => !prev)}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Alternar Tema
      </button>
    </div>
  );
}
