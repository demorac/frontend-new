import { Avatar, Rating } from "@mantine/core";
import { testimonials } from "./DATA";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const Testimonials = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: false, margin: "-100px" }); // Always animates on scroll

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { duration: 1.2, staggerChildren: 0.3 },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 50, scale: 0.8 },
        visible: { 
            opacity: 1, 
            y: 0, 
            scale: 1, 
            transition: { duration: 1.5, ease: "easeOut" } 
        },
    };

    const avatarVariants = {
        hidden: { opacity: 0, x: -40 },
        visible: { 
            opacity: 1, 
            x: 0, 
            transition: { duration: 1.2, ease: "easeOut" } 
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

    return (
        <motion.div
            ref={ref}
            className="mt-20 pb-5"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }} // Re-triggers when scrolling
            variants={containerVariants}
        >
            {/* Animated Title */}
            <motion.div 
                className="text-3xl md:text-4xl text-center mb-3 font-semibold text-mine-shaft-100"
                variants={textVariants}
            >
                What <span className="text-bright-sun-400">Users</span> Say About Us?
            </motion.div>

            <div className="flex flex-col md:flex-row justify-center md:justify-evenly items-center gap-8 px-4 md:px-0">
                {testimonials.map((data, index) => (
                    <motion.div
                        key={index}
                        className="flex flex-col gap-3 w-full md:w-[30%] lg:w-[23%] border border-bright-sun-400 p-3 rounded-xl mt-4 md:mt-10"
                        variants={itemVariants}
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                        whileInView="visible"
                        viewport={{ once: false, amount: 0.3 }}
                    >
                        <motion.div className="flex gap-2 items-center" variants={avatarVariants}>
                            <Avatar className="!h-12 !w-12 md:!h-14 md:!w-14" src="avatar.png" alt="avatar" />
                            <div>
                                <div className="text-lg text-mine-shaft-100 font-semibold">{data.name}</div>
                                <Rating value={data.rating} fractions={2} readOnly />
                            </div>
                        </motion.div>
                        <motion.div className="text-xs text-mine-shaft-300" variants={textVariants}>
                            {data.tetimonial}
                        </motion.div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
};

export default Testimonials;
