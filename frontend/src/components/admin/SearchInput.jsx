import React from "react";

function SearchInput({ searchQuery, setSearchQuery }) {
  return (
    <div>
      <input
        type="text"
        name="search"
        id="search"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500 sm:text-sm p-2 border"
        placeholder="Qidiruv..."
      />
    </div>
  );
}

export default SearchInput;
