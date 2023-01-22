import {
  Route, Routes
} from "react-router-dom";
import './App.css';
import useAuth from './hooks/useAuth/useAuth';
import AdminRoute from './Pages/Authentication/AdminRoute/AdminRoute';
import Login from './Pages/Authentication/Login/Login';
import PrivateRoute from './Pages/Authentication/PrivateRoute/PrivateRoute';
import Registration from './Pages/Authentication/Registration/Registration';
import AddService from './Pages/Dashboard/AddService/AddService';
import Dashboard from './Pages/Dashboard/Dashboard/Dashboard';
import EditProfile from './Pages/Dashboard/EditProfile/EditProfile';
import MangeOrders from './Pages/Dashboard/ManageOrders/MangeOrders';
import ManageServices from './Pages/Dashboard/ManageServices/ManageServices';
import News from './Pages/Dashboard/News/News';
import Orders from './Pages/Dashboard/orders/Orders';
import Review from './Pages/Dashboard/Review/Review';
import UpdateService from './Pages/Dashboard/UpdateService/UpdateService';
import Home from './Pages/Home/Home/Home';
import NewsDetails from './Pages/NewsDetails/NewsDetails';
import Purchase from './Pages/Purchase/Purchase';

function App() {
  const {  isAdmin } = useAuth();
  return (

    <Routes>
      <Route path="/" element={<Home></Home>} />
      <Route path="/home" element={<Home></Home>} />
      <Route path="/purchase/:id" element={<PrivateRoute><Purchase /></PrivateRoute>} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Registration />} />
      <Route path={`/manageService/:id`} element={<UpdateService />} />
      <Route path={`/newsDetails/:id`} element={<NewsDetails />} />
      <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} >
        {isAdmin ? <Route exact path={`/dashboard`} element={<AdminRoute><MangeOrders /></AdminRoute>} />
          : <Route exact path={`/dashboard`} element={<Orders />} />}
        <Route path={`/dashboard/manageService`} element={<AdminRoute><ManageServices /></AdminRoute>} />
        <Route path={`/dashboard/news`} element={<AdminRoute><News /></AdminRoute>} />
        <Route path={`/dashboard/addservice`} element={<AdminRoute><AddService /></AdminRoute>} />
        <Route path={`/dashboard/review`} element={< Review />} />
        <Route path={`/dashboard/edit`} element={<EditProfile />} />

      </Route>
    </Routes>
  );
}

export default App;
