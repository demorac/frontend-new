import { Tabs, Collapse, Button } from "@mantine/core";
import { jobList } from "../LandingPage/DATA";
import Card from "./Card";
import { useEffect, useState } from "react";
import { getAllJobs } from "../../Services/JobService";
import { useSelector } from "react-redux";

const JobHistory = () => {
    const profile = useSelector((state: any) => state.profile);
    const user = useSelector((state: any) => state.user);
    const [activeTab, setActiveTab] = useState<any>('APPLIED');
    const [jobList, setJobList] = useState<any>([]);
    const [showList, setShowList] = useState<any>([]);
    const [collapseOpen, setCollapseOpen] = useState(false);


    useEffect(() => {
        getAllJobs().then((res) => {
            setJobList(res);
            setShowList(res.filter((job: any) => {
                let found = false;
                job.applicants?.forEach((applicant: any) => {
                    if (applicant.applicantId == user.id && applicant.applicationStatus == "APPLIED") {
                        found = true;
                    }
                })
                return found;
            }));
        }).catch((err) => {
            console.log(err);
        })
    }, [])

    const handleTabChange = (value: string | null) => {
        setActiveTab(value);
        setCollapseOpen(false); // Close the collapse after tab selection
        if (value == "SAVED") {
            setShowList(jobList.filter((job: any) => profile.savedJobs?.includes(job.id)));
        }
        else {
            setShowList(jobList.filter((job: any) => {
                let found = false;
                job.applicants?.forEach((applicant: any) => {
                    if (applicant.applicantId == user.id && applicant.applicationStatus == value) {
                        found = true;
                    }
                })
                return found;
            }));
        }

    }

    return <div className="w-full">
        <div className="text-2xl font-semibold mb-5">Job History</div>

        {/* Collapse for smaller screens */}
        <div className="md:hidden">
            <Button fullWidth onClick={() => setCollapseOpen((o) => !o)}>
                {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
            </Button>

            <Collapse in={collapseOpen}>
                <Tabs value={activeTab} onChange={handleTabChange} variant="outline" radius="lg">
                    <Tabs.List className="[&_button]:!text-lg font-semibold [&_button[data-active='true']]:!text-bright-sun-400 mb-5">
                        <Tabs.Tab value="APPLIED">Applied</Tabs.Tab>
                        <Tabs.Tab value="SAVED">Saved</Tabs.Tab>
                        <Tabs.Tab value="OFFERED">offered</Tabs.Tab>
                        <Tabs.Tab value="INTERVIEWING">Interviewing</Tabs.Tab>
                    </Tabs.List>
                </Tabs>
            </Collapse>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
                {
                    showList.map((job: any, index: any) => <Card key={index} {...job} {...{ [activeTab.toLowerCase()]: true }}
                    />)
                }
            </div>
        </div>

        {/* Tabs for medium screens and up */}
        <div className="hidden md:block">
            <Tabs value={activeTab} onChange={handleTabChange} variant="outline" radius="lg">
                <Tabs.List className="[&_button]:!text-lg font-semibold [&_button[data-active='true']]:!text-bright-sun-400 mb-5">
                    <Tabs.Tab value="APPLIED">Applied</Tabs.Tab>
                    <Tabs.Tab value="SAVED">Saved</Tabs.Tab>
                    <Tabs.Tab value="OFFERED">offered</Tabs.Tab>
                    <Tabs.Tab value="INTERVIEWING">Interviewing</Tabs.Tab>
                </Tabs.List>

                <Tabs.Panel value={activeTab}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-6">
                        {
                            showList.map((job: any, index: any) => <Card key={index} {...job} {...{ [activeTab.toLowerCase()]: true }}
                            />)
                        }
                    </div>
                </Tabs.Panel>
            </Tabs>
        </div>
    </div>
}
export default JobHistory;