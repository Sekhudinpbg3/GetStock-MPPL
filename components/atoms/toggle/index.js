import { Switch } from "@headlessui/react";

const Toggle = ({ checked, styleChecked, styleUnchecked, ...props }) => {
  return (
    <Switch
      checked={checked}
      className={checked ? "toggle bg-slate-500 bg-opacity-50" : "toggle bg-gray-400"}
      {...props}>
      <span
        aria-hidden='true'
        className={checked ? `toggle-on translate-x-3 ${styleChecked}` : `toggle-off -translate-x-2 ${styleUnchecked}`}
      />
    </Switch>
  );
};

export default Toggle;
