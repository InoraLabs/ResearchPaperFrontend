import { useState, useEffect } from "react";
import axios from "axios";
import "../app/globals.css";
import Link from "next/link";

export default function FormPage() {
    const questions = [
        "What is the main problem or research question the paper addresses?",
        "Why is this problem important to the field?",
        "What methodology or approach did the authors use to investigate the problem?",
        "What are the key findings or results of the study?",
        "How do the results answer the research question or support the hypotheses?",
        "What conclusions do the authors draw from their findings?",
        "How does this work build upon or differ from previous research?",
        "What are the strengths and limitations of the study?",
        "What implications do the findings have for the field or practical applications?",
        "What future research directions do the authors suggest or what questions remain unanswered?",
    ];

    const [name, setName] = useState("");
    const [answers, setAnswers] = useState(Array(questions.length).fill(""));
    const [error, setError] = useState("");
    const [progress, setProgress] = useState(0);
    const [currentQuestion, setCurrentQuestion] = useState(0);

    const handleChange = (index, value) => {
        const newAnswers = [...answers];
        newAnswers[index] = value;
        setAnswers(newAnswers);
    };

    useEffect(() => {
        const filledAnswers = answers.filter((answer) => answer).length;
        const filledName = name ? 1 : 0;
        const totalFields = questions.length + 1; // +1 for the name
        setProgress(((filledAnswers + filledName) / totalFields) * 100);
    }, [answers, name]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!name || answers.some((answer) => !answer)) {
            setError("Please enter your name and answer all questions.");
            return;
        }

        try {
            const questionsData = {
                name,
                questions: answers.map((answer, i) => ({
                    question: questions[i],
                    answer,
                })),
            };
            await axios.post(
                "https://researchpaperbackend.onrender.com/api/questions",
                questionsData
            );
            setError("");
            alert("Form submitted successfully");

            // Clear the form after successful submission
            setName("");
            setAnswers(Array(questions.length).fill(""));
            setProgress(0);
        } catch (error) {
            setError("Error submitting form");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-6 flex"
            >
                {/* Sidebar */}
                <div className="w-1/4 p-4 border-r border-gray-200">
                    <h1 className="text-xl font-bold text-blue-600 mb-4">
                        Research Analysis
                    </h1>
                    <p className="text-gray-600 mb-6">
                        Analyze the research paper by answering the questions
                        below.
                    </p>

                    {/* Questions List */}
                    <div className="flex flex-col gap-3">
                        {questions.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentQuestion(index)}
                                className={`flex items-center px-3 py-2 rounded-lg text-sm text-left ${
                                    currentQuestion === index
                                        ? "bg-blue-100 text-blue-600 font-semibold"
                                        : "text-gray-700 hover:bg-gray-100"
                                }`}
                            >
                                Question {index + 1}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Main Content */}
                <div className="w-3/4 p-4">
                    {/* Progress Bar */}
                    <div className="mb-6">
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div
                                className="bg-blue-600 h-2.5 rounded-full"
                                style={{
                                    width: `${progress}%`,
                                    transition: "width 0.3s ease",
                                }}
                            ></div>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">
                            Progress: {Math.round(progress)}%
                        </p>
                    </div>

                    {/* Name Field */}
                    <div className="mb-6">
                        <label className="block text-gray-700 font-semibold mb-2">
                            Enter your full name:
                        </label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your full name"
                        />
                    </div>

                    {/* Current Question */}
                    <div className="mb-6">
                        <h2 className="text-lg font-semibold text-gray-800 mb-2">
                            {currentQuestion + 1}. {questions[currentQuestion]}
                        </h2>
                        <textarea
                            value={answers[currentQuestion]}
                            onChange={(e) =>
                                handleChange(currentQuestion, e.target.value)
                            }
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Type your answer here..."
                            rows={4}
                        ></textarea>
                    </div>

                    {/* Navigation Buttons */}
                    <div className="flex justify-between">
                        <button
                            type="button"
                            onClick={() =>
                                setCurrentQuestion((prev) =>
                                    Math.max(prev - 1, 0)
                                )
                            }
                            className="bg-gray-200 text-gray-700 font-semibold py-2 px-4 rounded-lg hover:bg-gray-300"
                            disabled={currentQuestion === 0}
                        >
                            Previous Question
                        </button>
                        <button
                            type="button"
                            onClick={() =>
                                setCurrentQuestion((prev) =>
                                    Math.min(prev + 1, questions.length - 1)
                                )
                            }
                            className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700"
                            disabled={currentQuestion === questions.length - 1}
                        >
                            Next Question
                        </button>
                    </div>

                    {/* Submit Button */}
                    <div className="mt-6">
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:bg-blue-600 transition duration-200"
                        >
                            Complete All Questions to Submit
                        </button>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <p className="text-red-500 mt-4 text-center">{error}</p>
                    )}
                    <div className="py-5">
                        <Link href="/responses">
                            <button className="w-full py-3 px-6 text-blue-600 border border-blue-600 hover:bg-blue-100 rounded-lg font-semibold">
                                View Responses
                            </button>
                        </Link>
                    </div>
                </div>
            </form>
        </div>
    );
}
