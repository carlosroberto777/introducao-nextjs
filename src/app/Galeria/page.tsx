import Card from "@/components/Card";

const cardData = [
  {
    title: "FIFA",
    description: "Simulador de futebol mais jogado do mundo.",
    imageUrl: "https://cdn-icons-png.flaticon.com/512/33/33736.png",
    category: "Jogo"
  },
  {
    title: "Tropa de Elite",
    description: "Filme policial brasileiro sobre o BOPE.",
    imageUrl: "https://cdn-icons-png.flaticon.com/512/5875/5875933.png",
    category: "Filme"
  },
  {
    title: "Vingadores",
    description: "Heróis da Marvel reunidos para salvar o mundo.",
    imageUrl: "https://cdn-icons-png.flaticon.com/512/2234/2234489.png",
    category: "Filme"
  },
  {
    title: "O Pequeno Príncipe",
    description: "Obra poética sobre amor, infância e sabedoria.",
    imageUrl: "https://cdn-icons-png.flaticon.com/512/4133/4133571.png",
    category: "Livro"
  },
  {
    title: "Harry Potter",
    description: "Saga mágica cheia de feitiços e aventuras.",
    imageUrl: "https://cdn-icons-png.flaticon.com/512/1600/1600953.png",
    category: "Livro"
  },
  {
    title: "iPhone",
    description: "Smartphone da Apple com design icônico.",
    imageUrl: "https://cdn-icons-png.flaticon.com/512/731/731985.png",
    category: "Tecnologia"
  },
  {
    title: "ChatGPT",
    description: "IA que conversa e resolve tarefas com linguagem natural.",
    imageUrl: "https://cdn-icons-png.flaticon.com/512/2814/2814666.png",
    category: "Tecnologia"
  },
  {
    title: "Windows",
    description: "Sistema operacional amplamente utilizado.",
    imageUrl: "https://cdn-icons-png.flaticon.com/512/888/888882.png",
    category: "Tecnologia"
  }
];


export default function atv() {
    return (
        <div className="flex flex-wrap justify-center gap-6 p-6">
           {cardData.map((card, index) => (
                <Card
                  key={index}
                  title={card.title}
                  description={card.description}
                  category={card.category}
                  imageUrl={card.imageUrl}
                  />
           ))}
        </div>
    )
}