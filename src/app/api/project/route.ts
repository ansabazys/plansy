import DBConnect from "@/lib/mongoose";
import Project, { Task } from "@/models/Project";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(req: NextRequest) {
  try {
    await DBConnect();
    const { name, owner } = await req.json();

    const result = await Project.create({ name, owner, tasks: [] });
    return NextResponse.json(result, { status: 201 });
  } catch (error: unknown) {
    console.error(error);
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message || "Something went wrong" },
        { status: 500 }
      );
    }
  }
}

export async function GET(req: NextRequest) {
  await DBConnect();

  const session = await getServerSession(authOptions);

  const projects = await Project.find({ owner: session?.user.id }).sort({
    createdAt: -1,
  });
  return NextResponse.json(projects, { status: 200 });
}


export async function DELETE(req: NextRequest) {
  try {
    await DBConnect();
    const { projectId } = await req.json();
    const result = await Project.findByIdAndDelete(projectId);

    return NextResponse.json(result, { status: 200 });
  } catch (error: unknown) {
    console.error(error);
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message || "Something went wrong" },
        { status: 500 }
      );  
    }
  }
}

