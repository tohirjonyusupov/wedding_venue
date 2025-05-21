import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function EditVenue() {
  const { venue_id } = useParams();

  const [venue, setVenue] = useState({});
  const [newVenue, setNewVenue] = useState({
    name: "",
    address: "",
    capacity: "",
    district_id: "",
    price_seat: "",
    phone_number: "",
  });
  const [districts, setDistricts] = useState([]);
  const [activeSection, setActiveSection] = useState("basic");

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

  // Set newVenue values when venue changes
  useEffect(() => {
    if (venue) {
      setNewVenue({
        name: venue.name || "",
        address: venue.address || "",
        capacity: venue.capacity || "",
        district_id: venue.district_id || "",
        price_seat: venue.price_seat || "",
        phone_number: venue.phone_number || "",
      });
    }
  }, [venue]);
  

  

  // Fetch districts
  useEffect(() => {
    const fetchDistricts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/admin/get-districts"
        );
        setDistricts(response.data.data);
      } catch (error) {
        console.error("Error fetching districts:", error);
      }
    };
    fetchDistricts();
  }, []);

  // Input change handler
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewVenue((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


 

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();


    
    console.log(newVenue);
    
    try {
      const response = await axios.put(
        `http://localhost:4000/admin/update-venue/${venue_id}`,
        newVenue,
      );
      console.log("Venue updated:", response.data);
      // success message or redirect here
    } catch (error) {
      console.error("Error updating venue:", error);
    }
  };

  
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 bg-gray-50">
        <form
          onSubmit={handleSubmit}
          className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6"
        >
          <div className="lg:grid lg:grid-cols-12 lg:gap-x-5">
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
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500 sm:text-sm"
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
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500 sm:text-sm"
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
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500 sm:text-sm"
                            name="price_seat"
                            id="price_seat"
                            value={newVenue.price_seat}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                          <label
                            htmlFor="phone_number"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Phone number
                          </label>
                          <input
                            type="number"
                            placeholder="Enter phone number"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500 sm:text-sm"
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
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500 sm:text-sm"
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
                        type="submit"
                        className="inline-flex justify-center rounded-md border border-transparent bg-rose-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2"
                      >
                        Save
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
