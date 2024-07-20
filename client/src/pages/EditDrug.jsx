import { FormRow, FormRowSelect, SubmitBtn } from "../components";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { useLoaderData, useParams } from "react-router-dom";
import { DRUG_STATUS, SUPPLIER } from "../../../utils/constant";
import day from "dayjs";

import { Form, redirect } from "react-router-dom";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";

export const loader = async ({ params }) => {
  try {
    const { data } = await customFetch.get(`/drugs/${params.id}`);
    return data;
  } catch (error) {
    toast.error(error.response.data.msg);
    return redirect("/dashboard/all-drugs");
  }
};
export const action = async ({ request, params }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    await customFetch.patch(`/drugs/${params.id}`, data);
    toast.success("Drug edited successfully");
    return redirect("/dashboard/all-drugs");
  } catch (error) {
    toast.error(error.response.data.msg);
    return error;
  }
};

const EditDrug = () => {
  const { drug } = useLoaderData();
  let expiryDate = day(drug.expiryDate).format("YYYY-MM-DD");
  return (
    <Wrapper>
      <Form method="post" className="form">
        <h4 className="form-title">edit drug</h4>
        <div className="form-center">
          <FormRow
            type="text"
            name="drugName"
            labelText="drug name"
            defaultValue={drug.drugName}
          />
          <FormRow
            type="number"
            labelText="quantity"
            name="quantity"
            min={1}
            defaultValue={drug.quantity}
          />
          <FormRow
            type="number"
            labelText="weight  <no-transform>in mg</no-transform>"
            name="weight"
            min={1}
            defaultValue={drug.weight}
          />
          <FormRow
            type="number"
            labelText="unit  <no-transform>price</no-transform>"
            min={0}
            name="price"
            defaultValue={drug.price}
          />{" "}
          <FormRow
            type="date"
            labelText="expiry date"
            name="expiryDate"
            defaultValue={expiryDate}
          />
          <FormRowSelect
            name="supplier"
            labelText="supplier"
            defaultValue={drug.supplier}
            list={Object.values(SUPPLIER)}
          />
          <div className="flex flex-col gap-2">
            <label htmlFor="description" className="">
              Description
            </label>
            <textarea
              className="bg-[var(--background-color)] rounded-md p-2"
              name="description"
              defaultValue={drug.description}
              rows="6"
            ></textarea>
          </div>
          <SubmitBtn formBtn />
        </div>
      </Form>
    </Wrapper>
  );
};

export default EditDrug;
