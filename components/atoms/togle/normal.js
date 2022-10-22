import { Switch } from "@headlessui/react";
import { bool } from "prop-types";
import { generateNormalTogleClass } from "../../helper";

// prettier-ignore
const Normal = (props) => {
  const { checked, ...newProps } = props;
  const { switchClass, spanClass } = generateNormalTogleClass()

  return (
    <Switch
      checked={checked}
      className={checked ? `bg-slate-500 bg-opacity-50 ${switchClass}` : `bg-gray-400 ${switchClass}`}
      {...newProps}
    >
      <span
        aria-hidden="true"
        className={
          checked ? `translate-x-3 border-slate-300 ${spanClass} bg-slate-400 ` : `-translate-x-2 border-gray-400 bg-white ${spanClass}`
        }
      />
    </Switch>
  );
};

Normal.propTypes = {
  checked: bool,
};

Normal.defaultProps = {
  checked: false,
};

export default Normal;
