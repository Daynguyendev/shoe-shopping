import axiosClient from "./axiosCilent";

const detailInvoiceAPI = {
    get() {
        const url = `/detailinvoice`;
        return axiosClient.get(url);
    },
    add(data) {
        const url = `/detailinvoice`;
        return axiosClient.post(url, data);
    },
    delete(id_hd_nhap_hang) {
        const url = `/detailinvoice/${id_hd_nhap_hang}`;
        return axiosClient.delete(url);
    },
    getByNameInvoice(ten_hoa_don_nhap) {
        const url = `/detailinvoice/${ten_hoa_don_nhap}`;
        return axiosClient.get(url);
    },
    update(data) {
        const url = `/detailinvoice`;
        return axiosClient.patch(url, data);
    },

};

export default detailInvoiceAPI;
