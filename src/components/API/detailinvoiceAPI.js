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
    remove(data) {
        const url = `/detailinvoice`;
        return axiosClient.delete(url, data);
    },
};

export default detailInvoiceAPI;
