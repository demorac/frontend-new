import { Menu, Avatar, Switch, rem, useMantineColorScheme } from "@mantine/core";
import { IconUserCircle, IconFileText, IconMoonStars, IconSun, IconLogout2 } from "@tabler/icons-react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom"; // ✅ Import useNavigate
import { removeUser } from "../../Slices/UserSlice";

const ProfileMenu = () => {
    const profile = useSelector((state: any) => state.profile);
    const dispatch = useDispatch();
    const user = useSelector((state: any) => state.user);
    const navigate = useNavigate(); // ✅ Initialize navigate
    const { colorScheme, toggleColorScheme } = useMantineColorScheme();

    /** ✅ Logout Function */
    const handleLogout = () => {
        console.warn("User logging out...");

        // ✅ Remove token & jwt from localStorage
        localStorage.removeItem("token");
        localStorage.removeItem("jwt");

        // ✅ Clear user from Redux store
        dispatch(removeUser());

        // ✅ Redirect to login page
        navigate("/login", { replace: true });
    };

    return (
        <Menu shadow="md" width={200} position="bottom-end">
            <Menu.Target>
                <div className="flex gap-2 cursor-pointer items-center">
                    <div className="hidden sm:block">{profile.name}</div>
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
            </Menu.Target>

            <Menu.Dropdown>
                <Link to='/profile'>
                    <Menu.Item leftSection={<IconUserCircle size={14} />}>Profile</Menu.Item>
                </Link>
                <Menu.Item leftSection={<IconFileText size={14} />}>Resume</Menu.Item>

                {/* ✅ Theme Toggle */}
                <Menu.Item
                    leftSection={<IconMoonStars size={14} />}
                    rightSection={
                        <Switch
                            checked={colorScheme === "dark"}
                            onChange={() => toggleColorScheme()}
                            size="md"
                            color="dark.4"
                            onLabel={<IconSun style={{ width: rem(16), height: rem(16) }} stroke={2.5} color="yellow" />}
                            offLabel={<IconMoonStars style={{ width: rem(16), height: rem(16) }} stroke={2.5} color="cyan" />}
                        />
                    }
                >
                    Dark Mode
                </Menu.Item>

                <Menu.Divider />
                <Menu.Item onClick={handleLogout} color="red" leftSection={<IconLogout2 size={14} />}>
                    Logout
                </Menu.Item>
            </Menu.Dropdown>
        </Menu>
    );
};

export default ProfileMenu;