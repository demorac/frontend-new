import { ActionIcon, Divider } from "@mantine/core";
import { IconEdit } from "@tabler/icons-react";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "../../Services/ProfileService";
import Info from "./Info";
import { changeProfile, setProfile } from "../../Slices/ProfileSlice";
import About from "./About";
import Skills from "./Skills";
import Certification from "./Certification";
import { successNotification } from "../../Services/NotificationService";
import { getBase64 } from "../../Services/Utilities";
import Education from "./Education";
import Experience from "./Experience";

const Profile = (props: any) => {
    const dispatch = useDispatch();
    const user = useSelector((state: any) => state.user);
    const profile = useSelector((state: any) => state.profile);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Convert file to base64 and update Redux store
    const handleFileChange = async (image: File) => {
        const base64String: string = await getBase64(image);
        const updatedProfile = { ...profile, picture: base64String.split(",")[1] };
        dispatch(changeProfile(updatedProfile));
        successNotification("Success", "Profile Picture Updated Successfully");
    };

    useEffect(() => {
        getProfile(user.id)
            .then((data: any) => {
                dispatch(setProfile(data));
            })
            .catch((error: any) => {
                console.log(error);
            });
    }, []);

    // Handle file selection and trigger profile update
    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            if (!file.type.startsWith("image/")) {
                alert("Only image files are allowed!");
                return;
            }
            handleFileChange(file);
        }
    };

    const handleImageClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    return (
        <div className="mx-auto relative px-2 sm:px-4 md:px-6 lg:px-8 xl:px-10 w-full md:w-4/5 ">
            {/* Background Banner */}
            <div className="relative">
                <img className="rounded-t-2xl w-full h-32 sm:h-40 md:h-48 object-cover" src="/Profile/banners.webp" alt="Banner" />

                {/* Profile Image Container */}
                <div className="absolute left-1/2 -bottom-16 transform -translate-x-1/2 w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 group">
                    <img
                        className="w-full h-full rounded-full absolute left-1/2 transform -translate-x-1/2 border-4 border-mine-shaft-950 object-cover"
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
                        onClick={handleImageClick}
                    />

                    {/* ✅ Edit Icon (Appears Only on Hover) */}
                    <div className="absolute inset-0 bg-black bg-opacity-30 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                        <ActionIcon
                            onClick={handleImageClick}
                            className="bg-white p-2 rounded-full shadow-md">
                            <IconEdit className="text-gray-700 w-5 h-5" />
                        </ActionIcon>
                    </div>

                    {/* Hidden File Input */}
                    <input
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        onChange={handleImageChange}
                        className="hidden"
                    />
                </div>
            </div>

            <div className="px-3 mt-16 sm:mt-18 md:mt-20">
                <Info />
            </div>
            <Divider mx="xs" my="xl" />
            <About />
            <Divider mx="xs" my="xl" />
            <Skills />
            <Divider mx="xs" my="xl" />
            <Education />
            <Divider mx="xs" my="xl" />
            <Experience />
            <Divider mx="xs" my="xl" />
            <Certification />
        </div>
    );
};

export default Profile;