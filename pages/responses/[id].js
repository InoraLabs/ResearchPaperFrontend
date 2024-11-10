import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

export default function ResponseDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (id) {
      const fetchResponse = async () => {
        try {
          const { data } = await axios.get(`http://localhost:5000/api/questions/${id}`);
          setResponse(data);
        } catch (error) {
          setError('Error fetching response');
        }
      };
      fetchResponse();
    }
  }, [id]);

  if (error) return <p className="text-red-500 text-center">{error}</p>;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-3xl bg-white rounded-lg shadow-lg p-6">
        {response ? (
          <>
            <h1 className="text-2xl font-bold mb-4">Response Details</h1>
            <p className="text-lg font-semibold">Name: {response.name}</p>
            <p className="text-gray-500">Date: {new Date(response.createdAt).toLocaleDateString()}</p>
            <div className="mt-6">
              {response.questions.map((q, index) => (
                <div key={index} className="mb-4">
                  <p className="font-semibold">{q.question}</p>
                  <p className="text-gray-700">{q.answer}</p>
                </div>
              ))}
            </div>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}
