import { Button, NumberInput, TagsInput, Textarea } from "@mantine/core";
import { fields, content } from "../LandingPage/DATA";
import SelectInput from "./SelectInput";
import TextEditor from "./TextEditor";
import { isNotEmpty, useForm } from "@mantine/form";
import { errorNotification, successNotification } from "../../Services/NotificationService";
import { getJob, postJob } from "../../Services/JobService";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const PostJob = () => {
    const [editorData, setEditorData] = useState(content);
    const { id } = useParams();
    useEffect(() => {
        window.scrollTo(0, 0);
        if (id !== "0") {
            getJob(id).then((res) => {
                form.setValues(res);
                setEditorData(res.description);
            }).catch((err) => {
                console.log(err);
            });
        } else {
            form.reset();
            setEditorData(content);
        }
    }, [id]);

    const navigate = useNavigate();
    const user = useSelector((state: any) => state.user);

    const form = useForm({
        mode: 'controlled',
        validateInputOnChange: true,
        initialValues: {
            jobTitle: '',
            company: '',
            about: '',
            experience: '',
            jobType: '',
            location: '',
            packageOffered: '',
            description: content,
            skillsRequired: [],
            educationRequired: [], // ✅ Added educationRequired field
        },
        validate: {
            jobTitle: isNotEmpty('Title is Required'),
            company: isNotEmpty("Company is Required"),
            experience: isNotEmpty("Experience is Required"),
            jobType: isNotEmpty("JobType is Required"),
            location: isNotEmpty("Location is Required"),
            packageOffered: isNotEmpty("Package is Required"),
            skillsRequired: isNotEmpty("Skills are Required"),
            educationRequired: isNotEmpty("Education is Required"), // ✅ Added validation
            about: isNotEmpty("About is Required"),
            description: isNotEmpty("Description is Required"),
        }
    });

    const handlePost = () => {
        form.validate();
        if (!form.isValid()) return;

        const jobData = {
            ...form.getValues(),
            id,
            postedBy: user.id,
            jobStatus: "ACTIVE"
        };
        console.log("Job Data Sent:", jobData);

        postJob(jobData)
            .then((res) => {
                console.log("Response:", res);
                successNotification("Success", "Job Posted Successfully");
                navigate(`/posted-job/${res.id}`);
            })
            .catch((err) => {
                console.log("Error Response:", err.response?.data);
                errorNotification("Error", err.response?.data?.errorMessage || "Something went wrong");
            });
    };

    const handleDraft = () => {
        postJob({
            ...form.getValues(),
            id,
            postedBy: user.id,
            jobStatus: "DRAFT"
        }).then((res) => {
            successNotification("Success", "Job Drafted Successfully");
            navigate(`/posted-job/${res.id}`);
        }).catch((err) => {
            console.log(err);
            errorNotification("Error", err.response.data.errorMessage);
        });
    };

    const select = fields;

    return (
        <div className="w-full xsm:w-4/5 xs:w-4/5 sm:w-4/5 md:w-4/5 lg:w-4/5 xl:w-4/5 2xl:w-4/5 mx-auto"> {/* Responsive width */}
            <div className="text-2xl xsm:text-xl xs:text-xl sm:text-2xl md:text-2xl lg:text-2xl xl:text-2xl 2xl:text-2xl font-semibold mb-5">Post a Job</div> {/* Responsive font size */}
            <div className="flex flex-col gap-5">
                {/* Responsive flex and width */}
                <div className="flex flex-col xsm:flex-col xs:flex-col sm:flex-row md:flex-row lg:flex-row xl:flex-row 2xl:flex-row gap-5 xsm:gap-3 xs:gap-3 sm:gap-5 md:gap-5 lg:gap-5 xl:gap-5 2xl:gap-5 [&>*]:w-full xsm:[&>*]:w-full xs:[&>*]:w-full sm:[&>*]:w-1/2 md:[&>*]:w-1/2 lg:[&>*]:w-1/2 xl:[&>*]:w-1/2 2xl:[&>*]:w-1/2">
                    <SelectInput form={form} name="jobTitle" {...select[0]} />
                    <SelectInput form={form} name="company" {...select[1]} />
                </div>
                <div className="flex flex-col xsm:flex-col xs:flex-col sm:flex-row md:flex-row lg:flex-row xl:flex-row 2xl:flex-row gap-5 xsm:gap-3 xs:gap-3 sm:gap-5 md:gap-5 lg:gap-5 xl:gap-5 2xl:gap-5 [&>*]:w-full xsm:[&>*]:w-full xs:[&>*]:w-full sm:[&>*]:w-1/2 md:[&>*]:w-1/2 lg:[&>*]:w-1/2 xl:[&>*]:w-1/2 2xl:[&>*]:w-1/2">
                    <SelectInput form={form} name="experience" {...select[2]} />
                    <SelectInput form={form} name="jobType" {...select[3]} />
                </div>
                <div className="flex flex-col xsm:flex-col xs:flex-col sm:flex-row md:flex-row lg:flex-row xl:flex-row 2xl:flex-row gap-5 xsm:gap-3 xs:gap-3 sm:gap-5 md:gap-5 lg:gap-5 xl:gap-5 2xl:gap-5 [&>*]:w-full xsm:[&>*]:w-full xs:[&>*]:w-full sm:[&>*]:w-1/2 md:[&>*]:w-1/2 lg:[&>*]:w-1/2 xl:[&>*]:w-1/2 2xl:[&>*]:w-1/2">
                    <SelectInput form={form} name="location" {...select[4]} />
                    <NumberInput
                        {...form.getInputProps("packageOffered")}
                        label="Salary"
                        withAsterisk
                        min={1}
                        max={300}
                        step={1} // Prevent decimals
                        clampBehavior="strict"
                        placeholder="Enter Salary"
                        hideControls
                    />
                </div>

                {/* TagsInput for Skills and Education */}
                <TagsInput
                    {...form.getInputProps('skillsRequired')}
                    withAsterisk
                    label="Skills"
                    placeholder="Enter Skill"
                    splitChars={[',', ' ', '|']}
                    clearable
                    acceptValueOnBlur
                />
                <TagsInput
                    {...form.getInputProps('educationRequired')}
                    withAsterisk
                    label="Education"
                    placeholder="Enter Education Requirements"
                    splitChars={[',', ' ', '|']}
                    clearable
                    acceptValueOnBlur
                />

                {/* Textarea for About Job */}
                <Textarea
                    {...form.getInputProps('about')}
                    withAsterisk
                    className="my-3"
                    label="About Job"
                    placeholder="Enter About job"
                    autosize
                    minRows={2}
                />

                {/* TextEditor for Job Description */}
                <div className="[&_button[data-active='true']]:!text-bright-sun-400 [&_button[data-active='true']]:!bg-bright-sun-400/20">
                    <div className="text-sm font-medium">Job Description <span className="text-red-500">*</span></div>
                    <TextEditor form={form} data={editorData} />
                </div>

                {/* Buttons for Publish and Draft */}
                <div className="flex flex-col xsm:flex-col xs:flex-col sm:flex-row md:flex-row lg:flex-row xl:flex-row 2xl:flex-row gap-4"> {/* Responsive flex */}
                    <Button onClick={handlePost} color='brightSun.4' variant="light">Publish job</Button>
                    <Button onClick={handleDraft} color='brightSun.4' variant="outline">Save as Draft</Button>
                </div>
            </div>
        </div>
    );
};

export default PostJob;