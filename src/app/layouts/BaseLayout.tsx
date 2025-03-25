import React from "react";
import { Outlet } from "react-router-dom";
import { AuthProvider } from "../providers/AuthProvider";
import { Toaster } from 'react-hot-toast';
import 'react-toastify/dist/ReactToastify.css';

const BaseLayout: React.FC = () => {
  return (
    <AuthProvider>
      <Outlet />
      <Toaster
        position="top-right"
      />
    </AuthProvider>
  );
}

export default BaseLayout;
