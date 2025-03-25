import { ActionIcon, TagsInput } from "@mantine/core";
import { IconCheck, IconX, IconPencil } from "@tabler/icons-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { successNotification } from "../../Services/NotificationService";
import { changeProfile } from "../../Slices/ProfileSlice";

const Education = () => {
    const dispatch = useDispatch();
    const [edit, setEdit] = useState(false);
    const profile = useSelector((state: any) => state.profile);
    const [education, setEducation] = useState<string[]>([]);

    const handleClick = () => {
        if (!edit) {
            setEdit(true);
            setEducation(profile.education || []);
        } else {
            setEdit(false);
        }
    };

    const handleSave = () => {
        setEdit(false);
        let updatedProfile = { ...profile, education };
        dispatch(changeProfile(updatedProfile));
        successNotification("Success", "Education Updated Successfully");
    };

    return (
        <div className="px-2 sm:px-3 md:px-4">
            <div className="text-xl sm:text-2xl font-semibold mb-3 flex justify-between items-center">
                Education
                <div>
                    {edit && (
                        <ActionIcon onClick={handleSave} color="green.8" size="lg" variant="subtle">
                            <IconCheck className="h-4/5 w-4/5" stroke={1.5} />
                        </ActionIcon>
                    )}
                    <ActionIcon onClick={handleClick} color={edit ? "red.8" : "brightSun.4"} size="lg" variant="subtle">
                        {edit ? <IconX className="h-4/5 w-4/5" /> : <IconPencil className="h-4/5 w-4/5" />}
                    </ActionIcon>
                </div>
            </div>

            {edit ? (
                <TagsInput
                    value={education}
                    onChange={setEducation}
                    placeholder="Add Education (e.g. B.Tech, MBA)"
                    splitChars={[',', ' ', '|']}
                    className="w-full"
                />
            ) : (
                <div className="flex flex-wrap gap-2">
                    {Array.isArray(profile.education) && profile.education.length > 0 ? (
                        profile.education.map((edu: string, index: number) => (
                            <div key={index} className="bg-bright-sun-300 text-sm font-medium bg-opacity-15 rounded-3xl text-bright-sun-400 px-3 py-1">
                                {edu}
                            </div>
                        ))
                    ) : (
                        <div className="text-red-500">No education details available</div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Education;