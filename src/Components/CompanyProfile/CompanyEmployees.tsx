import TalentCard from "../FindTalent/TalentCard";
import { talent } from "../LandingPage/DATA";

const CompanyEmployees=()=>{
    return <div className="flex mt-10 flex-wrap gap-10">
    {
        talent.map((talent, index)=>index<6 &&<TalentCard key={index} {...talent}  />)
    }
</div>
}
export default CompanyEmployees;