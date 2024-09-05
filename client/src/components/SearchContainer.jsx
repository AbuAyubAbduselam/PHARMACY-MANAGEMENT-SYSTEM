import { FormRow, FormRowSelect, SubmitBtn } from ".";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { Form, useSubmit, Link } from "react-router-dom";
import {
  SUPPLIER,
  DRUG_STATUS,
  DRUG_SORT_BY,
} from "../../../server/utils/constant";
import { useAllDrugsContext } from "../pages/AllDrugs";
import { useDashboardContext } from "../pages/DashboardLayout";

const SearchContainer = () => {
  let { selectedParams } = useAllDrugsContext();

  const { user } = useDashboardContext();

  let isVisitor = user._id === "665444905b50510f3255a969";
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
          {!isVisitor && (
            <>
              <FormRowSelect
                labelText="drug status"
                name="drugStatus"
                list={["all", ...Object.values(DRUG_STATUS)]}
                defaultValue={drugStatus}
                onChange={(e) => {
                  submit(e.currentTarget.form);
                }}
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
                to="/dashboard/all-drugs"
                className="btn form-btn delete-btn"
                onClick={() => (selectedParams = { ...newSelectedParams })}
              >
                Reset search Values
              </Link>
            </>
          )}
        </div>
      </Form>
    </Wrapper>
  );
};
export default SearchContainer;
