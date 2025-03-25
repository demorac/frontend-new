
import axiosInstance from "../Interceptor/AxiosInterceptor";



const getNotifications = async (id: any) => {
    if (!id) {
        console.error("Error: Notification ID is undefined");
        return Promise.reject("Notification ID is required");
    }

    return axiosInstance.get(`/notification/get/${id}`)
        .then(res => res.data)
        .catch(error => { throw error; });
};


const readNotifications = async (id:any) => {
    return axiosInstance.put(`/notification/read/${id}`) // ✅ Fixed URL and Payload
        .then(res => res.data)
        .catch(error => { throw error; });
};

export {getNotifications,readNotifications};