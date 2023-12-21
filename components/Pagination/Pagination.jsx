const Pagination = ({ data, setPage }) => {
  const { total_pages = 1, page = 1 } = data;

  const handlePrevClick = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextClick = () => {
    setPage((prevPage) => Math.min(prevPage + 1, total_pages));
  };

  return (
    <span className="flex items-center justify-between my-4 w-full px-4">
      <button
        onClick={handlePrevClick}
        disabled={page === 1}
        className="px-4 py-2 mr-2 border-2 border-gray-200 shadow-sm text-gray-600 rounded-md hover:bg-purple-500 hover:text-white"
      >
        Previous
      </button>
      <p className="text-lg text-gray-700 font-semibold">
        Page {page} of {total_pages}
      </p>
      <button
        onClick={handleNextClick}
        disabled={page === total_pages}
        className="px-4 py-2 mr-2 border-2 border-gray-200 shadow-sm text-gray-600 rounded-md hover:bg-purple-500 hover:text-white"
      >
        Next
      </button>
    </span>
  );
};

export default Pagination;
