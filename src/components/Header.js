
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';

import { logout } from '../redux/actions/authActions';
import { FaBars, FaTimes } from 'react-icons/fa';

const Header = (props) => {
    const { toggle, isOpen } = props;

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user } = useSelector((state) => state.auth);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [userName, setUserName] = useState();

    const handleProfileClick = () => {
        navigate('profile'); // Navigate to profile update page
        setDropdownOpen(false); // Close dropdown
    };

    const handleLogout = async () => {
        // Implement logout logic here
        const response = await dispatch(logout());
        if (response) {
            navigate('/login')
        }
        setDropdownOpen(false);
    };

    const loggedInUser = user?.name; // Replace with your actual logic to get the current user

    // Extract initials from the logged-in user's name
    const getInitials = (name) => {
        const nameParts = name?.split(' ');
        return nameParts?.map(part => part[0]).join('').toUpperCase();
    };

    //useEffect
    useEffect(() => {
        const initials = getInitials(loggedInUser);
        setUserName(initials);
    }, [user])

    return (
        <header className="col-span-full flex justify-between items-center sticky top-0 p-2  text-white bg-gradient-to-r from-blue-500 to-indigo-700">
            <div className=" lg:hidden">
                <button onClick={toggle} className="p-2 focus:outline-none">
                    {
                        isOpen ? (
                            <FaTimes className="text-2xl" />
                        ) : (
                            <FaBars className="text-2xl" />
                        )
                    }
                </button>
            </div>

            {/* Left Logo */}
            <div className="flext text-sm font-bold cursor-pointer" onClick={() => navigate('/')}>
                <h2>Online Assessment Portal</h2>
            </div>

            {/* Right Profile Section */}
            <div className="relative">
                <div
                    className="flex items-center justify-evenly"
                >
                    <span className='mr-2 text-sm'>{(user.role).toUpperCase()}</span>
                    <span
                        className="flex items-center justify-center w-6 h-6 bg-white font-bold text-black rounded-full"
                    > {userName}</span>
                    {/* Show user's initials */}

                    <span
                        className='ml-1 cursor-pointer'
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                    >
                        {dropdownOpen ? (
                            <i className="fa fa-caret-up fa-2x"></i>
                        ) : (
                            <i className="fa fa-caret-down fa-2x"></i>
                        )}
                    </span>
                </div>

                {/* Dropdown Menu */}
                {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg">
                        <div
                            className="p-2 hover:bg-gray-200 cursor-pointer"
                            onClick={handleProfileClick}
                        >
                            My Profile
                        </div>
                        <hr />
                        <div
                            className="p-2 hover:bg-gray-200 cursor-pointer"
                            onClick={handleLogout}
                        >
                            Logout
                        </div>
                    </div>
                )}
            </div>
        </header >
    );
};

export default Header;
