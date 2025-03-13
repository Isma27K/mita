import React, {useState, useContext} from 'react';
import './sider.style.scss';
import {Divider, notification} from 'antd';
import logo from '../../assets/X.svg'
import {useNavigate} from 'react-router-dom';
import {UserContext} from '../../contexts/userContexts.js'

const SidePanel = ({ isCollapsed, onToggle }) => {

    const {setContent} = useContext(UserContext);

    const nav = useNavigate();

    const [selected, setSelected] = useState(1);

    const handleSelect = (value) => {
        setSelected(value);
        setContent(value);
    };

    const logout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        openNotification("success", "Logged out", "Logged out Successfully");
        nav('/login');
    }


    const openNotification = (type, message, description) => {
        notification[type]({
            message,
            description,
        })
    }

    return (
        <aside className={`side-panel ${isCollapsed ? 'collapsed' : ''}`}>
            <div className="side-panel-header">
                {/*put the logo here mann*/}
                <div className="logo">
                    <img className="logo-icon" src={logo} alt="logo" width={50} height={50} />
                    <span>MiTa System</span>
                </div>
                <button className="collapse-btn" onClick={onToggle}>
                    {isCollapsed ? '→' : '←'}
                </button>
            </div>
            <nav className="side-panel-nav">
                <ul>
                    <Divider/>
                    <li>
                        {/*logic need to be change later*/}
                        <a className={`${selected === 1 ? 'activate' : ''}`} onClick={() => handleSelect(1)}>
                            <span className="icon">📊</span>
                            <span className="label">Dashboard</span>
                        </a>
                    </li>
                    <li>
                        <a className={`${selected === 2 ? 'activate' : ''}`} onClick={() => handleSelect(2)}>
                            <span className="icon">📈</span>
                            <span className="label">Analytics</span>
                        </a>
                    </li>
                    <li>
                        <a className={`${selected === 3 ? 'activate' : ''}`} onClick={() => handleSelect(3)}>
                            <span className="icon">📃️</span>
                            <span className="label">Report Cheat</span>
                        </a>
                    </li>
                    <li>
                        <a className={`${selected === 4 ? 'activate' : ''}`} onClick={() => handleSelect(4)}>
                            <span className="icon">⚙️</span>
                            <span className="label">Settings</span>
                        </a>
                    </li>
                    <li>
                        <a className="sider-logout-activate-hover bottom-component" onClick={logout}>
                            <span className="icon">👋</span>
                            <span className="label">Logout</span>
                        </a>
                    </li>
                </ul>
            </nav>
        </aside>
    );
}

export default SidePanel;