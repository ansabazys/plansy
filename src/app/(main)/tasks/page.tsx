import React from 'react';
import { Eye } from 'lucide-react';

const Tasks = () => {
  const tasks = [
    {
      id: 1,
      name: 'Design landing page',
      project: 'Website Redesign',
      time: '2h 30m',
      status: 'In Progress'
    },
    {
      id: 2,
      name: 'Implement authentication',
      project: 'Mobile App',
      time: '4h 15m',
      status: 'Completed'
    },
    {
      id: 3,
      name: 'Fix navigation bug',
      project: 'Dashboard',
      time: '1h 45m',
      status: 'To Do'
    },
    {
      id: 4,
      name: 'Update documentation',
      project: 'API Service',
      time: '3h 00m',
      status: 'In Progress'
    },
    {
      id: 5,
      name: 'Code review',
      project: 'Mobile App',
      time: '1h 20m',
      status: 'Completed'
    }
  ];



  return (
    <div className="">
      <h1 className="text-2xl font-semibold mb-4">Tasks</h1>
      
      <div className="rounded-lg border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Task Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Project
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Time
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                View
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
              {tasks.map((task) => (
                <tr key={task.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {task.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {task.project}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {task.time}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full}`}>
                      {task.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    <button className="text-blue-600 hover:text-blue-800 transition-colors">
                      <Eye className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Tasks;