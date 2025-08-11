import ClientCounter from "@/components/ClientCounter"


export default function ServerExample() {
    // const data = await fetchDataFromDb()
    const data = 'dados do banco de dados'

    return (
        <div>
            <h1>Dados do Servidor</h1>
            <p>{data}</p>

            <ClientCounter/>
        </div>
    )
}