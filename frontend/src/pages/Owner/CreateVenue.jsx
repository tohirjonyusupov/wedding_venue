import axios from "axios";
import React from "react";
import { useNewVenueStore } from "../../zustand/newVenueStore";
import BasicInfoForm from "../../components/owner/BasicInfoForm";
import ImageForm from "../../components/owner/ImageForm";
import FormSidebar from "../../components/owner/FormSidebar";
import { toast } from "react-toastify";

export default function AddVenue() {
  const { id } = JSON.parse(localStorage.getItem("user"));
  const { newVenue, activeSection, resetNewVenue } = useNewVenueStore((state) => state);

  const formDate = new FormData();
  formDate.append("name", newVenue.name);
  formDate.append("capacity", newVenue.capacity);
  formDate.append("price_seat", newVenue.price_seat);
  formDate.append("address", newVenue.address);
  formDate.append("phone_number", newVenue.phone_number);
  formDate.append("district_id", newVenue.district_id);
  formDate.append("owner_id", id);
  newVenue.images.forEach((file) => {
    formDate.append("images", file);
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:4000/owner/create-venue", formDate, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log("Response:", response.data);
        if (response.data){
          resetNewVenue(); // Reset the form after successful submission
          toast.success("To'yxona mufaqqiyatli yaratild!");
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
