import React from 'react';
import { formatDateToInput } from '../../utils/dateUtils';
import { useNavigate } from 'react-router-dom';

const UpcomingExams = ({ exams }) => {
    const navigate = useNavigate();

    // Handle view exam
    const handleView = async (id) => {
        await navigate(`/admin/dashboard/exams/${id}`);
    };

    // Get today's date
    const today = new Date();

    return (
        <div className="bg-white p-6 rounded-lg shadow-md overflow-y-auto max-h-64 scrollbar-hide">
            <h2 className="text-lg font-semibold mb-4">Upcoming Exams</h2>
            <div className="space-y-4">
                {exams.map((exam) => {
                    const examDate = new Date(exam.date);
                    const isExamPassed = examDate < today; // Check if the exam date has passed

                    return (
                        <div key={exam._id} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                            <div>
                                {isExamPassed ? (
                                    <div>
                                        <h3 className="font-medium text-gray-500">
                                            <del>{exam.name}</del>
                                        </h3>
                                        <p className="text-sm text-gray-500">
                                            <del>{formatDateToInput(exam.date)} at {new Date(exam.date).toLocaleTimeString()}</del>
                                        </p>
                                    </div>
                                ) : (
                                    <div>
                                        <h3 className="font-medium">{exam.name}</h3>
                                        <p className="text-sm text-gray-500">
                                            {formatDateToInput(exam.date)} at {new Date(exam.date).toLocaleTimeString()}
                                        </p>
                                    </div>
                                )}
                            </div>
                            <button
                                className={`w-32 px-4 py-2 text-sm text-white rounded-md bg-blue-600 hover:bg-blue-700`}
                                onClick={() => handleView(exam._id)}
                            >
                                {isExamPassed ? 'Update Exam' : 'View Details'}
                            </button>

                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default UpcomingExams;
