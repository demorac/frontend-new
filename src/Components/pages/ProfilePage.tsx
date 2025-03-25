import { Divider } from "@mantine/core";
import Profile from "../Profile/Profile";
import { profile } from "../LandingPage/DATA";

const ProfilePage=()=>{
    return  <div className="min-h[90vh] bg-mine-shaft-950 font-['poppins']">
        <Divider mx="md" mb="xl"/>
        <Profile {...profile[0]} />
        
</div>
}
export default ProfilePage;