import axiosClient from "./axiosCilent";

const cartAPI = {
    async getAll(id) {
        const url = `/cart/${id}`;
        return axiosClient.get(url);

    },
    // get(id) {
    //     const url = `/products/${id}`;
    //     return axiosClient.get(url);
    // },
    // update(id, data) {
    //     const url = `/products/${id}`;
    //     return axiosClient.patch(url, data);
    // },
    add(data) {
        const url = `/cart`;
        return axiosClient.post(url, data);
    },
    // delete(id) {
    //     const url = `/products/${id}`;
    //     return axiosClient.delete(url);
    // },
};

export default cartAPI;
