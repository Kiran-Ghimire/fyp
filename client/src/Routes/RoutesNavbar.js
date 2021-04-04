import React from "react";
import { Switch, Route } from "react-router-dom";
import Navbar from "../components/Navbar/Nav-bar";
import Home from "../components/Home";
import Appointment from '../components/Appointment';
import Contact from '../components/Contact';
import Services from '../components/Services';
import Offers from '../components/Offers';

import  Login  from '../components/Login/Login';
import  SignUp  from '../components/Login/SignUp';
import UserProfile from '../components/Profile/UserProfile';
//import OrderPage from "../components/OrderPage";
//import Inventory from "../components/Inventory/Inventory";
//import ShowItem from "../components/Inventory/ShowItem";

//import UserProfile from "../components/Profile/UserProfile";
//import StaffProfile from "../components/Profile/StaffProfile";
import ProtectedRoute from "./ProtectedRoute";
//import Cart from "../components/Inventory/Cart";

import { useSelector } from "react-redux";
//import UserRoles from "../components/Admin/UserRoles";
//import BookService from "../components/Booking/BookService";

export default function RoutesNavbar() {  
  
  const token = useSelector((state) => state.login.authToken);

  return (
    <div>
      <Navbar />
      <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/" exact component={Home}/>
                <Route path="/hamro/services" exact component={Services}/>
                <Route path="/hamro/appointment" exact component={Appointment}/>
                <Route path="/hamro/offers" exact component={Offers}/>
                 <Route path="/hamro/contact" exact component={Contact}/>
                <Route path="/hamro/login" exact component={Login}/> 
                <Route path="/hamro/signup" exact component={SignUp}/>   
                <ProtectedRoute path="/hamro/user" isAuth={token} component={UserProfile} />
        
        {/* <Route exact path="/map" component={} /> */}
        {/* <Route exact path="/user" component={UserProfile} /> */}
        

        {/* <ProtectedRoute path="/profile" component={UserProfile} isAuth={} /> */}
        {/* <Footer /> */}
        
      </Switch>
    </div> 
  );
} 