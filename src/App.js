
// ===================== Dependency ==================
//import './App.css';
import { Routes, Route } from "react-router-dom";


// ==================== Routes ========================
import Login from "./routes/login/login.route";
import DashboardRoute from "./routes/dashboard/dashboard.route";
import Director from "./routes/director/director";
import ProtectedRoute from './functions/auth/protectedRoutes';

//===================== App ===========================

function App() {
  return (
    <Routes>


        <Route
            path="/dashboard"
            element={
                <ProtectedRoute requiredAuth="serverVerify" redirectTo="/login">
                    <DashboardRoute />
                </ProtectedRoute>
            }
        />

        <Route path="/" element={<Director />} />
        <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;