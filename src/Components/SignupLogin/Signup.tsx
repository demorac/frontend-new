import { useState } from "react";
import {
    Anchor,
    Button,
    Checkbox,
    Group,
    LoadingOverlay,
    PasswordInput,
    Radio,
    rem,
    TextInput
} from "@mantine/core";
import { IconAt, IconLock } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { registerUser, sendOtp, verifyOtp } from "../../Services/UserService";
import { signupValidation } from "../../Services/FormValidation";
import { errorNotification, successNotification } from "../../Services/NotificationService";

const form = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    accountType: "APPLICANT",
    otp: ""
};

const Signup = () => {
    const [data, setData] = useState<{ [key: string]: string }>(form);
    const [formError, setFormError] = useState<{ [key: string]: string }>(form);
    const [loading, setLoading] = useState(false);
    const [otpLoading, setOtpLoading] = useState(false);
    const [otpSent, setOtpSent] = useState(false);
    const [otpVerified, setOtpVerified] = useState(false);
    const navigate = useNavigate();

    const handleChange = (event: any) => {
        if (typeof event === "string") {
            setData({ ...data, accountType: event });
            return;
        }
        let name = event.target.name, value = event.target.value;
        setData({ ...data, [name]: value });
        setFormError({ ...formError, [name]: signupValidation(name, value) });
    };

    // Send OTP function
    const handleSendOtp = async () => {
        if (!data.email) {
            errorNotification("Validation Error", "Email is required");
            return;
        }
        setOtpLoading(true);
        try {
            await sendOtp(data.email);
            successNotification("OTP Sent", "Check your email for the OTP");
            setOtpSent(true);
        } catch (error: any) {
            errorNotification("OTP Sending Failed", error?.errorMessage || "Failed to send OTP.");
        } finally {
            setOtpLoading(false);
        }
    };

    // Verify OTP function
    const handleVerifyOtp = async () => {
        if (!data.otp) {
            errorNotification("Validation Error", "Please enter the OTP");
            return;
        }
        setOtpLoading(true);
        try {
            await verifyOtp(data.email, data.otp);
            successNotification("OTP Verified", "You can proceed with registration.");
            setOtpVerified(true); // Disable Verify button after success
        } catch (error: any) {
            errorNotification("OTP Verification Failed", error?.errorMessage || "Invalid OTP.");
        } finally {
            setOtpLoading(false);
        }
    };

    const handleSubmit = () => {
        let valid = true, newFormError: { [key: string]: string } = {};
        for (let key in data) {
            if (key === "accountType" || key === "otp") continue;
            if (key !== "confirmPassword") newFormError[key] = signupValidation(key, data[key]);
            else if (data[key] !== data["password"]) newFormError[key] = "Passwords do not match.";
            if (newFormError[key]) valid = false;
        }
        setFormError(newFormError);

        if (valid) {
            setLoading(true);
            registerUser(data).then(() => {
                successNotification("Registration Successful", "Redirecting to Login...");
                setTimeout(() => {
                    setLoading(false);
                    navigate("/login");
                }, 4000);
            }).catch((err) => {
                setLoading(false);
                errorNotification("Registration Failed", err?.errorMessage || "An unexpected error occurred.");
            });
        }
    };

    return (
        <>
            <LoadingOverlay visible={loading} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} loaderProps={{ color: "brightSun.4", type: "bars" }} />
            <div className="w-full max-w-[500px] px-4 sm:px-8 md:px-12 flex flex-col justify-center gap-4 mx-auto">
                <div className="text-lg sm:text-xl md:text-2xl font-semibold text-center">Create Account</div>

                <TextInput error={formError.name} value={data.name} onChange={handleChange} name="name" withAsterisk label="Full Name" placeholder="Your Name" />

                {/* Email Input with Send OTP Button */}
                <TextInput
                    error={formError.email}
                    value={data.email}
                    onChange={handleChange}
                    name="email"
                    withAsterisk
                    label="Email"
                    placeholder="abc@gmail.com"
                    leftSection={<IconAt style={{ width: rem(16), height: rem(16) }} />}
                    rightSectionWidth={100}
                    rightSection={
                        <Button size="xs" loading={otpLoading} disabled={!data.email || otpSent} onClick={handleSendOtp} className="text-xs sm:text-sm" style={{ width: "90px" }}>
                            {otpSent ? "Sent" : "Send OTP"}
                        </Button>
                    }
                />

                {/* OTP Input */}
                {otpSent && (
                    <TextInput
                        error={formError.otp}
                        value={data.otp}
                        onChange={handleChange}
                        name="otp"
                        withAsterisk
                        label="Enter OTP"
                        placeholder="123456"
                        rightSectionWidth={100}
                        rightSection={
                            <Button size="xs" loading={otpLoading} onClick={handleVerifyOtp} disabled={otpVerified} className="text-xs sm:text-sm" style={{ width: "90px" }}>
                                {otpVerified ? "Verified" : "Verify"}
                            </Button>
                        }
                    />
                )}

                <PasswordInput error={formError.password} value={data.password} onChange={handleChange} name="password" withAsterisk leftSection={<IconLock style={{ width: rem(18), height: rem(18) }} stroke={1.5} />} label="Password" placeholder="Enter Password" />

                <PasswordInput error={formError.confirmPassword} value={data.confirmPassword} onChange={handleChange} name="confirmPassword" withAsterisk leftSection={<IconLock style={{ width: rem(18), height: rem(18) }} stroke={1.5} />} label="Confirm Password" placeholder="Enter Confirm Password" />

                <Radio.Group value={data.accountType} onChange={handleChange} label="You Are?" withAsterisk>
                    <Group mt="xs">
                        <Radio className="py-4 px-6 text-xs sm:text-sm border hover:bg-gray-900 has-[:checked]:bg-yellow-400/5 has-[:checked]:border-yellow-400 border-gray-800 rounded-lg" value="APPLICANT" label="Applicant" />
                        <Radio className="py-4 px-6 text-xs sm:text-sm border hover:bg-gray-900 has-[:checked]:bg-yellow-400/5 has-[:checked]:border-yellow-400 border-gray-800 rounded-lg" value="EMPLOYER" label="Employer" />
                    </Group>
                </Radio.Group>

                <Checkbox autoContrast label={<>I Accept <Anchor>terms & conditions</Anchor></>} className="text-xs sm:text-sm" />

                <Button loading={loading} onClick={handleSubmit} autoContrast variant="filled" className="text-sm sm:text-base">Sign up</Button>

                <div className="mx-auto text-center text-xs sm:text-sm">
                    Have an account?{" "}
                    <span className="text-yellow-400 hover:underline cursor-pointer" onClick={() => { navigate("/login"); setFormError(form); setData(form); }}>
                        Login
                    </span>
                </div>
            </div>
        </>
    );
};

export default Signup;
