import { Button } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import { Link, useNavigate } from "react-router-dom";
import Company from "../CompanyProfile/Company";
import SimillarCompanies from "../CompanyProfile/SimillarCompanies";

const CompanyPage=()=>{
    const navigate=useNavigate();
    return <div className="min-h[100vh] bg-mine-shaft-950 font-['poppins'] p-4">
           
    
        <Button leftSection={<IconArrowLeft size={20} />} color='brightSun.4' my="md" onClick={()=>navigate(-1)} variant="light">Back</Button>
   
    <div className="flex gap-5 justify-between">
        <Company/>
        <SimillarCompanies/>

    </div>
</div>
}
export default CompanyPage;