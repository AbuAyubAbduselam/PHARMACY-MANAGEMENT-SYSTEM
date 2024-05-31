import { FormRow, SubmitBtn } from "../components";
import Wrapper from "../assets/wrappers/BillDashboardForm";
import { useOutletContext } from "react-router-dom";
import { Form, redirect } from "react-router-dom";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  console.log(data);

  try {
    await customFetch.post("/bills", data);
    toast.success("Bill added successfully");
    return redirect("../all-bills");
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const AddBill = () => {
  const { user } = useOutletContext();

  return (
    <Wrapper>
      <Form method="post" className="form">
        <h4 className="form-title">generate bill</h4>
        <div className="form-center">
          <FormRow type="text" name="drugId" labelText="drug id" />
          <FormRow type="text" name="customerName" labelText="patient name" />
          <FormRow
            type="text"
            name="patientAddress"
            labelText="patient adress"
          />
          <div className="phone-cont">
            <div className="def-starter">+251</div>
            <FormRow
              type="tel"
              name="patientPhone"
              labelText="patient phone no."
              maxLength={9}
              style={{ paddingLeft: "2.6rem" }}
            />
          </div>

          <FormRow type="number" labelText="quantity" name="quantity" min={0} />
          <SubmitBtn formBtn />
        </div>
      </Form>
    </Wrapper>
  );
};

export default AddBill;
