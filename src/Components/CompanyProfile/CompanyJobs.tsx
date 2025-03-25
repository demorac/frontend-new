import JobCard from "../FindJobs/JobCard";
import { jobList } from "../LandingPage/DATA";

const CompanyJobs=()=>{
    return <div className="flex mt-10 flex-wrap gap-10">        {
        jobList.map((job, index)=><JobCard key={index} {...job}/>)
    }
    </div>
}
export default CompanyJobs;