import { Carousel } from "@mantine/carousel";
import { jobCategory } from "./DATA";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const JobCategory = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: false, margin: "-100px" });

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { duration: 1.2, staggerChildren: 0.3 },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, scale: 0.5 },
        visible: { 
            opacity: 1, 
            scale: 1, 
            transition: { type: "spring", stiffness: 100, duration: 1.2 } 
        },
        hover: { scale: 1.1, transition: { duration: 0.3 } },
    };

    const imageVariants = {
        hidden: { opacity: 0, rotate: -15 },
        visible: { 
            opacity: 1, 
            rotate: 0, 
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
            className="mt-10 md:mt-20 pb-5"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            variants={containerVariants}
        >
            <motion.div className="text-3xl md:text-4xl text-center mb-3 font-semibold text-mine-shaft-100" variants={textVariants}>
                Browse <span className="text-bright-sun-400">Job</span> Category
            </motion.div>
            <motion.div className="text-lg mx-auto mb-6 md:mb-10 text-mine-shaft-300 text-center w-full md:w-1/2" variants={textVariants}>
                Explore diverse job opportunities tailored to your skills. Start Your Career Journey Today!
            </motion.div>
            
            <Carousel
                slideSize={{ base: "90%", sm: "45%", md: "30%", lg: "22%" }}
                slideGap="md"
                loop
                className="focus:visible:[&_button]:!outline-none [&_button]:bg-bright-sun-400 [&_button]:!border-none [&_button]:hover:!opacity-75 [&_button]:!opacity-0 hover:[&_button]:!opacity-100"
                nextControlIcon={<IconArrowRight className="h-8 w-8" />}
                previousControlIcon={<IconArrowLeft className="h-8 w-8" />}
            >
                {jobCategory.map((category, index) => (
                    <Carousel.Slide key={index}>
                        <motion.div
                            className="flex flex-col items-center w-full gap-2 border border-bright-sun-400 p-3 md:p-5 rounded-xl hover:cursor-pointer hover:shadow-[0_0_5px_2px_black] !shadow-bright-sun-300 my-3 md:my-5 transition duration-300 ease-in-out"
                            variants={itemVariants}
                            whileHover="hover"
                        >
                            <motion.div className="p-2 bg-bright-sun-300 rounded-full" variants={imageVariants}>
                                <img
                                    className="h-6 w-6 md:h-8 md:w-8"
                                    src={`/Category/${category.name}.png`}
                                    alt={category.name}
                                />
                            </motion.div>
                            <motion.div className="text-mine-shaft-100 text-xl font-semibold" variants={textVariants}>
                                {category.name}
                            </motion.div>
                            <motion.div className="text-mine-shaft-300 text-center text-sm" variants={textVariants}>
                                {category.desc}
                            </motion.div>
                            <motion.div className="text-bright-sun-300 text-lg" variants={textVariants}>
                                {category.jobs}
                            </motion.div>
                        </motion.div>
                    </Carousel.Slide>
                ))}
            </Carousel>
        </motion.div>
    );
};

export default JobCategory;
