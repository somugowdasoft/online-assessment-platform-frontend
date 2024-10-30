import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaHome, FaUser, FaCog, FaCalendarDay, FaUserGraduate, FaRegQuestionCircle, FaUserCircle } from 'react-icons/fa'; // Icons from react-icons
import { useSelector } from 'react-redux';

const Sidebar = (props) => {
    const { isOpen } = props;
    const { isAuthenticated, user } = useSelector((state) => state.auth);

    return (
        <aside
            className={`w-[15%] float-left  ${isOpen ? 'block' : 'hidden'} lg:block`}
        >
            <div
                className={`fixed left-0 h-full bg-gradient-to-r from-blue-500 to-purple-600 text-white transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'
                    }  lg:translate-x-0`}
            >
                <div className="flex flex-col items-center justify-center py-4">
                    {isAuthenticated && user && user?.role ? (
                        <>
                            <FaUserCircle size={64} />
                            <span className="mt-3 text-lg uppercase font-semibold">{user?.role}</span>
                            <span className="mt-3 text-sm">{user?.email}</span>
                        </>
                    ) : ("")}
                </div>
                <div className="flex flex-col h-full">
                    {/* Sidebar Items */}
                    <nav className="flex-1 p-4 space-y-4">
                        <NavItem icon={<FaHome />} name="Dashboard" path="/" />
                        <NavItem icon={<FaUser />} name="Profile" path="profile" />
                        <NavItem icon={<FaCalendarDay />} name="Exams" path="exams" />
                        <NavItem icon={<FaRegQuestionCircle />} name="Question Banks" path="questions" />
                        <NavItem icon={<FaUserGraduate />} name="Students List" path="students" />
                    </nav>
                </div>
            </div>
        </aside>
    );
};

// Individual Nav Item component
const NavItem = ({ icon, name, path }) => {
    return (
        <NavLink
            to={path}
            className="group flex items-center space-x-4 p-2 hover:bg-black rounded cursor-pointer"
            activeClassName="bg-gray-700"
        >
            <div className="text-xl">{icon}</div>
            <span className="text-sm font-medium">{name}</span>
        </NavLink>
    );
};

export default Sidebar;
