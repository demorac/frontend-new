import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@mantine/core";
import { IconAnchor } from "@tabler/icons-react";
import { motion } from "framer-motion"; // Import motion for animation
import { useMediaQuery } from '@mantine/hooks';

import ProfileMenu from "./ProfileMenu";
import NavLinks from "./NavLinks";
import { getProfile } from "../../Services/ProfileService";
import { setProfile } from "../../Slices/ProfileSlice";
import NotiMenu from "./NotiMenu";
import { setUser } from "../../Slices/UserSlice";
import { jwtDecoder } from "../../Services/AuthService";
import { setupResponseInterceptor } from "../../Interceptor/AxiosInterceptor";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user);
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const token = useSelector((state: any) => state.jwt || state.token); // Ensure correct token access
  const isTablet = useMediaQuery('(max-width: 1023px)'); // Updated to cover up to 1023px
  const isMobile = useMediaQuery('(max-width: 319px)'); // For screens smaller than 350px

  useEffect(() => {
    setupResponseInterceptor(navigate);
    const storedToken = localStorage.getItem("token");

    if (!storedToken) {
      console.warn("No token found in localStorage");
      return; // ✅ Exit early if no token
    }

    const decoded = jwtDecoder(storedToken);

    if (decoded && typeof decoded === "object" && "sub" in decoded) {
      dispatch(setUser({ ...decoded, email: decoded.sub }));
    } else {
      console.error("Decoded JWT does not contain 'sub' field:", decoded);
    }
  }, [token, dispatch, navigate]);

  useEffect(() => {
    if (user && user.id) {
      getProfile(user.id)
        .then((data: any) => {
          dispatch(setProfile(data));
        })
        .catch((error: any) => {
          console.error("Error fetching profile:", error);
        });
    }
  }, [user, dispatch]);

  if (location.pathname === "/signup" || location.pathname === "/login")
    return null;

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Animation variants for the mobile menu
  const mobileMenuVariants = {
    open: { x: 0, transition: { type: "spring", stiffness: 200, damping: 30 } },
    closed: { x: "-100%", transition: { type: "spring", stiffness: 200, damping: 30 } },
  };

  return (
    <div className="w-full bg-mine-shaft-950 px-4 sm:px-6 text-white h-auto md:h-20 flex flex-col md:flex-row justify-between items-center font-['poppins']">
      {/* Logo Section */}
      <div className="flex gap-1 items-center text-bright-sun-400 py-2">
        <IconAnchor className="h-6 w-6 sm:h-8 sm:w-8" stroke={2.5} />
        <div className="text-xl sm:text-3xl font-semibold">SeeKJoB</div>
      </div>

      {/* Mobile Menu Button (Hamburger icon) for 350px to 1023px */}
      {(isTablet && !isMobile) && (
        <button
          className="text-white focus:outline-none z-50" // Added z-50 to ensure it's on top
          onClick={toggleMobileMenu}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>
      )}

      {/* Navigation Links - Mobile Menu using Framer Motion */}
      <motion.div
        className={`fixed top-0 left-0 h-full w-64 bg-mine-shaft-950 text-white z-40 shadow-lg ${isTablet ? '' : 'hidden md:block'}`} // Fixed position, full height, width, etc.  Conditionally hidden
        variants={mobileMenuVariants}
        animate={isMobileMenuOpen ? "open" : "closed"}
      >
        <div className="p-4 flex flex-col">
          <button
            className="text-white self-end mb-4"
            onClick={toggleMobileMenu}
          >
            {/* Close Button (X) */}
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
          <NavLinks isVertical={true} /> {/* Pass isVertical prop */}
        </div>
      </motion.div>

      {/* Navigation Links - Desktop Version */}
      {/* Hide desktop navigation when in tablet mode (350px to 1023px) */}
      {!isTablet && (
        <div className="hidden md:flex md:items-center w-full md:w-auto">
          <NavLinks />
        </div>
      )}

      {/* Right Section: Profile / Login / Notifications */}
      <div className="flex gap-3 items-center py-2">
        {user ? (
          <ProfileMenu />
        ) : (
          <Link to="/login">
            <Button variant="subtle" color="brightSun.4">
              Login
            </Button>
          </Link>
        )}
        {user && <NotiMenu />}
      </div>
    </div>
  );
};

export default Header;