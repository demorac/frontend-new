import Marquee from "react-fast-marquee";
import { comp } from "./DATA";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const Companies = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: false, margin: "-100px" });

    const containerVariants = {
        hidden: { opacity: 0, x: -50 },
        visible: { opacity: 1, x: 0, transition: { duration: 1.2 } },
    };

    const titleVariants = {
        hidden: { opacity: 0, y: -20 },
        visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } },
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
            <motion.div
                className="text-3xl md:text-4xl text-center mb-6 md:mb-10 font-semibold text-mine-shaft-100"
                variants={titleVariants}
            >
                Trusted By <span className="text-bright-sun-400">1000+</span> Companies
            </motion.div>
            <Marquee pauseOnHover={true} speed={40}>
                {comp.map((company, index) => (
                    <motion.div
                        key={index}
                        className="mx-2 md:mx-8 px-1 md:px-2 py-0.5 md:py-1 hover:bg-mine-shaft-900 rounded-xl cursor-pointer"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, ease: "easeOut", delay: index * 0.1 }}
                    >
                        <img className="h-8 md:h-14" src={`/Companies/${company}.png`} alt={company} />
                    </motion.div>
                ))}
            </Marquee>
        </motion.div>
    );
};

export default Companies;
