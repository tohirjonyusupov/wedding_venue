import React from "react";
import { useVenueStore } from "../../zustand/VenueStore";

function ImageForm() {
  const { newVenue, setNewVenue, setActiveSection } = useVenueStore(
    (state) => state
  );
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setNewVenue({
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
  return (
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
              Upload high-quality images of the venue to showcase its features.
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
                        src={URL.createObjectURL(image) || "/placeholder.svg"}
                        alt={`Venue image ${index + 1}`}
                        className="object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-2 right-2 bg-white rounded-full p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500"
                      >
                        <span className="sr-only">Remove image</span>
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
  );
}

export default ImageForm;
