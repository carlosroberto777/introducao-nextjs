"use client";
import { useState } from "react";
import CommentForm from "@/components/CommentForm";
import CommentList from "@/components/CommentList";

interface Comment {
  id: number;
  name: string;
  message: string;
  date: string;
}

export default function Page() {
  const [comments, setComments] = useState<Comment[]>([]);

  const addComment = (comment: Comment) => {
    setComments([comment, ...comments]);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-xl mx-auto">
        <h1 className="text-3xl font-semibold text-center text-blue-700 mb-8">
          Atividade Componentes pt.3
        </h1>
        <CommentForm onAddComment={addComment} />
        <CommentList comments={comments} />
      </div>
    </div>
  );
}
