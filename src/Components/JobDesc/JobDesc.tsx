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

const JobDesc = (props: any) => {
    const [applied, setApplied] = useState(false);
    const dispatch = useDispatch();
    const user = useSelector((state: any) => state.user);
    const location = useLocation(); // Get the current URL

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

    useEffect(() => {
        if (props.applicants?.some((applicant: any) => applicant.applicantId === user.id)) {
            setApplied(true);
        } else {
            setApplied(false);
        }
    }, [props]);

    const data = DOMPurify.sanitize(props.description);
    const isPostedJobPage = location.pathname.includes("/postedjob/");
    const hideApplyButton = isPostedJobPage && (props.jobStatus === "active" || props.jobStatus === "draft");

    return (
        <div className="w-full bs:w-2/3">
            {/* Job Header Section */}
            <div className="flex flex-col sm:flex-row justify-between gap-4">
                <div className="flex gap-2 items-center">
                    <div className="p-3 bg-mine-shaft-800 rounded-xl">
                        <img
                            className="h-14"
                            src={`/Icons/${props.company}.png`}
                            alt={props.company}
                            onError={(e) => (e.currentTarget.src = "/Icons/default1.webp")}
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <div className="font-semibold text-2xl">{props.jobTitle}</div>
                        <div className="text-lg text-mine-shaft-300">
                            {props.company} • {timeAgo(props.postTime)} • {props.applicants?.length || 0} Applicants
                        </div>
                    </div>
                </div>

                {/* Action Buttons Section */}
                <div className="flex flex-col gap-2 items-center">
                    {/* Hide Apply button when jobStatus is "active" or "draft" in /postedjob/:id */}
                    {!hideApplyButton && (props.edit || !applied) && (
                        <Link to={`/apply-job/${props.id}`}>
                            <Button color="brightSun.4" size="sm" variant="light">
                                {props.edit ? "Edit" : "Apply"}
                            </Button>
                        </Link>
                    )}
                    {applied && <Button color="green.8" size="sm" variant="light">Applied</Button>}

                    {props.editMode && (
                        <div className="flex gap-2">
                            <Link to={`/edit-job/${props.id}`}>
                                <Button color="blue" size="sm" variant="light">Edit</Button>
                            </Link>
                            <Button color="red" size="sm" variant="light" onClick={() => props.onDelete(props.id)}>
                                Close
                            </Button>
                        </div>
                    )}

                    {/* Save Job Button */}
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
            </div>

            <Divider my="xl" />

            {/* Job Details Section */}
            <div className="flex flex-wrap justify-between gap-4">
                {card.map((item: any, index: number) => (
                    <div key={index} className="flex flex-col items-center gap-1">
                        <ActionIcon color="brightSun.4" className="!h-12 !w-12" variant="light" radius="xl" aria-label="Settings">
                            <item.icon className="!h-4/5 !w-4/5" stroke={1.5} />
                        </ActionIcon>
                        <div className="text-sm text-mine-shaft-300">{item.name}</div>
                        <div className="font-semibold">
                            {props[item.id] || "NA"}
                            {item.id === "packageOffered" && " LPA"}
                        </div>
                    </div>
                ))}
            </div>

            <Divider my="xl" />

            {/* Required Skills Section */}
            <div>
                <div className="text-xl font-semibold mb-5">Required Skills</div>
                <div className="flex flex-wrap gap-2">
                    {props?.skillsRequired?.map((skill: any, index: number) => (
                        <ActionIcon
                            key={index}
                            color="brightSun.4"
                            className="!h-fit font-medium text-sm !w-fit"
                            variant="light"
                            radius="xl"
                            p="xs"
                            aria-label="Skill"
                        >
                            {skill}
                        </ActionIcon>
                    ))}
                </div>
            </div>

            <Divider my="xl" />

            {/* Required Education Section */}
            <div>
                <div className="text-xl font-semibold mb-5">Required Education</div>
                <div className="flex flex-wrap gap-2">
                    {props?.educationRequired?.map((edu: any, index: number) => (
                        <ActionIcon
                            key={index}
                            color="brightSun.4"
                            className="!h-fit font-medium text-sm !w-fit"
                            variant="light"
                            radius="xl"
                            p="xs"
                            aria-label="Education"
                        >
                            {edu}
                        </ActionIcon>
                    ))}
                </div>
            </div>

            <Divider my="xl" />

            {/* Job Description Section */}
            <div
                className="[&_h4]:text-xl [&_*]:text-mine-shaft-300 [&_li]:marker:text-bright-sun-400 [&_li]:mb-1 [&_h4]:my-5 [&_h4]:font-semibold [&_h4]:text-mine-shaft-200 [&_p]:text-justify"
                dangerouslySetInnerHTML={{ __html: data }}
            ></div>

            <Divider my="xl" />
        </div>
    );
};

export default JobDesc;




  {/* <div>
                <div className="text-xl font-semibold mb-5">About Company</div>
                <div className="flex justify-between mb-3">
                    <div className="flex gap-2 items-center">
                        <div className="p-3 bg-mine-shaft-800 rounded-xl">
                            <img className="h-8" src={`/Icons/${props.company}.png`} alt={props.company}
                                onError={(e) => (e.currentTarget.src = "/Icons/default1.webp")} />
                        </div>
                        <div className="flex flex-col">
                            <div className="font-medium text-lg">{props.company}</div>
                            <div className="text-mine-shaft-300">10k+ Employees</div>
                        </div>
                    </div>

                    <Link to={`/company/${props.company}`}>
                        <Button color='brightSun.4' variant="light">Company Page</Button>
                    </Link>
                </div>
                <div className="text-mine-shaft-300 text-justify">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas natus tenetur consectetur consequuntur eum magni, harum aliquam quo omnis assumenda labore nesciunt officiis et neque exercitationem repellat quod adipisci non rem deleniti iusto quasi obcaecati tempore. Sint veritatis explicabo reprehenderit!
                </div>
            </div> */}
