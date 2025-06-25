import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import EditForm from "../../components/EditForm";

export default function UpdateVenue() {
  const navigate = useNavigate();
  const { venue_id } = useParams();
  const [venue, setVenue] = useState({});

  // Fetch venue data by ID
  useEffect(() => {
    const fetchVenue = async () => {
      try {
        const response = await axios.get(
          `https://wedding-venue.onrender.com/owner/get-venue/${venue_id}`
        );
        setVenue(response.data.data);
      } catch (error) {
        console.error("Error fetching venue:", error);
      }
    };
    fetchVenue();
  }, [venue_id]);

  // Submit form
  const handleSubmit = async (e) => {
    console.log(venue_id);

    e.preventDefault();

    try {
      const response = await axios.put(
        `https://wedding-venue.onrender.com/owner/update-venue/${venue_id}`,
        venue
      );
      console.log("Venue updated:", response.data);
      if (response.data) {
        toast.success("To'yxona muvaffaqiyatli yangilandi!");
        navigate("/owner/venues");
      }
    } catch (error) {
      console.error("Error updating venue:", error);
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 bg-gray-50">
        <EditForm
          handleSubmit={handleSubmit}
          venue={venue}
          setVenue={setVenue}
        />
      </main>
    </div>
  );
}
