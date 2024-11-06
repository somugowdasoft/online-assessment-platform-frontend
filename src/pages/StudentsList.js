import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllStudents, deleteStudent, updateExamPermission } from '../redux/actions/studentActions';
import StudentTable from '../components/StudentsTable';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

const StudentsList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { students } = useSelector(state => state.studentState);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        dispatch(getAllStudents());
        setIsLoading(false);
    }, [dispatch]);

    const handleDelete = (id) => {
        setIsLoading(true);
        dispatch(deleteStudent(id));
        dispatch(getAllStudents());
        setIsLoading(false);
    };

    const togglePermission = (id, currentPermission) => {
        dispatch(updateExamPermission(id, !currentPermission));
    };

    //handle view exam
    const handleView = (id) => {
        navigate(`/admin/dashboard/student-result/${id}`);
    }

    return (
        <div className="p-4">
            <h1 className="flex justify-center items-center text-xl text-blue-500 font-bold mb-4">Students List</h1>
            <StudentTable
                students={students}
                isLoading={isLoading}
                togglePermission={togglePermission}
                onView={(id) => handleView(id)}
                onDelete={(id) => handleDelete(id)}
            />
            <ToastContainer />
        </div>
    );
};

export default StudentsList;
