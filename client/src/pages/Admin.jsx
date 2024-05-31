import { useLoaderData, redirect } from "react-router-dom";
import customFetch from "../utils/customFetch";
import Wrapper from "../assets/wrappers/UserInfo";
import { toast } from "react-toastify";
import { useContext, createContext } from "react";
import { StatItem, UsersContainer } from "../components";

export const loader = async () => {
  try {
    const { data } = await customFetch.get("/users/admin/app-stats");
    return { data };
  } catch (error) {
    toast.error("You are not authorized to view this page");
    return redirect("/dashboard");
  }
};

const AllUsersContext = createContext();

const Admin = () => {
  const { data } = useLoaderData();
  console.log(data);

  return (
    <Wrapper>
      <AllUsersContext.Provider value={{ data }}>
        <UsersContainer />
      </AllUsersContext.Provider>
    </Wrapper>
  );
};

export const useAllUsersContext = () => useContext(AllUsersContext);

export default Admin;
