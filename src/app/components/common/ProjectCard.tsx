import { Project, useProject } from "@/app/context/ProjectContext";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ProjectCard({
  data,
}: {
  data: Project;
}) {
  const router = useRouter()
  const {fetchData} = useProject()
  const handleDelete = async (e: React.FormEvent) => {
    e.stopPropagation()
    try {
      await fetch("/api/project", {
        method: "DELETE",
        body: JSON.stringify({ projectId: data._id }),
      });
      fetchData()
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  };


  return (
    <div onClick={() => router.push(`/project/${data._id}`)} className="flex justify-between py-3 items-center border-b border-black/10 w-full">
      <h1>{data.name}</h1>
      <div>
        <button
          onClick={handleDelete}
          className="rounded-full flex justify-center items-center w-8 h-8"
        >
          <Trash width="20px" />
        </button>
      </div>
    </div>
  );
}
