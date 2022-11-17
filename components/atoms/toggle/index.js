import { Switch } from "@headlessui/react";
import { useTheme } from "next-themes";

const Toggle = ({ checked, styleChecked, styleUnchecked, ...props }) => {
  const { theme, setTheme } = useTheme();
  return (
    <Switch
      checked={checked}
      className={
        checked ? "toggle bg-slate-500 bg-opacity-50" : "toggle bg-gray-400"
      }
      {...props}
    >
      <span
        aria-hidden="true"
        className={
          checked ? `toggle-on ${styleChecked}` : `toggle-off ${styleUnchecked}`
        }
      />
    </Switch>
  );
};

export default Toggle;
