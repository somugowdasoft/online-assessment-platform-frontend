import React, { useEffect, useRef, useState } from 'react';
// Import icons 
import { FaUsers as Users, FaBookOpen as BookOpen, FaChartBar as BarChart, FaCalendar as Calendar } from 'react-icons/fa';
// Import components
import StatsCard from '../components/dashboard/StatsCard';
import UpcomingExams from '../components/dashboard/UpcomingExams';
import RecentActivity from '../components/dashboard/RecentActivity';
import { useDispatch, useSelector } from 'react-redux';
import { getExams } from '../redux/actions/examActions';
import { getAllStudents } from '../redux/actions/studentActions';

const AdminDashboardPage = () => {
  const { exams } = useSelector(state => state.exams);
  const { students } = useSelector(state => state.studentState);

  const dispatch = useDispatch();
  const hasFetchedExams = useRef(false);
  //get exams
  const fetchExams = () => {
    dispatch(getExams());
    dispatch(getAllStudents());
  };

  useEffect(() => {
    if (!hasFetchedExams.current) {
      fetchExams();  // Fetch exams only on initial mount
      hasFetchedExams.current = true; // Mark as fetched
    }
  }, [dispatch]); // Dependency array includes dispatch


  const stats = [
    { title: 'Total Students', value: students ? students.length : 0, icon: Users, bgColor: "bg-blue-500/[0.6]" },
    { title: 'Active Exams', value: '23', icon: BookOpen, trend: -5, bgColor: "bg-red-500/[0.6]" },
    { title: 'Completion Rate', value: '87%', icon: BarChart, trend: 3, bgColor: "bg-lime-500/[0.6]" },
    { title: 'Upcoming Exams', value: exams ? exams.length : 0, icon: Calendar, bgColor: "bg-cyan-500/[0.6]" }
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
