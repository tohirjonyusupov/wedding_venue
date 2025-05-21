import axios from "axios";
import React, { useEffect, useState } from "react";

export default function AddVenue() {
  const [activeSection, setActiveSection] = useState("basic");
  const {id} = JSON.parse(localStorage.getItem("user")); 
  const [newVenue, setNewVenue] = useState({
    name: "",
    capacity: "",
    price_seat: "",
    address: "Toshkent",
    phone_number: "",
    district_id: "",
    owner_id: id,
    images: [],
  });

  const formDate = new FormData();
  formDate.append("name", newVenue.name);
  formDate.append("capacity", newVenue.capacity);
  formDate.append("price_seat", newVenue.price_seat);
  formDate.append("address", newVenue.address);
  formDate.append("phone_number", newVenue.phone_number);
  formDate.append("district_id", newVenue.district_id);
  formDate.append("owner_id", newVenue.owner_id);
  newVenue.images.forEach((file) => {
    formDate.append("images", file);
  });


  const [districts, setDistricts] = useState([]);

  useEffect(() => {
    const fetchDistricts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/get-districts"
        );
        setDistricts(response.data.data);
      } catch (error) {
        console.error("Error fetching districts:", error);
      }
    };
    fetchDistricts();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewVenue({
      ...newVenue,
      [name]: value,
    });
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setNewVenue({
      ...newVenue,
      images: [...newVenue.images, ...files],
    });
  };

  const removeImage = (index) => {
    const updatedImages = [...newVenue.images];
    updatedImages.splice(index, 1);
    setNewVenue({
      ...newVenue,
      images: updatedImages,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(newVenue);
    
    axios
      .post("http://localhost:4000/owner/create-venue", formDate, 
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((response) => {
        console.log("Response:", response.data);
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
            <aside className="py-6 lg:col-span-3">
              <nav className="space-y-1">
                <button
                  type="button"
                  onClick={() => setActiveSection("basic")}
                  className={`group flex items-center rounded-md px-3 py-2 text-sm font-medium w-full ${
                    activeSection === "basic"
                      ? "bg-rose-50 text-rose-700"
                      : "text-gray-900 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <span className="truncate">Basic Information</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveSection("images")}
                  className={`group flex items-center rounded-md px-3 py-2 text-sm font-medium w-full ${
                    activeSection === "images"
                      ? "bg-rose-50 text-rose-700"
                      : "text-gray-900 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <span className="truncate">Images & Media</span>
                </button>
              </nav>
            </aside>

            {/* Main content */}
            <div className="space-y-6 sm:px-6 lg:col-span-9 lg:px-0">
              {/* Basic Information */}
              {activeSection === "basic" && (
                <section aria-labelledby="basic-info-heading">
                  <div className="shadow sm:overflow-hidden sm:rounded-md">
                    <div className="bg-white py-6 px-4 sm:p-6">
                      <div>
                        <h2
                          id="basic-info-heading"
                          className="text-lg font-medium leading-6 text-gray-900"
                        >
                          Basic Information
                        </h2>
                        <p className="mt-1 text-sm text-gray-500">
                          Provide the essential details about the wedding venue.
                        </p>
                      </div>

                      <div className="mt-6 grid grid-cols-6 gap-6">
                        <div className="col-span-6 sm:col-span-4">
                          <label
                            htmlFor="name"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Venue Name
                          </label>
                          <input
                            type="text"
                            name="name"
                            id="name"
                            value={newVenue.name}
                            onChange={handleInputChange}
                            className="p-3 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500 sm:text-sm"
                            required
                          />
                        </div>

                        <div className="col-span-6 sm:col-span-3">
                          <label
                            htmlFor="capacity"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Capacity Range
                          </label>
                          <input
                            type="text"
                            name="capacity"
                            id="capacity"
                            value={newVenue.capacity}
                            onChange={handleInputChange}
                            className="p-3 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500 sm:text-sm"
                            placeholder="Enter capacity"
                            required
                          />
                        </div>

                        <div className="col-span-6 sm:col-span-3">
                          <label
                            htmlFor="priceRange"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Price Seat
                          </label>
                          <input
                            type="number"
                            placeholder="Enter price seat"
                            className="p-3 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500 sm:text-sm"
                            name="price_seat"
                            id="price_seat"
                            value={newVenue.price_seat}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                          <label
                            htmlFor="priceRange"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Phone number
                          </label>
                          <input
                            type="number"
                            placeholder="Enter phone number"
                            className="p-3 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500 sm:text-sm"
                            name="phone_number"
                            id="phone_number"
                            value={newVenue.phone_number}
                            onChange={handleInputChange}
                            required
                          />
                        </div>

                        <div className="col-span-6">
                          <label
                            htmlFor="location"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Address
                          </label>
                          <input
                            type="text"
                            name="location"
                            id="location"
                            value={newVenue.address}
                            onChange={handleInputChange}
                            className="p-3 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500 sm:text-sm"
                            required
                          />
                        </div>

                        <div className="col-span-6 sm:col-span-3">
                          <label
                            htmlFor="district"
                            className="block text-sm font-medium text-gray-700"
                          >
                            District
                          </label>
                          <select
                            id="district"
                            name="district_id"
                            value={newVenue.district_id}
                            onChange={handleInputChange}
                            className="p-3 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500 sm:text-sm"
                            required
                          >
                            <option value="" disabled>
                              Select a district
                            </option>
                            {districts?.map((district) => (
                              <option key={district.id} value={district.id}>
                                {district.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                      <button
                        type="button"
                        onClick={() => setActiveSection("images")}
                        className="inline-flex justify-center rounded-md border border-transparent bg-rose-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2"
                      >
                        Next: Images & Media
                      </button>
                    </div>
                  </div>
                </section>
              )}

              {/* Images & Media */}
              {activeSection === "images" && (
                <section aria-labelledby="images-heading">
                  <div className="shadow sm:overflow-hidden sm:rounded-md">
                    <div className="bg-white py-6 px-4 sm:p-6">
                      <div>
                        <h2
                          id="images-heading"
                          className="text-lg font-medium leading-6 text-gray-900"
                        >
                          Images
                        </h2>
                        <p className="mt-1 text-sm text-gray-500">
                          Upload high-quality images of the venue to showcase
                          its features.
                        </p>
                      </div>

                      <div className="mt-6">
                        <label className="block text-sm font-medium text-gray-700">
                          Venue Photos
                        </label>
                        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                          <div className="space-y-1 text-center">
                            <svg
                              className="mx-auto h-12 w-12 text-gray-400"
                              stroke="currentColor"
                              fill="none"
                              viewBox="0 0 48 48"
                              aria-hidden="true"
                            >
                              <path
                                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                            <div className="flex text-sm text-gray-600">
                              <label
                                htmlFor="file-upload"
                                className="relative cursor-pointer bg-white rounded-md font-medium text-rose-600 hover:text-rose-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-rose-500"
                              >
                                <span>Upload files</span>
                                <input
                                  id="file-upload"
                                  name="file-upload"
                                  type="file"
                                  className="sr-only"
                                  multiple
                                  accept="image/*"
                                  onChange={handleImageUpload}
                                />
                              </label>
                              <p className="pl-1">or drag and drop</p>
                            </div>
                            <p className="text-xs text-gray-500">
                              PNG, JPG, GIF up to 10MB each
                            </p>
                          </div>
                        </div>
                      </div>

                      {newVenue.images.length > 0 && (
                        <div className="mt-6">
                          <h3 className="text-sm font-medium text-gray-700">
                            Uploaded Images
                          </h3>
                          <div className="mt-2 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                            {newVenue.images.map((image, index) => (
                              <div key={index} className="relative group">
                                <div className="aspect-w-1 aspect-h-1 rounded-lg bg-gray-100 overflow-hidden">
                                  <img
                                    src={
                                      URL.createObjectURL(image) ||
                                      "/placeholder.svg"
                                    }
                                    alt={`Venue image ${index + 1}`}
                                    className="object-cover"
                                  />
                                  <button
                                    type="button"
                                    onClick={() => removeImage(index)}
                                    className="absolute top-2 right-2 bg-white rounded-full p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500"
                                  >
                                    <span className="sr-only">
                                      Remove image
                                    </span>
                                    <svg
                                      className="h-5 w-5"
                                      xmlns="http://www.w3.org/2000/svg"
                                      viewBox="0 0 20 20"
                                      fill="currentColor"
                                      aria-hidden="true"
                                    >
                                      <path
                                        fillRule="evenodd"
                                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                        clipRule="evenodd"
                                      />
                                    </svg>
                                  </button>
                                </div>
                                <div className="mt-2 flex justify-between items-center text-sm">
                                  <span className="text-gray-500 truncate">
                                    {image.name}
                                  </span>
                                  <span className="text-gray-400">
                                    {(image.size / (1024 * 1024)).toFixed(2)} MB
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="bg-gray-50 px-4 py-3 flex justify-between sm:px-6">
                      <button
                        type="button"
                        onClick={() => setActiveSection("basic")}
                        className="inline-flex justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2"
                      >
                        Previous
                      </button>
                      <button
                        type="submit"
                        className="inline-flex justify-center rounded-md border border-transparent bg-rose-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2"
                      >
                        Create venue
                      </button>
                    </div>
                  </div>
                </section>
              )}
            </div>
          </div>
        </form>
      </main>
    </div>
  );
}
