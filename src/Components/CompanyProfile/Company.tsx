import { Avatar, AvatarGroup, Button, Divider, Tabs } from "@mantine/core";
import { IconBriefcase, IconMapPin } from "@tabler/icons-react";
import AboutComp from "./AboutComp";
import CompanyJobs from "./CompanyJobs";
import CompanyEmployees from "./CompanyEmployees";

const Company=()=>{
    return <div className="w-3/4">
                <div className="relative">
                <img className="rounded-t-2xl w-full h-48 object-cover" src="/Profile/banners.webp" alt="" />
                <img className="w-36 h-36 rounded-3xl p-2 bg-mine-shaft-950 -bottom-1/4 absolute left-5 border-mine-shaft-950 border-8" src="/Icons/Amazon.png" alt="" />
            </div>
            <div className="px-3 mt-12">
                <div className="text-3xl  font-semibold flex justify-between items-center">
                   Amazon
                    <AvatarGroup className="-ml-4">
                        <Avatar src="avatar.png"/>
                        <Avatar src="avatar1.png"/>
                        <Avatar src="avatar2.png"/>
                        <Avatar>10k+</Avatar>
                    </AvatarGroup>
                </div>
                <div className="flex gap-1 text-lg text-mine-shaft-300 items-center">
                    <IconMapPin className="h-5 w-5 stroke={1.5}" /> India
                </div>
            </div>
            <Divider mx="xs" my="xl" />
            <div>
            <Tabs variant="outline" radius="lg" defaultValue="about">
            <Tabs.List className="[&_button]:!text-lg font-semibold [&_button[data-active='true']]:!text-bright-sun-400 mb-5">
                <Tabs.Tab value="about">About</Tabs.Tab>
                <Tabs.Tab value="jobs">Jobs</Tabs.Tab>
                <Tabs.Tab value="employees">Employeess</Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="about"><AboutComp/></Tabs.Panel>
            <Tabs.Panel value="jobs"><CompanyJobs/></Tabs.Panel>
            <Tabs.Panel value="employees"><CompanyEmployees/></Tabs.Panel>
            </Tabs>
            </div>
    </div>
}
export default Company;