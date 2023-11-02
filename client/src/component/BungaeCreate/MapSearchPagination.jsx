function MapSearchPagination({ pagination, handleClickPagination }) {
  if (!pagination.pages) return;

  return (
    <ul className="MapSearchPagination">
      {pagination.pages.map((page, idx) => (
        <li
          className="PageNumber"
          key={idx}
          current={page === pagination.current ? "true" : "false"}
          onClick={() => handleClickPagination(page)}
        >
          {page}
        </li>
      ))}
    </ul>
  );
}

export default MapSearchPagination;
