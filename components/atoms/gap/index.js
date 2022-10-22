import { string } from "prop-types";

const Gap = (props) => {
  const { gapClass, ...newProps } = props;

  return <div className={gapClass} {...newProps} />;
};

// props validators
Gap.propTypes = {
  gapClass: string,
};

Gap.defaultProps = {
  gapClass: "h-3",
};

export default Gap;
