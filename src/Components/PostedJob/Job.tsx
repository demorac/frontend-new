import { ActionIcon, Button, Divider } from "@mantine/core";
import { IconBookmark, IconBookmarkFilled } from "@tabler/icons-react";
import { Link, useLocation } from "react-router-dom";
import { card } from "../LandingPage/DATA";
//@ts-ignore
import DOMPurify from 'dompurify';
import { timeAgo } from "../../Services/Utilities";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeProfile } from "../../Slices/ProfileSlice";
import { postJob } from "../../Services/JobService";
import { errorNotification, successNotification } from "../../Services/NotificationService";

const Job = (props: any) => {
    const [applied, setApplied] = useState(false);
    const dispatch = useDispatch();
    const user = useSelector((state: any) => state.user);
    const location = useLocation();

    const rawProfile = useSelector((state: any) => state.profile);
    const profile = useMemo(() => ({
        ...rawProfile,
        savedJobs: Array.isArray(rawProfile?.savedJobs) ? rawProfile.savedJobs : []
    }), [rawProfile]);

    const handleSaveJob = () => {
        const updatedSavedJobs = profile.savedJobs.includes(props.id)
            ? profile.savedJobs.filter((id: any) => id !== props.id)
            : [...profile.savedJobs, props.id];

        dispatch(changeProfile({ ...profile, savedJobs: updatedSavedJobs }));
    };

    useEffect(() => {
        setApplied(props.applicants?.some((applicant: any) => applicant.applicantId === user.id) || false);
    }, [props.applicants, user.id]); // ✅ Dependency updated

    const handleClose = () => {
        postJob({ ...props, jobStatus: "CLOSED" })
            .then(() => {
                successNotification("Success", "Job Closed Successfully");
            })
            .catch((err) => {
                errorNotification("Error", err?.response?.data?.errorMessage || "An error occurred");
            });
    };

    const data = DOMPurify.sanitize(props.description);

    return (
        <div className="w-full md:w-2/3 px-2 md:px-0"> {/* Adjust width for larger screens */}
            <div className="flex flex-col md:flex-row justify-between items-center"> {/* Stack on smaller screens, row on larger */}
                <div className="flex gap-2 items-center mb-3 md:mb-0"> {/* Add margin for spacing when stacked */}
                    <div className="p-3 bg-mine-shaft-800 rounded-xl">
                        <img className="h-10 md:h-14" src={`/Icons/${props.company}.png`} alt={props.company} // Slightly smaller on smaller screens
                            onError={(e) => (e.currentTarget.src = "/Icons/default1.webp")} />
                    </div>
                    <div className="flex flex-col gap-1">
                        <div className="font-semibold text-xl md:text-2xl">{props.jobTitle}</div> {/* Adjust font size */}
                        <div className="text-sm md:text-lg text-mine-shaft-300">
                            {props.company} • {timeAgo(props.postTime)} • {props.applicants?.length || 0} Applicants
                        </div>
                    </div>
                </div>

                {/* Buttons Section */}
                <div className="flex flex-row md:flex-col gap-2 items-center"> {/* Row on smaller screens, col on larger */}
                    {props.edit && props.jobStatus !== "CLOSED" && (
                        <Link to={`/apply-job/${props.id}`}>
                            <Button color='brightSun.4' size="sm" variant="light">Apply</Button>
                        </Link>
                    )}

                    {props.editMode && (
                        props.jobStatus === "CLOSED" ? (
                            <Link to={`/post-job/${props.id}`}>
                                <Button color="blue.6" size="sm" variant="light">Reopen</Button>
                            </Link>
                        ) : (
                            <Link to={`/post-job/${props.id}`}>
                                <Button color="green.8" size="sm" variant="light">Edit</Button>
                            </Link>
                        )
                    )}

                    {(props.jobStatus === "ACTIVE" || props.jobStatus === "DRAFT") && props.editMode && (
                        <Button onClick={handleClose} color="red.6" size="sm" variant="light">Close</Button>
                    )}

                    {profile.savedJobs.includes(props.id) ? (
                        <IconBookmarkFilled
                            onClick={handleSaveJob}
                            className="text-bright-sun-400 cursor-pointer text-xl md:text-2xl" // Adjust icon size
                            stroke={1.5}
                        />
                    ) : (
                        <IconBookmark
                            onClick={handleSaveJob}
                            className="text-mine-shaft-300 hover:text-bright-sun-400 cursor-pointer text-xl md:text-2xl" // Adjust icon size
                            stroke={1.5}
                        />
                    )}
                </div>
            </div>

            <Divider my="xl" />

            <div className="grid grid-cols-2 md:grid-cols-5 gap-4"> {/* Two columns on small, five on medium and up */}
                {card.map((item: any, index: number) => (
                    <div key={index} className="flex flex-col items-center gap-1">
                        <ActionIcon color="brightSun.4" className="!h-10 !w-10 md:!h-12 md:!w-12" variant="light" radius="xl" aria-label="Settings"> {/* Adjust icon size */}
                            <item.icon className="!h-4/5 !w-4/5" stroke={1.5} />
                        </ActionIcon>
                        <div className="text-xs md:text-sm text-mine-shaft-300">{item.name}</div> {/* Adjust font size */}
                        <div className="font-semibold text-sm md:text-base">{props[item.id] || "NA"}{item.id === "packageOffered" && " LPA"}</div> {/* Adjust font size */}
                    </div>
                ))}
            </div>

            <Divider my="xl" />

            <div>
                <div className="text-lg md:text-xl font-semibold mb-3 md:mb-5">Required Skills</div> {/* Adjust font size and margin */}
                <div className="flex flex-wrap gap-2">
                    {props?.skillsRequired?.map((skill: any, index: number) => (
                        <ActionIcon key={index} color="brightSun.4" className="!h-fit font-medium text-xs md:text-sm !w-fit" variant="light" radius="xl" p="xs" aria-label="Skill"> {/* Adjust font size */}
                            {skill}
                        </ActionIcon>
                    ))}
                </div>
            </div>

            <Divider my="xl" />

            {/* ✅ Added Required Education Section */}
            <div>
                <div className="text-lg md:text-xl font-semibold mb-3 md:mb-5">Required Education</div> {/* Adjust font size and margin */}
                <div className="flex flex-wrap gap-2">
                    {props?.educationRequired?.map((edu: any, index: number) => (
                        <ActionIcon key={index} color="brightSun.4" className="!h-fit font-medium text-xs md:text-sm !w-fit" variant="light" radius="xl" p="xs" aria-label="Education"> {/* Adjust font size */}
                            {edu}
                        </ActionIcon>
                    ))}
                </div>
            </div>

            <Divider my="xl" />

            <div className="[&_h4]:text-lg [&_*]:text-mine-shaft-300 [&_li]:marker:text-bright-sun-400 [&_li]:mb-1 [&_h4]:my-3 [&_h4]:font-semibold [&_h4]:text-mine-shaft-200 [&_p]:text-justify"
                dangerouslySetInnerHTML={{ __html: data }}>
            </div>
        </div>
    );
};

export default Job;