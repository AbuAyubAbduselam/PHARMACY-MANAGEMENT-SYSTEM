import Drug from "./Drug";
import Wrapper from "../assets/wrappers/DrugsContainer";
import { useAllDrugsContext } from "../pages/AllDrugs";
import PageBtnContainer from "./PageBtnContainer";
import { useDashboardContext } from "../pages/DashboardLayout";

const DrugsContainer = () => {
  const { data } = useAllDrugsContext();
  const { user } = useDashboardContext();
  const { drugs, totalDrugs, numOfPages, totalAvailableDrugs, numOfPages2 } =
    data;

  let isVisitor = user._id === "665444905b50510f3255a969";

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
          {isVisitor ? totalAvailableDrugs : totalDrugs}{" "}
          {isVisitor
            ? totalAvailableDrugs > 1
              ? "drugs "
              : "drug "
            : totalDrugs > 1
            ? "drugs "
            : "drug "}
          found
        </h5>

        <div className="drugs">
          {drugs.map((drug) => {
            if (drug.drugStatus !== "Available" && isVisitor) return;

            return <Drug key={drug._id} {...drug} />;
          })}
        </div>
        {isVisitor
          ? numOfPages2 > 1 && <PageBtnContainer />
          : numOfPages > 1 && <PageBtnContainer />}
      </Wrapper>
    </>
  );
};
export default DrugsContainer;
