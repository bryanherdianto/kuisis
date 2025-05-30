import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { UserButton } from '@clerk/clerk-react';

export default function Navbar() {
  const { isSignedIn } = useAuth();

  return (
    <nav className="bg-indigo-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="text-xl font-bold">QuizMaster</Link>
          </div>
          <div className="flex space-x-6">
            <Link to="/" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-indigo-500">
              Home
            </Link>
            {isSignedIn && (
              <Link to="/stats" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-indigo-500">
                My Stats
              </Link>
            )}
          </div>
          <div className="ml-4 flex items-center">
            {isSignedIn ? (
              <UserButton afterSignOutUrl="/" />
            ) : (
              <Link to="/sign-in" className="px-4 py-2 rounded-md text-sm font-medium bg-indigo-700 hover:bg-indigo-800">
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
