import React, {useState} from 'react';
import './login.routes.scss';
import { useNavigate } from 'react-router-dom';
import { BASE_SERVER_URL } from '../../utils/env.js';

const Login = () => {
    const navigate = useNavigate();
    const [uname, setUname] = useState('');
    const [password, setPassword] = useState('');

    const handleUnameChange = (event) => {
        setUname(event.target.value);
        console.log(uname);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }

    const handleSubmit = async () => {
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
        console.log(data);

        if (result.ok) {
            localStorage.setItem("accessToken", data.accessToken);
            localStorage.setItem("refreshToken", data.refreshToken);
            navigate('/dashboard');
        }else{
            // for testing
            console.log(result);
        }
    }

    return (
        <div className='login-container'>
            <div className='login-inner-container'>
                <form>
                    <label htmlFor="uname">Username</label>
                    <input
                        type="text"
                        name="uname"
                        id="uname"
                        value={uname}
                        onChange={handleUnameChange}
                    />

                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        value={password}
                        onChange={handlePasswordChange}
                    />
                </form>
                <button onClick={handleSubmit}>Login</button>
            </div>
        </div>
    );
};

export default Login;
