import { Modal, TextInput, Button, rem, PinInput, PasswordInput } from "@mantine/core";
import { IconAt, IconLock } from "@tabler/icons-react";
import { useState } from "react";
import { changePass, sendOtp, verifyOtp } from "../../Services/UserService";
import { signupValidation } from "../../Services/FormValidation";
import { errorNotification, successNotification } from "../../Services/NotificationService";
import { useInterval } from "@mantine/hooks";

interface ResetPasswordProps {
    opened: boolean;
    close: () => void;
}

const ResetPassword: React.FC<ResetPasswordProps> = ({ opened, close }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passErr, setPassErr] = useState("");
    const [otpSent, setOtpSent] = useState(false);
    const [otpSending, setOtpSending] = useState(false);
    const [verified, setVerified] = useState(false);
    const [resendLoader, setResendLoader] = useState(false);
    const [seconds, setSeconds] = useState(60);
    
    const interval = useInterval(() => {
        if (seconds === 0) {
            setResendLoader(false);
            setSeconds(60);
            interval.stop();
        } else {
            setSeconds((s) => s - 1);
        }
    }, 1000);

    const handleSendOtp = () => {
        setOtpSending(true);
        sendOtp(email)
            .then((res) => {
                successNotification("OTP Sent Successfully", "Enter OTP To Reset Password");
                setOtpSent(true);
                setOtpSending(false);
                setResendLoader(true);
                interval.start();
            })
            .catch((err) => {
                setOtpSending(false);
                errorNotification("OTP Sending Failed", err?.errorMessage || "An unexpected error occurred.");
            });
    };

    const handleVerifyOtp = (otp: string) => {
        verifyOtp(email, otp)
            .then((res) => {
                successNotification("OTP Verified", "Enter New Password");
                setVerified(true);
            })
            .catch((err) => {
                errorNotification("OTP Verification Failed", err?.errorMessage || "An unexpected error occurred.");
            });
    };

    const handleResetPassword = () => {
        changePass(email, password)
            .then((res) => {
                successNotification("Password Changed", "Login with new Password");
                close();
            })
            .catch((err) => {
                errorNotification("Password Change Failed", err?.errorMessage || "An unexpected error occurred.");
            });
    };

    const resendOtp = () => {
        if (resendLoader) return;
        handleSendOtp();
    };

    const changeEmail = () => {
        setOtpSent(false);
        setResendLoader(false);
        setSeconds(60);
        setVerified(false);
        interval.stop();
    };

    return (
        <Modal
            opened={opened}
            onClose={close}
            title="Reset Password"
            size="auto"
            fullScreen={window.innerWidth < 768} // Fullscreen on mobile
            transitionProps={{ transition: 'slide-up', duration: 300 }}
            overlayProps={{
                backgroundOpacity: 0.55,
                blur: 3,
            }}
            className="[&_.mantine-Modal-inner]:p-0" // Remove inner padding
        >
            <div className="flex flex-col gap-4 p-4 sm:p-6 md:p-8">
                {/* Email Input */}
                <TextInput
                    value={email}
                    name="email"
                    size={window.innerWidth < 476 ? "sm" : "md"}
                    withAsterisk
                    leftSection={<IconAt style={{ width: rem(16), height: rem(16) }} />}
                    label="Email"
                    placeholder="abc@gmail.com"
                    onChange={(e) => setEmail(e.target.value)}
                    rightSectionWidth={window.innerWidth < 476 ? 90 : 110}
                    rightSection={
                        <Button
                            loading={otpSending && !otpSent}
                            size={window.innerWidth < 476 ? "xs" : "sm"}
                            className="mr-1"
                            onClick={handleSendOtp}
                            autoContrast
                            disabled={email === "" || otpSent}
                            variant="filled"
                        >
                            {window.innerWidth < 476 ? "Send" : "Submit"}
                        </Button>
                    }
                />

                {/* OTP Input */}
                {otpSent && (
                    <div className="flex flex-col gap-4">
                        <PinInput
                            onComplete={handleVerifyOtp}
                            length={6}
                            className="mx-auto"
                            size={window.innerWidth < 476 ? "sm" : "md"}
                            gap={window.innerWidth < 476 ? "sm" : "lg"}
                            type="number"
                        />
                        
                        {!verified && (
                            <div className="flex flex-col sm:flex-row gap-2">
                                <Button
                                    fullWidth
                                    color="brightSun.4"
                                    loading={otpSending}
                                    onClick={resendOtp}
                                    autoContrast
                                    variant="light"
                                    size={window.innerWidth < 476 ? "sm" : "md"}
                                >
                                    {resendLoader ? `${seconds}s` : "Resend OTP"}
                                </Button>
                                <Button
                                    fullWidth
                                    onClick={changeEmail}
                                    autoContrast
                                    variant="filled"
                                    size={window.innerWidth < 476 ? "sm" : "md"}
                                >
                                    Change Email
                                </Button>
                            </div>
                        )}
                    </div>
                )}

                {/* Password Input */}
                {verified && (
                    <>
                        <PasswordInput
                            error={passErr}
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                                setPassErr(signupValidation("password", e.target.value));
                            }}
                            name="password"
                            withAsterisk
                            size={window.innerWidth < 476 ? "sm" : "md"}
                            leftSection={<IconLock style={{ width: rem(18), height: rem(18) }} stroke={1.5} />}
                            label="New Password"
                            placeholder="Enter Password"
                        />
                        <Button
                            onClick={handleResetPassword}
                            autoContrast
                            variant="filled"
                            size={window.innerWidth < 476 ? "sm" : "md"}
                            fullWidth
                        >
                            Change Password
                        </Button>
                    </>
                )}
            </div>
        </Modal>
    );
};

export default ResetPassword;