"use client";

import { useProject } from "@/app/context/ProjectContext";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";

export default function DeleteButton({
  projectId,
  id,
}: {
  projectId: string;
  id: string;
}) {

    const router = useRouter()

  const handleSubmit = async () => {
    const action = "deleteTask";
    const result = await fetch(`/api/project/${projectId}`, {
      method: "PUT",
      body: JSON.stringify({taskId: id, action }),
    });
    router.refresh()
  };

  return (
    <button
      onClick={handleSubmit}
      className={` py-1 inline-flex text-xs leading-5 font-semibold rounded-full}`}
    >
      <Trash width="20px" />
    </button>
  );
}
