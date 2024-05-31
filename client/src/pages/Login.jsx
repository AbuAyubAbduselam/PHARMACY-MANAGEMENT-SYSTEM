import { Link, Form, redirect, useNavigate } from "react-router-dom";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import { FormRow, Logo, SubmitBtn } from "../components";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const errors = { msg: "" };
  if (data.password.length < 3) {
    errors.msg = "Password is too short";
    return errors;
  }
  try {
    await customFetch.post("/auth/login/user", data);
    toast.success("Login successful");
    return redirect("/dashboard");
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    errors.msg = error.response.data.msg;
    return errors;
  }
};

const Login = () => {
  const [visible, setVisible] = useState(false);
  return (
    <Wrapper>
      <Form method="post" className="form">
        <Logo />
        <h4>login</h4>
        <FormRow type="email" name="email" />
        <FormRow type={visible ? "text" : "password"} name="password" />{" "}
        {visible ? (
          <AiOutlineEye
            className="eye-icon "
            size={25}
            onClick={() => setVisible(false)}
          />
        ) : (
          <AiOutlineEyeInvisible
            className="eye-icon  "
            size={25}
            onClick={() => setVisible(true)}
          />
        )}
        <SubmitBtn />
      </Form>
    </Wrapper>
  );
};
export default Login;
