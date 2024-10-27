import React from 'react'

const UpcomingExams = ({ exams }) => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4">Upcoming Exams</h2>
            <div className="space-y-4">
                {exams.map((exam) => (
                    <div key={exam.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                            <h3 className="font-medium">{exam.title}</h3>
                            <p className="text-sm text-gray-500">
                                {new Date(exam.startTime).toLocaleDateString()} at{' '}
                                {new Date(exam.startTime).toLocaleTimeString()}
                            </p>
                        </div>
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                            View Details
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default UpcomingExams