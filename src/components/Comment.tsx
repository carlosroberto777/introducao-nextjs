interface CommentProps {
  name: string;
  message: string;
  date: string;
}

export default function Comment({ name, message, date }: CommentProps) {
  return (
    <div className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm">
      <div className="flex justify-between items-center mb-1">
        <p className="font-medium text-blue-700">{name}</p>
        <span className="text-xs text-gray-500">{date}</span>
      </div>
      <p className="text-gray-500 text-sm">{message}</p>
    </div>
  );
}