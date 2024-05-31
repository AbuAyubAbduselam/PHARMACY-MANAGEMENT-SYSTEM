import { FormRow, FormRowSelect, SubmitBtn } from ".";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { Form, useSubmit, Link } from "react-router-dom";
import { SUPPLIER, DRUG_STATUS, DRUG_SORT_BY } from "../../../utils/constant";
import { useAllBillsContext } from "../pages/AllBills";

const SearchContainer = () => {
  let { selectedParams } = useAllBillsContext();
  const { search, drugStatus, supplier, sort } = selectedParams;
  const newSelectedParams = {
    search: "",
    drugStatus: "all",
    supplier: "all",
    sort: "newest",
  };
  const submit = useSubmit();

  const debounce = (onChange) => {
    let timeoutId;
    return (e) => {
      const form = e.currentTarget.form;
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        onChange(form);
      }, 1000);
    };
  };
  return (
    <Wrapper>
      <Form className="form">
        <h5 className="form-title">search form</h5>
        <div className="form-center">
          <FormRow
            type="search"
            name="search"
            defaultValue={search}
            onChange={debounce((form) => {
              submit(form);
            })}
          />

          <FormRowSelect
            labelText="supplier"
            name="supplier"
            list={["all", ...Object.values(SUPPLIER)]}
            defaultValue={supplier}
            onChange={(e) => {
              submit(e.currentTarget.form);
            }}
          />
          <FormRowSelect
            name="sort"
            list={[...Object.values(DRUG_SORT_BY)]}
            defaultValue={sort}
            onChange={(e) => {
              submit(e.currentTarget.form);
            }}
          />
          <Link
            to="/dashboard/all-bills"
            className="btn form-btn delete-btn"
            onClick={() => (selectedParams = { ...newSelectedParams })}
          >
            Reset search Values
          </Link>
        </div>
      </Form>
    </Wrapper>
  );
};
export default SearchContainer;
