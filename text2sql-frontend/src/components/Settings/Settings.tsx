import { useState, useRef } from "react";
import { UserCircleIcon } from '@heroicons/react/20/solid'
import { useProfilePicture } from "../Providers/ProfilePictureProvider";
import { api } from "@/api";


export default function Account() {
  const [avatarUrl, _, setAvatarBlob] = useProfilePicture();
  
  const avatarUploadRef = useRef<HTMLInputElement>(null);

  // Manage avatar uploading state
  const [uploading, setUploading] = useState<boolean>(false);


  async function uploadAvatar(event: React.ChangeEvent<HTMLInputElement>) {
    try {
      setUploading(true);

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error("You must select an image to upload.");
      }

      const file = event.target.files[0];

      // Update profile avatar URL
      let response = await api.updateAvatar(file);
      if (response.status === "ok") {
        setAvatarBlob(response.blob);
      }
    } finally {
      setUploading(false);
    }
  }

  return (
    <>
      <div>
        <div className="">

          <main>
            <h1 className="sr-only">Settings</h1>

            {/* Settings forms */}
            <div className="divide-y divide-white/5">
              <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
                <div>
                  <h2 className="text-base font-semibold leading-7 text-white">Personal Information</h2>
                  {/* <p className="mt-1 text-sm leading-6 text-gray-400">
                    Customize how your account looks in the chats
                  </p> */}
                </div>

                <form className="md:col-span-2" >
                  <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
                    <div className="col-span-full flex items-center gap-x-8">
                    {avatarUrl ? (
                      
                      <img
                        className="h-24 w-24 flex-none rounded-lg bg-gray-800 object-cover"
                        src={avatarUrl}
                        alt=""
                      />
                    ) : (
                      <UserCircleIcon className="text-gray-300 h-8 w-8 rounded-full " />
                    )}
                      <div>
                        <button
                          type="button"
                          className="rounded-md bg-white/10 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-white/20"
                          onClick={() => avatarUploadRef.current?.click()}
                        >
                          Change profile pic
                        </button>
                        <p className="mt-2 text-xs leading-5 text-gray-400">Images only, 5MB max.</p>
                        <input
                          style={{
                            visibility: "hidden",
                            position: "absolute",
                          }}
                          type="file"
                          id="avatar-upload"
                          accept="image/*"
                          onChange={(event: React.ChangeEvent<HTMLInputElement>) => uploadAvatar(event)}
                          disabled={uploading}
                          ref={avatarUploadRef}
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-white">
                        First name
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          name="first-name"
                          id="first-name"
                          autoComplete="given-name"
                          className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 flex">
                    <button
                      type="submit"
                      className="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                    >
                      Save
                    </button>
                  </div>
                </form>
              </div>

              <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
                <div>
                  <h2 className="text-base font-semibold leading-7 text-white">API Keys</h2>
                  <p className="mt-1 text-sm leading-6 text-gray-400">
                    Update your OpenAI API key.
                  </p>
                </div>

                <form className="md:col-span-2">
                  <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
                    <div className="col-span-full">
                      <label htmlFor="current-password" className="block text-sm font-medium leading-6 text-white">
                        API Key
                      </label>
                      <div className="mt-2">
                        <input
                          pattern="[A-Za-z0-9]{8,16}"
                          id="current-password"
                          name="current_password"
                          type="password"
                          autoComplete="current-password"
                          className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="mt-8 flex">
                    <button
                      type="submit"
                      className="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                    >
                      Save
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  )
}