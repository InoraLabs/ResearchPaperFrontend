import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-blue-600 mb-6 text-center">Welcome to Research Analysis</h2>
        <p className="text-gray-600 text-center mb-8">
          Choose an action below to get started.
        </p>
        <div className="flex flex-col gap-4">
          <Link href="/formPage">
            <button className="w-full py-3 px-6 text-white bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold">
              Go to Form Page
            </button>
          </Link>
          <Link href="/responses">
            <button className="w-full py-3 px-6 text-blue-600 border border-blue-600 hover:bg-blue-100 rounded-lg font-semibold">
              View Responses
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
