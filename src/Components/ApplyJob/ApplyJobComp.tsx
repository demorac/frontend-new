import { Button, Divider } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import ApplicationForm from "./ApplicationForm";
import { timeAgo } from "../../Services/Utilities";
import { IconArrowLeft } from "@tabler/icons-react";

const ApplyJobComp = (props: any) => {
    const navigate = useNavigate();

    return (
        <div className="w-full px-4 md:w-2/3 mx-auto">
            {/* Back Button for xsm, xs, and sm screens (319px - 767px) */}
            <div className="flex md:hidden mb-4">
                <Button
                    leftSection={<IconArrowLeft />}
                    onClick={() => navigate(-1)}
                   color="brightSun.4" 
                    variant="light"
                >
                    Back
                </Button>
            </div>

            {/* Back Button for md screens and larger (≥ 768px) */}
            {/* <div className="hidden sm:block md:flex">
    <Button
        leftSection={<IconArrowLeft />}
        onClick={() => navigate(-1)}
        variant="outline"
        color="mine-shaft.5"
    >
        Back
    </Button>
</div> */}


            {/* Job Header Section */}
            <div className="flex flex-col sm:flex-row justify-between items-center">
                <div className="flex gap-2 items-center mb-4 sm:mb-0">
                    <div className="p-3 bg-mine-shaft-800 rounded-xl">
                        <img
                            className="h-10 sm:h-14"
                            src={`/Icons/${props.company}.png`}
                            alt={props.company}
                            onError={(e) => (e.currentTarget.src = "/Icons/default1.webp")}
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <div className="font-semibold text-xl sm:text-2xl">{props.jobTitle}</div>
                        <div className="text-sm sm:text-lg text-mine-shaft-300">
                            {props.company} • {timeAgo(props.postTime)} • {props.applicants ? props.applicants.length : 0} Applicants
                        </div>
                    </div>
                </div>
            </div>

            <Divider my="xl" />

            {/* Application Form */}
            <ApplicationForm />
        </div>
    );
};

export default ApplyJobComp;
