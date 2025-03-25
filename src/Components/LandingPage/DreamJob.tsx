import { Avatar, TextInput } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { motion, useTransform, useScroll, useInView } from "framer-motion";
import { useRef } from "react";

const DreamJob = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: false, margin: "-100px" });

    const containerVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 1, delayChildren: 0.4, staggerChildren: 0.3 },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
    };

    const textVariants = {
        hidden: { opacity: 0, x: -30 },
        visible: { opacity: 1, x: 0, transition: { duration: 1, ease: "easeInOut" } },
    };

    const imageVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: { opacity: 1, scale: 1, transition: { duration: 1, ease: "easeInOut" } },
    };

    const buttonVariants = {
        hover: { scale: 1.1, transition: { duration: 0.4 } },
    };

    const { scrollYProgress } = useScroll();
    const y = useTransform(scrollYProgress, [0, 1], [0, 80]);

    return (
        <motion.div
            ref={ref}
            className="flex flex-col lg:flex-row items-center px-4 sm:px-8 md:px-16 py-8 gap-8"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            variants={containerVariants}
        >
            {/* Left Section: Text and Search Inputs */}
            <motion.div className="w-full lg:w-[45%] flex flex-col gap-3" variants={itemVariants}>
                <motion.div
                    className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight text-mine-shaft-100 [&>span]:text-bright-sun-400"
                    variants={textVariants}
                >
                    Find Your <span>Dream</span> <span>Job</span> With Us
                </motion.div>
                <motion.div className="text-base sm:text-lg text-mine-shaft-200" variants={textVariants}>
                    Good Life Begins with a Good Company. Start Exploring Thousands of Jobs at One Place.
                </motion.div>
                <div className="flex flex-col sm:flex-row gap-3 mt-5">
                    <TextInput
                        className="bg-mine-shaft-900 rounded-lg p-2 text-mine-shaft-100 [&_input]:!text-mine-shaft-100 w-full sm:w-auto"
                        variant="unstyled"
                        label="Job Title"
                        placeholder="Software Engineer"
                    />
                    <TextInput
                        className="bg-mine-shaft-900 rounded-lg p-2 text-mine-shaft-100 [&_input]:!text-mine-shaft-100 w-full sm:w-auto"
                        variant="unstyled"
                        label="Job Type"
                        placeholder="Full Time"
                    />
                    <motion.div
                        className="flex items-center justify-center h-12 w-full sm:w-20 bg-bright-sun-400 text-mine-shaft-100 rounded-lg p-2 hover:bg-bright-sun-500 cursor-pointer"
                        variants={buttonVariants}
                        whileHover="hover"
                    >
                        <IconSearch className="h-6 w-6" />
                    </motion.div>
                </div>
            </motion.div>

            {/* Right Section: Image and Overlays */}
            <motion.div className="w-full lg:w-[55%] flex items-center justify-center relative" variants={itemVariants}>
                <div className="w-full max-w-[30rem]">
                    <motion.img
                        src="/Boy.png"
                        alt="Boy"
                        className="w-full h-auto"
                        style={{ y }} // Apply parallax effect
                        variants={imageVariants}
                    />
                    {/* Hide overlays on small and medium screens */}
                    <div className="hidden lg:block">
                        {/* Overlay: 10K+ Got Jobs */}
                        <motion.div
                            className="absolute right-2 sm:right-4 md:right-8 lg:right-20 top-[30%] sm:top-[35%] md:top-[40%] w-fit border-bright-sun-400 border rounded-lg p-2 backdrop-blur-md"
                            initial="hidden"
                            animate={isInView ? "visible" : "hidden"}
                            whileInView="visible"
                            viewport={{ once: false }}
                            variants={itemVariants}
                        >
                            <div className="text-center mb-1 text-sm text-mine-shaft-100">10K+ Got Jobs</div>
                            <Avatar.Group>
                                <Avatar src="avatar.png" />
                                <Avatar src="avatar1.png" />
                                <Avatar src="avatar2.png" />
                                <Avatar>+9K</Avatar>
                            </Avatar.Group>
                        </motion.div>
                        {/* Overlay: Job Card */}
                        <motion.div
                            className="absolute left-2 sm:left-4 md:left-8 lg:left-16 top-[50%] sm:top-[55%] md:top-[60%] w-fit border-bright-sun-400 border rounded-lg p-2 backdrop-blur-md gap-3 flex flex-col"
                            initial="hidden"
                            animate={isInView ? "visible" : "hidden"}
                            whileInView="visible"
                            viewport={{ once: false }}
                            variants={itemVariants}
                        >
                            <div className="flex gap-2 items-center">
                                <div className="w-10 h-10 p-1 bg-mine-shaft-900 rounded-lg">
                                    <img src="/Google.png" alt="Google" className="w-full h-full" />
                                </div>
                                <div className="text-sm text-mine-shaft-100">
                                    <div>Software Engineer</div>
                                    <div className="text-mine-shaft-200 text-xs">New York</div>
                                </div>
                            </div>
                            <div className="flex gap-2 text-mine-shaft-200 text-xs justify-around">
                                <span>1 Day Ago</span>
                                <span>100+ Applicants</span>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default DreamJob;
