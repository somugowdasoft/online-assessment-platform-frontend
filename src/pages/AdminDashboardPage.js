import React, { useState } from 'react';
// Import icons 
import { FaUsers as Users, FaBookOpen as BookOpen, FaChartBar as BarChart, FaCalendar as Calendar } from 'react-icons/fa';
// Import components
import StatsCard from '../components/dashboard/StatsCard';
import UpcomingExams from '../components/dashboard/UpcomingExams';
import RecentActivity from '../components/dashboard/RecentActivity';

const AdminDashboardPage = () => {
    const [exams, setExams] = useState([
        {
            id: 1,
            title: 'Mathematics Final',
            startTime: '2024-11-01T10:00:00',
            duration: 120
        },
        {
            id: 2,
            title: 'Physics Quiz',
            startTime: '2024-11-03T14:00:00',
            duration: 60
        }
    ]);

    const stats = [
        { title: 'Total Students', value: '1,234', icon: Users, trend: 12, bgColor: "bg-slate-300"  },
        { title: 'Active Exams', value: '23', icon: BookOpen, trend: -5, bgColor: "bg-cyan-300" },
        { title: 'Completion Rate', value: '87%', icon: BarChart, trend: 3, bgColor: "bg-indigo-300" },
        { title: 'Upcoming Exams', value: '8', icon: Calendar, bgColor: "bg-rose-300" }
    ];

    return (
        <div>
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {stats.map((stat) => (
              <StatsCard key={stat.title} {...stat} />
            ))}
          </div>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            {/* Upcoming Exams */}
            <UpcomingExams exams={exams} />
            
            {/* Recent Activity */}
            <RecentActivity />
          </div>
        </div> 
    );
}

export default AdminDashboardPage;
