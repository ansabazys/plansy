import { Project } from "@/app/context/ProjectContext";
import { EllipsisVertical, SquareDashedKanban } from "lucide-react";

export default function StatCard({
  title,
  projects,
  taskCount,
}: {
  title: string;
  projects?: Project[];
  taskCount?: number
}) {

  return (
    <div className="border-2 border-blue-100  w-full grid flex-col gap-4 rounded-xl  p-5">
      <div className="flex justify-between">
        <div className="flex gap-3 items-center">
          <SquareDashedKanban />
          <h1 className="text-xl">{title}</h1>
        </div>
        <EllipsisVertical />
      </div>
      <div className="">
        <p className="text-5xl font-semibold tracking-tighter">
          {projects && projects.length}
        </p>
        <p className="text-5xl font-semibold tracking-tighter">
          {taskCount &&  taskCount}
        </p>
      </div>
    </div>
  );
}
