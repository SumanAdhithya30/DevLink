import axios from "axios";

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if(token){
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


export const login = (credentials) => apiClient.post('/auth/login', credentials)
export const register = (userData) => apiClient.post('/auth/register', userData);
export const getMe = () => apiClient.get('/auth/me');

// for dev
export const getDevelopers = (params) => apiClient.get('/developers', { params });
export const addDeveloper = (developerData) => apiClient.post('/developers', developerData);
export const updateDeveloper = (id, developerData) => apiClient.put(`/developers/${id}`, developerData);
export const deleteDeveloper = (id) => apiClient.delete(`/developers/${id}`);

export default apiClient;
