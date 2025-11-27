"use client";
import { useProject } from "@/app/context/ProjectContext";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Priority = "low" | "medium" | "high";
type Status = "To Do" | "In Progress" | "Done";

interface IForm {
  title: string;
  status: Status;
  priority: Priority;
  dueDate: Date;
  labels: string;
}

export const STATUS = ["To Do", "In Progress", "Done"];
export const PRIORITY = ["low", "medium", "high"];

export default function TaskHeader({ id }: { id: string }) {
  const [formData, setFormData] = useState<IForm>({
    title: "",
    status: "To Do",
    priority: "low",
    dueDate: new Date(),
    labels: "",
  });
  const [showForm, setShowForm] = useState(false);
  const router = useRouter();
  const {fetchData} = useProject()

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      let action = "addTodo";
      const result = await fetch(`/api/project/${id}`, {
        method: "PUT",
        body: JSON.stringify({ formData, action }),
      });
      router.refresh();
      setShowForm(false);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  };

  return (
    <div className="flex flex-col py-5 w-full justify-between ">
      <div className="flex w-full justify-between items-center px-6 py-5">
        <div>
          <h1>List</h1>
        </div>

        <button
          onClick={() => setShowForm((prev) => !prev)}
          className="flex bg-blue-500 p-2 gap-2 text-white rounded-lg items-center justify-center"
        >
          <Plus /> <span>New Task</span>
        </button>
      </div>

      {showForm && (
        <div className="flex gap-5 px-6">
          <input
            type="text"
            value={formData.title}
            name="title"
            className="border w-full  border-black/10 p-2 rounded-lg"
            placeholder="Enter task name"
            onChange={handleChange}
          />
          <input
            type="date"
            onChange={handleChange}
            name="dueDate"
            id=""
            className="border border-black/10 p-2 rounded-lg"
          />
          <input
            onChange={handleChange}
            value={formData.labels}
            type="text"
            name="labels"
            id=""
            className="border  border-black/10 p-2 rounded-lg"
            placeholder="Enter label"
          />
          <select
            name="status"
            value={formData.status}
            id=""
            onChange={handleChange}
            defaultValue="To Do"
            className="border border-black/10 p-2 rounded-lg px-"
          >
            {STATUS.map((data, i) => (
              <option value={data} key={i}>
                {data}
              </option>
            ))}
          </select>
          <select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            id=""
            defaultValue="To Do"
            className="border border-black/10 p-2 rounded-lg px-"
          >
            {PRIORITY.map((data, i) => (
              <option value={data} key={i}>
                {data}
              </option>
            ))}
          </select>
          <button
            onClick={handleSubmit}
            type="submit"
            className="border shrink-0 bg-black text-white border-black/10 p-2 rounded-lg px-5"
          >
            Add Task
          </button>
        </div>
      )}
    </div>
  );
}
