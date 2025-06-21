// components/FilterPanel.jsx
import React from "react";
import SelectFilter from "./SelectFilter";

export default function FilterPanel({
  filter,
  setFilter,
  selectedDistrict,
  setSelectedDistrict,
  sort,
  setSort,
  districts = [],
}) {
  const statusOptions = [
    { value: "all", label: "Barchasi" },
    { value: "tasdiqlangan", label: "Tasdiqlangan" },
    { value: "tasdiqlanmagan", label: "Tasdiqlanmagan" },
  ];

  const districtOptions = [
    { value: "all", label: "Barcha tumanlar" },
    ...districts.map((d) => ({
      value: d.name,
      label: d.name,
    })),
  ];

  const sortOptions = [
    { value: "popular", label: "Barchasi" },
    { value: "price-low", label: "Narx: Arzondan qimmatroqqa" },
    { value: "price-high", label: "Narx: Qimmatdan arzonroqqa" },
    { value: "capacity-low", label: "Sig'im: Kichikdan kattaga" },
    { value: "capacity-high", label: "Sig'im: Kattadan kichikka" },
  ];
  

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
      <SelectFilter
        id="filter-status"
        label="Status"
        value={filter}
        onChange={setFilter}
        options={statusOptions}
      />
      <SelectFilter
        id="filter-district"
        label="Tuman"
        value={selectedDistrict}
        onChange={setSelectedDistrict}
        options={districtOptions}
      />
      <SelectFilter
        id="sort"
        label="Tartiblash"
        value={sort}
        onChange={setSort}
        options={sortOptions}
      />
    </div>
  );
}
