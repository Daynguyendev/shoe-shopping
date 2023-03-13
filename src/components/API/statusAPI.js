import axiosClient from "./axiosCilent";

const statusAPI = {
    get() {
        const url = `/status`;
        return axiosClient.get(url);
    },
    add(data) {
        const url = `/status`;
        return axiosClient.post(url, data);
    },
    getStatus(id) {
        const url = `/status/${id}`;
        return axiosClient.get(url, id);
    },
    getStatusNew(id_khach_hang, id_hd_dat) {
        const url = `/status/${id_khach_hang}/${id_hd_dat}`;
        return axiosClient.get(url, id_khach_hang, id_hd_dat);
    },
    getAll() {
        const url = `/status`;
        return axiosClient.get(url);
    },
    UpdateStatus(id_trang_thai, id_khach_hang, id_hd_dat) {
        const url = `/status`;
        return axiosClient.patch(url, id_trang_thai, id_khach_hang, id_hd_dat);
    },
    getBillByStatus(data) {
        const url = `/status/fillter`;
        return axiosClient.post(url, data);
    },

};

export default statusAPI;
