import { Tabs, Drawer, Button, Title } from "@mantine/core";
import { useEffect, useState } from "react";
import PostedJobCard from "./PostedJobCard";
import { IconMenu } from "@tabler/icons-react";

const PostedJob = (props: any) => {
    const [activeTab, setActiveTab] = useState<string | null>("ACTIVE");
    const [drawerOpen, setDrawerOpen] = useState(false);

    useEffect(() => {
        setActiveTab(props.job?.jobStatus || "ACTIVE");
    }, [props.job]);

    const tabList = (
        <Tabs.List className="[&_button[aria-selected='false']]:bg-mine-shaft-900 font-medium">
            <Tabs.Tab value="ACTIVE">
                Active [{props.jobList?.filter((job: any) => job.jobStatus === "ACTIVE").length || 0}]
            </Tabs.Tab>
            <Tabs.Tab value="DRAFT">
                Drafts [{props.jobList?.filter((job: any) => job.jobStatus === "DRAFT").length || 0}]
            </Tabs.Tab>
            <Tabs.Tab value="CLOSED">
                Closed [{props.jobList?.filter((job: any) => job.jobStatus === "CLOSED").length || 0}]
            </Tabs.Tab>
        </Tabs.List>
    );

    return (
        <div className="w-full md:w-1/5 mt-5">
            {/* Menu button for small screens (above job title) */}
            <div className="md:hidden flex justify-start w-full mb-5">
                <Button leftSection={<IconMenu />} variant="outline" color="brightSun.4" onClick={() => setDrawerOpen(true)}>
                    Jobs
                </Button>
            </div>

            {/* Drawer for small screens */}
            <Drawer
                opened={drawerOpen}
                onClose={() => setDrawerOpen(false)}
                title=" " // Remove the Drawer title
                padding="md"
                size="xs"
                position="left"
            >
                <Tabs autoContrast variant="pills" value={activeTab} onChange={setActiveTab}>
                    {tabList}
                </Tabs>
                <div className="flex flex-col gap-5 mt-5">
                    {props.jobList
                        ?.filter((job: any) => job?.jobStatus === activeTab)
                        .map((item: any, index: number) => (
                            <PostedJobCard key={index} {...item} />
                        ))}
                </div>
            </Drawer>

            {/* Tabs and Jobs for medium screens and up */}
            <div className="hidden md:block">
                <div className="text-2xl font-semibold mb-5">Jobs</div>
                <Tabs autoContrast variant="pills" value={activeTab} onChange={setActiveTab}>
                    {tabList}
                </Tabs>
                <div className="flex flex-col gap-5 mt-5">
                    {props.jobList
                        ?.filter((job: any) => job?.jobStatus === activeTab)
                        .map((item: any, index: number) => (
                            <PostedJobCard key={index} {...item} />
                        ))}
                </div>
            </div>
        </div>
    );
};

export default PostedJob;
