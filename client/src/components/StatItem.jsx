import Wrapper from "../assets/wrappers/StatItem";

const StatItem = ({ count, text, title, icon, color, bcg }) => {
  return (
    <Wrapper color={color} bcg={bcg}>
      <header>
        <span className="icon">{icon}</span>
        <span className="count">
          {count}
          {text}
        </span>
      </header>
      <h5 className="title">{title}</h5>
    </Wrapper>
  );
};
export default StatItem;
