"use client";

import { useProject } from "@/app/context/ProjectContext";
import {
  ChevronDown,
  ChevronUp,
  CircleQuestionMark,
  Folder,
  FolderCheck,
  LayoutDashboard,
  LogOut,
  PanelLeft,
  Settings,
} from "lucide-react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import {useState } from "react";

export default function Sidebar() {
  const [showProjects, setShowProjects] = useState(false);
  

  const {projects} = useProject()

  return (
    <aside className=" w-full max-w-xs relative border-r border-black/5 h-screen">
      <div className="flex w-full h-20  justify-between p-5 items-center border-b border-black/5">
        <div>
          <svg
            width="30"
            height="30"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M26.5537 13.3311L26.667 13.4463H40V26.5537C29.3032 26.5355 26.6027 29.661 26.667 39.8867L26.5537 39.7725V40H13.4463V26.5537H0V13.4463C11.1251 13.3829 13.4414 9.88401 13.4463 0H26.5537V13.3311Z"
              fill="#0066FF"
            />
          </svg>
        </div>
        <PanelLeft color="gray" width="20px" />
      </div>

      <div className="p-5 grid gap-10">
        <div className="grid gap-4">
          <h1 className="text-sm text-black/50">Workspace</h1>
          <div className="flex flex-col gap-4">
            <Link href="/dashboard" className="flex gap-4">
              <LayoutDashboard />
              <span>Dashboard</span>
            </Link>
            {/* <Link href="/tasks" className="flex gap-4">
              <FolderCheck />
              <span>Tasks</span>
            </Link> */}
            <div
              onClick={() => setShowProjects((prev) => !prev)}
              className="flex justify-between"
            >
              <div className="flex gap-4">
                <Folder />
                <span>Projects</span>
              </div>

              {showProjects ? (
                <ChevronUp color="gray" width="20px" />
              ) : (
                <ChevronDown color="gray" width="20px" />
              )}
            </div>
            {showProjects && (
              <div className="pl-10 ">
                <ul className="flex flex-col gap-1 text-blue-500">
                  {projects.map(data => (
                    <Link href={`/project/${data._id}`} key={data._id}>#{data.name.toLowerCase()}</Link>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        <div className="grid gap-4">
          <h1 className="text-sm text-black/50">Analytics & Report</h1>
          <div className="flex flex-col gap-4">
            <Link href="/dashboard" className="flex gap-4">
              <Settings />
              <span>Settings</span>
            </Link>
            <Link href="/dashboard" className="flex gap-4">
              <CircleQuestionMark />
              <span>Help & Support</span>
            </Link>
          </div>
        </div>
      </div>

      <div
        className="flex bottom-5 gap-4 p-5  absolute"
        onClick={() => signOut()}
      >
        <LogOut />
        <button>Log out</button>
      </div>
    </aside>
  );
}
