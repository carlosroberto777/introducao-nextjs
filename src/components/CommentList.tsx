import Comment from "./Comment";

interface Comment {
  id: number;
  name: string;
  message: string;
  date: string;
}

interface CommentListProps {
  comments: Comment[];
}

export default function CommentList({ comments }: CommentListProps) {
  return (
    <div className="space-y-3">
      <h2 className="text-lg font-medium text-gray-800 mb-2">
        Comentários
      </h2>
      {comments.length === 0 ? (
        <p className="text-gray-500 text-sm italic">
          Nenhum comentário ainda. Seja o primeiro.
        </p>
      ) : (
        comments.map((comment) => (
          <div
             className="hover:scale-[1.02] transition-all duration-200"
             key={comment.id}
          >
            <Comment
              name={comment.name}
              message={comment.message}
              date={comment.date}
            />
          </div>
        ))
      )}
    </div>
  );
}
