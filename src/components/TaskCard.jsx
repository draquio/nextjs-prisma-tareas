"use client"
import { useRouter } from "next/navigation";

const TaskCard = (props) => {
  const router = useRouter();
    const {task} = props;
  return (
    <div onClick={()=>{router.push(`/task/edit/${task.id}`)}}
      className="bg-slate-900 p-3 hover:bg-slate-800 cursor-pointer transition-all duration-200"
    >
      <h3 className="font-bold text-2xl mb-2">{task.title}</h3>
      <p>{task.description}</p>
      <p>{new Date(task.created_at).toLocaleDateString()}</p>
    </div>
  );
};

export default TaskCard;
