'use client'

import { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button"

type FormData = {
    title: string;
    body: string;
}

type ResponseData = {
    id: number;
    title: string;
    body: string;
}



export default function CreatePostPage() {

    const [formData, setFormaData] = useState<FormData>(
        { title: "", body: "" })
    
    const [responseData, setResponseData] = useState<ResponseData | null>(
        null
    )

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormaData({
            ...formData,
            [event.target.name]: event.target.value

        })
    } 

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        const {data} = await axios.post(
            "https://jsonplaceholder.typicode.com/posts",
             formData,
             { headers: {"Content-Type":"application/json"}}
            )
        setResponseData(data)
    }


    return (
        <div className="flex items-center justify-center p-6">
            <div >
                <h1 className="text-2xl font-bold mb-4">
                    Criar novo Post
                </h1>

                <form onSubmit={handleSubmit}>
                    {/* Título */}
                    <div>
                        <label className="block text-sm font-medium">
                            Título
                        </label>
                        <input
                            className="mt-1 border rounded px-3 py-2 w-full "
                            type="text"
                            name="title"
                            value={formData.title}
                            required
                            onChange={handleChange}
                        />
                    </div>

                    {/* Conteúdo*/}
                    <div>
                        <label className="block text-sm font-medium">
                            Conteúdo
                        </label>
                        <textarea
                            name="body"
                            className="mt-1 border rounded px-3 py-2 w-full"
                            rows={2}
                            onChange={handleChange}
                            value={formData.body}
                        />
                    </div>

                    {/* <button
                        className="bg-blue-600 text-white py-2 px-3
                    hover:bg-blue-700 rounded  cursor-pointer">
                        Publicar
                    </button> */}
                    <Button type="submit">Click me</Button>


                </form>

                {responseData && (
                    <div 
                        className="mt-6 border border-green-500 bg-green-100">
                        <p>Post criado com sucesso!</p>
                        <p>ID: {responseData.id}</p>
                        <p>Título: {responseData.title}</p>
                        <p>Conteúdo: {responseData.body}</p>

                    </div>
                )}


            </div>

        </div>



    )

}