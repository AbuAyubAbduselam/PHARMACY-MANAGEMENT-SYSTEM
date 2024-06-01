import { RouterProvider, createBrowserRouter } from "react-router-dom";
import background from "./assets/images/b9.jpg";

import {
  HomeLayout,
  Login,
  DashboardLayout,
  Error,
  Landing,
  AddDrug,
  Stats,
  AllDrugs,
  Profile,
  Admin,
  EditDrug,
  ExpiredDrug,
  AddBill,
  EditBill,
  AllBills,
  AdminLogin,
} from "./pages";
import { action as loginAction } from "./pages/Login";
import { action as adminLoginAction } from "./pages/AdminLogin";
import { action as addDrugAction } from "./pages/AddDrug";
import { action as addBillAction } from "./pages/AddBill";
import { loader as dashboardLoader } from "./pages/DashboardLayout";
import { loader as allDrugsLoader } from "./pages/AllDrugs";
import { loader as editDrugLoader } from "./pages/EditDrug";
import { action as editDrugAction } from "./pages/EditDrug";
import { action as deleteDrugAction } from "./pages/DeleteDrug";
import { loader as adminLoader } from "./pages/Admin";
import { action as profileAction } from "./pages/Profile";
import { loader as statsLoader } from "./pages/Stats";
import { loader as expiredDrugLoader } from "./pages/ExpiredDrug";
import { action as deleteBillLoader } from "./pages/DeleteBill";
import { loader as editBillLoader } from "./pages/EditBill";
import { loader as allBillsLoader } from "./pages/AllBills";
import { loader as editUserLoader } from "./pages/Admin";
import { action as addUserAction } from "./pages/AddUser";
import { action as editUserAction } from "./pages/EditUser";
import { action as deleteUserAction } from "./pages/DeleteUser";
import { action as editBillAction } from "./pages/EditBill";
import AddUser from "./pages/AddUser";
import EditUser from "./pages/EditUser";
const checkDefaultTheme = () => {
  const isDarkTheme = localStorage.getItem("darkTheme") === "true";
  document.body.classList.toggle("dark-theme", isDarkTheme);
  return isDarkTheme;
};

const isDarkThemeEnabled = checkDefaultTheme();

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
      },

      {
        path: "login",
        element: <Login />,
        action: loginAction,
      },
      {
        path: "admin-login",
        element: <AdminLogin />,
        action: adminLoginAction,
      },
      {
        path: "dashboard",
        element: <DashboardLayout isDarkThemeEnabled={isDarkThemeEnabled} />,
        loader: dashboardLoader,
        children: [
          {
            index: true,
            element: <AddDrug />,
            action: addDrugAction,
          },
          {
            path: "stats",
            element: <Stats />,
            loader: statsLoader,
          },
          {
            path: "all-drugs",
            element: <AllDrugs />,
            loader: allDrugsLoader,
          },
          {
            path: "expired-drugs",
            element: <ExpiredDrug />,
            loader: expiredDrugLoader,
          },
          {
            path: "add-bill",
            element: <AddBill />,
            action: addBillAction,
          },
          {
            path: "edit-bill/:id",
            element: <EditBill />,
            loader: editBillLoader,
            action: editBillAction,
          },
          {
            path: "all-bills/",
            element: <AllBills />,
            loader: allBillsLoader,
          },
          {
            path: "delete-bill/:id",
            action: deleteBillLoader,
          },
          {
            path: "profile",
            element: <Profile />,
            action: profileAction,
          },
          {
            path: "add-user",
            element: <AddUser />,
            action: addUserAction,
          },
          {
            path: "admin",
            element: <Admin />,
            loader: adminLoader,
          },
          {
            path: "edit-drug/:id",
            element: <EditDrug />,
            loader: editDrugLoader,
            action: editDrugAction,
          },
          {
            path: "edit-user/:id",
            element: <EditUser />,
            loader: editUserLoader,
            action: editUserAction,
          },
          {
            path: "delete-drug/:id",
            action: deleteDrugAction,
          },
          {
            path: "delete-user/:id",
            action: deleteUserAction,
          },
        ],
      },
    ],
  },
]);

const App = () => {
  const backgroundStyle = {
    backgroundImage: `url(${background})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    minHeight: "100vh",
  };

  return (
    <div style={backgroundStyle}>
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
};
export default App;
