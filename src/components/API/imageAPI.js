import axiosClient from "./axiosCilent";


const imageAPI = {
    get(id) {
        const url = `/product/${id}`;
        return axiosClient.get(url);
    },
};

export default imageAPI;
