// refreshToken.js
import { BASE_SERVER_URL } from '../../utils/env.js';

const ReToken = async () => {
    const localRefreshToken = localStorage.getItem("refreshToken");

    try {
        const result = await fetch(`${BASE_SERVER_URL}/api/v1/refresh`, {
            method: "POST",
            body: JSON.stringify({
                refresh_token: localRefreshToken,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const data = await result.json();

        if (result.ok) {
            localStorage.setItem("accessToken", data.accessToken);
            localStorage.setItem("refreshToken", data.refreshToken);
            console.log(data);
            return true;
        } else {
            return false;
        }
    } catch (err) {
        console.log(err);
        return false;
    }
};

export default ReToken;
