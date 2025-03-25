import { ActionIcon, Textarea } from "@mantine/core";
import { IconCheck, IconDeviceFloppy, IconPencil, IconX } from "@tabler/icons-react";
import { profile } from "console";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { successNotification } from "../../Services/NotificationService";
import { changeProfile } from "../../Slices/ProfileSlice";

const About = () => {
    const dispatch = useDispatch();
    const [edit, setEdit] = useState(false);
    const profile = useSelector((state: any) => state.profile);
    const [about, setAbout] = useState<string>(""); // Initialize as an empty string


    const handleClick = () => {
        if (!edit) {
            setEdit(true);
            setAbout(profile.about);
        }
        else setEdit(false);
    }
    const handleSave = () => {
        setEdit(false);
        let updatedProfile = { ...profile, about: about };
        dispatch(changeProfile(updatedProfile));
        successNotification("Success", "About Updated Sucessfully");
    }
    return <div className="px-2 sm:px-3 md:px-4">
        <div className="text-xl sm:text-2xl font-semibold mb-3 flex justify-between items-center">
            About
            <div>
                {edit && <ActionIcon onClick={handleSave} color="green.8" size="lg" variant="subtle" >
                    <IconCheck className="h-4/5 w-4/5" stroke={1.5} /> </ActionIcon>}
                <ActionIcon onClick={handleClick} color={edit ? "red.8" : "brightSun.4"} size="lg" variant="subtle" >
                    {edit ? <IconX className="h-4/5 w-4/5" /> : <IconPencil className="h-4/5 w-4/5" />}
                </ActionIcon></div></div>
        {
            edit ? <Textarea autosize minRows={3} placeholder="Enter About Youreself"
                value={about} onChange={(e) => setAbout(e.target.value)}
                className="w-full"
            /> : <div className="text-sm text-mine-shaft-300 text-justify">
                {profile?.about}
            </div>
        }
    </div>
}
export default About;