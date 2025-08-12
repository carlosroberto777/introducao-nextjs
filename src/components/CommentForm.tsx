import { useState, FormEvent } from "react";

interface Comment {
  id: number;
  name: string;
  message: string;
  date: string;
}

interface CommentFormProps {
  onAddComment: (comment: Comment) => void;
}

export default function CommentForm({ onAddComment }: CommentFormProps) {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [nameError, setNameError] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      setNameError("Por favor, digite seu nome.");
      return;
    }

    const regex = /^[A-Za-zÀ-ÿ\s]+$/;
    if (!regex.test(name)) {
      setNameError("Digite apenas letras.");
      return;
    }

    if (!message.trim()) return;

    const newComment: Comment = {
      id: Date.now(),
      name,
      message,
      date: new Date().toLocaleString(),
    };

    onAddComment(newComment);
    setName("");
    setMessage("");
    setNameError("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm mb-6"
    >
      <h2 className="text-lg font-medium text-blue-700 mb-4">
        Deixe seu comentário
      </h2>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Seu nome"
          value={name}
          onChange={(e) => {
            const value = e.target.value;
            const formatted =
              value.charAt(0).toUpperCase() + value.slice(1);
            setName(formatted);
            setNameError("");
          }}
          className={`border rounded-lg p-2 w-full focus:ring-2 focus:outline-none hover:scale-[1.02] transition-all duration-200 ${
            nameError
              ? "border-red-500 focus:ring-red-400"
              : "border-gray-300 focus:ring-blue-400"
          }`}
        />
        {nameError && (
          <p className="text-red-500 text-xs mt-1">{nameError}</p>
        )}
      </div>

      <div className="mb-4">
        <textarea
          placeholder="Digite sua mensagem..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={4}
          className="border border-gray-300 rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-400 focus:outline-none hover:scale-[1.02] transition-all duration-200"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-700 text-white py-2 rounded-md text-sm hover:bg-blue-800 hover:scale-[1.02] transition-all duration-200"
      >
        Enviar
      </button>
    </form>
  );
}
