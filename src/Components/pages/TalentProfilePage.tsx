import { Button } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import { Link, useNavigate } from "react-router-dom";
import Profile from "../TalentProfile/Profile";
import { profile } from "../LandingPage/DATA";
import ReccomandTalent from "../TalentProfile/ReccomandTalent";
import { useEffect, useState } from "react";
import { getAllProfiles } from "../../Services/ProfileService";

const TalentProfilePage = () => {
    const navigate=useNavigate();
    const [talents, setTalents]=useState<any[]>([]);
    useEffect(()=>{
        getAllProfiles().then((res)=>{
            setTalents(res);
        }).catch((err)=>{
            console.log(err);
        })
    },[])
    console.log("Profile data:", profile); // Debugging step

    return (
        <div className="min-h[100vh] bg-mine-shaft-950 font-['poppins'] p-4">
           
            
                <Button onClick={()=>navigate(-1)} leftSection={<IconArrowLeft size={20} />} color='brightSun.4' variant="light">Back</Button>
            
            <div className="flex gap-5">
            <Profile {...profile[0]} />
            <ReccomandTalent talents={talents}/>

            </div>
        </div>
    );
};

export default TalentProfilePage;
