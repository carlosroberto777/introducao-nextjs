import ProductsList from "@/components/ProductList";

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="max-w-md w-full">
        <h1 className="text-2xl font-bold text-gray-900">Lista de Produtos</h1>
        <ProductsList />
      </div>
    </div>
  );
}
