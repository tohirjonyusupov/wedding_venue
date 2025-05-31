import React, { useState, useEffect } from "react";

const ImageModal = ({ isOpen, selectedVenue, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (isOpen) {
      setCurrentImageIndex(0); // modal ochilganda birinchi rasmga qaytish
    }
  }, [isOpen]);

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? selectedVenue.images.length - 1 : prevIndex - 1
    );
  };

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === selectedVenue.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  if (!isOpen || !selectedVenue) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-end justify-center  text-center sm:block sm:p-0">
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          aria-hidden="true"
        ></div>

        <span
          className="hidden sm:inline-block sm:h-screen sm:align-middle"
          aria-hidden="true"
        >
          &#8203;
        </span>

        <div className="inline-block transform overflow-hidden rounded-lg bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-4xl sm:align-middle">
          <div className="bg-white px-4 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  {selectedVenue.name} - Images
                </h3>
                <div className="mt-4">
                  <div className="relative">
                    <div className=" overflow-hidden rounded-lg bg-gray-200">
                      <img
                        loading="lazy"
                        src={
                          selectedVenue.images[currentImageIndex] ||
                          `/placeholder.svg?height=600&width=1200&text=${selectedVenue.name}`
                        }
                        alt={`${selectedVenue.name} - Image ${
                          currentImageIndex + 1
                        }`}
                        className="h-full w-full object-cover object-center max-h-[55vh]"
                      />
                    </div>

                    {selectedVenue.images.length > 1 && (
                      <>
                        <button
                          onClick={prevImage}
                          aria-label="Previous image"
                          className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white p-2 text-gray-800 shadow-md hover:bg-gray-100"
                        >
                          <svg
                            className="h-5 w-5"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>
                        <button
                          onClick={nextImage}
                          aria-label="Next image"
                          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white p-2 text-gray-800 shadow-md hover:bg-gray-100"
                        >
                          <svg
                            className="h-5 w-5"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>
                      </>
                    )}
                  </div>

                  <div className="mt-4 flex space-x-2 overflow-x-auto pb-2">
                    {selectedVenue.images.map((image, index) => (
                      <div
                        key={index}
                        className={`relative h-16 w-16 flex-shrink-0 cursor-pointer overflow-hidden rounded-md ${
                          index === currentImageIndex
                            ? "ring-2 ring-rose-500"
                            : "ring-1 ring-gray-200"
                        }`}
                        onClick={() => setCurrentImageIndex(index)}
                      >
                        <img
                          src={
                            image ||
                            `/placeholder.svg?height=64&width=64&text=${
                              index + 1
                            }`
                          }
                          alt={`${selectedVenue.name} - Thumbnail ${index + 1}`}
                          className="h-full w-full object-cover object-center"
                          loading="lazy"
                        />
                      </div>
                    ))}
                  </div>

                  <div className="mt-2 text-sm text-gray-500">
                    Image {currentImageIndex + 1} of{" "}
                    {selectedVenue.images.length}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
            <button
              onClick={onClose}
              className="absolute top-2 right-2 z-10 rounded-full bg-white p-2 text-gray-700 shadow hover:bg-gray-100"
              aria-label="Close modal"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageModal;
