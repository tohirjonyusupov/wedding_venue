// components/VenueListRenderer.jsx
import React from "react";
import GridVenueCard from "./GridVenueCard";
import ListVenueCard from "./ListVenueCard";
import NotFound from "../NotFound";
import CustomLoader from "../loader/CustomLoader";

export default function VenueListRenderer({
  venues = [],
  viewMode = "grid",
  isLoading = false,
  owners,
  venueOwners,
  handleAssignOwner,
  handleDeleteVenue,
  handleConfirim,
  openImageGallery,
  getStatusColor,
  navigate,
}) {
  if (isLoading) {
    return <CustomLoader size="xl" className="mt-40"/>
  }

  if (!venues.length) return <NotFound role="admin"/>;

  const CardComponent = viewMode === "grid" ? GridVenueCard : ListVenueCard;
  const layoutClass =
    viewMode === "grid"
      ? "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3"
      : "space-y-6";

  return (
    <div className={`mt-6 ${layoutClass}`}>
      {venues.map((venue) => (
        <CardComponent
          key={venue.id}
          venue={venue}
          owners={owners}
          venueOwners={venueOwners}
          handleAssignOwner={handleAssignOwner}
          handleDeleteVenue={handleDeleteVenue}
          handleConfirim={handleConfirim}
          openImageGallery={openImageGallery}
          getStatusColor={getStatusColor}
          navigate={navigate}
        />
      ))}
    </div>
  );
}
