import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getJob, getMatchingProfiles } from "../../Services/JobService";
import Talentx from "./Talentx";
import { Tabs, Skeleton } from "@mantine/core";

const MatchingProfiles = () => {
    const { id } = useParams();
    const [job, setJob] = useState<any>(null);
    const [matchedProfiles, setMatchedProfiles] = useState<any[]>([]);
    const [offeredProfiles, setOfferedProfiles] = useState<any[]>([]);
    const [loading, setLoading] = useState(true); // ✅ Added loading state

    useEffect(() => {
        setLoading(true); // Start loading

        Promise.all([getJob(id), getMatchingProfiles(id)])
            .then(([jobData, profiles]) => {
                setJob(jobData);

                if (!Array.isArray(profiles)) {
                    console.error("Error: profiles is not an array", profiles);
                    return;
                }

                const filteredProfiles = profiles.filter(profile => {
                    if (!profile || !Array.isArray(profile.matchPercentages)) {
                        console.warn("Skipping invalid profile:", profile);
                        return false;
                    }
                    const totalMatch = profile.matchPercentages[2] || 0;
                    return totalMatch > 0;
                });

                const sortedProfiles = filteredProfiles.sort((a, b) => {
                    const totalMatchA = a.matchPercentages[2] || 0;
                    const totalMatchB = b.matchPercentages[2] || 0;
                    return totalMatchB - totalMatchA;
                });

                setMatchedProfiles(sortedProfiles);
            })
            .catch((error) => {
                console.error("Error fetching matching profiles:", error);
            })
            .finally(() => setLoading(false)); // ✅ Stop loading
    }, [id]);

    // ✅ Handle Accepting a Profile
    const handleAccept = (profile: any) => {
        setMatchedProfiles((prev) => prev.filter((p) => p.id !== profile.id));
        setOfferedProfiles((prev) => [...prev, profile]);
    };

    return (
        <div className="w-full px-4 md:w-4/5 mx-auto">
            {/* ✅ Job Title Skeleton */}
            {loading ? (
                <Skeleton height={30} width="50%" radius="sm" />
            ) : (
                <h2 className="text-xl md:text-2xl font-semibold">Matching Profiles</h2>
            )}

            {loading ? (
                <Skeleton height={18} width="70%" mt={10} radius="sm" />
            ) : (
                <p className="text-gray-500 text-sm">
                    Profiles that match the skills & education for {job?.jobTitle}
                </p>
            )}

            <Tabs defaultValue="matching">
                <Tabs.List>
                    <Tabs.Tab value="matching">Matching Profiles</Tabs.Tab>
                    <Tabs.Tab value="offered">Offered</Tabs.Tab>
                </Tabs.List>

                {/* ✅ Matching Profiles Tab */}
                <Tabs.Panel value="matching">
                    {loading ? (
                        // 🔄 Show Skeleton Cards while loading
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                            {[...Array(6)].map((_, index) => (
                                <Skeleton key={index} height={180} radius="md" />
                            ))}
                        </div>
                    ) : matchedProfiles.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                            {matchedProfiles.map((profile) => (
                                <Talentx
                                    key={profile.id}
                                    {...profile}
                                    jobId={id}
                                    invited={false}
                                    posted={true}
                                    onAccept={() => handleAccept(profile)}
                                    loading={loading} // ✅ Pass loading state to Talentx
                                />
                            ))}
                        </div>
                    ) : (
                        <p className="mt-5 text-gray-500">No matching profiles found.</p>
                    )}
                </Tabs.Panel>

                {/* ✅ Offered Profiles Tab */}
                <Tabs.Panel value="offered">
                    {loading ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                            {[...Array(3)].map((_, index) => (
                                <Skeleton key={index} height={180} radius="md" />
                            ))}
                        </div>
                    ) : offeredProfiles.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                            {offeredProfiles.map((profile) => (
                                <Talentx
                                    key={profile.id}
                                    {...profile}
                                    jobId={id}
                                    invited={false}
                                    posted={true}
                                    offered={true}
                                />
                            ))}
                        </div>
                    ) : (
                        <p className="mt-5 text-gray-500">No offered profiles yet.</p>
                    )}
                </Tabs.Panel>
            </Tabs>
        </div>
    );
};

export default MatchingProfiles;