import { IconBookmark } from "@tabler/icons-react";
import { formatDate } from "../../Services/Utilities";

const CertiCard = (props: any) => {

    return (
        <div className="flex justify-between items-center">
            <div className="flex gap-2 items-center">
                <div className="p-2 bg-mine-shaft-800 rounded-md w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center">
                    <img
                        className="max-h-full max-w-full object-contain"
                        src={`/Icons/${props.issuer}.png`}
                        alt="Meta"
                    />
                </div>
                <div className="flex flex-col">
                    {/*<Text className="!font-semibold" lineClamp={1}>Software Engineer
         </Text>*/}
                    {<div className="font-semibold text-lg">{props.name}</div>}
                    <div className="text-sm text-mine-shaft-300">{props.issuer}</div>
                </div>
            </div>
            <div className="flex flex-col items-end">
                <div className="text-sm text-mine-shaft-300 whitespace-nowrap">Issued Date: {formatDate(props.issueDate)}</div>
                <div className="text-sm text-mine-shaft-300">ID:{props.certificateId}</div>
            </div>

        </div>


    )

}
export default CertiCard;