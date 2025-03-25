import { Tabs } from "@mantine/core";
import { useEffect, useState } from "react";
import { getAllJobs } from "../../Services/JobService";
import { useSelector } from "react-redux";
import Card from "../JobHistory/Card";


const InvitedCandi = () => {
    const profile = useSelector((state: any) => state.profile);
    const user = useSelector((state: any) => state.user);
    const [activeTab, setActiveTab] = useState<any>('INVITED');
    const [jobList, setJobList] = useState<any>([]);
    const [showList, setShowList] = useState<any>([]);

    useEffect(() => {
        getAllJobs().then((res) => {
            setJobList(res);
            setShowList(res.filter((job: any) => {
                let found = false;
                job.applicants?.forEach((applicant: any) => {
                    if (applicant.applicantId === user.id && applicant.applicationStatus === "INVITED") {
                        found = true;
                    }
                });
                return found;
            }));
        }).catch((err) => {
            console.log(err);
        });
    }, []);

    const handleTabChange = (value: string | null) => {
        setActiveTab(value);
        setShowList(jobList.filter((job: any) => {
            let found = false;
            job.applicants?.forEach((applicant: any) => {
                if (applicant.applicantId === user.id && applicant.applicationStatus === value) {
                    found = true;
                }
            });
            return found;
        }));
    };

    return (
        <div>
            <div className="text-2xl font-semibold mb-5">Invited Candidates</div>
            <Tabs value={activeTab} onChange={handleTabChange} variant="outline" radius="lg" defaultValue="INVITED">
                <Tabs.List className="[&_button]:!text-lg font-semibold [&_button[data-active='true']]:!text-bright-sun-400 mb-5">
                    <Tabs.Tab value="INVITED">Invited</Tabs.Tab>
                    <Tabs.Tab value="ACCEPTED">Accepted</Tabs.Tab>
                    <Tabs.Tab value="INTERVIEWING">Interviewing</Tabs.Tab>
                    <Tabs.Tab value="OFFERED">Offered</Tabs.Tab>
                    <Tabs.Tab value="REJECTED">Rejected</Tabs.Tab>
                </Tabs.List>

                <Tabs.Panel value={activeTab}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-6">
                        {showList.map((job: any, index: any) => (
                            <Card key={index} {...job} {...{ [activeTab.toLowerCase()]: true }} />
                        ))}
                    </div>
                </Tabs.Panel>
            </Tabs>
        </div>
    );
};

export default InvitedCandi;
