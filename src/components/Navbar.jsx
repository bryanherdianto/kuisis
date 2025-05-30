import { Link } from 'react-router-dom';
import { SignedIn, SignedOut, UserButton, useClerk } from '@clerk/clerk-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faChartSimple } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import Logo from "/kuisis-white.svg";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);
  const clerk = useClerk();

  return (
    <>
      {/* Desktop Navbar */}
      <nav className="hidden sm:block bg-indigo-600 text-white shadow-lg fixed top-0 left-0 w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="text-2xl flex items-center">
                <img src={Logo} width={40} height={40} alt="Kuisis Logo" className='mr-2 hidden sm:block' />
                <span className="font-alfa-slab">Kuisis</span>
              </Link>
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
                <button onClick={() => clerk.openSignIn({})} className="px-4 py-2 bg-white text-indigo-600 rounded-md font-bold cursor-pointer text-sm hover:bg-gray-100 transition-colors">
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

      {/* Mobile Navbar */}
      <nav className="block sm:hidden bg-indigo-600 text-white shadow-lg fixed top-0 left-0 w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="text-2xl flex items-center">
                <img src={Logo} width={40} height={40} alt="Kuisis Logo" className='mr-2 hidden sm:block' />
                <span className="font-alfa-slab">Kuisis</span>
              </Link>
            </div>
            <div className='flex flex-row'>
              <div className="mr-4 flex items-center">
                <SignedOut>
                  <button onClick={() => clerk.openSignIn({})} className="px-4 py-2 bg-white text-indigo-600 rounded-md font-bold cursor-pointer text-sm hover:bg-gray-100 transition-colors">
                    Login
                  </button>
                </SignedOut>
                <SignedIn>
                  <UserButton />
                </SignedIn>
              </div>
              <button className="h-20 w-10 cursor-pointer" onClick={toggleMenu}>
                <div className={`grid justify-items-center gap-1.5 ${menuOpen ? 'group' : ''}`}>
                  <span className={`h-1 w-8 rounded-full bg-white transition ${menuOpen ? 'rotate-45 translate-y-2.5' : ''}`}></span>
                  <span className={`h-1 w-8 rounded-full bg-white transition ${menuOpen ? 'scale-x-0' : ''}`}></span>
                  <span className={`h-1 w-8 rounded-full bg-white transition ${menuOpen ? '-rotate-45 -translate-y-2.5' : ''}`}></span>
                </div>
              </button>
            </div>
          </div>
          {menuOpen && (
            <div className="sm:hidden flex flex-col items-center justify-center mt-2 space-y-4 pb-4 text-center">
              <Link
                to="/"
                className="font-medium relative text-sm w-fit block after:block after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:bg-white after:w-full after:scale-x-0 after:transform after:transition-transform after:duration-300 after:origin-right hover:after:scale-x-100"
                onClick={toggleMenu}
              >
                <FontAwesomeIcon icon={faHouse} />&nbsp;&nbsp;Home
              </Link>
              <Link
                to="/stats"
                className="font-medium relative text-sm w-fit block after:block after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:bg-white after:w-full after:scale-x-0 after:transform after:transition-transform after:duration-300 after:origin-right hover:after:scale-x-100"
                onClick={toggleMenu}
              >
                <FontAwesomeIcon icon={faChartSimple} />&nbsp;&nbsp;My Stats
              </Link>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}
