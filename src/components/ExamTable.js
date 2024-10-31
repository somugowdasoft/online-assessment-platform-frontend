import { FaEdit, FaTrash, FaSpinner, FaEye } from "react-icons/fa";

const ExamTable = ({ exams, isLoading, onEdit, onDelete, onView }) => {
    return (
        <div className="container mx-auto p-2">
            {isLoading ? (
                <div className="text-center">
                    <FaSpinner className="animate-spin text-gray-500" size={24} /> {/* Spinner icon */}
                    <p className="text-gray-500">Loading...</p>
                </div>
            ) : (
                <>
                    {/* Make the table scrollable in small screens with overflow-x-auto */}
                    <div className="overflow-x-auto">
                        <table className="min-w-full table-auto border-collapse bg-white border border-gray-300 rounded-lg shadow-md">
                            <thead>
                                <tr className="bg-blue-500 text-white text-sm">
                                    <th className="px-4 py-2 truncate border">Sl No</th>
                                    <th className="px-4 py-2 truncate border">Exam Name</th>
                                    <th className="px-4 py-2 border">Date</th>
                                    <th className="px-4 py-2 truncate border">Duration (min)</th>
                                    <th className="px-4 py-2 truncate border">Total Marks</th>
                                    <th className="px-4 py-2 truncate border">Total Questions</th>
                                    <th className="px-4 py-2 truncate border">Description</th>
                                    <th className="px-4 py-2 truncate border">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="relative ">
                                {exams && exams.length > 0 ? exams.map((exam, index) => (
                                    <tr key={exam._id} className="hover:bg-gray-50">
                                        <td className="px-4 py-2 border truncate text-center">{index + 1}</td>
                                        <td className="px-4 py-2 border truncate text-center">{exam.name}</td>
                                        <td className="px-4 py-2 border text-center">
                                            {new Date(exam.date).toLocaleDateString()}
                                        </td>
                                        <td className="px-4 py-2 border text-center">{exam.duration}</td>
                                        <td className="px-4 py-2 border text-center">{exam.totalMarks}</td>
                                        <td className="px-4 py-2 border text-center">{exam.totalQuestions}</td>
                                        <td className="px-4 py-2 border truncate text-center max-w-xs">{exam.description}</td>
                                        <td className="px-4 py-2 border text-center">
                                            <button
                                                onClick={() => onView(exam._id)}  // Add the view functionality here
                                                className="text-blue-500 hover:text-blue-700 mr-3"
                                                aria-label="View"
                                            >
                                                <FaEye />
                                            </button>
                                            <button
                                                onClick={() => onEdit(exam._id)}
                                                className="text-blue-500 hover:text-blue-700 mr-3"
                                                aria-label="Edit"
                                            >
                                                <FaEdit />
                                            </button>
                                            <button
                                                onClick={() => onDelete(exam._id)}
                                                className="text-red-500 hover:text-red-700"
                                                aria-label="Delete"
                                            >
                                                <FaTrash />
                                            </button>
                                        </td>
                                    </tr>
                                )) : (
                                    <div className="flex items-center justify-center h-8">
                                        <p className="list-none absolute inset-0 text-center text-gray-500">No exams found</p>
                                    </div>
                                )}
                            </tbody>
                        </table>
                    </div>
                </>
            )}
        </div>
    );
};

export default ExamTable;
