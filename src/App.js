import './App.css';
import Home from './Pages/Home/Home/Home';
import {
  Routes,
  Route,
} from "react-router-dom";
import Purchase from './Pages/Purchase/Purchase';
import Login from './Pages/Authentication/Login/Login';
import Registration from './Pages/Authentication/Registration/Registration';
import PrivateRoute from './Pages/Authentication/PrivateRoute/PrivateRoute';
import Orders from './Pages/Dashboard/orders/Orders';
import Dashboard from './Pages/Dashboard/Dashboard/Dashboard';
import Review from './Pages/Dashboard/Review/Review';
import News from './Pages/Dashboard/News/News';
import EditProfile from './Pages/Dashboard/EditProfile/EditProfile';
import ManageServices from './Pages/Dashboard/ManageServices/ManageServices';
import UpdateService from './Pages/Dashboard/UpdateService/UpdateService';
import useAuth from './hooks/useAuth/useAuth';
import MangeOrders from './Pages/Dashboard/ManageOrders/MangeOrders';
import AdminRoute from './Pages/Authentication/AdminRoute/AdminRoute';

function App() {
  const { user, isAdmin } = useAuth();
  return (

    <Routes>
      <Route path="/" element={<Home></Home>} />
      <Route path="/home" element={<Home></Home>} />
      <Route path="/purchase/:id" element={<PrivateRoute><Purchase /></PrivateRoute>} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Registration />} />
      <Route path={`/manageService/:id`} element={<UpdateService />} />
      <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} >
        {isAdmin ? <Route exact path={`/dashboard`} element={<AdminRoute><MangeOrders /></AdminRoute>} />
          : <Route exact path={`/dashboard`} element={<Orders />} />}
        <Route path={`/dashboard/manageService`} element={<AdminRoute><ManageServices /></AdminRoute>} />
        <Route path={`/dashboard/news`} element={<AdminRoute><News /></AdminRoute>} />
        <Route path={`/dashboard/review`} element={< Review />} />
        <Route path={`/dashboard/edit`} element={<EditProfile />} />

      </Route>
    </Routes>
  );
}

export default App;
