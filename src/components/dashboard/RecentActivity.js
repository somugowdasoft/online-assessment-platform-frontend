import React from 'react'

const RecentActivity = () => {
    const activities = [
        { id: 1, user: 'John Doe', action: 'completed', exam: 'Mathematics Final', time: '2 hours ago' },
        { id: 2, user: 'Jane Smith', action: 'started', exam: 'Physics Quiz', time: '3 hours ago' },
        { id: 3, user: 'Mike Johnson', action: 'submitted', exam: 'Chemistry Test', time: '5 hours ago' }
    ];

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
            <div className="space-y-4">
                {activities.map((activity) => (
                    <div key={activity.id} className="flex items-center space-x-3 text-sm">
                        <div className="w-2 h-2 rounded-full bg-blue-500" />
                        <p>
                            <span className="font-medium">{activity.user}</span>{' '}
                            <span>{activity.action}</span>{' '}
                            <span className="font-medium">{activity.exam}</span>{' '}
                            <span className="text-gray-500">{activity.time}</span>
                        </p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default RecentActivity