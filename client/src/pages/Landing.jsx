import Wrapper from "../assets/wrappers/LandingPage";
import { Logo } from "../components";
import { Link, useNavigate } from "react-router-dom";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
import { useState } from "react";
import Drawerr from "../components/Drawer";
import { IoMenu } from "react-icons/io5";

const Landing = () => {
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  const loginDemoUser = async () => {
    const data = {
      email: "test@gmail.com",
      password: "secret123",
    };
    try {
      await customFetch.post("/auth/login/test", data);
      toast.success("take a visit drive");
      navigate("/dashboard/all-drugs");
    } catch (error) {
      toast.error(error?.response?.data?.msg);
    }
  };

  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>

      <div className="container page">
        <Drawerr open={open} setOpen={setOpen} loginDemoUser={loginDemoUser} />
        <div className="info">
          <h1>
            <span>drug management system</span>
          </h1>
          <p className=" rounded-lg font-Roboto font-bold">
            RPDMS: Manage meds smarter.
            <br />
            Secure system, guaranteed quality, exceptional care. <br />
            Focus on healing, leave the managing to us.
          </p>

          <div className="two-btn">
            <div>
              <Link to="/admin-login" className="btn admin ">
                Admin login
              </Link>
              <IoMenu
                className="menu-icon"
                size={45}
                color="var(--primary-300)"
                onClick={() => setOpen(true)}
              />
            </div>
            <div className="log-cont">
              <div>
                <Link to="/login" className="user btn">
                  Login
                </Link>
              </div>
              <div>
                <button
                  type="button"
                  className="btn user"
                  onClick={loginDemoUser}
                >
                  visit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Landing;
