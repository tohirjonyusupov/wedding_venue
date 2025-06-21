import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import EditForm from "../../components/EditForm";
import { toast } from "react-toastify";

export default function EditVenue() {
  const navigate = useNavigate();
  const { venue_id } = useParams();

  const [venue, setVenue] = useState({});

  // Fetch venue data by ID
  useEffect(() => {
    const fetchVenue = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/admin/venues/${venue_id}`
        );
        setVenue(response.data.venue);
      } catch (error) {
        console.error("Error fetching venue:", error);
      }
    };
    fetchVenue();
  }, [venue_id]);


  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();    
    try {
      const response = await axios.put(
        `http://localhost:4000/admin/update-venue/${venue_id}`,
        venue,
      );
      if (response.data) {
        toast.success("To'yxona muvaffaqiyatli yangilandi!");
        navigate('/admin/venues');
      }
    } catch (error) {
      console.error("Error updating venue:", error);
    }
  };

  
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 bg-gray-50">
        <EditForm venue={venue} setVenue={setVenue} handleSubmit={handleSubmit} />   
      </main>
    </div>
  );
}
