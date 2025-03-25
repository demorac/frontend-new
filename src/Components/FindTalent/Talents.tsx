import { useEffect, useMemo, useState } from "react";
import Sort from "../FindJobs/Sort"; // Ensure correct import
import TalentCard from "./TalentCard";
import { getAllProfiles } from "../../Services/ProfileService";
import { useDispatch, useSelector } from "react-redux";
import { resetFilter } from "../../Slices/FilterSlices";
import { resetSort } from "../../Slices/SortSlice";
import { Pagination, Skeleton } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

const Talents = () => {
    const dispatch = useDispatch();
    const filter = useSelector((state: any) => state.filter || {});
    const sort = useSelector((state: any) => state.sort || {});
    const [filterTalents, setFilterTalents] = useState<any>([]);
    const [talents, setTalents] = useState<any>([]);
    const [loading, setLoading] = useState(true);
    const sortBy = sort.sortBy || "Relevance";
    const [activePage, setPage] = useState(1);
    const talentsPerPage = 6;

    // Detect screen sizes below 1024px
    const isBelow1024 = useMediaQuery("(max-width: 1023px)");

    useEffect(() => {
        dispatch(resetSort());
        dispatch(resetFilter());
        setLoading(true);
        getAllProfiles()
            .then((res) => {
                setTalents(res);
                setFilterTalents(res);
                setPage(1);
            })
            .catch((err) => console.error("Error loading talents:", err))
            .finally(() => setLoading(false));
    }, []);

    useEffect(() => {
        if (!talents.length) return;

        let filteredTalents = [...talents];

        if (filter?.name?.trim()) {
            const searchName = filter.name.trim().toLowerCase();
            filteredTalents = filteredTalents.filter((talent: any) =>
                (talent?.name?.trim().toLowerCase() || "").includes(searchName)
            );
        }
        if (filter["Job Title"] && filter["Job Title"].length > 0) {
            filteredTalents = filteredTalents.filter((talent: any) =>
                filter["Job Title"].some((title: any) =>
                    (talent?.jobTitle || "").toLowerCase().includes((title || "").toLowerCase())
                )
            );
        }
        if (filter.Location && filter.Location.length > 0) {
            filteredTalents = filteredTalents.filter((talent: any) =>
                filter.Location.some((location: any) =>
                    (talent?.location || "").toLowerCase().includes((location || "").toLowerCase())
                )
            );
        }
        if (filter.Skills && filter.Skills.length > 0) {
            filteredTalents = filteredTalents.filter((talent: any) =>
                filter.Skills.some((skill: any) =>
                    talent.skills?.some((talentSkill: any) =>
                        (talentSkill || "").toLowerCase().includes((skill || "").toLowerCase())
                    ) || false
                )
            );
        }
        if (filter.exp && filter.exp.length > 0) {
            filteredTalents = filteredTalents.filter(
                (talent: any) => filter.exp[0] <= talent.totalExp && talent.totalExp <= filter.exp[1]
            );
        }

        setFilterTalents([...filteredTalents]);
        setPage(1);
    }, [filter, talents]);

    const sortedTalents = useMemo(() => {
        let sorted = [...filterTalents];

        switch (sortBy) {
            case "Most Recent":
                sorted.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
                break;
            case "Experience: Low to High":
                sorted.sort((a, b) => a.totalExp - b.totalExp);
                break;
            case "Experience: High to Low":
                sorted.sort((a, b) => b.totalExp - a.totalExp);
                break;
            default:
                break;
        }
        return sorted;
    }, [sortBy, filterTalents]);

    // Pagination logic
    const startIndex = (activePage - 1) * talentsPerPage;
    const endIndex = startIndex + talentsPerPage;
    const talentsToDisplay = sortedTalents.slice(startIndex, endIndex);
    const totalPages = Math.ceil(sortedTalents.length / talentsPerPage);

    return (
        <div className="container mx-auto px-4 py-5 w-full max-w-[1280px] 2xl:max-w-[1920px] overflow-hidden">
            <div className="flex flex-col sm:flex-row justify-between items-center">
                <div className="text-2xl font-semibold mb-2 sm:mb-0 2xl:text-3xl">Talents</div>

                {/* Sorting Button - Always Visible */}
                <div className="mt-2 sm:mt-0">
                    <Sort sortType="talent" />
                </div>
            </div>

            {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 mt-6">
                    {Array.from({ length: 6 }).map((_, index) => (
                        <Skeleton key={index} height={250} radius="md" />
                    ))}
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 mt-6">
                        {talentsToDisplay.length > 0 ? (
                            talentsToDisplay.map((talent: any, index: number) => (
                                <TalentCard key={talent.id || index} {...talent} />
                            ))
                        ) : (
                            <div className="text-center col-span-full text-gray-500 text-lg">
                                No talents found.
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

export default Talents;
