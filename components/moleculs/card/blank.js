import { element, node, oneOfType, shape, string } from "prop-types";

const Blank = ({ children, ...props }) => {
  const { cardClass, ...newProps } = props;

  return (
    <div
      className={`${cardClass} p-4 rounded-md bg-white drop-shadow-md w-fit h-fit gridCenter`}
      {...newProps}
    >
      {children}
    </div>
  );
};

Blank.propTypes = {
  children: oneOfType([string, element, node]),
  cardClass: string,
};

Blank.defaultProps = {
  children: "cardBlank",
  cardClass: "cardClass",
};

export default Blank;
