import React from "react"
import CreateOwnerForm from "../../components/admin/CreateOwnerForm"

export default function RegisterVenueOwner() {

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 bg-gray-50 py-10">
       <CreateOwnerForm />
      </main>
    </div>
  )
}
