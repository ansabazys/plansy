import DBConnect from "@/lib/mongoose";
import Project, { Task } from "@/models/Project";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await DBConnect();
    const { formData, taskId, action } = await req.json();
    const { id } = await params;
    const project = await Project.findById(id);

    console.log(formData);

    if (action === "addTodo") {
      console.log(project);
      project.tasks = [...project.tasks, formData];
      project.save();
    }

    if (action === "deleteTask") {
      project.tasks = project.tasks.filter((data: Task) => data._id != taskId);
      project.save();
    }

    if (action === "updateTitle") {
      const task: Task = project.tasks.find((data: Task) => data._id == taskId);
      task.title = formData;
      project.save();
    }
    if (action === "updateDate") {
      const task: Task = project.tasks.find((data: Task) => data._id == taskId);
      task.dueDate = formData;
      project.save();
    }
    if (action === "updateLabel") {
      const task: Task = project.tasks.find((data: Task) => data._id == taskId);
      task.labels = formData;
      project.save();
    }
    if (action === "updateStatus") {
      const task: Task = project.tasks.find((data: Task) => data._id == taskId);
      task.status = formData;
      project.save();
    }
    if (action === "updatePriority") {
      const task: Task = project.tasks.find((data: Task) => data._id == taskId);
      task.priority = formData;
      project.save();
    }

    return NextResponse.json(project, { status: 200 });
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


