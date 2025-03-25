import { ActionIcon, NumberInput, Select } from "@mantine/core"; // ✅ Import Select
import { IconDeviceFloppy, IconPencil, IconBriefcase, IconMapPin, IconCheck, IconX } from "@tabler/icons-react";
import SelectInput from "./SelectInput";
import { fieldss } from "../LandingPage/DATA";
import { useState } from "react";
import { useForm } from "@mantine/form";
import { useDispatch, useSelector } from "react-redux";
import { changeProfile } from "../../Slices/ProfileSlice";
import { successNotification } from "../../Services/NotificationService";

const Info = () => {
    const dispatch = useDispatch();
    const profile = useSelector((state: any) => state.profile);
    const select = fieldss;
    const [edit, setEdit] = useState(false);

    const form = useForm({
        mode: "controlled",
        initialValues: {
            name: "No Name",
            jobTitle: "",
            company: "",
            location: "",
            totalExp: 0,
            gender: "", // ✅ Add gender field
        },
    });

    const handleClick = () => {
        if (!edit) {
            setEdit(true);
            form.setValues({
                name: profile.name || "No Name",
                jobTitle: profile.jobTitle,
                company: profile.company,
                location: profile.location,
                totalExp: profile.totalExp || 0,
                gender: profile.gender || "", // ✅ Ensure gender is set
            });
        } else {
            setEdit(false);
        }
    };

    const handleSave = () => {
        setEdit(false);
        let updatedProfile = { ...profile, ...form.getValues() };
        dispatch(changeProfile(updatedProfile));
        successNotification("Success", "Profile Updated Successfully");
    };

    return (
        <>
            <div className="text-2xl sm:text-3xl font-semibold flex justify-between items-center">
                {edit ? (
                    <input
                        type="text"
                        {...form.getInputProps("name")}
                        className="border p-1 rounded-md w-full sm:w-1/2"
                    />
                ) : (
                    <span>{profile.name || "No Name"}</span>
                )}
                <div className="flex items-center">
                    {edit && (
                        <ActionIcon onClick={handleSave} color="green.8" size="lg" variant="subtle">
                            <IconCheck className="h-4/5 w-4/5" stroke={1.5} />
                        </ActionIcon>
                    )}
                    <ActionIcon
                        onClick={handleClick}
                        color={edit ? "red.8" : "brightSun.4"}
                        size="lg"
                        variant="subtle"
                    >
                        {edit ? <IconX className="h-4/5 w-4/5" /> : <IconPencil className="h-4/5 w-4/5" />}
                    </ActionIcon>
                </div>
            </div>

            {edit ? (
                <>
                    <div className="flex flex-col sm:flex-row gap-4 mt-2 sm:gap-10 [&>*]:w-full sm:[&>*]:w-1/2">
                        <SelectInput form={form} name="jobTitle" {...select[0]} />
                        <SelectInput form={form} name="company" {...select[1]} />
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4 mt-2 sm:gap-10 [&>*]:w-full sm:[&>*]:w-1/2">
                        <SelectInput form={form} name="location" {...select[2]} />
                        {/* ✅ Number Input for Total Experience */}
                        <NumberInput
                            label="Total Experience (years)"
                            {...form.getInputProps("totalExp")}
                            min={0}
                            max={50}
                        />
                    </div>
                    <div className="mt-4">
                        {/* ✅ Gender Selection Dropdown */}
                        <Select
                            label="Gender"
                            {...form.getInputProps("gender")}
                            data={[
                                { value: "male", label: "Male" },
                                { value: "female", label: "Female" },
                                { value: "other", label: "Other" },
                            ]}
                        />
                    </div>
                </>
            ) : (
                <>
                    <div className="text-lg sm:text-xl flex gap-1 items-center mt-2">
                        <IconBriefcase className="h-5 w-5 stroke={1.5}" /> {profile.jobTitle} • {profile.company}
                    </div>
                    <div className="flex gap-1 text-base sm:text-lg text-mine-shaft-300 items-center mt-1">
                        <IconMapPin className="h-5 w-5 stroke={1.5}" /> {profile.location} • Experience: {profile.totalExp || 0} years
                    </div>
                    <div className="text-base sm:text-lg mt-1">
                        <strong>Gender:</strong> {profile.gender || "Not specified"}
                    </div>
                </>
            )}
        </>
    );
};

export default Info;