import { TextInput } from "@mantine/core";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const Subscribe = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: false, margin: "-100px" }); // Always animates on scroll

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { duration: 1.2, staggerChildren: 0.3 },
        },
    };

    const textVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { 
            opacity: 1, 
            y: 0, 
            transition: { duration: 1.2, ease: "easeOut" } 
        },
    };

    const inputVariants = {
        hidden: { opacity: 0, x: -50 },
        visible: { 
            opacity: 1, 
            x: 0, 
            transition: { duration: 1.2, ease: "easeOut" } 
        },
    };

    const buttonVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: { 
            opacity: 1, 
            scale: 1, 
            transition: { duration: 1.5, ease: "easeOut" } 
        },
        hover: {
            x: 5, 
            scale: 1.1,
            transition: { duration: 0.3 },
        },
    };

    return (
        <motion.div
            ref={ref}
            className="mt-10 md:mt-20 flex flex-col md:flex-row items-center bg-mine-shaft-900 mx-4 md:mx-20 py-3 justify-center md:justify-around rounded-xl"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }} // Re-triggers when scrolling
            variants={containerVariants}
        >
            {/* Animated Heading */}
            <motion.div 
                className="text-2xl md:text-4xl w-full md:w-2/5 text-center font-semibold text-mine-shaft-100 mb-4 md:mb-0"
                variants={textVariants}
            >
                Never Want To Miss Any Update <span className="text-bright-sun-400">Job News</span>
            </motion.div>

            {/* Animated Input & Button */}
            <div className="flex flex-col sm:flex-row gap-4 rounded-xl bg-mine-shaft-700 px-3 py-2 items-center">
                <motion.div variants={inputVariants}>
                    <TextInput
                        className="[&_input]:text-mine-shaft-100 font-semibold w-full sm:w-auto"
                        variant="unstyled"
                        placeholder="Your@email.com"
                        size="xl"
                    />
                </motion.div>

                <motion.button
                    className="rounded-lg bg-bright-sun-400 px-4 py-2 text-white"
                    variants={buttonVariants}
                    whileHover="hover"
                >
                    Subscribe
                </motion.button>
            </div>
        </motion.div>
    );
};

export default Subscribe;
