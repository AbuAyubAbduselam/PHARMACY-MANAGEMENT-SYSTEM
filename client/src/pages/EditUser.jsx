import { FormRow, FormRowSelect, SubmitBtn } from "../components";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { useLoaderData } from "react-router-dom";
import { DRUG_STATUS, SUPPLIER } from "../../../utils/constant";
import { Form, redirect } from "react-router-dom";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";

export const loader = async ({ params }) => {
  try {
    const { data } = await customFetch.get(
      `/users//admin/app-stats/${params.id}`
    );
    console.log(data);
    return { data };
  } catch (error) {
    toast.error(error.response.data.msg);
    return redirect("/dashboard/admin");
  }
};
export const action = async ({ request, params }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    await customFetch.patch(`/users/admin/app-stats/${params.id}`, data);
    toast.success("User edited successfully");
    return redirect("/dashboard/admin");
  } catch (error) {
    toast.error(error.response.data.msg);
    return error;
  }
};

const EditUser = () => {
  const { data } = useLoaderData();
  const { users } = data;
  return (
    <Wrapper>
      <Form method="post" className="form">
        <h4 className="form-title">edit user</h4>
        <div className="form-center">
          <FormRow type="text" name="name" defaultValue={users.name} />
          <FormRow type="text" name="lastName" defaultValue={users.lastName} />
          <FormRow
            type="tel"
            labelText="phone number"
            name="phone"
            defaultValue={users.phone}
          />

          <FormRow
            type="password"
            name="password"
            labelText="password"
            defaultValue={users.password}
          />
          <FormRow
            name="email"
            type="email"
            labelText="email"
            defaultValue={users.email}
          />
          <SubmitBtn formBtn />
        </div>
      </Form>
    </Wrapper>
  );
};

export default EditUser;
