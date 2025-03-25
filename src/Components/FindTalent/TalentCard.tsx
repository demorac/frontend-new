import { Avatar, Button, Divider, Modal, Text } from '@mantine/core';
import { DateInput, TimeInput } from '@mantine/dates';
import { useDisclosure } from '@mantine/hooks';
import { IconCalendarMonth, IconHeart, IconMapPin } from "@tabler/icons-react";
import { Link, useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { getProfile } from '../../Services/ProfileService';
import { useSelector } from 'react-redux';
import { changeAppStatus } from '../../Services/JobService';
import { errorNotification, successNotification } from '../../Services/NotificationService';
import { convertToIST, convertToIST1, openBase64Resume } from '../../Services/Utilities';
import { getJob } from "../../Services/JobService";
import { TextInput } from '@mantine/core';

const TalentCard = (props: any) => {

    const [location, setLocation] = useState<string>("");
    const { id } = useParams();
    const user = useSelector((state: any) => state.user);
    const [opened, { open, close }] = useDisclosure(false);
    const [app, { open: openApp, close: closeApp }] = useDisclosure(false);
    const [date, setDate] = useState<Date | null>(null);
    const [time, setTime] = useState<any>(null);
    const ref = useRef<HTMLInputElement>(null);
    const [profile, setProfile] = useState<any>({});
    const [isLoading, setIsLoading] = useState<boolean>(false);
    useEffect(() => {
        console.log("🆕 TalentCard received props:", props);
        if (props.applicantId) {
            getProfile(props.applicantId)
                .then((res) => {
                    setProfile(res);
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            setProfile(props);
        }
    }, [props.applicantId]);


    const handleOffer = async (status: string) => {
        setIsLoading(true);

        let interview: any = { id, applicantId: profile?.id, applicationStatus: status };

        if (status === "INTERVIEWING") {
            if (!date || !time || !location) {
                errorNotification("Error", "Please select a valid interview date, time, and location!");
                setIsLoading(false);
                return;
            }

            try {
                const jobData = await getJob(id);
                if (!jobData) {
                    errorNotification("Error", "Job details not found!");
                    setIsLoading(false);
                    return;
                }

                const { jobTitle, company } = jobData;

                const [hours, minutes] = time?.split(":").map(Number) ?? [0, 0];
                const interviewDate = new Date(date);
                interviewDate.setHours(hours, minutes, 0, 0);

                const interviewTimeISO = interviewDate.toISOString();
                console.log("📅 Sending Interview Time:", interviewTimeISO);

                interview = {
                    ...interview,
                    interviewTime: interviewTimeISO,
                    interviewLocation: location
                };

                const emailPayload = {
                    email: profile?.email,
                    jobTitle,
                    company,
                    interviewTime: convertToIST1(interviewTimeISO),
                    interviewLocation: location,
                };

                await fetch("http://localhost:8080/users/sendInterviewEmail", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(emailPayload),
                });

                successNotification("Success", "Interview Email Sent Successfully");

            } catch (error) {
                console.error("Error scheduling interview:", error);
                errorNotification("Error", "Failed to send interview email");
                setIsLoading(false);
                return;
            }
        }

        console.log("🚀 Sending Interview Data to Backend:", interview);

        changeAppStatus(interview)
            .then(() => {
                successNotification("Success", "Interview Scheduled Successfully");
                close();
                window.location.reload();
            })
            .catch((err) => {
                errorNotification("Error", err.response?.data?.errorMessage || "An error occurred");
            })
            .finally(() => {
                setIsLoading(false);
            });
    };


    return (
        <div className="bg-mine-shaft-900 p-4 w-full sm:w-72 flex flex-col gap-3 rounded-xl hover:shadow-[0_0_5px_1px_yellow] !shadow-bright-sun-400">
            <div className="flex justify-between">
                <div className="flex gap-2 items-center">
                    <div className="p-2 bg-mine-shaft-800 rounded-full">

                        <Avatar
                            src={
                                profile.picture
                                    ? `data:image/jpeg;base64,${profile.picture}`
                                    : profile.gender === "male"
                                        ? "/avatar.png"
                                        : profile.gender === "female"
                                            ? "/avatar1.png"
                                            : "/avtar.png"
                            }
                            alt="Profile"
                        />
                    </div>
                    <div>
                        <Text className="!font-semibold text-lg 2xl:text-xl" lineClamp={1}> {/* Increased 2xl Font */}
                            {profile?.name}
                        </Text>

                        <div className="text-sm text-mine-shaft-300 2xl:text-md"> {/* Increased 2xl Font */}
                            {profile?.jobTitle} • {profile?.company}
                        </div>
                    </div>
                </div>
                <IconHeart className="text-mine-shaft-300 cursor-pointer" />
            </div>
            <div className="flex gap-1 flex-wrap [&>div]:py-1 [&>div]:px-2 [&>div]:bg-mine-shaft-800 [&>div]:text-bright-sun-400 [&>div]:rounded-lg text-xs 2xl:text-sm"> {/* Increased 2xl Font */}
                {profile?.skills?.map((skill: any, index: any) => index < 3 && (
                    <div key={index}>{skill}</div>
                ))}...
            </div>
            <Text className="!text-xs text-justify !text-mine-shaft-300 2xl:text-sm" lineClamp={3}> {/* Increased 2xl Font */}
                {profile?.about}
            </Text>
            <Divider size="sm" color="mineShaft.7" className="my-1" />
            {
                props.invited ? (
                    <div className="flex gap-1 text-mine-shaft-200 text-sm items-center">
                        <IconCalendarMonth stroke={1.5} /> Interview {convertToIST(props?.interviewTime)}
                    </div>
                ) : (
                    <div className="flex flex-col sm:flex-row justify-between">
                        <div className="font-semibold text-mine-shaft-200 mb-1 sm:mb-0">
                            Exp: {profile.totalExp ? profile.totalExp : 1} Years
                        </div>
                        <div className="flex gap-1 text-xs text-mine-shaft-400 items-center">
                            <IconMapPin className="h-4 w-4 stroke={1.5}" />
                            {profile.location}
                        </div>
                    </div>
                )
            }


            <Divider size="sm" color="mineShaft.7" className="my-1" />
            <div className="flex flex-col gap-2">
                <div className="flex flex-col sm:flex-row [&>*]:w-full sm:[&>*]:w-1/2 [&>*]:p-1 gap-1">
                    {!props.invited && (
                        <>
                            <Link to={`/talent-profile/${profile?.id}`}>
                                <Button color="brightSun.4" variant="outline" fullWidth>
                                    Profile
                                </Button>
                            </Link>
                            <div>
                                {props.posted ? (
                                    <Button
                                        onClick={open}
                                        rightSection={<IconCalendarMonth className="h-5 w-5" />}
                                        color="brightSun.4"
                                        variant="light"
                                        fullWidth
                                    >
                                        Schedule
                                    </Button>
                                ) : (
                                    <Button color="brightSun.4" variant="light" fullWidth>
                                        Message
                                    </Button>
                                )}
                            </div>
                        </>
                    )}
                    {props.invited && (
                        <>
                            <div>
                                <Button color="brightSun.4" onClick={() => handleOffer("OFFERED")} variant="outline" fullWidth>
                                    Accept
                                </Button>
                            </div>
                            <div>
                                <Button color="brightSun.4" onClick={() => handleOffer("REJECTED")} variant="light" fullWidth>
                                    Reject
                                </Button>
                            </div>
                        </>
                    )}
                </div>

                {(props.invited || props.posted) && (
                    <Button color="brightSun.4" variant="filled" fullWidth autoContrast onClick={openApp}>
                        View Application
                    </Button>
                )}
                <Modal opened={app} onClose={closeApp} title="Application" centered>
                    <div className='flex flex-col gap-4'>
                        <div>
                            Email:  <a className='text-bright-sun-400 hover:underline cursor-pointer text-center' href={`mailto:${props.email}`}>{props.email}</a>
                        </div>
                        <div>
                            Website:  
                            {props.website ? (
                                <a
                                    className="text-bright-sun-400 hover:underline cursor-pointer text-center"
                                    href={props.website}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {props.website}
                                </a>
                            ) : (
                                "Nothing"
                            )}
                        </div>
                        <div>
                            Resume:  <span className='text-bright-sun-400 hover:underline cursor-pointer text-center' onClick={() => openBase64Resume(props.resume)}>{props.name}</span>
                        </div>
                    </div>
                </Modal>
            </div>
            <Modal opened={opened} onClose={close} title="Schedule" centered>
                <div className='flex flex-col gap-4'>
                    <DateInput minDate={new Date()} value={date} onChange={setDate} placeholder="Enter Date" label="Interview Date" />
                    <TimeInput label="Click icon to show browser picker" ref={ref} value={time} onChange={(event) => setTime(event.currentTarget.value)} onClick={() => ref.current?.showPicker()} />
                    <TextInput
                        label="Interview Location"
                        placeholder="Enter location"
                        value={location}
                        onChange={(event) => setLocation(event.currentTarget.value)}
                    />

                    <Button
                        onClick={() => handleOffer("INTERVIEWING")}
                        color="brightSun.4"
                        variant="light"
                        fullWidth
                        disabled={isLoading}
                    >
                        {isLoading ? "Scheduling..." : "Schedule"}
                    </Button>

                </div>
            </Modal>
        </div>
    );
};

export default TalentCard;