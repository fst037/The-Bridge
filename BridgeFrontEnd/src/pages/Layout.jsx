import LogoBridge from "../assets/LogoBridge.svg";
import Bridge from "../assets/Bridge.svg";
import { CgProfile } from "react-icons/cg";
import { FaSearch } from "react-icons/fa";
import { Outlet, Navigate } from "react-router-dom";

export const Layout = () => {
  const user = "user";

  if (!user) return <Navigate to="/login" />;

  return (
    <div className="grid h-screen grid-cols-[70px_1fr] grid-rows-[70px_1fr]">
      <header className="flex items-center justify-between col-span-2 p-4 bg-[#DBCEF6]">
        <div className="flex items-center">
          <img src={LogoBridge} className="size-20" alt="The Bridge logo" />
          <img src={Bridge} alt="Bridge" className="w-40" />
          <div className="relative flex items-center pl-10 text-gray-400 focus-within:text-gray-600">
            <FaSearch className="size-6 absolute ml-2 pointer-events-none" />
            <input
              type="text"
              className="rounded-md outline-none pr-3 pl-10 py-2 md:w-80 ring-gray-300 focus:ring-gray-500 focus:ring-2"
              placeholder="Buscar"
            />
          </div>
        </div>
        <CgProfile className="size-12" />
      </header>
      <aside className="sidebar bg-[#F0E9FF]"></aside>
      <Outlet />
    </div>
  );
};
