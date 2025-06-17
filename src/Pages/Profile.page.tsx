import { User, Mail, Phone, MapPin, Globe, Calendar, Shield, Edit3, Camera,} from "lucide-react";
import {  useDispatch } from "react-redux";
import {  userActions } from "../store/userSlice";
import { Spinner } from "flowbite-react";
import useAuth from "../hooks/useAuth";
import { EditProfile } from "../components/EditProfile";
import { useState } from "react";

const Profile = () => {
  const user = useAuth();
  const dispatch = useDispatch();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const openEditModal = () => setIsEditModalOpen(true);
  const closeEditModal = () => setIsEditModalOpen(false);


  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        <div className="text-center">
          <div className="mx-auto mb-4 h-16 w-16 animate-pulse rounded-full bg-gray-200 dark:bg-gray-700"></div>
          <p className="text-gray-500 dark:text-gray-400">Loading profile...</p>
          <Spinner className="mt-4" color="indigo" size="xl" />
        </div>
      </div>
    );
  }

  const fullName = `${user.name.first || ""} ${user.name.last || ""}`;

  return (
    <>
      <div className="">
        <div className="border border-gray-100 bg-white shadow-2xl dark:border-slate-700 dark:bg-slate-800">
          <div className="p-8 text-center sm:p-12">
            <div className="relative mb-6 inline-block">
              <div className="flex h-32 w-32 items-center justify-center rounded-3xl bg-gradient-to-br from-blue-500 to-indigo-600 text-4xl font-bold text-white shadow-2xl dark:from-blue-400 dark:to-indigo-500">
                <img
                  src={user.image?.url}
                  alt="Profile"
                  className="h-32 w-32 rounded-3xl"
                />
              </div>

              <button className="group absolute -right-2 -bottom-2 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl">
                <Camera className="h-5 w-5 text-white transition-transform duration-300 group-hover:scale-110" />
              </button>
            </div>

            <h1 className="mb-2 text-3xl font-bold text-gray-900 sm:text-4xl dark:text-white">
              {fullName || "User Profile"}
            </h1>

            <div className="mb-6 inline-flex items-center gap-2 rounded-tr-2xl rounded-bl-2xl bg-gradient-to-r from-blue-100 to-indigo-100 px-4 py-2 dark:from-blue-900/30 dark:to-indigo-900/30">
              <Shield className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
                {user.isAdmin ? "Administrator" : "User"}
              </span>
            </div>

            <button
              onClick={openEditModal}
              className="inline-flex transform items-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:from-blue-700 hover:to-indigo-700 hover:shadow-xl"
            >
              <Edit3 className="h-5 w-5" />
              Edit Profile
            </button>
          </div>
          <div className="border-t border-gray-100 dark:border-slate-700">
            <div className="grid grid-cols-1 gap-8 p-8 sm:p-12 lg:grid-cols-2">
              <div className="space-y-6">
                <h2 className="mb-6 flex items-center gap-3 text-2xl font-bold text-gray-900 dark:text-white">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-emerald-500 to-teal-500">
                    <User className="h-4 w-4 text-white" />
                  </div>
                  Contact Information
                </h2>
                <div className="flex items-center gap-4 rounded-2xl bg-gray-50 p-4 transition-colors duration-300 hover:bg-gray-100 dark:bg-slate-700/50 dark:hover:bg-slate-700">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500">
                    <Mail className="h-6 w-6 text-white" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Email
                    </p>
                    <p className="truncate text-lg font-semibold text-gray-900 dark:text-white">
                      {user.email || "Not provided"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4 rounded-2xl bg-gray-50 p-4 transition-colors duration-300 hover:bg-gray-100 dark:bg-slate-700/50 dark:hover:bg-slate-700">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-r from-green-500 to-emerald-500">
                    <Phone className="h-6 w-6 text-white" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Phone
                    </p>
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">
                      {user.phone || "Not provided"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4 rounded-2xl bg-gray-50 p-4 transition-colors duration-300 hover:bg-gray-100 dark:bg-slate-700/50 dark:hover:bg-slate-700">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-r from-purple-500 to-pink-500">
                    <Calendar className="h-6 w-6 text-white" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      User ID
                    </p>
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">
                      {user._id || "Not provided"}{" "}
                    </p>
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <h2 className="mb-6 flex items-center gap-3 text-2xl font-bold text-gray-900 dark:text-white">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-orange-500 to-red-500">
                    <MapPin className="h-4 w-4 text-white" />
                  </div>
                  Location
                </h2>
                <div className="flex items-center gap-4 rounded-2xl bg-gray-50 p-4 transition-colors duration-300 hover:bg-gray-100 dark:bg-slate-700/50 dark:hover:bg-slate-700">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500">
                    <Globe className="h-6 w-6 text-white" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Country
                    </p>
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">
                      {user.address?.country || "Not provided"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4 rounded-2xl bg-gray-50 p-4 transition-colors duration-300 hover:bg-gray-100 dark:bg-slate-700/50 dark:hover:bg-slate-700">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500">
                    <MapPin className="h-6 w-6 text-white" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      City
                    </p>
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">
                      {user.address?.city || "Not provided"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4 rounded-2xl bg-gray-50 p-4 transition-colors duration-300 hover:bg-gray-100 dark:bg-slate-700/50 dark:hover:bg-slate-700">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-r from-rose-500 to-pink-500">
                    <MapPin className="h-6 w-6 text-white" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Address
                    </p>
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">
                      {user.address?.street || "Not provided"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-8 flex flex-col justify-center gap-4 pb-8 sm:flex-row">
            <button
              onClick={() => {
                dispatch(userActions.logout());
              }}
              className="transform rounded-2xl bg-gradient-to-r from-red-500 to-pink-500 px-8 py-4 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:from-red-600 hover:to-pink-600 hover:shadow-xl"
            >
              Delete Account
            </button>
          </div>
        </div>
      </div>
      <EditProfile isOpen={isEditModalOpen} onClose={closeEditModal} />
    </>
  );
};
export default Profile;
