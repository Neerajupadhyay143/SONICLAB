import { jwtDecode } from "jwt-decode";
export const isTokenValid = () => {

    const token = localStorage.getItem("token");
    if (!token) return false;
    try {
        const decode = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        return decode.exp > currentTime;
    } catch (err) {
        return false;
    }
}
