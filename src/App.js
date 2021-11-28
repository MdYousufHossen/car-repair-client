import './App.css';
import Home from './Pages/Home/Home/Home';
import {
  BrowserRouter,
  Routes,
  Route,

} from "react-router-dom";
import Purchase from './Pages/Purchase/Purchase';
import Login from './Pages/Authentication/Login/Login';
import Registration from './Pages/Authentication/Registration/Registration';
import AuthProvider from './contextApi/AuthProvider';
import PrivateRoute from './Pages/Authentication/PrivateRoute/PrivateRoute';
import Orders from './Pages/Dashboard/orders/Orders';
import Dashboard from './Pages/Dashboard/Dashboard/Dashboard';
import Review from './Pages/Dashboard/Review/Review';
import News from './Pages/Dashboard/News/News';
import EditProfile from './Pages/Dashboard/EditProfile/EditProfile';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home></Home>} />
          <Route path="/home" element={<Home></Home>} />
          <Route path="/purchase/:id" element={<PrivateRoute><Purchase /></PrivateRoute>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} >

            <Route path={`/dashboard/review`} element={
              < Review />
            } />
            <Route exact path={`/dashboard`} element={
              <Orders />} />
            <Route path={`/dashboard/news`} element={
              <News />} />
            <Route path={`/dashboard/edit`} element={
              <EditProfile />} />

          </Route>
        </Routes>
      </BrowserRouter>

    </AuthProvider>
  );
}

export default App;
