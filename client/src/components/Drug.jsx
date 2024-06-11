import { Link } from "react-router-dom";
import Wrapper from "../assets/wrappers/Drug";
import DrugInfo from "./DrugInfo";
import { Form } from "react-router-dom";
import day from "dayjs";

import advancedFormat from "dayjs/plugin/advancedFormat";
import { useDashboardContext } from "../pages/DashboardLayout";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
day.extend(advancedFormat);

const Drug = ({
  _id,
  drugName,
  quantity,
  drugStatus,
  supplier,
  expiryDate,
  price,
  weight,
  description,
}) => {
  const drugData = {
    _id,
    drugName,
    quantity,
    drugStatus,
    supplier,
    expiryDate,
    price,
    weight,
    description,
  };

  const { user } = useDashboardContext();
  let isVisitor = user._id === "665444905b50510f3255a969";
  let isAdmin = user.role === "admin";

  return (
    <Wrapper>
      <div className="info">
        <DrugInfo key={drugData._id} {...drugData} />

        {!(isAdmin || isVisitor) && (
          <div className="action-btn">
            <Link to={`../edit-drug/${drugData._id}`} className="btn edit-btn">
              <CiEdit size={20} />
            </Link>
            <Form method="post" action={`../delete-drug/${_id}`}>
              <button type="submit" className="btn delete-btn">
                <MdDelete size={20} />
              </button>
            </Form>
          </div>
        )}
      </div>
    </Wrapper>
  );
};

export default Drug;
