import { ChartsContainer, StatsContainer } from "../components";
import customFetch from "../utils/customFetch";
import { useLoaderData } from "react-router-dom";

export const loader = async () => {
  try {
    const response = await customFetch.get("/bills/stats");
    console.log(response.data);
    return response.data;
  } catch (error) {
    return error;
  }
};
const Stats = () => {
  const { totalBills, totalBirr, dailySales } = useLoaderData();

  return (
    <>
      <StatsContainer totalBills={totalBills} totalSales={totalBirr} />
      {dailySales?.length > 0 && <ChartsContainer data={dailySales} />}
    </>
  );
};
export default Stats;
