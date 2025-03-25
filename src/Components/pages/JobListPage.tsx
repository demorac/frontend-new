import { Divider } from "@mantine/core";
import JobList from "../JobList/JobList";

const JobListPage = () => {
    return (
        <div className="min-h-screen bg-mine-shaft-950 font-['poppins']">
            <Divider mx="md" size="sm" />
            <JobList />
            <Divider mx="md" size="sm" />
        </div>
    );
};

export default JobListPage;
