import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";
import { useLoaderData } from "react-router-dom";
import { useContext, createContext } from "react";
import ExpiredDrugsContainer from "../components/ExpiredDrugContainer";

export const loader = async ({ request }) => {
  console.log(request.url);
  const params = Object.fromEntries([
    ...new URL(request.url).searchParams.entries(),
  ]);

  try {
    const { data } = await customFetch.get("/drugs/expired-drugs", {
      params,
    });
    return { data, selectedParams: { ...params } };
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const AllDrugsContext = createContext();

const AllDrugs = () => {
  let { data, selectedParams } = useLoaderData();

  return (
    <AllDrugsContext.Provider value={{ data, selectedParams }}>
      <ExpiredDrugsContainer />
    </AllDrugsContext.Provider>
  );
};

export const useAllDrugsContext = () => useContext(AllDrugsContext);

export default AllDrugs;
