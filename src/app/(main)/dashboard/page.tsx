"use client";

import ProjectCard from "@/app/components/common/ProjectCard";
import StatCard from "@/app/components/common/StatCard";
import { Project, useProject } from "@/app/context/ProjectContext";
import { Task } from "@/models/Project";
import { Plus } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export type TaskWithProject = Task & { project: string, projectId: string };

export default function Dashboard() {
  const { projects, totalTasks, fetchData } = useProject();
  const [tasks, setTasks] = useState<TaskWithProject[]>([]);

  const [showInput, setShowInput] = useState(false);
  const [input, setInput] = useState("");

  const { data } = useSession();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch(`/api/project`, {
        method: "POST",
        body: JSON.stringify({
          name: input,
          owner: data?.user.id,
          action: "addTask",
        }),
      });
      setInput("");
      fetchData();
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  };
  useEffect(() => {
    const allTasks: TaskWithProject[] = projects.flatMap((project: Project) =>
      project.tasks.map((task) => ({
        ...task,
        project: project.name, projectId: project._id
      }))
    );
    setTasks(allTasks);
  }, [projects]);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <main className="flex flex-col gap-5 h-full max-h-screen">
      <h1 className="text-3xl font-semibold tracking-tight">Dashboard</h1>
      <div className="grid gap-5 h-full grid-cols-6 grid-rows-4">
        <div className="flex justify-between gap-5 col-start-1 col-end-8">
          <StatCard projects={projects} title="Total Projects" />
          <StatCard title="Total Tasks" taskCount={totalTasks} />
          <StatCard title="Total completed tasks" taskCount={tasks.filter(data => data.status === "Done").length} />
        </div>

        <div className=" p-5 rounded-xl  col-start-1 col-end-3 row-start-2 row-end-2 border-2 border-blue-100">
          <h1>Upcoming Tasks</h1>
        </div>

        <div className="row-start-3  border-2 rounded-xl p-5 border-blue-100 row-end-5 col-start-1 col-end-3 flex flex-col gap-5">
          <div className="flex justify-between">
            <h1>Projects</h1>
            <div className="flex gap-1 items-center justify-center text-blue-400">
              <Plus />
              <button onClick={() => setShowInput((prev) => !prev)}>
                Add Project
              </button>
            </div>
          </div>
          {showInput && (
            <form
              onSubmit={handleSubmit}
              className="border-2 flex border-black/5 rounded-lg"
            >
              <input
                type="text"
                className="p-2 w-full outline-0"
                placeholder="Add a project"
                onChange={(e) => setInput(e.target.value)}
                value={input}
              />
              <button className="px-10 bg-blue-500 m-1 rounded-sm text-white">
                Add
              </button>
            </form>
          )}
          <div className="flex flex-col overflow-y-scroll h-50 hide-scroll">
            {projects.map((data) => (
              <ProjectCard key={data._id} data={data} />
            ))}
          </div>
        </div>
        <div className=" rounded-xl p-5 col-start-3 col-end-7 row-start-2 row-end-5 border-2 border-blue-100">
          <h1 className="text-2xl font-semibold mb-4">Tasks</h1>

          <div className=" overflow-hidden">
            <table className="w-full">
              <thead className=" text-left border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3  text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Task Name
                  </th>
                  <th className="px-6 py-3  text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Project
                  </th>
                  <th className="px-6 py-3  text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Time
                  </th>
                  <th className="px-6 py-3  text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3  text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Priority
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {tasks.map((task) => (
                  <tr
                    onClick={() => router.push(`/project/${task.projectId}`)}
                    key={task._id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {task.title}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {task.project}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {new Date(task.dueDate!).toLocaleDateString("en-IN")}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={` inline-flex text-xs leading-5 font-semibold rounded-full}`}
                      >
                        {task.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={` inline-flex text-xs leading-5 font-semibold rounded-full}`}
                      >
                        {task.priority}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}
