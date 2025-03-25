import { ActionIcon } from "@mantine/core";
import { IconAdjustments, IconBookmark, IconExternalLink } from "@tabler/icons-react";

const CompanyCard=(props:any)=>{

    return <div>
            <div className="flex justify-between bg-mine-shaft-900 items-center rounded-lg p-2">
            <div className="flex gap-2 items-center">
                <div className="p-2 bg-mine-shaft-800 rounded-md">
                    <img className="h-7" src={`/Icons/${props.names}.png`} alt="Meta" />
                </div>
                <div>
                <div className="font-semibold">{props.names}
                </div>
                    {/* <div className="font-semibold">{props.jobTitle}</div> */}
                    <div className="text-xs text-mine-shaft-300">{props.employess} Employeess</div>
                </div>
            </div>
             <ActionIcon color="brightSun.4" variant="subtile" aria-label="Setings"><IconExternalLink/></ActionIcon>
        </div>
    </div>
}
export default CompanyCard;