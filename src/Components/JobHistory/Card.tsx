import { Button, Divider, Text } from '@mantine/core';
import { IconBookmark, IconBookmarkFilled, IconCalendarMonth, IconClockHour10 } from "@tabler/icons-react";
import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { changeProfile } from '../../Slices/ProfileSlice';
import { convertToIST, timeAgo } from '../../Services/Utilities';

const Card=(props : any)=>{
    console.log("Card Props:", props);
    const applicant = props.applicants?.find((app: any) => app.applicationStatus === "INTERVIEWING");
    const interviewTime = applicant?.interviewTime;
    
    const dispatch = useDispatch();



    // Ensure profile.savedJobs is always an array
    const rawProfile = useSelector((state: any) => state.profile);
    const profile = useMemo(() => ({
        ...rawProfile,
        savedJobs: Array.isArray(rawProfile?.savedJobs) ? rawProfile.savedJobs : []
    }), [rawProfile]);

    const handleSaveJob = () => {
        const updatedSavedJobs = profile.savedJobs.includes(props.id)
            ? profile.savedJobs.filter((id: any) => id !== props.id)
            : [...profile.savedJobs, props.id];

        const updatedProfile = { ...profile, savedJobs: updatedSavedJobs };

        dispatch(changeProfile(updatedProfile));
    };
return <div className="bg-mine-shaft-900  p-4 w-72 flex flex-col gap-3 rounded-xl hover:shadow-[0_0_5px_1px_yellow] !shadow-bright-sun-400">
        <div className="flex justify-between">
            <div className="flex gap-2 items-center">
                <div className="p-2 bg-mine-shaft-800 rounded-md">
                    <img className="h-7" src={`/Icons/${props.company}.png`} alt={props.company} 
                        onError={(e) => (e.currentTarget.src = "/Icons/default1.webp")}/>
                </div>
                <div>
                <Text className="!font-semibold" lineClamp={1}>{props.jobTitle}
                </Text>
                    {/* <div className="font-semibold">{props.jobTitle}</div> */}
                    <div className="text-xs text-mine-shaft-300">{props.company} &#x2022; {props.applicants ? props.applicants.length : 0} Applicants</div>
                </div>
            </div>
            {profile.savedJobs.includes(props.id) ? (
                    <IconBookmarkFilled 
                        onClick={handleSaveJob} 
                        className="text-bright-sun-400 cursor-pointer" 
                        stroke={1.5} 
                    />
                ) : (
                    <IconBookmark 
                        onClick={handleSaveJob}  
                        className="text-mine-shaft-300 hover:text-bright-sun-400 cursor-pointer"
                        stroke={1.5} 
                    />
                )}
        </div>
        <div className="flex gap-2 [&>div]:py-1 [&>div]:px-2 [&>div]:bg-mine-shaft-800 [&>div]:text-bright-sun-400 [&>div]:rounded-lg text-xs ">
            <div>{props.experience}</div>
            <div>{props.jobType}</div>
            <div>{props.location}</div>
        </div>
        <Text className="!text-xs text-justify !text-mine-shaft-300" lineClamp={3}>{props.about}
    </Text>
    <Divider size="sm" color="mineShaft.7" />
        <div className="flex justify-between">
            <div className="font-semibold text-mine-shaft-200">
                &#8377; {props.packageOffered} LPA
            </div>
            <div className="flex gap-1 text-xs text-mine-shaft-400 items-center">
                <IconClockHour10 className="h-5 w-5  stroke={1.5}"/>{props.applied || props.interviewing?"Applied":props.offered?"Interviewed":"Posted"} {timeAgo(props.postTime)} 
            </div>
        </div>
        {
            (props.offered || props.interviewing) && <Divider size="sm" color="mineShaft.7" />
        }
        {
            props.offered && <div className='flex gap-2'>
                <Button color="brightSun.4" variant="outline" fullWidth> Accept</Button>
                <Button color="brightSun.4" variant="light" fullWidth> Reject</Button>
            </div>
        }
   {
    props.interviewing && interviewTime && (
        <div className="flex gap-1 text-sm items-center">
            <IconCalendarMonth stroke={1.5} className="text-bright-sun-400 w-5 h-5"/>
            {convertToIST(interviewTime)}
        </div>
    )
}




        <Link to={`/jobs/${props.id}`}>
                <Button fullWidth color="brightSun.4" variant="outline">View Job</Button>
            </Link>
</div>
}
export default Card;