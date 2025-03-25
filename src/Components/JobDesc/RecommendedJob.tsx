import { useParams } from "react-router-dom";
import JobCard from "../FindJobs/JobCard";
import { useEffect, useState } from "react";
import { getAllJobs } from "../../Services/JobService";
import { jobList } from "../LandingPage/DATA";


const RecommendedJob=()=>
{
     const [jobList, setJobList]=useState<any>(null);
    useEffect(() => {
        getAllJobs()
            .then((res) => {
                setJobList(res);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []); // Add empty array
    const {id}=useParams();
    return <div>
    <div className="text-xl font-semibold mb-5">Recommended Jobs </div>
    <div className="flex flex-col flex-wrap gap-5">
        {
            jobList?.map((job:any, index:number)=>index<4 && id!=job.id && <JobCard key={index} {...job}/>)
        }
        </div>    
</div>

}
export default RecommendedJob;