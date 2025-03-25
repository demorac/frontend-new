import { useEffect, useState, useMemo } from "react";
import JobCard from "./JobCard";
import Sort from "./Sort";
import { getAllJobs } from "../../Services/JobService";
import { useDispatch, useSelector } from "react-redux";
import { resetFilter } from "../../Slices/FilterSlices";
import { resetSort } from "../../Slices/SortSlice";
import { Pagination, Skeleton } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

const Jobs = () => {
    const dispatch = useDispatch();
    const filter = useSelector((state: any) => state.filter || {});
    const sortBy = useSelector((state: any) => state.sort.sortBy || "Relevance");
    const [filterJobs, setFilterJobs] = useState<any>([]);
    const [jobList, setJobList] = useState<any>([]);
    const [loading, setLoading] = useState(true);
    const [activePage, setPage] = useState(1);
    const jobsPerPage = 6;

    // Detect screen sizes below 1024px
    const isBelow1024 = useMediaQuery('(max-width: 1023px)');

    useEffect(() => {
        dispatch(resetSort());
        dispatch(resetFilter());
        setLoading(true);
        getAllJobs()
            .then((res) => {
                const activeJobs = res.filter((job: any) => job.jobStatus === "ACTIVE");
                setJobList(activeJobs);
                setFilterJobs(activeJobs);
                setPage(1);
            })
            .catch((err) => console.error("❌ Error fetching jobs:", err))
            .finally(() => setLoading(false));
    }, []);

    useEffect(() => {
        if (!jobList.length) return;

        let filteredJobs = [...jobList];

        if (filter["Job Title"] && filter["Job Title"].length > 0) {
            filteredJobs = filteredJobs.filter((job: any) =>
                filter["Job Title"].some((title: any) =>
                    (job?.jobTitle || "").toLowerCase().includes((title || "").toLowerCase())
                )
            );
        }
        if (filter.Location && filter.Location.length > 0) {
            filteredJobs = filteredJobs.filter((job: any) =>
                filter.Location.some((location: any) =>
                    (job?.location || "").toLowerCase().includes((location || "").toLowerCase())
                )
            );
        }
        if (filter.Experience && filter.Experience.length > 0) {
            filteredJobs = filteredJobs.filter((job: any) =>
                filter.Experience.some((exp: any) =>
                    (job?.experience || "").toLowerCase().includes((exp || "").toLowerCase())
                )
            );
        }
        if (filter["Job Type"] && filter["Job Type"].length > 0) {
            filteredJobs = filteredJobs.filter((job: any) =>
                filter["Job Type"].some((type: any) =>
                    (job?.jobType || "").toLowerCase().includes((type || "").toLowerCase())
                )
            );
        }

        if (filter.salary) {
            const [minSalary, maxSalary] = filter.salary;
            filteredJobs = filteredJobs.filter((job: any) => {
                const salary = parseFloat(job.packageOffered);
                return salary >= minSalary && salary <= maxSalary;
            });
        }

        setFilterJobs(filteredJobs);
        setPage(1);
    }, [filter, jobList]);

    const sortedJobs = useMemo(() => {
        let sorted = [...filterJobs];

        if (sortBy === "Most Recent") {
            sorted.sort((a, b) => new Date(b.postTime).getTime() - new Date(a.postTime).getTime());
        } else if (sortBy === "Salary: Low to High") {
            sorted.sort((a, b) => a.packageOffered - b.packageOffered);
        } else if (sortBy === "Salary: High to Low") {
            sorted.sort((a, b) => b.packageOffered - a.packageOffered);
        }

        return sorted;
    }, [sortBy, filterJobs]);

    // Pagination logic
    const startIndex = (activePage - 1) * jobsPerPage;
    const endIndex = startIndex + jobsPerPage;
    const jobsToDisplay = isBelow1024 ? sortedJobs.slice(startIndex, endIndex) : sortedJobs; // Conditionally slice for pagination
    const totalPages = Math.ceil(sortedJobs.length / jobsPerPage);

    return (
        <div className="container mx-auto px-4 py-5 w-full max-w-[1280px] 2xl:max-w-[1920px] overflow-hidden">
            <div className="flex flex-col sm:flex-row justify-between items-center">
                <div className="text-2xl font-semibold mb-2 sm:mb-0 2xl:text-3xl">Recommended Jobs</div>
                {/* Conditionally render the Sort button for screens below 1024px */}
                <div className="mt-2 sm:mt-0"> {/* Added a wrapper div */}
                    <Sort sortType="job" />
                </div>
            </div>

            {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 mt-6"> {/* Added 2xl grid */}
                    {Array.from({ length: 6 }).map((_, index) => (
                        <Skeleton key={index} height={250} radius="md" />
                    ))}
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 mt-6"> {/* Added 2xl grid */}
                        {jobsToDisplay.length > 0 ? (
                            jobsToDisplay.map((job: any, index: number) => (
                                <JobCard key={job.id || index} {...job} />
                            ))
                        ) : (
                            <div className="text-center col-span-full text-gray-500 text-lg">
                                No jobs found.
                            </div>
                        )}
                    </div>

                    <div className="flex justify-center mt-4">
                        <Pagination
                            value={activePage}
                            onChange={(page) => setPage(page)}
                            total={totalPages > 0 ? totalPages : 1}
                            color="brightSun.4"
                        />
                    </div>
                </>
            )}
        </div>
    );
};

export default Jobs;