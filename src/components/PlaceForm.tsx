"use client";

import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useState } from "react";

import axios from "axios";

const placeValidationSchema = z.object({
    name: z.string().min(3, "Nome muito curto!"),
    type: z.enum(["RESTAURANTE", "BAR", "HOTEL"]),
    phone: z.string().min(8, "Telefone inválido"),
    lat: z.number(),
    lng: z.number()
})

type PlaceFormData = z.infer<typeof placeValidationSchema>

type Props = {
    lat: number;
    lng: number;
}

export default function PlaceForm({lat, lng}: Props) {

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitSuccessful },
        reset,
    } = useForm<PlaceFormData>({
        resolver: zodResolver(placeValidationSchema),
        defaultValues: {
            lat,
            lng
        }
    })

    const onSubmit = async (data: PlaceFormData) => {
        
        if(!images || images.length===0) {
            setSubmitError("Pelo uma imagem deve ser enviada !")
            return
        }

        if(images.length > 3) {
            setSubmitError("Você pode enviar no máximo 3 imagens!")
            return
        }

        const formData = new FormData();
        formData.append("name", data.name)
        formData.append("type", data.type)
        formData.append("phone", data.phone)
        formData.append("latitude", String(data.lat))
        formData.append("longitude", String(data.lng))

        Array.from(images).forEach((file) => {
            formData.append("images", file)
        })

        try {
            // Faço a requisição
            setLoading(true)
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/places`,
                formData, 
                {
                    headers: {"Content-Type": "multipart/form-data"}
                })
            console.log(`Resposta da API ${response.status} | ${response.data}`)
            reset();
            setImages(null);
        } catch(error) {
            setSubmitError(`Erro ao enviar o formulário!: ${error}`)
        } finally {
            setLoading(false)
        }



    }

    useEffect(() => {
        reset((prev) => ({
            ...prev,
            lat,
            lng
        }))
    }, [lat, lng, reset])

    const [images, setImages ] = useState<FileList | null>(null)
    const [submitError, setSubmitError] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)

    return (
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            {/* Nome */}
            <div>
                <label>Nome:</label>
                <input
                    {...register("name")}
                    className="w-full border rounded px-2 py-1"
                />
                {errors.name && <p className="text-red-500">
                    {errors.name.message}
                </p>}
            </div>

            {/* Tipo */}
            <select
                {...register("type")}
            >
                <option>Selecione</option>
                <option value="RESTAURANTE">Restaurante</option>
                <option value="BAR">Bar</option>
                <option value="HOTEL">Hotel</option>
            </select>
            {errors.type && <p className="text-red-500">
                {errors.type.message}
            </p>}

            
            {/* Telefone*/}
            <div>
                <label>Telefone:</label>
                <input
                    {...register("phone")}
                    className="w-full border rounded px-2 py-1"
                />
                {errors.phone && <p className="text-red-500">
                    {errors.phone.message}
                </p>}
            </div>
            
            {/* Latitude */}
            <div>
                <label>Latitude: </label>
                <input
                    {...register("lat")}
                    value={lat}
                    readOnly
                    className="border rounded px-2 py-1 bg-gray-100"
                />
            </div>
            
            {/* Longitude */}
            <div>
                <label>Longitude: </label>
                <input
                    {...register("lng")}
                    value={lng}
                    readOnly
                    className="border rounded px-2 py-1 bg-gray-100"
                />
            </div>

            {/* Imagens */}
            <div>
                <label>Imagens</label>
                <input
                 type="file"
                 accept="image/*"
                 multiple
                 onChange={(e)=>setImages(e.target.files)}
                 className="w-full border rounded px-2 py-1"
                />
            </div>

            
            
            <button
                className="bg-blue-600 text-white 
                px-4 py-1 rounded hover:bg-blue-700
                cursor-pointer">
                {loading ? "Enviando..." : "Registrar Local" }
            </button>

            {isSubmitSuccessful && !submitError && (
                <p className="text-green-400 mt-2">
                    Formulário enviado com sucesso
                </p>
            ) }

            {submitError && (
                <p className="text-red-400 mt-2" >{submitError}</p>
            )}

        </form>
    )
}