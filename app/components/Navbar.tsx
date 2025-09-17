import Link from 'next/link';
import { Hand, AudioLines } from 'lucide-react';

const Navbar = () => {
  return (
    <header className="w-full bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-3">
            <div className="flex items-center">
              <Hand className="h-7 w-7 text-blue-600" />
              <AudioLines className="h-7 w-7 text-blue-500" />
            </div>
            <span className="text-xl font-bold text-gray-800">
              Sign-to-Speech Bridge
            </span>
          </Link>
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/about" className="text-gray-600 hover:text-blue-600 transition-colors">About</Link>
            <Link href="/technology" className="text-gray-600 hover:text-blue-600 transition-colors">Technology</Link>
            <Link href="/contact" className="text-gray-600 hover:text-blue-600 transition-colors">Contact</Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;