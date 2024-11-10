import { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import "../../app/globals.css";

export default function ResponsesPage() {
    const [responses, setResponses] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchResponses = async () => {
            try {
                const { data } = await axios.get(
                    "https://researchpaperbackend.onrender.com/api/questions"
                );
                setResponses(data);
            } catch (error) {
                setError("Error fetching responses");
            }
        };
        fetchResponses();
    }, []);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
            <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-8 space-y-8">
                <h1 className="text-4xl font-extrabold text-blue-700 mb-6 text-center">
                    All Responses
                </h1>

                {error && <p className="text-red-500 text-center">{error}</p>}

                <ul className="space-y-4">
                    {responses.map((response) => (
                        <li key={response._id}>
                            <Link href={`/responses/${response._id}`}>
                                <p className="block p-6 bg-blue-50 hover:bg-blue-100 rounded-lg shadow-sm border border-gray-200 transition-all duration-200">
                                    <div className="flex justify-between items-center">
                                        <p className="text-lg font-semibold text-blue-700">
                                            {response.name}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            {new Date(
                                                response.createdAt
                                            ).toLocaleDateString()}
                                        </p>
                                    </div>
                                </p>
                            </Link>
                        </li>
                    ))}
                </ul>
                <div className="mt-5">
                    <Link href="/formPage">
                        <button className="w-full py-3 px-6 text-blue-600 border border-blue-600 hover:bg-blue-100 rounded-lg font-semibold">
                            Form
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
