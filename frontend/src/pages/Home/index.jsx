import React from "react";

export default function Home() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <h1 className="text-amber-300">Welcome to the Home Page</h1>
      <p className="text-lg mt-4">This is the home page of the application.</p>
    </div>
  );
}
