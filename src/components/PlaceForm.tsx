"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect } from "react";
import axios from "axios";

const placeValidationSchema = z.object({
  name: z.string().min(3, "Nome muito curto!"),
  type: z.enum(["restaurante", "bar", "hotel"], {
    errorMap: () => ({ message: "Tipo inválido" }),
  }),
  phone: z.string().min(8, "Telefone inválido"),
  lat: z.number(),
  lng: z.number(),
});

type PlaceFormData = z.infer<typeof placeValidationSchema>;

type Props = {
  lat: number;
  lng: number;
};

export default function PlaceForm({ lat, lng }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<PlaceFormData>({
    resolver: zodResolver(placeValidationSchema),
    defaultValues: {
      lat,
      lng,
    },
  });

  const [images, setImages] = useState<FileList | null>(null);
  const [imageList, setImageList] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!images) {
      setImageList([]);
      setPreviews([]);
      return;
    }

    const fileArray = Array.from(images);
    setImageList(fileArray);

    const urls = fileArray.map((file) => URL.createObjectURL(file));
    setPreviews(urls);

    return () => {
      urls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [images]);

  const handleImageRemove = (index: number) => {
    const updatedList = [...imageList];
    updatedList.splice(index, 1);
    setImageList(updatedList);

    const updatedPreviews = [...previews];
    updatedPreviews.splice(index, 1);
    setPreviews(updatedPreviews);
  };

  const onSubmit = async (data: PlaceFormData) => {
    setSubmitError(null);

    if (imageList.length === 0) {
      setSubmitError("Pelo menos uma imagem deve ser enviada.");
      return;
    }

    if (imageList.length > 3) {
      setSubmitError("Você deve enviar no máximo 3 imagens.");
      return;
    }

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("type", data.type); // Corrigido
    formData.append("phone", data.phone); // Corrigido
    formData.append("lat", data.lat.toString());
    formData.append("lng", data.lng.toString());

    imageList.forEach((file) => {
      formData.append("images", file);
    });

    try {
      setLoading(true);
      await axios.post("http://localhost:3000/api/places", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      reset();
      setImages(null);
      setImageList([]);
      setPreviews([]);
      alert("Dados enviados com sucesso!");
    } catch (error) {
      console.error(error);
      setSubmitError("Erro ao enviar os dados.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Nome:</label>
        <input {...register("name")} className="w-full border rounded px-2 py-1" />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
      </div>

      <div>
        <label>Tipo:</label>
        <select {...register("type")} className="w-full border rounded px-2 py-1">
          <option value="">Selecione</option>
          <option value="restaurante">Restaurante</option>
          <option value="bar">Bar</option>
          <option value="hotel">Hotel</option>
        </select>
        {errors.type && <p className="text-red-500">{errors.type.message}</p>}
      </div>

      <div>
        <label>Telefone:</label>
        <input {...register("phone")} className="w-full border rounded px-2 py-1" />
        {errors.phone && <p className="text-red-500">{errors.phone.message}</p>}
      </div>

      <div>
        <label>Latitude:</label>
        <input
          value={lat}
          readOnly
          className="border rounded px-2 py-1 bg-gray-100 w-full"
        />
      </div>

      <div>
        <label>Longitude:</label>
        <input
          value={lng}
          readOnly
          className="border rounded px-2 py-1 bg-gray-100 w-full"
        />
      </div>

      <div>
        <label>Imagens:</label>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => setImages(e.target.files)}
          className="w-full border rounded px-2 py-1"
        />
        {previews.length > 0 && (
          <div className="flex gap-4 mt-2 flex-wrap">
            {previews.map((src, index) => (
              <div key={index} className="relative w-32 h-32">
                <img
                  src={src}
                  alt={`Preview ${index + 1}`}
                  className="w-full h-full object-cover rounded border"
                />
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleImageRemove(index);
                  }}
                  className="absolute top-0 right-0 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-700"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {submitError && <p className="text-red-500">{submitError}</p>}

      <button
        type="submit"
        disabled={loading}
        className={`bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 ${
          loading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
        }`}
      >
        {loading ? "Enviando..." : "Registrar Local"}
      </button>
    </form>
  );
}
