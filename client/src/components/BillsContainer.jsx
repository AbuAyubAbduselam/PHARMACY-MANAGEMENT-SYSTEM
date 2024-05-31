import Wrapper from "../assets/wrappers/BillsContainer";
import { useAllBillsContext } from "../pages/AllBills";
import PageBtnContainer2 from "./PageBtnContainer2";
import Bill from "./Bill";

const BillsContainer = () => {
  const { data } = useAllBillsContext();
  const { bills, totalBills, numOfPages } = data;

  if (bills.length === 0) {
    return (
      <Wrapper>
        <h2>No bills to display...</h2>
      </Wrapper>
    );
  }

  return (
    <>
      <Wrapper>
        <h5>
          {totalBills} {totalBills > 1 ? "bills" : "bill"} found
        </h5>

        <div className="drugs">
          {bills.map((bill) => {
            return <Bill key={bill._id} {...bill} />;
          })}
        </div>
        {numOfPages > 1 && <PageBtnContainer2 />}
      </Wrapper>
    </>
  );
};
export default BillsContainer;
