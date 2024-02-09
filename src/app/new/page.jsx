"use client"
import Loader from "@/components/Loader";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const NewPage = ({ params }) => {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  useEffect(() => {
    try {
      if (params.id) {
        fetch(`/api/tasks/${params.id}`)
          .then((response) => response.json())
          .then((data) => {
            setTitle(data.title);
            setDescription(data.description);
          });
      }
    } catch (error) {
      console.error(error);
    }
    console.log(params);
  }, [params]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (params.id) {
      const response = await fetch(`/api/tasks/${params.id}`, {
        method: "PUT",
        body: JSON.stringify({ title, description }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      console.log(data);
    } else {
      const response = await fetch("/api/tasks", {
        method: "POST",
        body: JSON.stringify({ title, description }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      console.log(data);
    }
    router.push("/");
    router.refresh();
  };

  const handleDeleteTask = async (id) => {
    try {
      const response = await fetch(`/api/tasks/${id}`, {
        method: "DELETE",
      });
      const result = await response.json();
      console.log(result);
      router.refresh();
      router.push('/');
    } catch (error) {
      console.error(error);
    }
  }
  if (params.id && !title) return <Loader />
  // if (!title) return <Loader />
  return (
    <div className="mt-20 flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="bg-slate-900 p-10 rounded max-w-[700px] mx-3"
      >
        <label htmlFor="title" className="font-bold text-sm">
          Título de la tarea
        </label>
        <input
          id="title"
          className="border border-gray-400 focus:outline-none p-2 mb-4 w-full text-black rounded"
          type="text"
          placeholder="Título"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <label htmlFor="description" className="font-bold text-sm">
          Descripción de la tarea
        </label>
        <textarea
          id="description"
          placeholder="Describe tu tarea"
          className="border focus:outline-none border-gray-400 p-2 mb-4 w-full text-black rounded resize-none"
          rows="6"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        ></textarea>
        <button type="submit" className="bg-blue-500  hover:bg-blue-700 transition-all ease-in-out duration-300 font-bold py-2 px-4 rounded">
          Crear
        </button>
        {params.id && (
          <button onClick={() => handleDeleteTask(params.id)} type="button" className="bg-red-500 hover:bg-red-700 transition-all ease-in-out duration-300 font-bold py-2 px-4 ml-2 rounded">Eliminar</button>
        )}
      </form>
    </div>
  );
};

export default NewPage;
