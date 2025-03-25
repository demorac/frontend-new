import { TextInput, rem, PasswordInput, Button, LoadingOverlay } from "@mantine/core";
import { IconAt, IconLock } from "@tabler/icons-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginValidation } from "../../Services/FormValidation";
import { useDisclosure } from "@mantine/hooks";
import ResetPassword from "./ResetPassword";
import { useDispatch } from "react-redux";
import { errorNotification, successNotification } from "../../Services/NotificationService";
import { setUser } from "../../Slices/UserSlice";
import { setJwt } from "../../Slices/JwtSlice";
import { jwtDecoder, loginUser } from "../../Services/AuthService";

const initialFormState = {
    email: "",
    password: "",
};

const Login = () => {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const [data, setData] = useState<{ [key: string]: string }>(initialFormState);
    const [opened, { open, close }] = useDisclosure(false);
    const [formError, setFormError] = useState<{ [key: string]: string }>({});
    const navigate = useNavigate();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormError({ ...formError, [event.target.name]: "" });
        setData({ ...data, [event.target.name]: event.target.value });
    };

    const handleSubmit = async () => {
        let valid = true;
        let newFormError: { [key: string]: string } = {};

        for (let key in data) {
            newFormError[key] = loginValidation(key, data[key]);
            if (newFormError[key]) valid = false;
        }

        setFormError(newFormError);

        if (valid) {
            setLoading(true);
            try {
                const res = await loginUser(data);
                if (!res || !res.jwt || typeof res.jwt !== "string") {
                    errorNotification("Login Failed", "Received an invalid JWT token.");
                    setLoading(false);
                    return;
                }

                successNotification("Login Successful", "Redirecting to Home Page...");
                dispatch(setJwt(res.jwt));
                localStorage.setItem("jwt", res.jwt);

                const decoded = jwtDecoder(res.jwt);
                if (decoded && typeof decoded === "object" && "sub" in decoded) {
                    dispatch(setUser({ ...decoded, email: decoded.sub }));
                }

                setTimeout(() => {
                    setLoading(false);
                    navigate("/");
                }, 2000);
            } catch (err: any) {
                setLoading(false);
                errorNotification("Login Failed", err.message || "An unexpected error occurred.");
            }
        }
    };

    return (
        <>
            <LoadingOverlay
                visible={loading}
                zIndex={1000}
                overlayProps={{ radius: "sm", blur: 2 }}
                loaderProps={{ color: "brightSun.4", type: "bars" }}
            />
            <div className="w-full max-w-[400px] xl:max-w-[500px] px-6 sm:px-12 md:px-20 flex flex-col justify-center gap-3 xl:gap-4 mx-auto pt-4 sm:pt-0">
                <div className="text-2xl xl:text-3xl font-semibold text-center">Login Account</div>
                <TextInput
                    error={formError.email}
                    value={data.email}
                    onChange={handleChange}
                    name="email"
                    withAsterisk
                    size="md"
                    className="xl:[&_input]:h-12 xl:[&_input]:text-lg"
                    leftSection={<IconAt style={{ width: rem(16), height: rem(16) }} className="xl:w-5 xl:h-5" />}
                    label="Email"
                    placeholder="abc@gmail.com"
                />
                <PasswordInput
                    error={formError.password}
                    value={data.password}
                    onChange={handleChange}
                    name="password"
                    withAsterisk
                    size="md"
                    className="xl:[&_input]:h-12 xl:[&_input]:text-lg"
                    leftSection={<IconLock style={{ width: rem(18), height: rem(18) }} className="xl:w-5 xl:h-5" stroke={1.5} />}
                    label="Password"
                    placeholder="Enter Password"
                />
                <Button 
                    loading={loading} 
                    onClick={handleSubmit} 
                    autoContrast 
                    variant="filled"
                    size="md"
                    className="xl:h-12 xl:text-lg"
                >
                    Login
                </Button>
                <div className="mx-auto text-base xl:text-lg">
                    Don't have an account?{" "}
                    <span
                        className="text-bright-sun-400 hover:underline cursor-pointer"
                        onClick={() => {
                            setFormError({});
                            setData(initialFormState);
                            navigate("/signup");
                        }}
                    >
                        SignUp
                    </span>
                </div>
                <div onClick={open} className="text-bright-sun-400 hover:underline cursor-pointer text-center text-base xl:text-lg">
                    Forgot Password?
                </div>
            </div>
            <ResetPassword opened={opened} close={close} />
        </>
    );
};

export default Login;