"use client";

import { useRouter } from "next/navigation";

const NewPage = () => {
  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const description = e.target.description.value;
    try {
      const response = await fetch("api/tasks", {
        method: "POST",
        body: JSON.stringify({ title, description }),
        headers: { "Content-Type": "application/json" },
      });
      console.log(await response.json());
    } catch (error) {
      console.error(error);
    }finally{
      router.push('/')
    }
  };
  return (
    <div className="h-screen flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="bg-slate-800 p-10 rounded max-w-[700px] mx-3"
      >
        <label htmlFor="title" className="font-bold text-sm">
          Título de la tarea
        </label>
        <input
          id="title"
          className="border border-gray-400 focus:outline-none p-2 mb-4 w-full text-black rounded"
          type="text"
          placeholder="Título"
        />
        <label htmlFor="description" className="font-bold text-sm">
          Descripción de la tarea
        </label>
        <textarea
          id="description"
          placeholder="Describe tu tarea"
          className="border focus:outline-none border-gray-400 p-2 mb-4 w-full text-black rounded resize-none"
          rows="6"
        ></textarea>
        <button className="bg-blue-500  hover:bg-blue-700 transition-all ease-in-out duration-300 font-bold py-2 px-4 ">
          Crear
        </button>
      </form>
    </div>
  );
};

export default NewPage;
