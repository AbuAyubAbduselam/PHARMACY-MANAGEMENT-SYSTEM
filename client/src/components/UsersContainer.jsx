import User from "./User";
import Wrapper from "../assets/wrappers/UsersContainer";
import { useAllUsersContext } from "../pages/Admin";

const UsersContainer = () => {
  const { data } = useAllUsersContext();
  const { users } = data;

  if (users.length === 0) {
    return (
      <Wrapper>
        <h2>No users to display...</h2>
      </Wrapper>
    );
  }

  return (
    <>
      <Wrapper>
        <div className="drugs">
          {users.map((user) => {
            return <User key={user._id} {...user} />;
          })}
        </div>
      </Wrapper>
    </>
  );
};
export default UsersContainer;
