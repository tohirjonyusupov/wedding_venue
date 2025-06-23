import axios from "axios";
import React from "react";
import { toast } from "react-toastify";
import BasicInfoForm from "../../components/BasicInfoForm";
import ImageForm from "../../components/ImageForm";
import FormSidebar from "../../components/FormSidebar";
import { useVenueStore } from "../../zustand/VenueStore";
import { useNavigate } from "react-router-dom";

export default function CreateVenueAdmin() {
  const navigate = useNavigate();
  const { newVenue, activeSection, resetNewVenue, setActiveSection } = useVenueStore(
    (state) => state
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const formDate = new FormData();
    formDate.append("name", newVenue.name);
    formDate.append("capacity", newVenue.capacity);
    formDate.append("price_seat", newVenue.price_seat);
    formDate.append("address", newVenue.address);
    formDate.append("phone_number", newVenue.phone_number);
    formDate.append("district_id", newVenue.district_id);
    if (newVenue.images.length > 0) {
      newVenue.images.forEach((file) => {
        formDate.append("images", file);
      });
    } 
    
    axios
      .post("http://localhost:4000/admin/create-venue", formDate, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log("Response:", response.data.data);
        if (response.data) {
          resetNewVenue();
          toast.success("To'yxona mufaqqiyatli yaratild!");
          navigate("/admin/venues");
          setActiveSection("basic");
        }
      })
      .catch((error) => {
        console.error("Error creating venue:", error);
      });
  };

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 bg-gray-50">
        <form
          onSubmit={handleSubmit}
          className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6"
        >
          <div className="lg:grid lg:grid-cols-12 lg:gap-x-5">
            <FormSidebar />

            {/* Main content */}
            <div className="space-y-6 sm:px-6 lg:col-span-9 lg:px-0">
              {/* Basic Information */}
              {activeSection === "basic" && <BasicInfoForm />}

              {/* Images & Media */}
              {activeSection === "images" && <ImageForm />}
            </div>
          </div>
        </form>
      </main>
    </div>
  );
}
