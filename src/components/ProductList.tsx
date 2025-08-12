export default function ProductsList() {
  const products = [
    { id: 1, name: 'Camisa Corinthians', price: 'R$ 79,90' },
    { id: 2, name: 'Tênis', price: 'R$ 199,99' },
    { id: 3, name: 'Relógio', price: 'R$ 149,00' },
  ];

  return (
    <div className="bg-white p-6 rounded-xl shadow-md mt-4">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Produtos</h2>
      <ul className="space-y-3">
        {products.map((product) => (
          <li key={product.id} className="flex justify-between border-b pb-2 text-gray-700">
            <span>{product.name}</span>
            <span className="font-bold text-green-600">{product.price}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
