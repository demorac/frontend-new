import { IconAnchor, IconArrowLeft } from "@tabler/icons-react";
import Signup from "../SignupLogin/Signup";
import Login from "../SignupLogin/Login";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@mantine/core";
import { motion, AnimatePresence } from "framer-motion";

const SignupPage = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const isLargeScreen = window.innerWidth >= 900;

    return (
        <div className="min-h-screen bg-mine-shaft-950 font-['poppins'] overflow-hidden relative">
            {/* Home Button - Adjusted positioning for small screens */}
            <Button 
                className="!absolute left-3 top-3 z-10 md:left-5 md:top-5" 
                leftSection={<IconArrowLeft size={20} />} 
                color="brightSun.4" 
                size="sm"  // Smaller button on mobile
                onClick={() => navigate("/")} 
                variant="light"
            >
                <span className="hidden sm:inline">Home</span>  {/* Hide text on smallest screens */}
            </Button>

            {/* Main Container */}
            <div className="w-full h-screen flex flex-col bs:flex-row transition-all ease-in-out duration-1000 [&>*]:flex-shrink-0 bs-max:translate-x-0">
                {/* Login Section */}
                {isLargeScreen ? (
                    <AnimatePresence>
                        {location.pathname !== "/signup" && (
                            <motion.div
                                key="login"
                                className="w-full bs:w-1/2 flex items-center justify-center pt-12 sm:pt-0"  // Added padding top
                                initial={{ x: -300 }}
                                animate={{ x: 0 }}
                                exit={{ x: -300 }}
                                transition={{ duration: 0.5 }}
                            >
                                <Login />
                            </motion.div>
                        )}
                    </AnimatePresence>
                ) : (
                    location.pathname !== "/signup" && (
                        <div className="w-full bs:w-1/2 flex items-center justify-center pt-12 sm:pt-0">  {/* Added padding top */}
                            <Login />
                        </div>
                    )
                )}

                {/* Branding Section */}
                <div
                    className={`w-1/2 h-full bg-mine-shaft-900 flex items-center gap-5 justify-center flex-col 
                    transition-all ease-in-out duration-1000 
                    ${location.pathname === "/signup" ? "rounded-r-[300px]" : "rounded-l-[300px]"}
                    bs:flex hidden`}
                >
                    <div className="flex gap-1 items-center text-bright-sun-400">
                        <IconAnchor className="h-16 w-16" stroke={2.5} />
                        <div className="text-5xl font-semibold lg:text-6xl">SeeKJoB</div>
                    </div>
                    <div className="text-xl text-mine-shaft-200 font-semibold lg:text-2xl">
                        Find The Job Made For You
                    </div>
                </div>

                {/* Signup Section */}
                {isLargeScreen ? (
                    <AnimatePresence>
                        {location.pathname === "/signup" && (
                        <motion.div
                        key="signup"
                        className="w-full bs:w-1/2 flex items-center justify-center pt-12 sm:pt-0 duration-1000"
                        initial={{ x: 300 }}
                        animate={{ x: 0 }}
                        exit={{ x: 300 }}
                        transition={{ duration: 0.3 }}
                    >
                        <Signup />
                    </motion.div>
                        )}
                    </AnimatePresence>
                ) : (
                    location.pathname === "/signup" && (
                        <div className="w-full bs:w-1/2 flex items-center justify-center pt-12 sm:pt-0">  {/* Added padding top */}
                            <Signup />
                        </div>
                    )
                )}
            </div>
        </div>
    );
};

export default SignupPage;