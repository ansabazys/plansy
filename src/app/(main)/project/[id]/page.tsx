import Project, { Task } from "@/models/Project";
import DBConnect from "@/lib/mongoose";
import TaskHeader, {
  PRIORITY,
  STATUS,
} from "@/app/components/common/TaskHeader";
import UpdateButton from "@/app/components/common/UpdateButton";
import DeleteButton from "@/app/components/common/DeleteButton";
import UpdateInput from "@/app/components/common/UpdateInput";

async function getProject(id: string) {
  await DBConnect();
  const project = await Project.findById(id);

  if (!project) {
    return <div className="text-red-500">Project not found</div>;
  }

  return project;
}

const ProjectDetails = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;
  const project = await getProject(id);

  return (
    <div className="">
      <h1 className="text-2xl font-semibold mb-4">{project.name}</h1>

      <TaskHeader id={id} />

      <div className="rounded-lg border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Task Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Estimation
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                labels
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Priority
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {project.tasks.map((task: Task) => (
              <tr
                key={task._id}
                className={`hover:bg-gray-50 transition-colors`}
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  <UpdateInput
                    type="text"
                    projectId={id}
                    id={task._id?.toString()!}
                    data={task.title}
                    action="updateTitle"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  <UpdateInput
                    type="date"
                    projectId={id}
                    id={task._id?.toString()!}
                    data={task.dueDate!}
                    action="updateDate"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  <UpdateInput
                    type="text"
                    projectId={id}
                    id={task._id?.toString()!}
                    data={task.labels}
                    action="updateLabel"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <UpdateButton
                    projectId={id}
                    id={task._id?.toString()!}
                    status={task.status}
                    data={STATUS}
                    action="updateStatus"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  <UpdateButton
                    projectId={id}
                    id={task._id?.toString()!}
                    status={task.priority}
                    data={PRIORITY}
                    action="updatePriority"
                  />
                </td>

                <td>
                  <DeleteButton projectId={id} id={task._id?.toString()!} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProjectDetails;
