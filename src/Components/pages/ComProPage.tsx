import { Divider } from "@mantine/core";
import CompanyProfileForm from "../ComPro/CompanyProfileForm";

const ComProPage = () => {
    return (
        <div className="min-h-screen bg-mine-shaft-950 font-['poppins']">
                <CompanyProfileForm/>
            <Divider mx="md" size="sm" />
        </div>
    );
};

export default ComProPage;