import { Button, Divider } from "@mantine/core";
import { IconBriefcase, IconMapPin } from "@tabler/icons-react";
import ExpCard from "./ExpCard";
import CertiCard from "./CertiCard";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProfile } from "../../Services/ProfileService";

const Profile = (props: any) => {
    const { id } = useParams();

    // Ensure default values to avoid undefined issues
    const [profile, setProfile] = useState<any>({
        name: "",
        jobTitle: "",
        company: "",
        location: "",
        about: "",
        picture: null,
        skills: [],
        experience: [],
        certifications: [],
    });

    useEffect(() => {
        window.scroll(0, 0);
        getProfile(id)
            .then((res) => {
                console.log("API Response:", res); // Debugging API response
                setProfile(res || {});
            })
            .catch((err) => {
                console.error("Error fetching profile:", err);
            });
    }, [id]);

    return (
        <div className="w-full md:w-2/3 px-2 sm:px-3 md:px-4">
            {/* Profile Banner & Picture */}
            <div className="relative">
                <img className="rounded-t-2xl w-full h-32 sm:h-40 md:h-48 object-cover" src="/Profile/banners.webp" alt="Banner" />
                <img
                    className="w-24 h-24 sm:w-32 sm:h-32 md:w-48 md:h-48 rounded-full -bottom-1/3 absolute left-3 border-mine-shaft-950 border-8"
                    src={
                        profile.picture
                            ? `data:image/jpeg;base64,${profile.picture}`
                            : profile.gender === "male"
                                ? "/avatar.png" // Default male avatar
                                : profile.gender === "female"
                                    ? "/avatar1.png" // Default female avatar
                                    : "/avtar.png" // Default neutral avatar
                    }
                    alt="Profile"
                />

            </div>

            {/* Basic Profile Info */}
            <div className="px-1 sm:px-3 mt-16 md:mt-20">
                <div className="text-2xl sm:text-3xl font-semibold flex justify-between items-center">
                    {profile?.name || "No Name"}
                    <Button color='brightSun.4' variant="light" right={200} size="xs sm:md">Message</Button>
                </div>
                <div className="text-lg sm:text-xl flex gap-1 items-center">
                    <IconBriefcase className="h-5 w-5 stroke={1.5}" />
                    {profile?.jobTitle || "No Job Title"} • {profile?.company || "No Company"}
                </div>
                <div className="flex gap-1 text-base sm:text-lg text-mine-shaft-300 items-center">
                    <IconMapPin className="h-5 w-5 stroke={1.5}" />
                    {profile?.location || "No Location"}
                </div>
                <div className="text-lg">
                    <strong>Gender:</strong> {profile.gender || "Not specified"}
                </div>
            </div>

            <Divider mx="xs" my="xl" />

            {/* About Section */}
            <div className="px-1 sm:px-3">
                <div className="text-xl sm:text-2xl font-semibold mb-3">About</div>
                <div className="text-sm text-mine-shaft-300 text-justify">
                    {profile?.about || "No information available."}
                </div>
            </div>

            <Divider mx="xs" my="xl" />

            {/* Skills Section */}
            <div className="px-1 sm:px-3">
                <div className="text-xl sm:text-2xl font-semibold mb-3">Skills</div>
                <div className="flex flex-wrap gap-2">
                    {profile?.skills.length > 0 ? (
                        profile?.skills?.map((skill: any, index: number) => (
                            <div key={index} className="bg-bright-sun-300 text-sm font-medium bg-opacity-15 rounded-3xl text-bright-sun-400 px-3 py-1">
                                {skill}
                            </div>
                        ))
                    ) : (
                        <div className="text-red-500">No skills available</div>
                    )}
                </div>
            </div>
            <Divider mx="xs" my="xl" />
            <div className="px-1 sm:px-3">
                <div className="text-xl sm:text-2xl font-semibold mb-3">Education</div>
                <div className="flex flex-wrap gap-2">
                    {Array.isArray(profile.education) && profile.education.length > 0 ? (
                        profile.education.map((edu: string, index: number) => (
                            <div key={index} className="bg-bright-sun-300 text-sm font-medium bg-opacity-15 rounded-3xl text-bright-sun-400 px-3 py-1">
                                {edu}
                            </div>
                        ))
                    ) : (
                        <div className="text-red-500">No education details available</div>
                    )}
                </div>
            </div>


            <Divider mx="xs" my="xl" />

            {/* Experience Section */}
            <div className="px-1 sm:px-3">
                <div className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-5">Experience</div>
                <div className="flex flex-col gap-6 sm:gap-8">
                    {Array.isArray(profile?.experiences) && profile?.experiences.length > 0 ? (
                        profile.experiences.map((exp: any, index: number) => <ExpCard key={index} {...exp} />)
                    ) : (
                        <p className="text-red-500">No experience available</p>
                    )}
                </div>
            </div>


            <Divider mx="xs" my="xl" />

            {/* Certifications Section */}
            <div className="px-1 sm:px-3">
                <div className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-5">Certifications</div>
                <div className="flex flex-col gap-6 sm:gap-8">
                    {profile?.certifications.length > 0 ? (
                        profile?.certifications?.map((cert: any, index: number) => <CertiCard key={index} {...cert} />)
                    ) : (
                        <p className="text-red-500">No certifications available</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;