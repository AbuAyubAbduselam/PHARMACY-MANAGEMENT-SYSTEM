import React, { useState } from "react";
import { Button, Drawer } from "antd";
import { Link } from "react-router-dom";

const Drawerr = ({ open, setOpen, loginDemoUser }) => {
  const onClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Drawer title="Menu" onClose={onClose} open={open}>
        <div className="mt-4 mb-4 font-bold text-2xl border-0 p-2 rounded-full">
          <Link to="/admin-login">Admin login</Link>
        </div>
        <div className="mt-4 mb-4 font-bold text-2xl border-0 p-2 ">
          <Link to="/login">Login</Link>
        </div>
        <div className="mt-4 mb-4 font-bold text-2xl border-0 p-2">
          <button type="button" onClick={loginDemoUser}>
            Visit
          </button>
        </div>
      </Drawer>
    </>
  );
};
export default Drawerr;
