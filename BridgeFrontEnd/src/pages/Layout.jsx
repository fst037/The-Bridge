import { Outlet, Navigate } from "react-router-dom";

export const Layout = () => {
  const user = "user";

  if (!user) return <Navigate to="/login" />;

  return (
    <div className="grid h-screen grid-cols-[70px_1fr] grid-rows-[70px_1fr]">
      <header className="flex items-center justify-between col-span-2 p-4 bg-[#DBCEF6]"></header>
      <aside className="sidebar bg-[#F0E9FF]"></aside>
      <Outlet />
    </div>
  );
};
