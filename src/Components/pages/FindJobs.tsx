import { Divider } from "@mantine/core";
import Jobs from "../FindJobs/Jobs";
import SearchBar from "../FindJobs/SearchBar";


const FindJobs=()=>{
    return (<div className="min-h[100vh] bg-mine-shaft-950 font-['poppins']">
        <Divider mx="md" size="sm"  />
            <SearchBar/>
            <Divider mx="md" size="sm"  />
            <Jobs/>
   </div>
    )
}
export default FindJobs;