import { FaEye, FaTrash } from "react-icons/fa";

const StudentTable = ({ students, isLoading, togglePermission, onDelete, onView }) => {

    return (
        <div className="container p-4 max-w-full overflow-x-auto">
            {isLoading ? (
                <p className="text-center text-gray-500">Loading ..........</p>
            ) : (
                <>
                    {students && students.length > 0 ? (
                        <div className="overflow-x-auto shadow-lg">
                            <table className="min-w-full bg-white border border-gray-300 rounded-lg ">
                                <thead className="overflow-x-auto">
                                    <tr className="bg-blue-500 text-white text-sm">
                                        <th className="py-2 px-4 border">SL No</th>
                                        <th className="py-2 px-4 border">Name</th>
                                        <th className="py-2 px-4 border">Email</th>
                                        <th className="py-2 px-4 border">Exam Permission</th>
                                        <th className="py-2 px-4 border">View Result</th>
                                        <th className="py-2 px-4 border">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="overflow-x-auto">
                                    {students.map((student, index) => (
                                        <tr key={student._id} className="hover:bg-gray-50">
                                            <td className="px-4 py-2 border text-center">{index + 1}</td>
                                            <td className="px-4 py-2 border text-center">{student.name}</td>
                                            <td className="px-4 py-2 border text-center">{student.email}</td>
                                            <td className="px-4 py-2 border text-center">
                                                <button
                                                    onClick={() => togglePermission(student._id, student.examPermission)}
                                                    className={`px-2 py-1 rounded ${student.examPermission ? 'bg-green-500' : 'bg-red-500'
                                                        } text-white`}
                                                    aria-label="Edit"
                                                >
                                                    {student.examPermission ? 'Allowed' : 'Not Allowed'}
                                                </button>
                                            </td>
                                            <td className="px-4 py-2 border text-center">
                                                <button
                                                    onClick={() => onView(student._id)}
                                                    className="text-blue-500 hover:text-blue-700 mr-3"
                                                    aria-label="View"
                                                >
                                                    <FaEye />
                                                </button>
                                            </td>
                                            <td className="px-4 py-2 border text-center">
                                                <button
                                                    onClick={() => onDelete(student._id)}
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
                        <p className="text-center text-gray-500">No students added yet</p>
                    )}
                </>
            )
            }
        </div >
    );
};

export default StudentTable;
