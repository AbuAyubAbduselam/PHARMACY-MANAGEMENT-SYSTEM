import { toast } from "react-toastify";
import { DrugsContainer, SearchContainer } from "../components";
import customFetch from "../utils/customFetch";
import { useLoaderData } from "react-router-dom";
import { useContext, createContext } from "react";

export const loader = async ({ request }) => {
  const params = Object.fromEntries([
    ...new URL(request.url).searchParams.entries(),
  ]);

  try {
    const { data } = await customFetch.get("/drugs", {
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
      <SearchContainer />
      <DrugsContainer />
    </AllDrugsContext.Provider>
  );
};

export const useAllDrugsContext = () => useContext(AllDrugsContext);

export default AllDrugs;
