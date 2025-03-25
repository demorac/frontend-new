import { Button, TextInput } from "@mantine/core";
import { fieldss } from "../LandingPage/DATA";
import SelectInput from "./SelectInput";
import { MonthPickerInput } from "@mantine/dates";
import { useState } from "react";
import { isNotEmpty, useForm } from "@mantine/form";
import { useDispatch, useSelector } from "react-redux";
import { changeProfile } from "../../Slices/ProfileSlice";
import { successNotification } from "../../Services/NotificationService";

const CertiInput = (props: any) => {
    const dispatch = useDispatch();
    const profile = useSelector((state: any) => state.profile);
    const form = useForm({
        mode: "controlled",
        validateInputOnChange: true,
        initialValues: {
            name: "",
            issuer: "",
            certificateId: "",
            issueDate: new Date(),
        },
        validate: {
            name: isNotEmpty("Title is required"),
            issuer: isNotEmpty("Company Name is required"),
            certificateId: isNotEmpty("Certificate ID is required"),
            issueDate: isNotEmpty("Issue Date is required")
        },
    });
    const handleSave = () => {
        form.validate();
        if (!form.isValid()) return;
        let certi = [...profile.certifications];
        certi.push(form.getValues());
        certi[certi.length - 1].issueDate = certi[certi.length - 1].issueDate.toISOString();
        let updatedProfile = { ...profile, certifications: certi };
        dispatch(changeProfile(updatedProfile));
        props.setEdit(false);
        successNotification("Success", "Certificate Added Successfully");

    }

    const [issueDate, setIssueDate] = useState<Date | null>(new Date());
    const select = fieldss;
    return <div className="flex flex-col gap-3">
        <div className="text-lg font-semibold">Add Certificate</div>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-10 [&>*]:w-full sm:[&>*]:w-1/2">
            <TextInput {...form.getInputProps("name")} withAsterisk label="Title" placeholder="Enter Title" />
            <SelectInput form={form} name="issuer" {...select[1]} />
        </div>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-10 [&>*]:w-full sm:[&>*]:w-1/2">
            <MonthPickerInput {...form.getInputProps("issueDate")} withAsterisk maxDate={new Date()} label="Issued Date" placeholder="Pick date" />
            <TextInput {...form.getInputProps("certificateId")} withAsterisk label="Certificate Id" placeholder="Enter Id" />
        </div>
        <div className="flex gap-2 mt-2">
            <Button onClick={handleSave} color="green.8" variant="outline" size="xs">Save</Button>
            <Button onClick={() => props.setEdit(false)} color="red.8" variant="light" size="xs">Discard</Button>
        </div>

    </div>
}
export default CertiInput;