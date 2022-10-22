import { string } from "prop-types";

const Normal = ({ children, ...props }) => {
  const { textClass } = props;
  return <p className={`${textClass}`}>{children}</p>;
};

Normal.propTypes = {
  textClass: string,
  children: string,
};

Normal.defaultProps = {
  textClass: "p-2",
  children: "border",
};

export default Normal;
