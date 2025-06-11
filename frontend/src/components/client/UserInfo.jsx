import React from "react";

function UserInfo({user}) {
  return (
    <div className="p-6">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div className="sm:flex sm:items-center">
          <div className="mt-4 sm:mt-0 sm:ml-4">
            <h2 className="text-xl font-medium text-gray-900">
              {user.firstname} {user.lastname}
            </h2>
            <div className="mt-1 flex items-center text-sm text-gray-500">
              <svg
                className="mr-1.5 h-4 w-4 flex-shrink-0 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              @{user.username}
            </div>
            <div className="mt-1 flex items-center text-sm text-gray-500">
              <svg
                className="mr-1.5 h-4 w-4 flex-shrink-0 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              {user.phone_number}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserInfo;
