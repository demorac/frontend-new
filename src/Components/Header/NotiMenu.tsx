import { Menu, rem, Indicator } from "@mantine/core";
import { IconBell, IconCheck } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Notification } from '@mantine/core';
import { getNotifications, readNotifications } from "../../Services/NotiService";

const NotiMenu = () => {
    const profile = useSelector((state: any) => state.profile);
    const [opend, setOpend] = useState(false);
    const user = useSelector((state: any) => state.user);
    const [notifications, setNotifications] = useState<any>([]);

    const unread = (index: number) => {
        let notis = [...notifications];
        notis = notis.filter((noti: any, i: number) => i != index);
        setNotifications(notis);
        readNotifications(notifications[index].id).then((res) => {
            // console.log(res);
        }).catch((err) => {
            console.log(err);
        })
    }

    useEffect(() => {
        getNotifications(user.id).then((res) => {
            // console.log(res);
            setNotifications(res);
        }).catch((err) => {
            console.log(err);
        })
    }, [user]);

    return (
        <div>
           <Menu shadow="md" width={300} position="bottom-end">
                <Menu.Target>
                    {/* Notification Bell Icon */}
                    <div className="bg-mine-shaft-900 p-1.5 rounded-full">
                        <Indicator disabled={notifications.length <= 0} color="brightSun.4" offset={6} size={8} processing>
                            <IconBell stroke={1.5} />
                        </Indicator>
                    </div>
                </Menu.Target>

                <Menu.Dropdown>
                    <div className="flex flex-col gap-1">
                        {
                            notifications.map((noti: any, index: number) => <Notification key={index} className="hover:bg-mine-shaft-900 cursor-pointer" onClose={() => unread(index)} icon={<IconCheck style={{ width: rem(20), height: rem(20) }} />} color="teal" title={noti.action} mt="md">
                                {noti.message}
                            </Notification>
                            )
                        }
                        {
                            notifications.length == 0 && <div className="text-center text-mine-shaft-300">No Notifications</div>
                        }
                    </div>
                </Menu.Dropdown>
            </Menu>
        </div>
    );
}

export default NotiMenu;