import axios from "axios";
import { toast } from "react-toastify";
import BasicInfoForm from "../../components/BasicInfoForm";
import ImageForm from "../../components/ImageForm";
import FormSidebar from "../../components/FormSidebar";
import { useVenueStore } from "../../zustand/VenueStore";

export default function AddVenue() {
  const { id } = JSON.parse(localStorage.getItem("user"));
  const { newVenue, activeSection, resetNewVenue } = useVenueStore(
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
    formDate.append("owner_id", id);
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
        console.log("Response:", response.data);
        if (response.data) {
          resetNewVenue();
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
