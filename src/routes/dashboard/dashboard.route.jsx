import React, { useState, useContext } from 'react';
import './dashboard.route.scss';
import Header from '../../components/header/header.component';
import SidePanel from '../../components/sider/sider.component';
import { UserContext } from '../../contexts/userContexts.js'; // Import the Context, not the Provider

const DashboardRoute = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const { content } = useContext(UserContext); // Use the Context object here

    const renderContent = () => {
        if (content === 1) {
            return (
                <div>
                    this is 1
                </div>
            );
        }
        else if (content === 2) {
            return (
                <div>
                    this is 2
                </div>
            );
        }
        return null; // Handle case where content is neither 1 nor 2
    };

    return (
        <div className="dashboard-layout">
            <SidePanel
                isCollapsed={isCollapsed}
                onToggle={() => setIsCollapsed(!isCollapsed)}
            />

            <div className={`main-content ${isCollapsed ? 'content-expanded' : ''}`}>
                <Header />
                <div className="dashboard-content">
                    {renderContent()} {/* Call the function to render content */}
                </div>
            </div>
        </div>
    );
};

export default DashboardRoute;