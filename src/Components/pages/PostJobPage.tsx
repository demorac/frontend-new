import { Divider } from "@mantine/core";
import PostJob from "../PostJob/PostJob";

const PostJobPage = () => {
    
    return (
        <div className="min-h[100vh] bg-mine-shaft-950 font-['poppins'] p-4">
            
            <div className="flex gap-5">
            <PostJob/>
            </div>
        </div>
    );
};

export default PostJobPage;
