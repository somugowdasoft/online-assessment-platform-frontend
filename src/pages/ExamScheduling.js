import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createExam, deleteExam, getExams, updateExam } from '../redux/actions/examActions';
import { ToastContainer } from 'react-toastify';
import { formatDateToInput } from '../utils/dateUtils';
import ExamTable from '../components/ExamTable';

const ExamScheduling = () => {
    const dispatch = useDispatch();
    const { exams } = useSelector(state => state.exams);
    const [examData, setExamData] = useState({ name: '', date: '', duration: '', totalMarks: '', totalQuestions: "", description: "" });
    const [isLoading, setIsLoading] = useState(false);
    const [examId, setExamID] = useState("");

    useEffect(() => {
        setIsLoading(true);
        dispatch(getExams());
        setIsLoading(false);
    }, [dispatch]);

    const handleChange = (e) => {
        setExamData({ ...examData, [e.target.name]: e.target.value });
    };

    // filtering editing exam
    const updateFun = (id) => {
        //set examid
        let examId = null;
        if (id) {
            examId = id ? id : "";
            setExamID(examId)
        }
        //pre-filling exam
        let exam = null; // Initialize exam as null
        if (exams) {
            exam = exams.find((e) => e._id === id);
            setExamData(exam);
        }
    }

    //delete the exam
    const handleDelete = async (id) => {
        setIsLoading(true);
        const response = await dispatch(deleteExam(id));
        if (response) {
            dispatch(getExams());
        }
        setIsLoading(false);
        setExamData({ name: '', date: '', duration: '', totalMarks: '', totalQuestions: "", description: "" }); // Reset form
    }

    const handleSubmit = async (e) => {
        try {
            setIsLoading(true);
            e.preventDefault();
            let response;
            if (examId) {
                response = await dispatch(updateExam(examId, examData));
            } else {
                response = await dispatch(createExam(examData));
            }

            //get exam list
            if (response) {
                dispatch(getExams());
            }
            setIsLoading(false);
            setExamID("");
            setExamData({ name: '', date: '', duration: '', totalMarks: '', totalQuestions: "", description: "" }); // Reset form
        } catch (error) {
            console.log(error);
        }

    };

    return (
        <div className="container mx-auto p-4">
            <ToastContainer />
            <h2 className="flex justify-center items-center text-xl text-blue-500 font-bold mb-4">Exam Management</h2>
            <form onSubmit={handleSubmit} className="mb-4 flex flex-col justify-center items-center space-y-4">

                {/* Row for Exam Name and Date */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full md:w-1/2 lg:w-1/2">
                    <input
                        type="text"
                        name="name"
                        placeholder="Exam Name"
                        value={examData.name}
                        onChange={handleChange}
                        className="border-2 border-blue-500 rounded w-full focus:outline-none focus:ring focus:ring-blue-300 px-3 py-2"
                        required
                    />
                    <input
                        type="date"
                        name="date"
                        value={formatDateToInput(examData.date)}
                        onChange={handleChange}
                        className="border-2 border-blue-500 rounded w-full focus:outline-none focus:ring focus:ring-blue-300 px-3 py-2"
                        required
                    />
                </div>

                {/* Row for Total Marks and Total Questions */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full md:w-1/2 lg:w-1/2">
                    <input
                        type="number"
                        name="totalMarks"
                        id="totalMarks"
                        placeholder="Total Marks"
                        value={examData.totalMarks}
                        onChange={handleChange}
                        required
                        className="border-2 border-blue-500 rounded w-full focus:outline-none focus:ring focus:ring-blue-300 px-3 py-2"
                    />
                    <input
                        type="number"
                        name="totalQuestions"
                        id="totalQuestions"
                        placeholder="Total Questions"
                        value={examData.totalQuestions}
                        onChange={handleChange}
                        required
                        className="border-2 border-blue-500 rounded w-full focus:outline-none focus:ring focus:ring-blue-300 px-3 py-2"
                    />
                </div>

                {/* Row for Duration */}
                <input
                    type="number"
                    name="duration"
                    placeholder="Duration (minutes)"
                    value={examData.duration}
                    onChange={handleChange}
                    className="border-2 border-blue-500 rounded w-full md:w-1/2 lg:w-1/2 focus:outline-none focus:ring focus:ring-blue-300 px-3 py-2 h-12 resize-none"
                    required
                />

                {/* Description Textarea */}
                <textarea
                    name="description"
                    id="examDescription"
                    placeholder="Description"
                    value={examData.description}
                    onChange={handleChange}
                    required
                    className="border-2 border-blue-500 rounded w-full md:w-1/2 lg:w-1/2 focus:outline-none focus:ring focus:ring-blue-300 px-3 py-2 h-12 resize-none"
                />

                <button type="submit" className="rounded bg-blue-500 text-white p-2 w-full md:w-1/2 lg:w-1/2">Schedule Exam</button>
            </form>


            {/* exam lists */}
            <h2 className="flex justify-center items-center text-xl font-bold mb-4 mt-6">Scheduled Exams : </h2>

            <ExamTable
                exams={exams}
                isLoading={isLoading}
                onDelete={(id) => handleDelete(id)}
                onEdit={(id) => updateFun(id)}
            />

        </div>
    );
};

export default ExamScheduling;
