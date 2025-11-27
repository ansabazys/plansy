import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Bell, Search } from "lucide-react";
import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";

export default async function TopNavbar() {
  const session = await getServerSession(authOptions) 

  return (
    <header className="h-22 border-b justify-between border-black/5 flex items-center px-8 w-full">
      <form
        action=""
        className="w-full flex max-w-sm items-center px-2 rounded-lg justify-between border-2 border-black/5"
      >
        <Search className="text-black/50" />
        <input
          type="text"
          name=""
          id=""
          placeholder="Search"
          className="outline-0  w-full  p-2"
        />
        <button className="flex w-full max-w-fit items-center text-xs text-black/50">
          ⌘ + F
        </button>
      </form>

      <div className="flex items-center gap-4">
        <div>
            <Bell />
        </div>

        <hr className="border h-5 border-black/20" />

        <div className="flex items-center justify-center gap-2">
          <picture className="w-10 flex items-center justify-center bg-white rounded-full">
            <img
              src="https://notion-avatar.app/api/svg/eyJmYWNlIjoxLCJub3NlIjoxMCwibW91dGgiOjIsImV5ZXMiOjMsImV5ZWJyb3dzIjowLCJnbGFzc2VzIjo4LCJoYWlyIjo0MywiYWNjZXNzb3JpZXMiOjAsImRldGFpbHMiOjAsImJlYXJkIjowLCJmbGlwIjowLCJjb2xvciI6InJnYmEoMjU1LCAwLCAwLCAwKSIsInNoYXBlIjoibm9uZSJ9"
              alt="notion avatar"
            ></img>
          </picture>
          <hr />
          <div className="">
            <h1>{session?.user.email}</h1>
            {/* <p className="text-sm text-black/50">Software Engineer</p> */}
          </div>
        </div>
      </div>
    </header>
  );
}
