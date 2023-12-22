"use client";
import TableWithData from "@/components/TableWithData/TableWithData";
import { CiImport } from "react-icons/ci";
import { HiPlus } from "react-icons/hi";
export default function Users() {
  return (
    <section className="px-32 py-8">
      <div className="flex items-center justify-between pl-8">
        <p className="font-bold text-2xl">Users</p>
        <div className="flex items-center gap-x-4">
          <button className="inline-flex gap-2 px-3 py-2 items-center border border-gray-200 rounded-md shadow">
            <CiImport className="h-5 w-5" />
            <p className="font-semibold">Import</p>
          </button>
          <button className="inline-flex gap-2 bg-purple-600 text-white px-3 py-2 items-center border border-gray-200 rounded-md shadow">
            <HiPlus className="h-5 w-5" />
            <p className="font-semibold">Add User</p>
          </button>
        </div>
      </div>
      <div className="pt-6 px-3">
        <TableWithData />
      </div>
    </section>
  );
}
