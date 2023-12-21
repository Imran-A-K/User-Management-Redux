import { HiArrowNarrowDown } from "react-icons/hi";
import { HiOutlinePencil } from "react-icons/hi";
import { HiOutlineTrash } from "react-icons/hi";
import dummyUser from "/public/images/dummyUser.png";
import Image from "next/image";
import Pagination from "../Pagination/Pagination";
import { cn } from "@/lib/Utilkit/Utilkit";

function TableHeaders() {
  function TableSingleHeader() {
    return (
      <th
        scope="col"
        className="py-3.5 pl-3 sm:pl-6 text-left text-sm font-semibold text-gray-900 "
      >
        Header
      </th>
    );
  }

  return (
    <tr>
      {[...Array(4).keys()].map((item) => (
        <TableSingleHeader key={item} />
      ))}
    </tr>
  );
}

function TableBodySingleRow() {
  return (
    <tr>
      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6 text-gray-500">
        data
      </td>
    </tr>
  );
}

function Table({ tableData = {}, setPage }) {
  const { data = [] } = tableData;
  return (
    <table className="min-w-full divide-y divide-gray-300 relative overflow-hidden ring ring-black ring-opacity-5 shadow rounded-lg">
      <thead className="bg-gray-50 w-full">
        <tr>
          <th
            scope="col"
            className="flex items-center gap-4 py-3.5 pl-6 text-left text-sm font-semibold text-gray-900 "
          >
            <input
              type="checkbox"
              className="custom-checkbox peer size-5 appearance-none rounded-md border border-slate-300 accent-purple-300 dark:accent-pink-600 checked:appearance-none checked:border-purple-600"
            />
            <span className="flex items-center gap-2">
              User Info
              <HiArrowNarrowDown className="h-4 w-4 text-gray-500" />
            </span>
          </th>
          <th
            scope="col"
            className="py-3.5 pl-3 sm:pl-6 text-left text-sm font-semibold text-gray-900 "
          >
            About
          </th>
          <th
            scope="col"
            // colSpan="2"
            className=" py-3.5 pl-3 sm:pl-6 text-left text-sm font-semibold text-gray-900 grow"
          >
            Status
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {data.map((eachUser) => {
          const randomValue = Math.round(Math.random());
          return (
            <tr key={eachUser.id}>
              <td className="whitespace-nowrap flex items-center gap-2 py-4 pl-4 pr-3 text-sm sm:pl-6">
                <input
                  type="checkbox"
                  className="peer size-5 appearance-none rounded-md border border-slate-300 accent-purple-300 dark:accent-pink-600 checked:appearance-none checked:border-purple-600"
                />
                <Image
                  src={eachUser?.avatar || dummyUser}
                  height={40}
                  width={40}
                  alt="user image"
                  className="rounded-full border-2"
                  priority
                />
                <div className="flex flex-col">
                  <p className="font-bold">{eachUser?.first_name}</p>
                  <p className="text-gray-600 text-sm">{eachUser?.email}</p>
                </div>
              </td>
              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                <span className="flex flex-col">
                  <p className="font-bold">Some dummy Content</p>
                  <p className="text-gray-600">
                    Brings all your news into one place
                  </p>
                </span>
              </td>
              <td className="whitespace-nowrap  pl-4 pr-7 py-auto text-sm sm:pl-6 ">
                <div className="flex justify-between items-center">
                  <p
                    className={cn(
                      "rounded-full px-2 font-medium",
                      randomValue === 1
                        ? "bg-green-100 text-green-600"
                        : "bg-gray-300 text-gray-700"
                    )}
                  >
                    {randomValue === 1 ? "Customer" : "Churned"}
                  </p>
                  <span className="flex items-center gap-4 text-gray-500">
                    <HiOutlineTrash className="h-6 w-6" />
                    <HiOutlinePencil className="h-6 w-6" />
                  </span>
                </div>
              </td>
            </tr>
          );
        })}
        {/* <tr>
          <td className="whitespace-nowrap flex items-center gap-2 py-4 pl-4 pr-3 text-sm sm:pl-6">
            <input
              type="checkbox"
              name=""
              id=""
              className="h-4 w-4 border-pink-300"
            />
            <Image
              src={dummyUser}
              height={40}
              width={40}
              alt="user image"
              className="rounded-full border-2"
              priority
            />
            <div className="flex flex-col">
              <p className="font-bold">User Name</p>
              <p className="text-gray-600 text-sm">User Email</p>
            </div>
          </td>
          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
            <span className="flex flex-col">
              <p className="font-bold">Some dummy Content</p>
              <p className="text-gray-600">
                Brings all your news into one place
              </p>
            </span>
          </td>
          <td className="whitespace-nowrap  pl-4 pr-7 py-auto text-sm sm:pl-6 ">
            <div className="flex justify-between items-center">
              <p>Random Sticker Label</p>
              <span className="flex items-center gap-4 text-gray-500">
                <HiOutlineTrash className="h-6 w-6" />
                <HiOutlinePencil className="h-6 w-6" />
              </span>
            </div>
          </td>
        </tr> */}
      </tbody>
      <tfoot className="bg-white">
        <tr>
          <td scope="col" colSpan={3}>
            <Pagination setPage={setPage} data={tableData} />
          </td>
        </tr>
      </tfoot>
    </table>
  );
}

export default Table;
