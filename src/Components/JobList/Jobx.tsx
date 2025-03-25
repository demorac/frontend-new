import { Button, Divider, Text } from '@mantine/core';
import { IconBookmark, IconBookmarkFilled, IconClockHour10 } from "@tabler/icons-react";
import { Link } from 'react-router-dom';
import { timeAgo } from '../../Services/Utilities';
import { useDispatch, useSelector } from 'react-redux';
import { changeProfile } from '../../Slices/ProfileSlice';
import { useMemo } from 'react';

const Jobx = (props: any) => {
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

    return (
        <div className="bg-mine-shaft-900 p-4 w-full sm:w-auto flex flex-col gap-3 rounded-xl hover:shadow-[0_0_5px_1px_yellow] !shadow-bright-sun-400"> {/* Responsive width */}
            <div className="flex justify-between">
                <div className="flex gap-2 items-center">
                    <div className="p-2 bg-mine-shaft-800 rounded-md">
                        <img className="h-7" src={`/Icons/${props.company}.png`} alt={props.company}
                            onError={(e) => (e.currentTarget.src = "/Icons/default1.webp")} />
                    </div>
                    <div>
                        <Text className="!font-semibold" lineClamp={1}>{props.jobTitle}</Text>
                        <div className="text-xs text-mine-shaft-300">
                            {props.company} • {props.applicants ? props.applicants.length : 0} Applicants
                        </div>
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
            <div className="flex gap-2 [&>div]:py-1 [&>div]:px-2 [&>div]:bg-mine-shaft-800 [&>div]:text-bright-sun-400 [&>div]:rounded-lg text-xs">
                <div>{props.experience}</div>
                <div>{props.jobType}</div>
                <div>{props.location}</div>
            </div>
            <Text className="!text-xs text-justify !text-mine-shaft-300" lineClamp={3}>{props.about}</Text>
            <Divider size="sm" color="mineShaft.7" />
            <div className="flex justify-between">
                <div className="font-semibold text-mine-shaft-200">
                    ₹ {props.packageOffered} LPA
                </div>
                <div className="flex gap-1 text-xs text-mine-shaft-400 items-center">
                    <IconClockHour10 className="h-5 w-5" stroke={1.5} /> Posted {timeAgo(props.postTime)}
                </div>
            </div>

            {/* ✅ Updated Button to View Matching Profiles */}
            <Link to={`/matching-profiles/${props.id}`}>
                <Button fullWidth color="brightSun.4" variant="outline">View Matching Profiles</Button>
            </Link>
        </div>
    );
};

export default Jobx;