import { useEffect, useState } from "react";
import { getAllJobs } from "../../Services/JobService";
import { TextInput, Pagination } from "@mantine/core";
import Jobx from "./Jobx";

const JobList = () => {
    const [jobs, setJobs] = useState<any[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [activePage, setActivePage] = useState(1); // Current page
    const itemsPerPage = 6; // Jobs per page

    useEffect(() => {
        getAllJobs().then(setJobs).catch((err) => console.error("Error fetching jobs:", err));
    }, []);

    // ✅ Filter jobs: Only Active jobs + search input (case-insensitive)
    const filteredJobs = jobs
        .filter((job) => job.jobStatus === "ACTIVE") // Ensure job is Active
        .filter((job) => job.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()));

    // ✅ Paginate the jobs
    const startIndex = (activePage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedJobs = filteredJobs.slice(startIndex, endIndex);

    const totalPages = Math.ceil(filteredJobs.length / itemsPerPage);

    return (
        <div className="w-full px-4 md:w-4/5 mx-auto">  {/* Responsive width and padding */}
            <h2 className="text-2xl font-semibold mb-5 text-center md:text-left">All Jobs</h2> {/* Center on small, left on larger */}

            {/* ✅ Search Input for Job Title */}
            <TextInput
                placeholder="Search job by title..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="mb-4 w-full"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">  {/* Responsive grid layout */}
                {paginatedJobs.length > 0 ? (
                    paginatedJobs.map((job) => (
                        <Jobx key={job.id} {...job} />
                    ))
                ) : (
                    <p className="text-gray-500">No active jobs found.</p>
                )}
            </div>

            {/* ✅ Pagination Component */}
            {filteredJobs.length > itemsPerPage && (
                <div className="flex justify-center mt-8">
                    <Pagination
                        color="brightSun.4"
                        total={totalPages}
                        value={activePage}
                        onChange={setActivePage}
                    />
                </div>
            )}
        </div>
    );
};

export default JobList;