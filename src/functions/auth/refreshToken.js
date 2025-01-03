import { useNavigation } from "react-router-dom";
import {BASE_SERVER_URL} from '../../utils/env.js';
//import { notification } from 'andt';



const ReToken = async ()  => {
    const nav = useNavigation();
    const localRefreshToken = localStorage.getItem("refreshToken");

    try{
        const result = await fetch(`${BASE_SERVER_URL}/api/v1/refresh`, {
            method: "POST",
            body: JSON.stringify({
                refresh_token: localRefreshToken,
            })
        });
        result.accessToken = undefined;
        result.refreshToken = undefined;

        // store access and refresh token and navigate to dashboard
        if (result.ok) {

            localStorage.setItem("accessToken", result.accessToken);
            localStorage.setItem("refreshToken", result.refreshToken);

            // we continue

        }else if (result.status === 401) {
            nav('/login');
        }

    }catch(err){
        console.log(err);
    }

}

export default ReToken;