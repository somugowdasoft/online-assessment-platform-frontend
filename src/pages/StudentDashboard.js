import Header from "../components/Header";

const StudentDashboard = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      {/* Content goes here */}
      <main className="flex-grow">
        <h2>Student</h2>
      </main>
    </div>
  );
};

export default StudentDashboard;
