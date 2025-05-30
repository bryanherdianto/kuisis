import { Link } from 'react-router-dom';
import { SignedIn, SignedOut, UserButton, useClerk } from '@clerk/clerk-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faChartSimple } from '@fortawesome/free-solid-svg-icons';

export default function Navbar() {
  const clerk = useClerk();

  return (
    <nav className="bg-indigo-600 text-white shadow-lg fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="text-xl font-bold">Kuisis</Link>
          </div>
          <div className="flex space-x-6">
            <Link
              to="/"
              className="font-medium relative text-sm w-fit block after:block after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:bg-white after:w-full after:scale-x-0 after:transform after:transition-transform after:duration-300 after:origin-right hover:after:scale-x-100"
            >
              <FontAwesomeIcon icon={faHouse} />&nbsp;&nbsp;Home
            </Link>
            <Link
              to="/stats"
              className="font-medium relative text-sm w-fit block after:block after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:bg-white after:w-full after:scale-x-0 after:transform after:transition-transform after:duration-300 after:origin-right hover:after:scale-x-100"
            >
              <FontAwesomeIcon icon={faChartSimple} />&nbsp;&nbsp;My Stats
            </Link>
          </div>
          <div className="ml-4 flex items-center">
            <SignedOut>
              <button onClick={() => clerk.openSignIn({})} className="px-4 py-2 bg-white text-indigo-600 rounded-md font-medium text-sm hover:bg-gray-100 transition-colors">
                Login
              </button>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </div>
      </div>
    </nav>
  );
}
