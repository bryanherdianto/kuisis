import { Link } from 'react-router-dom';

function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-center p-6">
            <h1 className="text-4xl font-bold text-black mb-4">404 - Page Not Found</h1>
            <p className="text-gray-700 mb-6">
                The page you're looking for doesn't exist or has been moved.
            </p>
            <Link
                to="/"
                className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
            >
                Go to Home
            </Link>
        </div>
    );
}

export default NotFound;
