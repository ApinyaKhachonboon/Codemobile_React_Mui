import React from "react";
import { store } from "./../index";
import { Navigate, Outlet } from "react-router-dom";

const PublicRoutes = (props: any) => {
  const auth = store.getState().loginReducer.result;
  /// Outlet คือไปใน route ที่ต้องการจะไปที่ไม่ใช่ส่วนของ protected
  return auth ? <Navigate to="/stock" /> : <Outlet />;
};

export default PublicRoutes;
