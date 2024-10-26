import { FaEdit, FaTrash } from "react-icons/fa";

const ExamTable = ({ exams, isLoading, onEdit, onDelete }) => {

    return (
        <div className="container p-4 max-w-full overflow-x-auto m-8">
            {isLoading ? (
                <p className="text-center text-gray-500">Loading ..........</p>
            ) : (
                <>
                    {exams && exams.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
                                <thead className="overflow-x-auto">
                                    <tr className="bg-blue-500 text-white text-sm">
                                        <th className="px-4 py-2 truncate  border">Exam Name</th>
                                        <th className="px-4 py-2 border">Date</th>
                                        <th className="px-4 py-2 truncate  border">Duration (min)</th>
                                        <th className="px-4 py-2 border">Level</th>
                                        <th className="px-4 py-2 truncate  border">Total Marks</th>
                                        <th className="px-4 py-2 truncate  border">Total Questions</th>
                                        <th className="px-4 py-2 truncate  border">Description</th>
                                        <th className="px-4 py-2 truncate  border">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="overflow-x-auto">
                                    {exams.map((exam) => (
                                        <tr key={exam._id} className="hover:bg-gray-50">
                                            <td className="px-4 py-2 border truncate  text-center">{exam.name}</td>
                                            <td className="px-4 py-2 border text-center">
                                                {new Date(exam.date).toLocaleDateString()}
                                            </td>
                                            <td className="px-4 py-2 border text-center">{exam.duration}</td>
                                            <td className="px-4 py-2 border text-center">{exam.level}</td>
                                            <td className="px-4 py-2 border text-center">{exam.totalMarks}</td>
                                            <td className="px-4 py-2 border text-center">{exam.totalQuestions}</td>
                                            <td className="px-4 py-2 border truncate  text-center">{exam.description}</td>
                                            <td className="px-4 py-2 border text-center">
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
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <p className="text-center text-gray-500">No exams added yet</p>
                    )}
                </>
            )}
        </div>
    );
};

export default ExamTable;
