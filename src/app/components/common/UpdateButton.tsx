"use client";

import { useProject } from "@/app/context/ProjectContext";
import { useRouter } from "next/navigation";

interface Task {}

export default function UpdateButton({
  projectId,
  status,
  id,
  data,
  action
}: {
  projectId: string;
  status: string;
  id: string;
  data: string[];
  action: string
}) {
  const { fetchData } = useProject();

  const handleSubmit = async (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const formData = e.target.value;
    
    const result = await fetch(`/api/project/${projectId}`, {
      method: "PUT",
      body: JSON.stringify({ formData, taskId: id, action }),
    });
    fetchData();
  };

  return (
    <button
      className={` py-1 inline-flex text-xs leading-5 font-semibold rounded-full}`}
    >
      <select
        defaultValue={status}
        onChange={handleSubmit}
        name=""
        id=""
        className="outline-0"
      >
        {data.map((data, i) => (
          <option key={i} value={data}>
            {data}
          </option>
        ))}
      </select>
    </button>
  );
}
