"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<{ fullName: string; role: string } | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      setUser(JSON.parse(stored));
    }
  }, [pathname]);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    router.push("/");
  };

  return (
    <nav className="border-b border-gray-200 bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-2">
            <svg width="28" height="28" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M50 5C25.2 5 5 25.2 5 50s20.2 45 45 45c8.3 0 16.1-2.3 22.8-6.2C60.5 82.5 45 70 45 55c0-16.6 13.4-30 30-30 5.5 0 10.7 1.5 15.1 4.1C86.3 14.8 69.5 5 50 5z" fill="black"/>
              <path d="M75 35c-11 0-20 9-20 20s9 20 20 20c7.4 0 13.9-4 17.3-10C95.4 60.7 97 55.5 97 50c0-3.3-.4-6.5-1.1-9.6C91.8 36.5 83.8 35 75 35z" fill="black"/>
            </svg>
            <span className="text-xl font-bold tracking-tight">
              zerovertical
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {user?.role === "hr" && (
              <Link
                href="/dashboard"
                className={`text-sm font-medium transition-colors ${
                  pathname.startsWith("/dashboard")
                    ? "text-black"
                    : "text-gray-500 hover:text-black"
                }`}
              >
                Dashboard
              </Link>
            )}

            <a
              href="https://www.linkedin.com/company/zerovertical-labs"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-500 hover:text-black transition-colors"
            >
              About Us
            </a>

            {user ? (
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-500">
                  {user.fullName}
                  {user.role === "hr" && (
                    <span className="ml-2 text-xs bg-black text-white px-2 py-0.5 rounded-full">
                      HR
                    </span>
                  )}
                </span>
                <button
                  onClick={handleLogout}
                  className="text-sm text-gray-500 hover:text-black transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="text-sm font-medium bg-black text-white px-5 py-2 rounded-lg hover:bg-gray-800 transition-colors"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden p-2"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-gray-100 py-4 space-y-3">
            {user?.role === "hr" && (
              <Link
                href="/dashboard"
                className="block text-sm font-medium text-gray-600 hover:text-black py-2"
              >
                Dashboard
              </Link>
            )}

            <a
              href="https://www.linkedin.com/company/zerovertical-labs"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-sm text-gray-600 hover:text-black py-2"
            >
              About Us
            </a>

            {user ? (
              <div className="space-y-3 pt-2 border-t border-gray-100">
                <p className="text-sm text-gray-500">
                  {user.fullName}
                  {user.role === "hr" && (
                    <span className="ml-2 text-xs bg-black text-white px-2 py-0.5 rounded-full">
                      HR
                    </span>
                  )}
                </p>
                <button
                  onClick={handleLogout}
                  className="text-sm text-gray-500 hover:text-black"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="block text-center text-sm font-medium bg-black text-white px-5 py-3 rounded-lg hover:bg-gray-800 transition-colors"
              >
                Login
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
