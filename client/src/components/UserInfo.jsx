import Wrapper from "../assets/wrappers/UserInfo";
import day from "dayjs";
const DrugInfo = ({ _id, name, phone, lastName, email, role }) => {
  return (
    <Wrapper>
      <div className="drug-data">
        <div className="clmn-1">
          <div>
            id: <span>{_id}</span>
          </div>
          <div>
            first name: <span>{name}</span>
          </div>
          <div>
            lastName: <span>{lastName}</span>
          </div>
          <div>
            email: <span>{email}</span>
          </div>
          <div>
            phone number: <span>{phone}</span>
          </div>
          <div>
            role: <span>{role}</span>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default DrugInfo;
