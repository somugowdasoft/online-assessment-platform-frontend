import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createQuestion, getQuestions, updateQuestion, deleteQuestion } from '../redux/actions/questionActions';
import { getExams } from '../redux/actions/examActions';
import QuestionTable from '../components/QuestionTable';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const QuestionBank = () => {
    const dispatch = useDispatch();
    const hasFetchedExams = useRef(false);

    const questions = useSelector(state => state.question.questions);
    const { exams } = useSelector(state => state.exams);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        question: '',
        options: ['', '', '', ''],  // For multiple choice
        correctAnswer: '',  // For True/False
        difficulty: '',
        exam: '',
        questionType: '',
        examId: ""  // To determine the type of question
    });
    const [editing, setEditing] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");

    const fetchExams = () => {
        setIsLoading(true);
        dispatch(getExams());
        dispatch(getQuestions());
        setIsLoading(false);
    };

    useEffect(() => {
        if (!hasFetchedExams.current) {
            fetchExams();
            dispatch(getQuestions());  // Fetch questions only on initial mount
            hasFetchedExams.current = true; // Mark as fetched
        }
    }, [dispatch]);

    const handleChange = async (e) => {
        const { name, value } = e.target;

        // Get the selected option and its ID, but only if the event is from the exam dropdown
        let id;
        if (e.target.tagName === 'SELECT') {
            const selectedOption = await e.target.options[e.target.selectedIndex];
            id = selectedOption?.id;  // Get the id of the selected option
        }

        // Handle fields that are part of the 'options' array
        if (name.startsWith('option')) {
            const index = Number(name.split('_')[1]);  // Extract the index from the name
            setFormData(prev => {
                const newOptions = [...prev.options];  // Copy the previous options array
                newOptions[index] = value;  // Update the specific option at the given index
                return { ...prev, options: newOptions };  // Return the updated form data
            });
        } else {
            // Update the `examId` only if an exam was selected; otherwise, don't modify it
            setFormData(prev => ({
                ...prev,
                [name]: value,
                ...(id && { examId: id })  // Conditionally include `examId` if an ID is available
            }));
        }
    };

    const handleQuestionTypeChange = (e) => {
        setFormData(prev => ({
            ...prev,
            questionType: e.target.value,
            // Reset relevant fields based on question type
            options: e.target.value === 'multiple-choice' ? ['', '', '', ''] : ['', ''],  // Reset options for multiple choice
            correctAnswer: ''  // Reset correct answer for True/False
        }));
    };

    // Handle submit
    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        if (editing) {
            dispatch(updateQuestion(editing, formData));
            dispatch(getQuestions());
            setEditing(null);
        } else {
            dispatch(createQuestion(formData));
            dispatch(getQuestions());
        }
        setFormData({ question: '', options: ['', '', '', ''], correctAnswer: '', difficulty: '', exam: '', questionType: '', examId: "" });
        setIsLoading(false);
    };

    //handle search
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        // Filter questions by name or other criteria based on the search input
    };


    // Handle for edit the question
    const handleEdit = (question) => {
        setEditing(question._id);
        setFormData(question);
    };

    // Handle for delete
    const handleDelete = (id) => {
        setIsLoading(true);
        dispatch(deleteQuestion(id));
        dispatch(getQuestions());
        setIsLoading(false);
    };

    // Filter exams based on the search query
    const filteredQuestions = questions.filter((question) => {
        // Check if question and question.question are defined
        return question && question.question && question.question.toLowerCase().includes(searchQuery.toLowerCase());
    });

    return (
        <div className="p-6 ">
            <ToastContainer />
            <h1 className="mb-4 text-center text-xl text-blue-500 font-bold">Question Bank</h1>
            <form
                onSubmit={handleSubmit}
                className="mb-6 flex flex-col items-center" // Flex container with center alignment
            >
                <input
                    name="question"
                    value={formData.question}
                    onChange={handleChange}
                    placeholder="Question"
                    required
                    className="border p-2 mb-4 w-1/2 border-blue-500 rounded"
                />

                <div className="mb-4 w-1/2"> {/* Set the width to match the input */}
                    <label htmlFor="difficulty-select" className="block text-gray-700">
                        Select Question Type
                    </label>
                    <select
                        id="questionType"
                        name="questionType"
                        onChange={handleQuestionTypeChange}
                        value={formData.questionType}
                        className="mt-1 block w-full p-1 bg-white border border-blue-500 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
                    >
                        <option value="">-- Select Question Type --</option>
                        <option value="multiple-choice">Multiple Choice</option>
                        <option value="true-false">True/False</option>
                    </select>
                </div>

                {formData.questionType === 'multiple-choice' && (
                    <>
                        <div className="flex flex-wrap mb-4 w-1/2">
                            {formData.options.map((option, index) => (
                                <input
                                    key={index}
                                    name={`option_${index}`}
                                    value={option}
                                    onChange={handleChange}
                                    placeholder={`Option ${index + 1}`}
                                    required
                                    className="border p-2 mb-2 w-full border-blue-500 rounded"
                                />
                            ))}
                        </div>

                        <input
                            name="correctAnswer"
                            value={formData.correctAnswer}
                            onChange={handleChange}
                            placeholder="Correct Option (index or value)"
                            required
                            className="border p-2 mb-4 w-1/2 border-blue-500 rounded"
                        />
                    </>
                )}

                {formData.questionType === 'true-false' && (
                    <div className="mb-4">
                        <label className="block text-gray-700">Correct Answer:</label>
                        <label className="mr-4">
                            <input
                                type="radio"
                                name="correctAnswer"
                                value="true"
                                checked={formData.correctAnswer === 'true'}
                                onChange={handleChange}
                            />
                            True
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="correctAnswer"
                                value="false"
                                checked={formData.correctAnswer === 'false'}
                                onChange={handleChange}
                            />
                            False
                        </label>
                    </div>
                )}

                <div className="mb-4 w-1/2"> {/* Set the width to match the input */}
                    <label htmlFor="difficulty-select" className="block text-gray-700">
                        Select Difficulty Level:
                    </label>
                    <select
                        id="difficulty-select"
                        name="difficulty"
                        onChange={handleChange}
                        value={formData.difficulty}
                        className="mt-1 block w-full p-2 bg-white border border-blue-500 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
                    >
                        <option value="">-- Select Difficulty Level --</option>
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                    </select>
                </div>

                <div className="mb-4 w-1/2"> {/* Set the width to match the input */}
                    <label htmlFor="exam-select" className="block text-gray-700">
                        Select Exam:
                    </label>
                    <select
                        id="exam-select"
                        name="exam"
                        onChange={handleChange}
                        value={formData.exam}
                        className="mt-1 block w-full p-2 bg-white border border-blue-500 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
                    >
                        <option value="">-- Select an Exam --</option>
                        {exams && exams.map((exam) => (
                            <option key={exam._id} value={exam.name} id={exam._id}>
                                {exam.name}
                            </option>
                        ))}
                    </select>
                </div>

                <button type="submit" className="bg-blue-500 rounded text-white p-2 w-1/2">
                    {editing ? 'Update' : 'Add'} Question
                </button>
            </form>
            <hr />
            <div className="flex items-center justify-between w-full p-2">
                {/* Questions heading */}
                <div className="ml-4">
                    <h2 className="text-xl font-bold mb-4">Questions :</h2>
                </div>
                {/* Search Section */}
                <div className="flex flex-col justify-center w-1/3 ml-4">
                    <input
                        type="text"
                        placeholder="Search questions by name..."
                        value={searchQuery}
                        onChange={handleSearchChange} // Use the appropriate search handler function
                        className="border p-2 rounded border-blue-500"
                    />
                </div>
            </div>
            {/* question */}
            <QuestionTable
                questions={filteredQuestions}
                isLoading={isLoading}
                onEdit={(e) => handleEdit(e)}
                onDelete={(e) => handleDelete(e)}
            />
        </div>
    );
};

export default QuestionBank;
