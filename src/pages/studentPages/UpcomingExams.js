import React, { useEffect, useRef, useState } from 'react';
import { FaCalendarAlt, FaClock, FaBookOpen, FaSpinner, FaQuestionCircle, FaPencilAlt } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { getExams } from '../../redux/actions/examActions';
import { formatDateToInput } from '../../utils/dateUtils';
import { useNavigate } from 'react-router-dom';

const UpcomingExams = () => {
    const { exams } = useSelector((state) => state.exams);
    const [isLoading, setIsLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState(''); // State for the search query

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const hasFetchedExams = useRef(false);

    // Get exams
    const fetchExams = () => {
        setIsLoading(true);
        dispatch(getExams())
            .finally(() => setIsLoading(false)); // Ensure isLoading is false after fetching
    };

    useEffect(() => {
        if (!hasFetchedExams.current) {
            fetchExams(); // Fetch exams only on initial mount
            hasFetchedExams.current = true; // Mark as fetched
        }
    }, [dispatch]); // Dependency array includes dispatch

    // Handle view exam
    const handleView = (id) => {
        navigate(`/student/dashboard/exam-details/${id}`);
    };

    // Get today's date in 'YYYY-MM-DD' format for comparison
    const todayDate = formatDateToInput(new Date());

    // Filter and sort upcoming exams
    const upcomingExams = exams
        .filter((exam) => {
            const examDate = formatDateToInput(new Date(exam.date)); // Format exam date
            const matchesDate = examDate >= todayDate; // Include only exams with date >= today
            const matchesSearch = exam.name.toLowerCase().includes(searchQuery.toLowerCase()); // Search match
            return matchesDate && matchesSearch; // Combine both conditions
        })
        .sort((a, b) => new Date(a.date) - new Date(b.date)); // Sort exams by date in ascending order

    return (
        <div className="p-4 max-w-7xl mx-auto">
            <div className="mb-6 flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-blue-500">Exams</h1>
                    <p className="text-gray-600">Keep track of your scheduled examinations</p>
                </div>

                {/* Search Bar */}
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Search exams..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full max-w-xs p-2 border p-2 rounded border-blue-500 rounded-md"
                    />
                </div>
            </div>
            <hr />
            {isLoading ? (
                <div className="flex justify-center items-center py-12">
                    <FaSpinner className="animate-spin h-12 w-12 text-gray-500" />
                </div>
            ) : upcomingExams.length === 0 ? (
                <div className="bg-gray-50 p-6 rounded-lg shadow-sm flex flex-col items-center justify-center">
                    <FaBookOpen className="h-12 w-12 text-gray-400 mb-4" />
                    <p className="text-lg font-medium text-gray-600">No upcoming exams</p>
                    <p className="text-sm text-gray-500">When exams are scheduled, they will appear here</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 mt-4 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-16">
                    {upcomingExams.map((exam, index) => {
                        const examDate = formatDateToInput(new Date(exam.date)); // Format exam date
                        return (
                            <div
                                key={index}
                                className="bg-white border border-gray-500 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                            >
                                <h2 className="text-xl font-semibold text-gray-900">{exam.name}</h2>
                                <div className="grid gap-3 mt-4">
                                    <div className="flex items-center gap-2">
                                        <FaCalendarAlt className="h-4 w-4 text-gray-500" />
                                        <span className="text-gray-600">{examDate}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <FaClock className="h-4 w-4 text-gray-500" />
                                        <span className="text-gray-600">{exam.duration + "  duration(min)"}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <FaQuestionCircle className="h-4 w-4 text-gray-500" />
                                        <span className="text-gray-600">{exam.totalQuestions + "  No of Questions"}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <FaPencilAlt className="h-4 w-4 text-gray-500" />
                                        <span className="text-gray-600">{exam.totalMarks + "  Marks"}</span>
                                    </div>
                                    {exam.description && (
                                        <p className="mt-2 text-sm text-gray-600 truncate max-w-xs">{exam.description}</p>
                                    )}
                                </div>

                                <div className="mt-6 text-center">
                                    <button
                                        className={`px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-700 text-white font-semibold rounded-md transition ${examDate === todayDate ? '' : 'opacity-50 cursor-not-allowed'}`}
                                        onClick={() => handleView(exam._id)}
                                        disabled={examDate !== todayDate} // Disable button if date does not match today
                                    >
                                        {examDate !== todayDate ? "Wait for the day" : "Take Exam"}
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default UpcomingExams;
