import  Card  from "@/components/Card";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-900 flex justify-center items-center p-8">
      <Card
        title="Card"
        description="Revisao React"
        imageUrl="https://cdn-icons-png.flaticon.com/512/1055/1055687.png"
      />
       <Card
        title="Card"
        description="Revisao React"
        imageUrl="https://cdn-icons-png.flaticon.com/512/1055/1055687.png"
      />
       <Card
        title="Card"
        description="Revisao React"
        imageUrl="https://cdn-icons-png.flaticon.com/512/1055/1055687.png"
      />
    </div>
  );
}