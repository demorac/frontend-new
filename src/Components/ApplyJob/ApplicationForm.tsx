import { TextInput, NumberInput, FileInput, Textarea, Button, LoadingOverlay } from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { IconPaperclip } from "@tabler/icons-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getBase64 } from "../../Services/Utilities";
import { applyJob } from "../../Services/JobService";
import { errorNotification, successNotification } from "../../Services/NotificationService";
import { useSelector } from "react-redux";

const ApplicationForm = () => {
    const user = useSelector((state: any) => state.user);
    const [preview, setPreview] = useState(false);
    const [submit, setSubmit] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();

    const handlePreview = () => {
        form.validate();
        if (!form.isValid()) return;
        setPreview(!preview);
        window.scrollTo({ top: 0, behavior: 'smooth' });

    }
    const handleSubmit = async () => {
        try {
            setSubmit(true);

            // Get the resume file
            const resumeFile = form.getValues().resume;

            // ✅ Ensure a file is uploaded
            if (!resumeFile) {
                throw new Error("Resume file is required.");
            }

            // ✅ Convert file to Base64
            let resume = await getBase64(resumeFile);

            // ✅ Prepare application data
            let applicant = {
                ...form.getValues(), applicantId: user.id,
                resume: resume.split(',')[1] // Remove metadata from Base64
            };

            // ✅ Ensure job ID is available
            if (!id) throw new Error("Job ID is missing.");

            // ✅ Apply for the job
            await applyJob(id, applicant);

            // ✅ Show success notification
            successNotification("Success", "Application submitted successfully!");
            navigate("/job-history");

        } catch (error: any) {
            console.error(error);

            // ✅ Show error notification
            errorNotification("Error", error.response.data.errorMessage || "Something went wrong!");
        } finally {
            setSubmit(false);
        }
    };


    const form = useForm({
        mode: "controlled",
        validateInputOnChange: true,
        initialValues: {
            name: "",
            email: "",
            phone: "",
            website: "",
            resume: null,
            coverLetter: "",
        },
        validate: {
            name: isNotEmpty("Title is required"),
            email: isNotEmpty("Email Name is required"),
            resume: isNotEmpty("Resume/CV is required"),
            phone: isNotEmpty("Contact Number is required"),
        },
    });
    return (
        <div>
            <LoadingOverlay className="!fixed" visible={submit} zIndex={1000} overlayProps={{ radius: 'sm', blur: 2 }} loaderProps={{ color: 'brightSun.4', type: 'bars' }} />
            <div className="text-xl font-semibold mb-5 ">Submit Your Application</div>
            <div className="flex flex-col gap-5">
                <div className="flex flex-col sm:flex-row gap-5 sm:[&>*]:w-1/2"> {/* Stack on small screens, row on larger */}
                    <TextInput {...form.getInputProps("name")} label="Full Name" readOnly={preview} variant={preview ? "unstyled" : "default"} className={`${preview ? "text-mine-shaft-300 font-semibold" : ""}`} withAsterisk placeholder="Enter Your Name" />
                    <TextInput {...form.getInputProps("email")} label="Email" readOnly={preview} variant={preview ? "unstyled" : "default"} className={`${preview ? "text-mine-shaft-300 font-semibold" : ""}`} withAsterisk placeholder="Enter Your Email" />
                </div>
                <div className="flex flex-col sm:flex-row gap-5 sm:[&>*]:w-1/2"> {/* Stack on small screens, row on larger */}
                    <NumberInput {...form.getInputProps("phone")} label="Contact Number" readOnly={preview} variant={preview ? "unstyled" : "default"} className={`${preview ? "text-mine-shaft-300 font-semibold" : ""}`} withAsterisk placeholder="Enter Contact Number" hideControls min={0} max={99999999999} clampBehavior="strict" />
                    <TextInput {...form.getInputProps("website")} label="Portfolio Website" readOnly={preview} variant={preview ? "unstyled" : "default"} className={`${preview ? "text-mine-shaft-300 font-semibold" : ""}`} placeholder="Enter url" />
                </div>
                <FileInput {...form.getInputProps("resume")} accept="application/pdf" readOnly={preview} variant={preview ? "unstyled" : "default"} className={`${preview ? "text-mine-shaft-300 font-semibold" : ""}`} withAsterisk leftSection={<IconPaperclip stroke={1.5} />} label="Attach Your CV" placeholder="Your CV" leftSectionPointerEvents="none" />
                <Textarea {...form.getInputProps("coverLetter")} readOnly={preview} variant={preview ? "unstyled" : "default"} className={`${preview ? "text-mine-shaft-300 font-semibold" : ""}`} placeholder="Type Something about Yourself..." label="Cover Letter" autosize minRows={4} />

                {!preview && <Button onClick={handlePreview} color='brightSun.4' variant="light">Preview</Button>}

                {
                    preview && <div className="flex flex-col sm:flex-row gap-5 sm:[&>*]:w-1/2"> {/* Stack on small screens, row on larger */}
                        <Button fullWidth onClick={handlePreview} color='brightSun.4' variant="outline">Edit</Button>
                        <Button fullWidth onClick={handleSubmit} color='brightSun.4' variant="light">Submit</Button></div>
                }
            </div>

        </div>
    )
}
export default ApplicationForm;