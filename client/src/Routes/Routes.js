import React from "react";

import { BrowserRouter, Switch, Route } from "react-router-dom";

import Login from "../components/Login/Login";

import SignUp from "../components/Login/SignUp";
import ProtectedRoute from "./ProtectedRoute";

import { useSelector } from "react-redux";

//import Payment from "../components/Payment/Payment";
import RoutesNavbar from "./RoutesNavbar";
import Admin from "../components/Admin/Admin";
//import Admin from "../components/Admin/Admin";
import UserRoles from "../components/Admin/UserRoles";
import ProductsTable from "../components/Admin/ProductsTable";
import ServicesTable from "../components/Admin/ServicesTable";

export default function Routes() {
  const token = useSelector((state) => state.login.authToken);

  return (
    <Switch>
      <Route exact path="/hamro/login" component={Login} />
      <Route exact path="/hamro/signup" component={SignUp} />
      <ProtectedRoute path="/admin/service" isAuth={token} component={ServicesTable} />
      <ProtectedRoute path="/admin/userRole" isAuth={token} component={UserRoles} />
      
      <ProtectedRoute path="/admin" isAuth={token} component={Admin} />

      <RoutesNavbar />
    </Switch>
  );
}
