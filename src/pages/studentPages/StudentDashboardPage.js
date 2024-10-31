import React from "react";
import { Link } from "react-router-dom";

const StudentDashboardPage = () => {
    return (
        <div className="min-h-screen bg-gray-100">
            {/* Dashboard Header */}
            <header className="bg-white shadow">
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                    <h1 className="text-2xl font-bold text-blue-500">Student Dashboard</h1>
                </div>
            </header>

            {/* Main Content Area */}
            <main className="pt-6 pb-16 px-4 sm:px-6 lg:px-8">
                {/* Quick Actions Section */}
                <div className="mt-8">
                    <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Link
                            to="upcoming-exams"
                            className="bg-blue-500 text-white rounded-lg p-2 text-center hover:bg-blue-600"
                        >
                            View Upcoming Exams
                        </Link>
                        <Link
                            to="profile"
                            className="bg-green-500 text-white rounded-lg p-2 text-center hover:bg-green-600"
                        >
                            Profile
                        </Link>
                        <Link
                            to="/results"
                            className="bg-purple-500 text-white rounded-lg p-2 text-center hover:bg-purple-600"
                        >
                            View Results
                        </Link>
                    </div>
                </div>

                {/* Overview Section */}
                <div className="mt-8">
                    <h2 className="text-2xl font-semibold mb-4">Your Performance</h2>
                    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                        <div className="px-4 py-5 sm:px-6">
                            <h3 className="text-lg leading-6 font-medium text-gray-900">
                                Latest Exam Results
                            </h3>
                        </div>
                        <div className="border-t border-gray-200">
                            <dl>
                                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">Exam</dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                        Math Assessment 1
                                    </dd>
                                </div>
                                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">Score</dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                        85/100
                                    </dd>
                                </div>
                                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">Status</dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                        Passed
                                    </dd>
                                </div>
                            </dl>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default StudentDashboardPage;
