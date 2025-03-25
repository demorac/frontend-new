import axiosInstance from "../Interceptor/AxiosInterceptor";

const postJob = async (job:any) => {
    return axiosInstance.post(`/jobs/post`, job) // ✅ Fixed URL and Payload
        .then(res => res.data)
        .catch(error => { throw error; });
};
const getAllJobs = async () => {
    return axiosInstance.get(`/jobs/getAll`) // ✅ Fixed URL and Payload
        .then(res => res.data)
        .catch(error => { throw error; });
};
const getJob = async (id: any) => {
    return axiosInstance.get(`/jobs/get/${id}`) // ✅ Correct
        .then(res => res.data)
        .catch(error => { throw error; });
};

const applyJob = async (id:any, applicant:any) => {
    return axiosInstance.post(`/jobs/apply/${id}`,applicant) // ✅ Correct
        .then(res => res.data)
        .catch(error => { throw error; });
};

const getJobsPostedBy = async (id:any) => {
    return axiosInstance.get(`/jobs/postedBy/${id}`) // ✅ Correct
        .then(res => res.data)
        .catch(error => { throw error; });
};

const changeAppStatus = async (application:any) => {
    return axiosInstance.post(`/jobs/changeAppStatus`, application) // ✅ Correct
        .then(res => res.data)
        .catch(error => { throw error; });
};
const getMatchingProfiles = async (jobId: any) => {
    console.log("Fetching matching profiles for job:", jobId); // ✅ Debugging Log
    return axiosInstance.get(`http://localhost:8080/jobs/matching-profiles/${jobId}`)
        .then(res => res.data)
        .catch(error => {
            console.error("Backend Error:", error.response?.data); // ✅ Debugging
            throw error;
        });
};






export{postJob,getAllJobs,getJob,applyJob,getJobsPostedBy,changeAppStatus,getMatchingProfiles};