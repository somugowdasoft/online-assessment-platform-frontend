import Footer from "../components/Footer";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { useState } from "react";

const AdminDashboard = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-screen grid grid-rows-layout">

      {/* Header */}
      <Header
        isOpen={isOpen}
        toggle={() => setIsOpen(!isOpen)}
      />

      {/* Main content with Sidebar and Main using flex */}
      <div className="flex flex-col lg:flex-row gap-4">
        <Sidebar isOpen={isOpen} />

        {/* Main content */}
        <main
          className={`bg-white p-4 flex-grow ${isOpen ? '' : 'w-full'}`}
          style={{ marginLeft: isOpen ? '150px' : '0' }}
        >
          <Outlet />
        </main>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default AdminDashboard;
