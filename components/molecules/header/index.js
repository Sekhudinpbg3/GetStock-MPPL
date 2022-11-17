import { useTheme } from "next-themes";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Loader, Toggle } from "../../atoms";

const Header = ({ handler }) => {
  const { theme, themes, setTheme, resolvedTheme } = useTheme();

  const [loading, setLoading] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const Router = useRouter();

  const toggleHandler = () => {
    if (theme === "dark") {
      setTheme("light");
      return;
    }

    if (theme === "light") {
      setTheme("dark");
      return;
    }
  };

  const indexHandler = async () => {
    setLoading(true);
    if (handler) {
      const process = await handler();
      setTimeout(() => {
        Router.push("/");
        setLoading(process);
        return true;
      }, 500);
    }
    setTimeout(() => {
      Router.push("/");
      setLoading(false);
    }, 500);
  };

  useEffect(() => {
    if (theme === "dark") {
      setIsDark(true);
      return;
    }
    setIsDark(false);
    return;
  }, [theme]);

  return (
    <>
      <Loader.Spinner loading={loading} />
      <div className="w-full py-2 px-10 drop-shadow-md grid-center-xy div-theme">
        <div className="flex-center-y justify-between w-dinamis">
          <button onClick={indexHandler}>
            <h1 className="text-green-600 btn text-base md:text-lg lg:text-2xl">
              GetStock
            </h1>
          </button>
          <Toggle
            checked={isDark}
            styleChecked="bg-green-600"
            styleUnchecked="bg-gray-500"
            onChange={toggleHandler}
          />
        </div>
      </div>
    </>
  );
};

export default Header;
