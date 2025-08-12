'use client';

import { useState } from 'react';

export default function LikeButton() {
  const [likes, setLikes] = useState(0);

  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-8 text-gray-800 flex items-center justify-center gap-2">
        Contador de Likes
        <span className="text-pink-500">❤️</span>
      </h1>

      <button
        onClick={() => setLikes(likes + 1)}
        className="inline-flex items-center justify-center gap-3 bg-pink-500 hover:bg-pink-600 text-white px-8 py-5 rounded-2xl text-3xl font-semibold shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
      >
        <img
          src="https://cdn-icons-png.flaticon.com/512/833/833472.png"
          alt="Like icon"
          className="w-8 h-8"
        />
        <span>{likes}</span>
      </button>
    </div>
  );
}
