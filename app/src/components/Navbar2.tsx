import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import GlassSurface from "./GlassSurface"; 

const Navbar2: React.FC = () => {
  const navigate = useNavigate();
  const [initials, setInitials] = useState<string>("U");
  const [userName, setUserName] = useState<string>("");
  const [userEmail, setUserEmail] = useState<string>("");
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);

  useEffect(() => {
    try {
      const userStr = localStorage.getItem("user");
      if (userStr) {
        const user = JSON.parse(userStr);
        if (user) {
          if (user.name) {
            setUserName(user.name);
            const names = user.name.trim().split(/\s+/);
            let userInitials = "";
            if (names.length > 0) {
              userInitials += names[0].charAt(0).toUpperCase();
              if (names.length > 1) {
                userInitials += names[names.length - 1].charAt(0).toUpperCase();
              } else {
                userInitials = names[0].slice(0, 2).toUpperCase();
              }
            }
            if (userInitials) {
              setInitials(userInitials.slice(0, 2));
            }
          } else {
            setUserName("User");
          }
          if (user.email) {
            setUserEmail(user.email);
            if (!user.name) {
              setInitials(user.email.slice(0, 2).toUpperCase());
            }
          }
        }
      }
    } catch (err) {
      console.error("Failed to parse user details for avatar initials:", err);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <GlassSurface
      width="100%"
      height="auto"
      borderRadius={0}
      className="fixed top-0 left-0 w-full z-[1000] min-h-[80px]"
    >
      <nav className="relative z-10 box-border flex w-full flex-col items-center gap-[15px] p-[15px] sm:h-[80px] sm:flex-row sm:justify-between sm:p-0 sm:px-[25px] md:px-[50px]">
        {/* Left Side */}
        <div className="flex items-center">
          <h2 className="text-[18px] font-bold tracking-[1px] text-white sm:text-[24px] md:text-[32px]">
            Site Name
          </h2>
        </div>

        {/* Right Side */}
        <div className="flex flex-wrap items-center justify-center gap-[10px] sm:flex-nowrap sm:gap-[15px] md:gap-[30px]">
          <button className="cursor-pointer rounded-[10px] border border-white/20 bg-white/10 px-[14px] py-[8px] text-[14px] text-white backdrop-blur-[10px] transition duration-300 hover:bg-white/15 sm:text-[16px] sm:px-[18px] sm:py-[10px]">
            Notifications
          </button>

          <button className="cursor-pointer rounded-[10px] border border-white/20 bg-white/10 px-[14px] py-[8px] text-[14px] text-white backdrop-blur-[10px] transition duration-300 hover:bg-white/15 sm:text-[16px] sm:px-[18px] sm:py-[10px]">
            Settings
          </button>

          {/* Profile Avatar Button with Dropdown */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 font-bold text-white border-2 border-white/30 hover:border-white/60 hover:scale-105 active:scale-95 transition-all duration-300 shadow-md cursor-pointer text-sm sm:text-base select-none"
              title={userName || "User Profile"}
            >
              {initials}
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 origin-top-right rounded-xl border border-white/10 bg-[#13141c]/95 backdrop-blur-md p-2 shadow-2xl z-50 text-left">
                <div className="px-4 py-3 border-b border-white/10">
                  <p className="text-xs text-gray-400 font-medium">Signed in as</p>
                  <p className="text-sm font-semibold text-white truncate mt-0.5">{userName}</p>
                  {userEmail && <p className="text-xs text-gray-500 truncate mt-0.5">{userEmail}</p>}
                </div>
                <div className="py-1">
                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center px-4 py-2 text-sm text-red-400 hover:bg-white/5 rounded-lg transition-colors duration-200 text-left font-medium cursor-pointer"
                  >
                    Sign out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
    </GlassSurface>
  );
};

export default Navbar2;
