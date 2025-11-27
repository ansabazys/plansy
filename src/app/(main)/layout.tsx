import "../globals.css";
import Sidebar from "../components/layout/Sidebar";
import TopNavbar from "../components/layout/TopNavbar";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Kanban App",
  description: "Task management board",
};

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {

    const session = await getServerSession(authOptions)

    if(!session) {
        redirect("/login")
    }


  return (
    
    <div className="flex min-h-screen">
      <Sidebar />

      {/* Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Navbar */}
        <TopNavbar />

        {/* Page Content */}
        <main className="p-6 h-full ">{children}</main>
      </div>
    </div>
  );
}
