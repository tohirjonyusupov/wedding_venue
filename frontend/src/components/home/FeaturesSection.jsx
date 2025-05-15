import React from "react";

export function FeaturesSection() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="flex flex-col items-center text-center">
            <div className="mb-4 rounded-full bg-rose-100 p-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-rose-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9V6a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v3M3 16a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5a2 2 0 0 0-4 0v2H7v-2a2 2 0 0 0-4 0Z"
                />
              </svg>
            </div>
            <h3 className="mb-2 text-xl font-medium">Luxurious Venues</h3>
            <p className="text-gray-500">Choose from our selection of stunning venues perfect for your special day.</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="mb-4 rounded-full bg-rose-100 p-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-rose-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 8a2 2 0 0 0 2-2c0-.38-.1-.73-.29-1.03L12 2l-1.71 2.97c-.19.3-.29.65-.29 1.03 0 1.1.9 2 2 2Z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m18 9-1.71-2.97c-.19-.3-.29-.65-.29-1.03 0-1.1.9-2 2-2s2 .9 2 2c0 .38-.1.73-.29 1.03L18 9Z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m6 9 1.71-2.97c.19-.3.29-.65.29-1.03 0-1.1-.9-2-2-2s-2 .9-2 2c0 .38.1.73.29 1.03L6 9Z"
                />
                <path strokeLinecap="round" strokeLinejoin="round" d="M18 9v3c0 3-2.69 6-6 6s-6-3-6-6V9" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 13a20 20 0 0 0 18 0" />
              </svg>
            </div>
            <h3 className="mb-2 text-xl font-medium">Exquisite Catering</h3>
            <p className="text-gray-500">Delight your guests with our gourmet menu options and professional service.</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="mb-4 rounded-full bg-rose-100 p-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-rose-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 8a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"
                />
                <path strokeLinecap="round" strokeLinejoin="round" d="m9 12 2 2 4-4" />
              </svg>
            </div>
            <h3 className="mb-2 text-xl font-medium">Complete Planning</h3>
            <p className="text-gray-500">Our experienced team will handle every detail to ensure your perfect day.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
