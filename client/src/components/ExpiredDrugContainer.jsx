import Drug from "./Drug";
import Wrapper from "../assets/wrappers/DrugsContainer";
import { useAllDrugsContext } from "../pages/ExpiredDrug";
import PageBtnContainer from "./PageBtnContainer";

const ExpiredDrugsContainer = () => {
  const { data } = useAllDrugsContext();
  const { drugs, totalDrugs, numOfPages } = data;

  if (drugs.length === 0) {
    return (
      <Wrapper>
        <h2>No drugs to display...</h2>
      </Wrapper>
    );
  }

  return (
    <>
      <Wrapper>
        <h5>
          {totalDrugs} {totalDrugs > 1 ? "drugs" : "drug"} found
        </h5>

        <div className="drugs">
          {drugs.map((drug) => {
            return <Drug key={drug._id} {...drug} />;
          })}
        </div>
        {numOfPages > 1 && <PageBtnContainer />}
      </Wrapper>
    </>
  );
};
export default ExpiredDrugsContainer;
