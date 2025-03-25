import axiosInstance from "../Interceptor/AxiosInterceptor";




// ✅ Register a new user
const registerUser = async (user: any) => {
    return axiosInstance.post(`/users/register`, user)
        .then(res => res.data)
        .catch(error => { throw error; });
};

// ✅ Login user
const loginUser = async (login: any) => {
    return axiosInstance.post(`/users/login`, login)
        .then(res => res.data)
        .catch(error => { throw error; });
};

// ✅ Send OTP to email
const sendOtp = async (email: string) => {
    return axiosInstance.post(`/users/sendOtp/${email}`)
        .then(res => res.data)
        .catch(error => { throw error; });
};

// ✅ Verify OTP
const verifyOtp = async (email: string, otp: string) => {
    return axiosInstance.get(`/users/verifyOtp/${email}/${otp}`)
        .then(res => res.data)
        .catch(error => { throw error; });
};

// ✅ Change password
const changePass = async (email: string, password: string) => {
    return axiosInstance.post(`/users/changePass`, { email, password })
        .then(res => res?.data)
        .catch(error => {
            console.error("changePass API Error:", error?.response?.data || error.message);
            throw error.response?.data || { errorMessage: "Something went wrong!" };
        });
};

// ✅ Send Interview Email
const sendInterviewEmail = async (
    email: string, 
    jobTitle: string, 
    company: string, 
    interviewTime: string, 
    interviewLocation: string // ✅ Add location
) => {
    return axiosInstance.post(`/users/sendInterviewEmail`, { 
        email, 
        jobTitle, 
        company, 
        interviewTime, 
        interviewLocation // ✅ Send location in request body
    })
    .then(res => res.data)
    .catch(error => {
        console.error("sendInterviewEmail API Error:", error?.response?.data || error.message);
        throw error.response?.data || { errorMessage: "Failed to send interview email!" };
    });
};


export { registerUser, loginUser, sendOtp, verifyOtp, changePass, sendInterviewEmail };
