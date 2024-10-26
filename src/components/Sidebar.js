import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaHome, FaUser, FaCog, FaCalendarDay, FaUserGraduate  } from 'react-icons/fa'; // Icons from react-icons

const Sidebar = (props) => {
    const { isOpen } = props;

    return (
        <aside
            className={`  ${isOpen ? 'block' : 'hidden'} lg:block`}
            style={{ width: '100px' }}
        >
            <div
                className={`fixed left-0 h-full bg-gradient-to-r from-blue-500 to-purple-600 text-white transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'
                    }  lg:translate-x-0`}
            >
                <div className="flex flex-col h-full">
                    {/* Sidebar Items */}
                    <nav className="flex-1 p-4 space-y-4">
                        <NavItem icon={<FaHome />} name="Dashboard" path="/" />
                        <NavItem icon={<FaUser />} name="Profile" path="profile" />
                        <NavItem icon={<FaCalendarDay  />} name="Exams" path="exam-scheduling" />
                        <NavItem icon={<FaUserGraduate  />} name="Students List" path="students" />
                        <NavItem icon={<FaCog />} name="Settings" path="settings" />
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
