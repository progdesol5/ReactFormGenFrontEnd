import {Pencil, Trash2Icon } from "lucide-react";

const UserMstContent = () => {
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg m-4">
      <div className="flex justify-between items-center mb-5 m-4">
        <h4 className="my-4 text-center text-2xl font-extrabold leading-none tracking-tight ">User Master</h4>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10 m-4">
        <div className="flex flex-col">
          <label className="font-semibold mb-1">First Name:</label>
          <input className="input input-bordered w-full" type="text" />
        </div>

        <div className="flex flex-col">
          <label className="font-semibold mb-1">Last Name:</label>
          <input className="input input-bordered w-full" type="text" />
        </div>

        <div className="flex flex-col">
          <label className="font-semibold mb-1">Email:</label>
          <input className="input input-bordered w-full" type="email" />
        </div>

        <div className="flex flex-col">
          <label className="font-semibold mb-1">Mobile No.:</label>
          <input className="input input-bordered w-full" type="tel" />
        </div>


        <div className="flex flex-col">
          <label className="font-semibold mb-1">User Type:</label>
          <select className="select select-bordered w-full">
            <option>Programmer</option>
            <option>Manager</option>
            <option>Finance</option>
            <option>Approver</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label className="font-semibold mb-1">Login ID:</label>
          <input className="input input-bordered w-full" type="text" />
        </div>

        <div className="flex flex-col">
          <label className="font-semibold mb-1">Password:</label>
          <input className="input input-bordered w-full" type="password" />
        </div>

        <div className="flex flex-col">
          <label className="font-semibold mb-1">Confirm Password:</label>
          <input className="input input-bordered w-full" type="password" />
        </div>
      </div>

      <h4 className="my-4 text-left text-2xl leading-none tracking-tight m-4">User List</h4>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="px-4 py-2">First Name</th>
              <th className="px-4 py-2">Last Name</th>
              <th className="px-4 py-2">Login ID</th>
              <th className="px-4 py-2">Is Active</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t">
              <td className="px-4 py-2">Test User</td>
              <td className="px-4 py-2">User 01</td>
              <td className="px-4 py-2">Prog1</td>
              <td className="px-4 py-2 text-green-600 font-semibold">True</td>
              <td className="px-4 py-2">
                <div className="flex gap-3">
                  <button className="btn btn-sm btn-outline btn-primary flex items-center gap-1">
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button className="btn btn-sm btn-outline btn-danger flex items-center gap-1">
                    <Trash2Icon className="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export { UserMstContent };
