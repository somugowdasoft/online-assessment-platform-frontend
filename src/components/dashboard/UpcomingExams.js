import React from 'react'
import { formatDateToInput } from '../../utils/dateUtils';

const UpcomingExams = ({ exams }) => {    
    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4">Upcoming Exams</h2>
            <div className="space-y-4">
                {exams.map((exam) => (
                    <div key={exam.id} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                        <div>
                            <h3 className="font-medium">{exam.name}</h3>
                            <p className="text-sm text-gray-500">
                                {formatDateToInput(exam.date)} at{' '}
                                {new Date().toLocaleTimeString()}
                            </p>
                        </div>
                        <button className="px-2 py-2 bg-blue-600 text-sm text-white rounded-md hover:bg-blue-700">
                            View Details
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default UpcomingExams