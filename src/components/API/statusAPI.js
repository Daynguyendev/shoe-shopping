import axiosClient from "./axiosCilent";

const statusAPI = {
    get() {
        const url = `/bill/status`;
        return axiosClient.get(url);
    },
    add(data) {
        const url = `/bill/status`;
        return axiosClient.post(url, data);
    },
    getStatus(id) {
        const url = `/bill/status/${id}`;
        return axiosClient.get(url, id);
    },
    getStatusNew(id_khach_hang, id_hd_dat) {
        const url = `/bill/status/${id_khach_hang}/${id_hd_dat}`;
        return axiosClient.get(url, id_khach_hang, id_hd_dat);
    },
    getAll() {
        const url = `/bill/status`;
        return axiosClient.get(url);
    },
    UpdateStatus(id_trang_thai, id_khach_hang, id_hd_dat) {
        const url = `/bill/status`;
        return axiosClient.patch(url, id_trang_thai, id_khach_hang, id_hd_dat);
    },
    getBillByStatus(data) {
        const url = `/bill/status/fillter`;
        return axiosClient.post(url, data);
    },

};

export default statusAPI;
