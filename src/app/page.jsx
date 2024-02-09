import TaskCard from "@/components/TaskCard";
import { prisma } from "@/libs/prisma";

const loadTask = async () => {
  try {
    const tasks = prisma.task.findMany();
    return tasks;
  } catch (error) {
    console.error(error);
  }
};
const HomePage = async () => {
  const tasks = await loadTask();
  if (!tasks) return "";
  return (
    <section>
      <div className="grid grid-cols-1 px-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-10">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </section>
  );
};

export default HomePage;
