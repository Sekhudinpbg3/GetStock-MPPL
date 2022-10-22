import { string } from "prop-types";

const Title = ({ children, ...props }) => {
  const { textClass } = props;
  return <p className={`${textClass} font-semibold`}>{children}</p>;
};

Title.propTypes = {
  textClass: string,
  children: string,
};

Title.defaultProps = {
  textClass: "p-2",
  children: "border",
};

export default Title;
