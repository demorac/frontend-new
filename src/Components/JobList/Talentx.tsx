import { Avatar, Button, Divider, Text } from '@mantine/core';
import { Link } from 'react-router-dom';

const Talentx = (props: any) => {
    const skillMatch = props.matchPercentages?.[0] || 0;
    const educationMatch = props.matchPercentages?.[1] || 0;
    const totalMatch = props.matchPercentages?.[2] || 0;

    return (
        <div className="bg-mine-shaft-900 p-4 w-full sm:w-72 flex flex-col gap-3 rounded-xl shadow-md"> {/* Responsive width */}
            <div className="flex gap-2 items-center">
                <Avatar
                    size="md" // Adjust avatar size
                    src={
                        props.picture
                            ? `data:image/jpeg;base64,${props.picture}`
                            : props.gender === "male"
                                ? "/avatar.png" // Default male avatar
                                : props.gender === "female"
                                    ? "/avatar1.png" // Default female avatar
                                    : "/avtar.png" // Default neutral avatar
                    }
                    alt="Profile"
                />
                <div>
                    <Text className="!font-semibold text-lg">{props.name}</Text>
                    <Text className="text-sm text-mine-shaft-300">{props.jobTitle} at {props.company}</Text>
                </div>
            </div>

            {/* ✅ Matching Percentages */}
            <div className="text-sm text-mine-shaft-300">
                <p>Skill Match: <span className="text-bright-sun-400">{skillMatch.toFixed(1)}%</span></p>
                <p>Education Match: <span className="text-bright-sun-400">{educationMatch.toFixed(1)}%</span></p>
                <p>Total Match: <span className="text-bright-sun-400">{totalMatch.toFixed(1)}%</span></p>
            </div>

            <Divider size="sm" color="mineShaft.7" />

            {/* ✅ Profile & Accept Buttons */}
            <div className="flex flex-col sm:flex-row gap-2"> {/* Stack on small, row on larger */}
                <Link to={`/talent-profile/${props.id}`}>
                    <Button color="brightSun.4" variant="outline" fullWidth>
                        Profile
                    </Button>
                </Link>
                {!props.offered && ( // ✅ Hide Accept button for offered profiles
                    <Button disabled color="brightSun.4" onClick={() => props.onAccept()} fullWidth>
                        Accept
                    </Button>
                )}
            </div>
        </div>
    );
};

export default Talentx;