import { ActionIcon, Button, Checkbox, Textarea } from "@mantine/core";
import { fieldss } from "../LandingPage/DATA";
import SelectInput from "./SelectInput";
import { useEffect, useState } from "react";
import { MonthPickerInput } from "@mantine/dates";
import { useDispatch, useSelector } from "react-redux";
import { isNotEmpty, useForm } from "@mantine/form";
import { successNotification } from "../../Services/NotificationService";
import { changeProfile } from "../../Slices/ProfileSlice";
import { IconCheck, IconX } from "@tabler/icons-react";

const ExpInput = (props: any) => {
    const [saved, setSaved] = useState(false);
    const dispatch = useDispatch();
    const profile = useSelector((state: any) => state.profile);
    const select = fieldss;

    const form = useForm({
        mode: "controlled",
        validateInputOnChange: true,
        initialValues: {
            title: "",
            company: "",
            location: "",
            description: "",
            startDate: new Date(),
            endDate: new Date(),
            working: false,
        },
        validate: {
            title: isNotEmpty("Title is required"),
            company: isNotEmpty("Company is required"),
            location: isNotEmpty("Location is required"),
            description: isNotEmpty("Description is required"),
        },
    });

    useEffect(() => {
        if (!props.add) {
            form.setValues({
                title: props.title || "",
                company: props.company || "",
                location: props.location || "",
                description: props.description || "",
                startDate: props.startDate ? new Date(props.startDate) : new Date(),
                endDate: props.endDate ? new Date(props.endDate) : new Date(),
                working: props.working || false,
            });
        }
    }, [props]);

    const handleSave = () => {
        form.validate();
        if (!form.isValid()) return;

        let exp = [...profile.experiences];

        let newExp = { ...form.getValues() };

        // Create a transformed version for saving
        let savedExp = {
            ...newExp,
            startDate: newExp.startDate instanceof Date ? newExp.startDate.toISOString() : null,
            endDate: newExp.working ? null : newExp.endDate instanceof Date ? newExp.endDate.toISOString() : null
        };

        // Use `savedExp` when updating the profile



        if (props.add) {
            exp.push(newExp);
        } else {
            exp[props.index] = newExp;
        }

        let updatedProfile = { ...profile, experiences: exp };
        dispatch(changeProfile(updatedProfile));
        props.setEdit(false);
        successNotification("Success", `Experience ${props.add ? "Added" : "Updated"} Successfully`);

    };

    return (
        <div className="flex flex-col gap-3">

            <div className="text-lg font-semibold">{props.add ? "Add" : "Edit"} Experience</div>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-10 [&>*]:w-full sm:[&>*]:w-1/2">
                <SelectInput form={form} name="title" {...select[0]} />
                <SelectInput form={form} name="company" {...select[1]} />
            </div>
            <SelectInput form={form} name="location" {...select[2]} />
            <Textarea
                {...form.getInputProps("description")}
                withAsterisk
                label="Summary"
                autosize
                minRows={3}
                placeholder="Enter Summary..."
            />
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-10 [&>*]:w-full sm:[&>*]:w-1/2">
                <MonthPickerInput
                    {...form.getInputProps("startDate")}
                    withAsterisk
                    maxDate={form.getValues().endDate || undefined}
                    label="Start Date"
                    placeholder="Pick date"
                />
                <MonthPickerInput
                    {...form.getInputProps("endDate")}
                    disabled={form.getValues().working}
                    withAsterisk
                    minDate={form.getValues().startDate || undefined}
                    maxDate={new Date()}
                    label="End Date"
                    placeholder="Pick date"
                />
            </div>
            <Checkbox
                checked={form.getValues().working}
                onChange={(event) => {
                    form.setFieldValue("working", event.currentTarget.checked);
                    if (event.currentTarget.checked) {
                        form.setFieldValue("endDate", null as unknown as Date); // Type assertion workaround
                    }


                }}
                autoContrast
                label="Currently Working here..."
            />
            <div className="flex gap-5">
                <Button onClick={handleSave} color="green.8" variant="light">
                    Save
                </Button>
                <Button onClick={() => props.setEdit(false)} color="red.8" variant="light">
                    Discard
                </Button>

            </div>
        </div>
    );
};

export default ExpInput;