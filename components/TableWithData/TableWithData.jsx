"use client";

import { useState } from "react";
import { useGetUserDataQuery } from "../Redux/Slices/apiSlice";
import Table from "../Table/Table";

function TableWithData() {
  const [page, setPage] = useState(1);
  const { data: usersData = {}, error, isLoading } = useGetUserDataQuery(page);

  if (!isLoading) {
    return <Table tableData={usersData} setPage={setPage}></Table>;
  }
}

export default TableWithData;
