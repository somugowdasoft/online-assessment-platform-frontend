import React, { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';
import Webcam from 'react-webcam';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getExamById } from '../../redux/actions/examActions';
import GoBackButton from '../../components/GoBackButton';
import { submitExam } from '../../redux/actions/submitExam';
import { createStudentsActivity } from '../../redux/actions/studentActions';

const ExamInterface = () => {

    const dispatch = useDispatch();
    const hasFetchedExams = useRef(false);

    const { id } = useParams();  // Get the exam ID from the URL
    const { examDetails } = useSelector(state => state.exams);
    const { examData, questions } = examDetails;
    const { user } = useSelector((state) => state.auth);

    const [answers, setAnswers] = useState({});
    const [timeLeft, setTimeLeft] = useState(null);
    // const [isFullscreen, setIsFullscreen] = useState(false);
    const webcamRef = useRef(null);
    const [warningCount, setWarningCount] = useState(0);
    const [examStatus, setExamStatus] = useState('started'); // waiting, started, submitted
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Initialize exam and verify requirements
    const initializeExam = useCallback(async () => {
        try {
            let duration = examData.duration;
            setTimeLeft(duration * 60); // Convert minutes to seconds

            // Request necessary permissions
            await Promise.all([
                navigator.mediaDevices.getUserMedia({ video: true }),
                document.documentElement.requestFullscreen()
            ]);

        } catch (error) {
            // setError(error);
            console.error('Failed to fetch exams:', error);
        }
    }, [examData]);

    const fetchExams = useCallback(async () => {
        try {
            setLoading(true);  // Set loading true when fetching starts
            await dispatch(getExamById(id)); // Fetch exam by ID
            await initializeExam();          // Initialize exam
        } catch (error) {
            setError(error);
            console.error('Failed to fetch exams:', error);
        } finally {
            setLoading(false);  // Set loading to false once fetch is complete
        }
    }, [dispatch, id, initializeExam]);

    // Get exam data
    useEffect(() => {
        const fetchData = async () => {
            if (!hasFetchedExams.current) {
                await fetchExams();  // Fetch exams only on initial mount
                hasFetchedExams.current = true; // Mark as fetched
            }
        };
        fetchData();  // Call the async fetch function
    }, [dispatch, fetchExams]); // Dependency array includes dispatch

    // Timer countdown
    useEffect(() => {
        if (examStatus === 'started' && timeLeft > 0) {
            const timer = setInterval(() => {
                setTimeLeft(prev => prev - 1);
            }, 1000);
            return () => clearInterval(timer);
        } else if (timeLeft === 0) {
            submitExam();
        }
    }, [timeLeft, examStatus]);

    const handleSuspiciousActivity = useCallback(async () => {
        try {
            await axios.post('/api/proctor/incident', {
                examId: id,
                timestamp: new Date(),
            });

            setWarningCount(prev => prev + 1);
            if (warningCount >= 3) {
                submitExam();
            }
        } catch (error) {
            console.error('Failed to report suspicious activity:', error);
        }
    }, [id, warningCount]);


    // Monitor fullscreen
    useEffect(() => {
        const handleFullscreenChange = () => {
            // setIsFullscreen(!!document.fullscreenElement);
            if (!document.fullscreenElement && examStatus === 'started') {
                handleSuspiciousActivity('Left fullscreen mode');
            }
        };

        document.addEventListener('fullscreenchange', handleFullscreenChange);
        return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
    }, [examStatus, handleSuspiciousActivity]);

    const sendActivityData = useCallback(async (screenshot) => {
        try {
            await axios.post('/api/proctor/activity', {
                examId: id,
                screenshot,
                timestamp: new Date(),
                tabFocused: document.hasFocus(),
            });
        } catch (error) {
            console.error('Failed to send activity data:', error);
        }
    }, [id]);

    // Periodic screenshot and activity monitoring
    useEffect(() => {
        if (examStatus === 'started') {
            const monitoring = setInterval(() => {
                if (webcamRef.current) {
                    const screenshot = webcamRef.current.getScreenshot();
                    sendActivityData(screenshot);
                }
            }, 30000); // Every 30 seconds

            return () => clearInterval(monitoring);
        }
    }, [examStatus, sendActivityData]);


    //handle all answers from student
    const handleAnswerChange = (questionId, answer, questionType) => {
        setAnswers(prev => {
            const updatedAnswers = { ...prev, [questionId]: answer };
            // Clear the answer for the other question type (either "multiple-choice" or "true-false")
            for (let key in prev) {
                if (key !== questionId && (questionType === 'multiple-choice' || questionType === 'true-false')) {
                    // Assuming questions are grouped in a way where you can identify if the question type is "true-false" or "multiple-choice"
                    const otherQuestion = questions.find(q => q._id === key);

                    // If another question type is different from the current one, clear its answer
                    if (otherQuestion?.questionType && otherQuestion.questionType !== questionType) {
                        updatedAnswers[key] = '';
                    }
                }
            }
            return updatedAnswers;
        });
    };


    const submitExams = async () => {
        try {
            const submitData = {
                examId: id,
                answers,
                warningCount,
            }
            await dispatch(submitExam(submitData));
            let activityData = {
                acivityType: "submitted exam",
                examId: id,
                exam: examData.name,
                name: user.name,
                email: user.email,
                userId: user.id
            }
            await dispatch(createStudentsActivity(activityData));
            setExamStatus('submitted');
            document && document?.exitFullscreen();
        } catch (error) {
            console.error('Failed to submit exam:', error);
        }
    };

    // Show error message if there was a problem fetching the data
    if (error) {
        return (
            <div className="p-6 text-center">
                <p className="text-red-500">{error}</p>
                <GoBackButton />
            </div>
        );
    }

    if (loading || !examData) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-lg">Loading exam...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-4">
            {examStatus === 'started' && (
                <div className="flex flex-col items-center">
                    <div className="fixed top-4 right-4 bg-white p-4 rounded shadow">
                        <div className="text-xl font-bold">
                            Time Left: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
                        </div>
                        <div className="text-sm text-red-600">
                            Warnings: {warningCount}/3
                        </div>
                    </div>

                    <div className="fixed top-4 left-4 w-48">
                        <Webcam
                            ref={webcamRef}
                            audio={false}
                            screenshotFormat="image/jpeg"
                            className="w-full rounded"
                        />
                    </div>

                    <div className="max-w-3xl mx-auto mt-20 bg-white p-6 rounded shadow">
                        <h1 className="text-2xl font-bold mb-6">{examData.name}</h1>
                        {/* questions list */}
                        {questions.map((question, index) => (
                            <div key={question.id} className="mb-8">
                                <p className="font-semibold mb-4">
                                    {index + 1}. {question.question}
                                </p>

                                {question.questionType === "multiple-choice" ? (
                                    <div className="space-y-2">
                                        {question.options.map((option, optIndex) => (
                                            <label key={optIndex} className="flex items-center space-x-2">
                                                <input
                                                    type="radio"
                                                    name={`question-${question.id}`}
                                                    value={option}
                                                    onChange={(e) => handleAnswerChange(question.id, e.target.value, "multiple-choice")}
                                                    checked={answers[question.id] === option}
                                                    className="form-radio"
                                                />
                                                <span>{option}</span>
                                            </label>
                                        ))}
                                        <hr />
                                    </div>
                                ) : question.questionType === "true-false" ? (
                                    <div className="space-y-2">
                                        {['True', 'False'].map((option) => (
                                            <label key={option} className="flex items-center space-x-2">
                                                <input
                                                    type="radio"
                                                    name={`question-${question.id}`}
                                                    value={option}
                                                    onChange={(e) => handleAnswerChange(question.id, e.target.value, "true-false")}
                                                    checked={answers[question.id] === option}
                                                    className="form-radio"
                                                />
                                                <span>{option}</span>
                                            </label>
                                        ))}
                                        <hr />
                                    </div>
                                ) : (
                                    <textarea
                                        className="w-full p-2 border rounded"
                                        rows={4}
                                        value={answers[question.id] || ''}
                                        onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                                        placeholder="Enter your answer here..."
                                    />
                                )}


                            </div>
                        ))}

                        <button
                            onClick={submitExams}
                            className="bg-green-600 text-white px-8 py-3 rounded hover:bg-green-700 mb-8"
                        >
                            Submit Exam
                        </button>
                    </div>
                </div>
            )}

            {examStatus === 'submitted' && (
                <div className="flex flex-col items-center justify-center min-h-screen">
                    <div className="text-center mb-6">
                        <h2 className="text-2xl font-bold mb-4">Exam Submitted Successfully</h2>
                        <p>Thank you for completing the exam.</p>
                    </div>
                    <GoBackButton path={"/student/dashboard/exams"} />
                </div>
            )}

        </div>
    );
};

export default ExamInterface;
