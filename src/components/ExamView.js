import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import GoBackButton from '../components/GoBackButton';
import { useDispatch, useSelector } from 'react-redux';
import { getExamById } from '../redux/actions/examActions';

const ExamView = () => {
    const dispatch = useDispatch();
    const { examById } = useSelector(state => state.exams);

    const { id } = useParams();  // Get the exam ID from the URL
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch the exam by ID when the component mounts
        const fetchExam = async () => {
            setLoading(true);
            try {
                await dispatch(id && getExamById(id));
            } catch (err) {
                setError('Failed to load exam details.');
            } finally {
                setLoading(false);
            }
        };
        fetchExam();
    }, [id]);

    if (loading) {
        return <p>Loading exam details...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="container mx-auto p-4">
            {/* Exam Details */}
            <div className="bg-white shadow-md rounded-lg p-6 mb-6">
                <h2 className="text-2xl font-semibold mb-2">Exam : {examById?.examDetails?.name}</h2>
                <p className="text-gray-600 mb-2">Date: {new Date(examById?.examDetails?.date).toLocaleDateString()}</p>
                <p className="text-gray-600 mb-2">Duration: {examById?.examDetails?.duration} minutes</p>
                <p className="text-gray-600 mb-2">Total Marks: {examById?.examDetails?.totalMarks}</p>
                <p className="text-gray-600 mb-2">Total Questions: {examById?.examDetails?.totalQuestions}</p>
                <p className="text-gray-600">Description: {examById?.examDetails?.description}</p>
            </div>

            {/* Questions List */}
            <div className="bg-white shadow-md rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4">Questions</h3>
                {examById && examById.questions.length > 0 ? examById.questions.map((question, index) => (
                    <div key={question.id} className="border-b pb-4 mb-4">
                        <p className="font-medium">Q{question.questionNumber}: {question.question}</p>
                        <p className="text-gray-600 mb-2">Type: {question.questionType}</p>
                        {question.questionType === "multiple-choice" && question.options && (
                            <ul className="list-disc list-inside mb-2">
                                {question.options.map((option, idx) => (
                                    <li key={idx} className="text-gray-700">{option}</li>
                                ))}
                            </ul>
                        )}
                        <p className="text-gray-600">Difficulty: {question.difficulty}</p>
                        <p className="text-gray-600">Correct Answer: <span className="font-semibold">{question.correctAnswer}</span></p>
                    </div>
                )) : (
                    <p className='text-center'>Questions have not yet been assigned.</p>
                )}
                <GoBackButton />
            </div>
        </div>
    );
};

export default ExamView;
