import { ActionIcon } from "@mantine/core";
import { IconPlus, IconX, IconPencil } from "@tabler/icons-react";
import { profile } from "console";
import CertiCard from "./CertiCard";
import CertiInput from "./CertiInput";
import { useState } from "react";
import { useSelector } from "react-redux";

const Certification = () => {
    const profile = useSelector((state: any) => state.profile);
    const [addCerti, setAddCerti] = useState(false);
    const [edit, setEdit] = useState(false);
    const handleClick = () => {
        setEdit(!edit);
    }
    return (
        <>
            <div className="px-2 sm:px-3 md:px-4">
                <div className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-5 flex justify-between items-center">
                    Certifications
                    <div className="flex gap-2">
                        <ActionIcon onClick={() => setAddCerti(true)} color="brightSun.4" size="lg" variant="subtle">
                            <IconPlus className="h-4/5 w-4/5" />
                        </ActionIcon>
                        <ActionIcon onClick={handleClick} color="brightSun.4" size="lg" variant="subtle">
                            {edit ? <IconX className="h-4/5 w-4/5" /> : <IconPencil className="h-4/5 w-4/5" />}
                        </ActionIcon>
                    </div>
                </div>
                <div className="flex flex-col gap-6 sm:gap-8">
                    {profile?.certifications?.map((cef: any, index: number) => (
                        <CertiCard key={index} index={index} {...cef} edit={edit} />
                    ))}
                    {addCerti && <CertiInput setEdit={setAddCerti} />}
                </div>
            </div>
        </>
    );
};

export default Certification;