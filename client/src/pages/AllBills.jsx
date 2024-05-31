import { toast } from "react-toastify";
import { BillsContainer, BillSearchContainer } from "../components";
import customFetch from "../utils/customFetch";
import { useLoaderData } from "react-router-dom";
import { useContext, createContext } from "react";

export const loader = async ({ request }) => {
  const params = Object.fromEntries([
    ...new URL(request.url).searchParams.entries(),
  ]);

  try {
    const { data } = await customFetch.get("/bills", {
      params,
    });
    return { data, selectedParams: { ...params } };
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const AllBillsContext = createContext();

const AllDrugs = () => {
  let { data, selectedParams } = useLoaderData();

  return (
    <AllBillsContext.Provider value={{ data, selectedParams }}>
      <BillSearchContainer />
      <BillsContainer />
    </AllBillsContext.Provider>
  );
};

export const useAllBillsContext = () => useContext(AllBillsContext);

export default AllDrugs;
