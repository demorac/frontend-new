import { Avatar } from "@mantine/core";
import { Work } from "./DATA";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const Working = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: false, margin: "-100px" }); // Always animates on scroll

    const textVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { 
            opacity: 1, 
            y: 0, 
            transition: { duration: 1.2, ease: "easeOut" } 
        },
    };

    const imageVariants = {
        hidden: { opacity: 0, scale: 0.7, rotate: -5 },
        visible: { 
            opacity: 1, 
            scale: 1, 
            rotate: 0, 
            transition: { duration: 1.5, ease: "easeOut" } 
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, x: -80 },
        visible: { 
            opacity: 1, 
            x: 0, 
            transition: { duration: 1, ease: "easeOut", delay: 0.3 } 
        },
    };

    return (
        <motion.div
            ref={ref}
            className="mt-20 pb-5"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            whileInView="visible" // Triggers every time it comes into view
            viewport={{ once: false, amount: 0.2 }} // Controls how much needs to be visible
        >
            {/* Animated Title */}
            <motion.div 
                className="text-3xl md:text-4xl text-center mb-3 font-semibold text-mine-shaft-100"
                variants={textVariants}
            >
                How It <span className="text-bright-sun-400">Works</span>
            </motion.div>

            {/* Animated Subtitle */}
            <motion.div 
                className="text-lg mx-auto mb-10 text-mine-shaft-300 text-center w-full md:w-1/2"
                variants={textVariants}
            >
                Effortlessly navigate through the process and land your dream job!
            </motion.div>

            <div className="flex flex-col md:flex-row px-4 md:px-16 justify-between items-center gap-8">
                {/* Animated Image */}
                <motion.div 
                    className="relative w-full md:w-auto" 
                    variants={imageVariants}
                >
                    <img className="w-full md:w-[30rem]" src="/Working/Girl.png" alt="Girl" />
                    <motion.div 
                        className="w-24 md:w-36 top-[10%] md:top-[15%] right-0 absolute flex flex-col items-center gap-1 border border-bright-sun-400 rounded-xl py-3 px-1 backdrop-blur-md"
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                        whileInView="visible"
                        viewport={{ once: false, amount: 0.3 }}
                        transition={{ duration: 1.2, delay: 0.6 }}
                    >
                        <Avatar className="!h-12 !w-12 md:!h-16 md:!w-16" src="avatar1.png" alt="avatar girl" />
                        <div className="text-sm font-semibold text-mine-shaft-200 text-center">Complete Your Profile</div>
                        <div className="text-xs text-mine-shaft-300">70% Completed</div>
                    </motion.div>
                </motion.div>

                {/* Animated List */}
                <div className="flex flex-col gap-4 md:gap-10">
                    {Work.map((item, index) => (
                        <motion.div 
                            key={index} 
                            className="flex items-center gap-4" 
                            variants={itemVariants} 
                            initial="hidden" 
                            animate={isInView ? "visible" : "hidden"}
                            whileInView="visible"
                            viewport={{ once: false, amount: 0.3 }}
                            transition={{ delay: index * 0.4 }}
                        >
                            <motion.div 
                                className="p-2.5 bg-bright-sun-300 rounded-full"
                                whileHover={{ scale: 1.1, rotate: 5 }}
                            >
                                <img className="h-10 w-10 md:h-12 md:w-12" src={`/Working/${item.name}.png`} alt={item.name} />
                            </motion.div>
                            <motion.div variants={textVariants}>
                                <div className="text-mine-shaft-200 text-lg md:text-xl font-semibold">{item.name}</div>
                                <div className="text-mine-shaft-300">{item.desc}.</div>
                            </motion.div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

export default Working;
