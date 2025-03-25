import { Button, Container, Text, Title } from "@mantine/core";
import { IconLock, IconArrowLeft } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Unauthorized = () => {
    const navigate = useNavigate();

    return (
        <Container className="flex flex-col items-center justify-center min-h-screen text-center py-8 px-4 sm:px-6 lg:px-8">
            {/* Animated Icon */}
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="text-red-500"
            >
                <IconLock className="w-16 h-16 sm:w-24 sm:h-24" stroke={1.5} />
            </motion.div>

            {/* Title & Description */}
            <Title order={1} className="mt-4 text-red-600 text-3xl sm:text-4xl font-bold">
                403 - Access Denied
            </Title>
            <Text size="md" className="mt-2 text-gray-600 max-w-md">
                Oops! You don’t have permission to view this page. If you believe this
                is a mistake, please contact the administrator.
            </Text>

            {/* Action Buttons */}
            <div className="mt-6 flex flex-col sm:flex-row gap-4">
                <Button
                    size="md"
                    variant="gradient"
                    gradient={{ from: "red", to: "orange" }}
                    onClick={() => navigate("/")}
                    leftSection={<IconArrowLeft size={16} />}
                    className="text-sm sm:text-base px-4 sm:px-6 py-2 sm:py-3"
                >
                    Go to Home
                </Button>

                <Button
                    size="md"
                    variant="outline"
                    color="red"
                    onClick={() => navigate("/login")}
                    className="text-sm sm:text-base px-4 sm:px-6 py-2 sm:py-3"
                >
                    Login Again
                </Button>
            </div>

            {/* Animated Decoration */}
            <motion.div
                className="mt-8 opacity-20"
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
            >
                <IconLock className="w-14 h-14 sm:w-20 sm:h-20 text-red-300" stroke={1.2} />
            </motion.div>
        </Container>
    );
};

export default Unauthorized;