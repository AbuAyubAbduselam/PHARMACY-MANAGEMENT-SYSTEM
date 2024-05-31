import { FaLocationArrow, FaBriefcase, FaCalendarAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import Wrapper from "../assets/wrappers/User";
import UserInfo from "./UserInfo";
import { Form } from "react-router-dom";
import day from "dayjs";
import { MdModeEdit } from "react-icons/md";
import { RiDeleteBinFill } from "react-icons/ri";

import advancedFormat from "dayjs/plugin/advancedFormat";
day.extend(advancedFormat);

const User = ({ _id, name, lastName, phone, email, role }) => {
  const userData = {
    _id,
    name,
    lastName,
    phone,
    email,
    role,
  };

  return (
    <Wrapper>
      <div className="info">
        <UserInfo key={userData._id} {...userData} />

        <div className="action-btn">
          <Link to={`../edit-user/${userData._id}`} className="btn edit-btn">
            edit
          </Link>
          <Form method="post" action={`../delete-user/${_id}`}>
            <button type="submit" className="btn delete-btn">
              delete
            </button>
          </Form>
        </div>
      </div>
    </Wrapper>
  );
};

export default User;
