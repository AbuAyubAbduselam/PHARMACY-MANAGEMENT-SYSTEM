import { FormRow, FormRowSelect, SubmitBtn } from "../components";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { useLoaderData, useParams } from "react-router-dom";
import { DRUG_STATUS, SUPPLIER } from "../../../utils/constant";
import { Form, redirect } from "react-router-dom";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";

export const loader = async ({ params }) => {
  try {
    const { data } = await customFetch.get(`/bills/${params.id}`);
    return data;
  } catch (error) {
    toast.error(error.response.data.msg);
    return redirect("/dashboard/all-bills");
  }
};
export const action = async ({ request, params }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    await customFetch.patch(`/bills/${params.id}`, data);
    toast.success("Bill edited successfully");
    return redirect("/dashboard/all-bills");
  } catch (error) {
    toast.error(error.response.data.msg);
    return error;
  }
};

const EditBill = () => {
  const { bill } = useLoaderData();

  return (
    <Wrapper>
      <Form method="post" className="form">
        <h4 className="form-title">edit bill</h4>
        <div className="form-center">
          <FormRow
            type="text"
            name="drugId"
            labelText="drug id"
            defaultValue={bill.drugId}
          />
          <FormRow
            type="text"
            name="customerName"
            labelText="customer name"
            defaultValue={bill.customerName}
          />
          <FormRow type="number" name="quantity" defaultValue={bill.quantity} />

          <SubmitBtn formBtn />
        </div>
      </Form>
    </Wrapper>
  );
};

export default EditBill;
