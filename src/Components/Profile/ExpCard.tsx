import { Button } from "@mantine/core";
import { IconBookmark } from "@tabler/icons-react";
import { useState } from "react";
import ExpInput from "./ExpInput";
import { formatDate } from "../../Services/Utilities";
import { useDispatch, useSelector } from "react-redux";
import { changeProfile } from "../../Slices/ProfileSlice";
import { successNotification } from "../../Services/NotificationService";

const ExpCard = (props: any) => {
    const dispatch = useDispatch();
    const profile = useSelector((state: any) => state.profile);
    const handleDelete = () => {
        let exp = [...profile.experiences]; // ✅ Correct way to copy an array
        exp.splice(props.index, 1);
        let updatedProfile = { ...profile, experiences: exp };
        dispatch(changeProfile(updatedProfile));
        successNotification("Success", "Experience Deleted Sucessfully");

    }
    const [edit, setEdit] = useState(false);
    return !edit ? <div className="flex flex-col gap-2">
        <div className="flex justify-between">
            <div className="flex gap-2 items-center">
                <div className="p-2 bg-mine-shaft-800 rounded-md w-12 h-12 flex items-center justify-center">
                    <img
                        className="max-h-full max-w-full object-contain"
                        src={`/Icons/${props.company}.png`}
                        alt={props.company}
                        onError={(e) => (e.currentTarget.src = "/Icons/default1.webp")}
                    />
                </div>
                <div className="flex flex-col">
                    {/*<Text className="!font-semibold" lineClamp={1}>Software Engineer
                </Text>*/}
                    <div className="font-semibold text-lg">{props.title}</div>
                    <div className="text-sm text-mine-shaft-300">{props.company} • {props.location}</div>
                </div>
            </div>
            <div className="text-sm text-mine-shaft-300 whitespace-nowrap">
                {formatDate(props.startDate)} -{props.working ? "Present" : formatDate(props.endDate)}
            </div>
        </div>
        <div className="text-sm text-mine-shaft-300 text-justify">
            {props.description}
        </div>
        {props.edit && <div className="flex gap-2 mt-2">
            <Button onClick={() => setEdit(true)} color="brightSun.4" variant="outline" size="xs">Edit</Button>
            <Button color="red.8" onClick={handleDelete} variant="light" size="xs">Delete</Button>
        </div>}
    </div> : <ExpInput {...props} setEdit={setEdit} />

}
export default ExpCard;