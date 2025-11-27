import { Task } from "@/models/Project";
import { createContext, useContext, useEffect, useState } from "react";

export interface Project {
  _id: string;
  owner: string;
  name: string;
  tasks: Task[];
}

interface ProjectContextType {
  projects: Project[];
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
  fetchData: () => Promise<void>;
  totalTasks: number;
}
const ProjectContext = createContext<ProjectContextType | null>(null);

export const ProjectProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [totalTasks, setTotalTasks] = useState<number>(0);

  const fetchData = async () => {
    const response = await fetch("/api/project");
    const data: Project[] = await response.json();
    setProjects(data);

    if (data.length < 1) setTotalTasks(0);

    const total = data.reduce((sum, project) => sum + project.tasks.length, 0);
    setTotalTasks(total);

  };


  useEffect(() => {
    fetchData();
  }, []);

  return (
    <ProjectContext.Provider
      value={{ projects, totalTasks, setProjects, fetchData }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export function useProject() {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error("useProject must be used within a ProjectProvider");
  }
  return context;
}
