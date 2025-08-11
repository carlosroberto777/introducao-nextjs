import { Card } from "@/components/Card";
import NavBar from "@/components/NavBar";
// import PlaceForm from "@/components/PlaceForm";




export default function Home() {
  return (
    <div className=" ">

      <NavBar links={
        [
          { label: 'Inicio', href: '/' },
          { label: 'Sobre Nós', href: '/about' },
          { label: 'Produtos', href: '/product' }
        ]
      } />

      <section className="bg-white py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Recursos Principais
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8" >
          <Card
            title="Renderização Híbrida"
            description="SSG, SSR e ISR para otimizar performance e SEO."
            icon="🚀" />

          <Card
            title="CSS Utility-First"
            description="Tailwind CSS para estilização rápida e consistente."
            icon="🎨" />

          <Card
            title="TypeScript Integrado"
            description="Tipagem estática para um código mais seguro."
            icon="🔒" />
        </div>

      </section>

      {/* <div className="flex justify-center">
        <PlaceForm lat={22} lng={-23}/>
      </div> */}


    </div>
  );
}
