import { useState } from "react";

export default function UserMetaCard() {
  
  // State to manage form inputs
  const [formData] = useState({
    fullName: "Musharof Chowdhury",
    email: "randomuser@pimjo.com",
    phone: "+09 363 398 46",
    role: "Master",
  });

  return (
    <>
      <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex flex-col items-center w-full gap-6 xl:flex-row">
            <div className="w-20 h-20 overflow-hidden border border-gray-200 rounded-full dark:border-gray-800">
              <img src="/images/user/owner.jpg" alt="user" />
            </div>
            <div className="order-3 xl:order-2">
              <h4 className="mb-2 text-lg font-semibold text-center text-gray-800 dark:text-white/90 xl:text-left">
                {formData.fullName}
              </h4>
              <div className="flex flex-col items-center gap-1 text-center xl:flex-row xl:gap-3 xl:text-left">
                <p className="text-sm text-gray-500 dark:text-gray-400">Master</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
