import { Divider } from "@mantine/core";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import ApplyJobPage from "./ApplyJobPage";
import CompanyPage from "./CompanyPage";
import FindJobs from "./FindJobs";
import FindTalentPage from "./FindTalentPage";
import HomePage from "./HomePage";
import JobDescPage from "./JobDescPage";
import JobHistoryPage from "./JobHistoryPage";
import PostedJobPage from "./PostedJobPage";
import PostJobPage from "./PostJobPage";
import ProfilePage from "./ProfilePage";
import SignupPage from "./SignupPage";
import TalentProfilePage from "./TalentProfilePage";
import { useSelector } from "react-redux";
import JobListPage from "./JobListPage";
import MatchingProfiles from "../JobList/MatchingProfiles";
import ComProPage from "./ComProPage";
import InvitedCandidates from "./InvitedCandidates";
import ProtectedRoutes from "../../Services/ProtectedRoutes";
import PublicRoute from "../../Services/PublicRoute";
import Unauthorized from "../Header/Unauthorized";

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <div className="flex flex-col min-h-screen bg-mine-shaft-950">
                <Header />
                <Divider mx="md" />

                <main className="flex-grow px-6 py-8 bg-mine-shaft-950">
                    <Routes>
                        {/* ✅ HomePage is always accessible (No ProtectedRoutes or PublicRoute) */}
                        <Route path="/" element={<HomePage />} />

                        {/* Protected Routes (Require authentication) */}
                        <Route path="/find-jobs" element={<ProtectedRoutes allowedRoles={['APPLICANT']}><FindJobs /></ProtectedRoutes>} />
                        <Route path="/find-talent" element={<ProtectedRoutes allowedRoles={['EMPLOYER']}><FindTalentPage /></ProtectedRoutes>} />
                        <Route path="/post-job/:id" element={<ProtectedRoutes allowedRoles={['EMPLOYER']}><PostJobPage /></ProtectedRoutes>} />
                        <Route path="/posted-job/:id" element={<ProtectedRoutes allowedRoles={['EMPLOYER']}><PostedJobPage /></ProtectedRoutes>} />
                        <Route path="/job-history" element={<ProtectedRoutes allowedRoles={['APPLICANT']}><JobHistoryPage /></ProtectedRoutes>} />

                        {/* Public Routes (Accessible to all, but redirect if logged in) */}
                        <Route path="/signup" element={<PublicRoute><SignupPage /></PublicRoute>} />
                        <Route path="/login" element={<PublicRoute><SignupPage /></PublicRoute>} />

                        {/* Other Pages */}
                        <Route path="/company/:name" element={<CompanyPage />} />
                        <Route path="/jobs/:id" element={<JobDescPage />} />
                        <Route path="/apply-job/:id" element={<ApplyJobPage />} />
                        <Route path="/profile" element={<ProfilePage />} />
                        <Route path="/talent-profile/:id" element={<TalentProfilePage />} />
                        <Route path="/job-match" element={<JobListPage />} />
                        <Route path="/matching-profiles/:id" element={<MatchingProfiles />} />
                        <Route path="/compro" element={<ComProPage />} />
                        <Route path="/invited" element={<InvitedCandidates />} />
                        <Route path="/unauthorized" element={<Unauthorized />} />
                        
                        {/* Default Route */}
                        <Route path="*" element={<HomePage />} />
                    </Routes>
                </main>

                <Footer />
            </div>
        </BrowserRouter>
    );
};

export default AppRoutes;
