import { FormRow, SubmitBtn } from "../components";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { useOutletContext } from "react-router-dom";
import { DRUG_STATUS, SUPPLIER } from "../../../utils/constant";
import { Form, redirect } from "react-router-dom";
import FormRowSelect from "../components/FormSelect";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    await customFetch.post("/drugs", data);
    toast.success("Drug added successfully");
    return redirect("all-drugs");
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const AddDrug = () => {
  const { user } = useOutletContext();

  return (
    <Wrapper>
      <Form method="post" className="form">
        <h4 className="form-title">add medicine</h4>
        <div className="form-center">
          <FormRow
            type="text"
            name="drugName"
            labelText="medicine <no-transform>name</no-transform>"
          />
          <FormRow type="number" labelText="quantity" name="quantity" min={1} />
          <FormRow
            type="number"
            labelText="weight  <no-transform>in mg</no-transform>"
            name="weight"
            min={1}
          />
          <FormRow
            type="number"
            labelText="price <no-transform>per unit</no-transform>  "
            min={0}
            name="price"
          />
          <FormRow type="date" labelText="expiry date" name="expiryDate" />
          <FormRowSelect
            name="supplier"
            labelText="supplier"
            defaultValue={SUPPLIER.SUPPLIER_1}
            list={Object.values(SUPPLIER)}
          />
          <div className="flex flex-col gap-2">
            <label htmlFor="description" className="">
              Description
            </label>
            <textarea
              className="bg-[var(--background-color)] rounded-md p-2"
              name="description"
              rows="6"
            ></textarea>
          </div>
          <SubmitBtn formBtn />
        </div>
      </Form>
    </Wrapper>
  );
};

export default AddDrug;
