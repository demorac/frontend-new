import { IconBookmark } from "@tabler/icons-react";
import { formatDate } from "../../Services/Utilities";

const ExpCard = (props: any) => {
    return (
        <div className="flex flex-col gap-2">
            <div className="flex justify-between">
                <div className="flex gap-2 items-center">
                    <div className="p-2 bg-mine-shaft-800 rounded-md w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center">
                        <img
                            className="max-h-full max-w-full object-contain"
                            src={`/Icons/${props.company}.png`}
                            alt={props.company}
                            onError={(e) => (e.currentTarget.src = "/Icons/default1.webp")} />
                    </div>
                    <div className="flex flex-col">
                        {/*<Text className="!font-semibold" lineClamp={1}>Software Engineer
                </Text>*/}
                        {<div className="font-semibold text-lg">{props.title}</div>}
                        <div className="text-sm text-mine-shaft-300">{props.company} • {props.location}</div>
                    </div>
                </div>
                <div className="text-sm text-mine-shaft-300 whitespace-nowrap">
                    {formatDate(props.startDate)} - {formatDate(props.endDate)}
                </div>
            </div>
            <div className="text-sm text-mine-shaft-300 text-justify">
                {props.description}
            </div>
        </div>

    )
}
export default ExpCard;