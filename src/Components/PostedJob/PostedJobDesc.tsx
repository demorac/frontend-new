import { Badge, Tabs, Button, Collapse } from "@mantine/core";
import TalentCard from "../FindTalent/TalentCard";
import { useEffect, useState } from "react";
import Job from "./Job";

const PostedJobDesc = (props: any) => {
    const [tab, setTab] = useState("overview");
    const [arr, setArr] = useState<any>([]);
    const [collapseOpen, setCollapseOpen] = useState(false);

    const handleChangeTab = (value: any) => {
        setTab(value);
        const applicants = props.applicants || []; // Ensure applicants is defined
        if (value === "applicants") {
            setArr(applicants.filter((x: any) => x.applicationStatus === "APPLIED"));
        } else if (value === "invited") {
            setArr(applicants.filter((x: any) => x.applicationStatus === "INTERVIEWING"));
        } else if (value === "offered") {
            setArr(applicants.filter((x: any) => x.applicationStatus === "OFFERED"));
        } else if (value === "rejected") {
            setArr(applicants.filter((x: any) => x.applicationStatus === "REJECTED"));
        }
        setCollapseOpen(false); // Close the collapse after a tab is selected
    };

    useEffect(() => {
        handleChangeTab("overview");
    }, [props]);

    return (
        <div className="mt-5 w-full md:w-3/4 px-2 md:px-5">
            {props.jobTitle ? (
                <>
                    <div className="text-xl md:text-2xl font-semibold flex items-center">
                        {props.jobTitle}
                        <Badge variant="light" ml="sm" size="sm" color="brightSun.4">
                            {props.jobStatus}
                        </Badge>
                    </div>
                    <div className="font-medium text-mine-shaft-300 mb-5">{props.location}</div>

                    {/* Tabs for larger screens */}
                    <div className="hidden md:block">
                        <Tabs variant="outline" radius="lg" value={tab} onChange={handleChangeTab}>
                            <Tabs.List className="[&_button]:!text-lg font-semibold [&_button[data-active='true']]:!text-bright-sun-400 mb-5">
                                <Tabs.Tab value="overview">Overview</Tabs.Tab>
                                <Tabs.Tab value="applicants">Applicants</Tabs.Tab>
                                <Tabs.Tab value="invited">Invited</Tabs.Tab>
                                <Tabs.Tab value="offered">Offered</Tabs.Tab>
                                <Tabs.Tab value="rejected">Rejected</Tabs.Tab>
                            </Tabs.List>

                            <Tabs.Panel value="overview" className="[&>div]:w-full">
                                <Job {...props} editMode={true} Closed={props.jobStatus === "CLOSED"} />
                            </Tabs.Panel>

                            <Tabs.Panel value="applicants">
                                <div className="flex mt-10 flex-wrap gap-5 md:gap-10 justify-around">
                                    {arr.length > 0 ? (
                                        arr.map((talent: any, index: any) => (
                                            <TalentCard key={index} {...talent} posted={true} />
                                        ))
                                    ) : (
                                        <div className="text-xl md:text-2xl font-semibold">No Applicants</div>
                                    )}
                                </div>
                            </Tabs.Panel>

                            <Tabs.Panel value="invited">
                                <div className="flex mt-10 flex-wrap gap-5 md:gap-10 justify-around">
                                    {arr.length > 0 ? (
                                        arr.map((talent: any, index: any) => (
                                            <TalentCard key={index} {...talent} invited />
                                        ))
                                    ) : (
                                        <div className="text-xl md:text-2xl font-semibold">No Invited Candidates</div>
                                    )}
                                </div>
                            </Tabs.Panel>

                            <Tabs.Panel value="offered">
                                <div className="flex mt-10 flex-wrap gap-5 md:gap-10 justify-around">
                                    {arr.length > 0 ? (
                                        arr.map((talent: any, index: any) => (
                                            <TalentCard key={index} {...talent} offered />
                                        ))
                                    ) : (
                                        <div className="text-xl md:text-2xl font-semibold">No Offered Candidates</div>
                                    )}
                                </div>
                            </Tabs.Panel>

                            <Tabs.Panel value="rejected">
                                <div className="flex mt-10 flex-wrap gap-5 md:gap-10 justify-around">
                                    {arr.length > 0 ? (
                                        arr.map((talent: any, index: any) => (
                                            <TalentCard key={index} {...talent} rejected />
                                        ))
                                    ) : (
                                        <div className="text-xl md:text-2xl font-semibold">No Rejected Candidates</div>
                                    )}
                                </div>
                            </Tabs.Panel>
                        </Tabs>
                    </div>

                    {/* Collapse for smaller screens */}
                    <div className="md:hidden">
                        <Button fullWidth onClick={() => setCollapseOpen((o) => !o)}>
                            {tab.charAt(0).toUpperCase() + tab.slice(1)}
                        </Button>

                        <Collapse in={collapseOpen}>
                            <Tabs variant="outline" radius="lg" value={tab} onChange={handleChangeTab} >
                                <Tabs.List className="[&_button]:!text-lg font-semibold [&_button[data-active='true']]:!text-bright-sun-400 mb-5">
                                    <Tabs.Tab value="overview">Overview</Tabs.Tab>
                                    <Tabs.Tab value="applicants">Applicants</Tabs.Tab>
                                    <Tabs.Tab value="invited">Invited</Tabs.Tab>
                                    <Tabs.Tab value="offered">Offered</Tabs.Tab>
                                    <Tabs.Tab value="rejected">Rejected</Tabs.Tab>
                                </Tabs.List>
                            </Tabs>
                        </Collapse>

                        <div className="mt-5">
                            {tab === "overview" && (
                                <Job {...props} editMode={true} Closed={props.jobStatus === "CLOSED"} />
                            )}
                            {tab === "applicants" && (
                                <div className="flex mt-10 flex-wrap gap-5 justify-around">
                                    {arr.length > 0 ? (
                                        arr.map((talent: any, index: any) => (
                                            <TalentCard key={index} {...talent} posted={true} />
                                        ))
                                    ) : (
                                        <div className="text-xl font-semibold">No Applicants</div>
                                    )}
                                </div>
                            )}
                            {tab === "invited" && (
                                <div className="flex mt-10 flex-wrap gap-5 justify-around">
                                    {arr.length > 0 ? (
                                        arr.map((talent: any, index: any) => (
                                            <TalentCard key={index} {...talent} invited />
                                        ))
                                    ) : (
                                        <div className="text-xl font-semibold">No Invited Candidates</div>
                                    )}
                                </div>
                            )}
                            {tab === "offered" && (
                                <div className="flex mt-10 flex-wrap gap-5 justify-around">
                                    {arr.length > 0 ? (
                                        arr.map((talent: any, index: any) => (
                                            <TalentCard key={index} {...talent} offered />
                                        ))
                                    ) : (
                                        <div className="text-xl font-semibold">No Offered Candidates</div>
                                    )}
                                </div>
                            )}
                            {tab === "rejected" && (
                                <div className="flex mt-10 flex-wrap gap-5 justify-around">
                                    {arr.length > 0 ? (
                                        arr.map((talent: any, index: any) => (
                                            <TalentCard key={index} {...talent} rejected />
                                        ))
                                    ) : (
                                        <div className="text-xl font-semibold">No Rejected Candidates</div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </>
            ) : (
                <div className="text-2xl font-semibold flex justify-center items-center min-h-[70vh]">
                    Job Not Selected
                </div>
            )}
        </div>
    );
};

export default PostedJobDesc;