import { Button } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import { useNavigate, useParams } from "react-router-dom";
import ApplyJobComp from "../ApplyJob/ApplyJobComp";
import { useState, useEffect } from "react";
import { getJob } from "../../Services/JobService";


const ApplyJobPage = () => {
    const navigate=useNavigate();
    const {id}=useParams();
    const [job, setJob]=useState<any>(null);
    useEffect(()=>{
        window.scrollTo(0,0);
        getJob(id).then((res)=>{
            setJob(res);
        }).catch((err)=>{
            console.log(err);
        })
    }, [id])
    return (
        <div className="min-h[100vh] bg-mine-shaft-950 font-['poppins'] p-4">
            
            <div className="flex gap-5">
            
            <div className="hidden md:block">
    <Button 
        my="md" 
        onClick={() => navigate(-1)} 
        leftSection={<IconArrowLeft size={20} />} 
        color="brightSun.4" 
        variant="light"
    >
        Back
    </Button>
</div>

            
            <ApplyJobComp{...job}/>
            </div>
        </div>
    );
};

export default ApplyJobPage;