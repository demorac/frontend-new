import { useRef } from "react";
import { Button } from "@mantine/core";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

interface CompanyProfileProps {
    formData: any;
    onEdit: () => void;
}

const CompanyProfilePreview: React.FC<CompanyProfileProps> = ({ formData, onEdit }) => {
    const componentRef = useRef<HTMLDivElement>(null);

    const handleDownloadPDF = async () => {
        if (componentRef.current) {
            const buttons = document.querySelectorAll(".no-print");
            buttons.forEach((btn) => (btn as HTMLElement).style.display = "none");

            const canvas = await html2canvas(componentRef.current, {
                scale: 3,
                backgroundColor: "#fff",
                useCORS: true,
                scrollY: 0,
            });

            const imgData = canvas.toDataURL("image/png");
            const pdf = new jsPDF("p", "mm", "a4");
            const imgWidth = 210;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;

            pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
            pdf.save("Company_Profile.pdf");

            buttons.forEach((btn) => (btn as HTMLElement).style.display = "block");
        }
    };

    return (
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden p-6">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-500 p-6 flex items-center">
                {formData.companyImage && (
                    <img
                        src={formData.companyImage}
                        alt="Company Logo"
                        className="w-24 h-24 rounded-full border-4 border-white"
                    />
                )}
                <div className="ml-6 text-white">
                    <h1 className="text-3xl font-bold">{formData.companyName}</h1>
                    <p className="text-lg">{formData.brandName}</p>
                </div>
            </div>

            <div className="p-6 grid grid-cols-2 gap-6 border-b pb-4">
                <div>
                    <h2 className="text-2xl font-semibold mb-3 text-indigo-600">Summary</h2>
                    <p className="text-lg">{formData.summary || "Company description goes here."}</p>
                </div>
                <div>
                    <h2 className="text-2xl font-semibold mb-3 text-indigo-600">Industry</h2>
                    <p className="text-lg">{formData.industryName}</p>
                </div>
            </div>

            <div className="p-6 grid grid-cols-2 gap-4 text-lg">
                <p><strong>Founded:</strong> {formData.businessStartDate || "N/A"}</p>
                <p><strong>Owner:</strong> {formData.ownerName}</p>
                <p><strong>Employees:</strong> {formData.numEmployees}</p>
                <p><strong>Business Type:</strong> {formData.businessType}</p>
                <p><strong>Partnership:</strong> {formData.partnership ? "Yes" : "No"}</p>
                <p><strong>Multiple Businesses:</strong> {formData.multipleBusinesses ? "Yes" : "No"}</p>
            </div>

            <div className="mt-6 border-t pt-4 p-6">
                <h2 className="text-2xl font-semibold mb-3 text-indigo-600">Contact Information</h2>
                <div className="text-lg space-y-2">
                    <p><strong>Address:</strong> {formData.address}</p>
                    <p><strong>Contact:</strong> {formData.contact}</p>
                </div>
            </div>

            <div className="p-4 bg-gray-100 flex justify-between rounded-b-lg no-print">
                <Button onClick={onEdit} className="bg-yellow-500 text-white">Edit</Button>
                <Button onClick={handleDownloadPDF} className="bg-blue-600 text-white">Download PDF</Button>
            </div>
        </div>
    );
};

export default CompanyProfilePreview;
