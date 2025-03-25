import { ActionIcon, TagsInput } from "@mantine/core";
import { IconCheck, IconX, IconPencil } from "@tabler/icons-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { successNotification } from "../../Services/NotificationService";
import { changeProfile } from "../../Slices/ProfileSlice";

const Skills = () => {
    const dispatch = useDispatch();
    const [edit, setEdit] = useState(false);
    const profile = useSelector((state: any) => state.profile);
    const [skills, setSkills] = useState<string[]>([]);

    const handleClick = () => {
        if (!edit) {
            setEdit(true);
            setSkills(profile.skills || []);  // ✅ Fix: Ensure skills is an array
        } else {
            setEdit(false);
        }
    };

    const handleSave = () => {
        setEdit(false);
        let updatedProfile = { ...profile, skills };
        dispatch(changeProfile(updatedProfile));
        successNotification("Success", "Skills Updated Successfully");
    };

    return (
        <div className="px-2 sm:px-3 md:px-4">
            <div className="text-xl sm:text-2xl font-semibold mb-3 flex justify-between items-center">
                Skills
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
                    value={skills}
                    onChange={setSkills}
                    placeholder="Add Skills (e.g. Java, React, Node.js)"
                    splitChars={[',', ' ', '|']}
                    className="w-full"
                />
            ) : (
                <div className="flex flex-wrap gap-2">
                    {Array.isArray(profile.skills) && profile.skills.length > 0 ? (
                        profile.skills.map((skill: string, index: number) => (
                            <div key={index} className="bg-bright-sun-300 text-sm font-medium bg-opacity-15 rounded-3xl text-bright-sun-400 px-3 py-1">
                                {skill}
                            </div>
                        ))
                    ) : (
                        <div className="text-red-500">No skills available</div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Skills;