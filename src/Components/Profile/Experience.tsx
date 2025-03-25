import { ActionIcon } from "@mantine/core";
import { IconPlus, IconPencil, IconX } from "@tabler/icons-react";
import ExpCard from "./ExpCard";
import ExpInput from "./ExpInput";
import { useState } from "react";
import { useSelector } from "react-redux";

const Experience = () => {
    const profile = useSelector((state: any) => state.profile);
    const [edit, setEdit] = useState(false);
    const [addExp, setAddExp] = useState(false);
    const handleClick = () => {
        setEdit(!edit);
    }
    return (
        <>
            <div className="px-2 sm:px-3 md:px-4">
                <div className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-5 flex justify-between items-center">
                    Experience
                    <div className="flex gap-2">
                        <ActionIcon
                            onClick={() => setAddExp(true)}
                            color="brightSun.4"
                            size="lg"
                            variant="subtle"
                        >
                            <IconPlus className="h-4/5 w-4/5" />
                        </ActionIcon>
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
                <div className="flex flex-col gap-6 sm:gap-8">
                    {profile?.experiences?.map((exp: any, index: any) => (
                        <ExpCard key={index} index={index} {...exp} edit={edit} />
                    ))}
                    {addExp && <ExpInput add setEdit={setAddExp} />}
                </div>
            </div>
        </>
    );
};

export default Experience;