import React, {useState} from 'react';
import './login.routes.scss';
import { useNavigate } from 'react-router-dom';
import { BASE_SERVER_URL } from '../../utils/env.js';
import { notification } from "antd";

const Login = () => {
    const navigate = useNavigate();
    const [uname, setUname] = useState('');
    const [password, setPassword] = useState('');

    const openNotification = (type, message, description) => {
        notification[type]({
            message,
            description,
        })
    }


    const handleUnameChange = (event) => {
        setUname(event.target.value);
        //console.log(uname);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }

    const handleSubmit = async () => {


        if (uname === "" || password === "") {
            openNotification('error', 'Empty Filed', 'Dont Leave The Filed empty')
            return;
        }

        const result = await fetch(`${BASE_SERVER_URL}/api/v1/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "uname": uname,
                "password": password,
            })
        });


        const data = await result.json();
        //console.log(data);

        if (result.ok) {
            localStorage.setItem("accessToken", data.accessToken);
            localStorage.setItem("refreshToken", data.refreshToken);
            navigate('/dashboard');
        }else{
            // for testing
            openNotification('error', 'Wrong Credential', 'Please try again')
            //console.log(result);
        }
    }

    return (
        <div className='login-container'>
            <div className='login-inner-container'>
                <div className='login-form'>
                    <h1>Login</h1>
                    <label htmlFor="uname">Username</label>
                    <input
                        className="login-form-gap-small"
                        type="text"
                        name="uname"
                        id="uname"
                        value={uname}
                        onChange={handleUnameChange}
                    />

                    <label className="login-form-gap" htmlFor="password">Password</label>
                    <input
                        className="login-form-gap-small"
                        type="password"
                        name="password"
                        id="password"
                        value={password}
                        onChange={handlePasswordChange}
                    />
                    <button className="login-form login-form-gap" onClick={handleSubmit}>Login</button>
                </div>

            </div>
        </div>
    );
};

export default Login;
