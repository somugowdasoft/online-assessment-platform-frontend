import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createQuestion, getQuestions, updateQuestion, deleteQuestion } from '../redux/actions/questionActions';

const QuestionBank = () => {
    const dispatch = useDispatch();
    const questions = useSelector(state => state.question.questions);
    const [formData, setFormData] = useState({
        question: '',
        options: ['', '', '', ''],
        answer: '',
        category: '',
        difficulty: '',
        examType: ''
    });
    const [editing, setEditing] = useState(null);

    useEffect(() => {
        dispatch(getQuestions());
    }, [dispatch]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name.startsWith('option')) {
            const index = Number(name.split('_')[1]);
            setFormData(prev => {
                const newOptions = [...prev.options];
                newOptions[index] = value;
                return { ...prev, options: newOptions };
            });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editing) {
            dispatch(updateQuestion(editing, formData));
            setEditing(null);
        } else {
            dispatch(createQuestion(formData));
        }
        setFormData({ question: '', options: ['', '', '', ''], answer: '', category: '', difficulty: '', examType: '' });
    };

    const handleEdit = (question) => {
        setEditing(question._id);
        setFormData(question);
    };

    const handleDelete = (id) => {
        dispatch(deleteQuestion(id));
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl mb-4">Question Bank</h1>
            <form onSubmit={handleSubmit} className="mb-6">
                <input name="question" value={formData.question} onChange={handleChange} placeholder="Question" required className="border p-2 mb-2 w-full" />
                {formData.options.map((option, index) => (
                    <input key={index} name={`option_${index}`} value={option} onChange={handleChange} placeholder={`Option ${index + 1}`} required className="border p-2 mb-2 w-full" />
                ))}
                <input name="answer" value={formData.answer} onChange={handleChange} placeholder="Answer" required className="border p-2 mb-2 w-full" />
                <input name="category" value={formData.category} onChange={handleChange} placeholder="Category" required className="border p-2 mb-2 w-full" />
                <input name="difficulty" value={formData.difficulty} onChange={handleChange} placeholder="Difficulty" required className="border p-2 mb-2 w-full" />
                <input name="examType" value={formData.examType} onChange={handleChange} placeholder="Exam Type" required className="border p-2 mb-2 w-full" />
                <button type="submit" className="bg-blue-500 text-white p-2">{editing ? 'Update' : 'Add'} Question</button>
            </form>
            <ul>
                {questions.map((question) => (
                    <li key={question._id} className="flex justify-between mb-2">
                        <span>{question.question}</span>
                        <div>
                            <button onClick={() => handleEdit(question)} className="bg-yellow-500 text-white p-1 mx-1">Edit</button>
                            <button onClick={() => handleDelete(question._id)} className="bg-red-500 text-white p-1">Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default QuestionBank;
