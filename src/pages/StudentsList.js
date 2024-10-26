import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllStudents, deleteStudent, updateExamPermission } from '../redux/actions/studentActions';
import StudentTable from '../components/StudentsTable';

const StudentsList = () => {
    const dispatch = useDispatch();
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

    return (
        <div className="p-4">
            <h1 className="flex justify-center items-center text-xl text-blue-500 font-bold mb-4">Students List</h1>
            <StudentTable
                students={students}
                isLoading={isLoading}
                togglePermission={togglePermission}
                onDelete={(id) => handleDelete(id)}
            />
        </div>
    );
};

export default StudentsList;
