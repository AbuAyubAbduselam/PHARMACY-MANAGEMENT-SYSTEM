import { IoMdPaper } from "react-icons/io";
import { GiMoneyStack } from "react-icons/gi";

import Wrapper from "../assets/wrappers/StatsContainer";
import StatItem from "./StatItem";
const StatsContainer = ({ totalBills, totalSales }) => {
  const stats = [
    {
      title: "total bills",
      count: totalBills || 0,
      icon: <IoMdPaper />,
      color: "#85bb65",
      bcg: "#e0f3d4",
      text: "    Bills",
    },
    {
      title: "total sales",
      count: totalSales || 0,
      icon: <GiMoneyStack />,
      color: "#647acb",
      bcg: "#e0e8f9",
      text: " Birr",
    },
  ];

  return (
    <Wrapper>
      {stats.map((item) => {
        return <StatItem key={item.title} {...item} />;
      })}
    </Wrapper>
  );
};
export default StatsContainer;
