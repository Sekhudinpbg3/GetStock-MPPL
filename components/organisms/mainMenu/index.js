import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { useSelector, useDispatch } from "react-redux";
import { MenuIcon, XmarkIcon } from "../../../assets";
import { Gap } from "../../atoms";
import { actions } from "../../../providers/reducer/store";

const MainMenu = () => {
  const { menu } = useSelector((state) => state.components);
  const { menuSetHide } = actions.componentAction;
  const dispatch = useDispatch();

  const menuHandler = () => {
    dispatch(menuSetHide(!menu.show));
  };
  // prettier-ignore
  return (
    <Menu as="div" className="static flex items-center">
      <>
        <Menu.Button onClick={menuHandler} className="button-triggerMenu">
          <MenuIcon size="w-7 h-7" fill="fill-grayDark500" />
        </Menu.Button>
        <Transition
          as={Fragment}
          show={menu.show}
          enter="transition duration-300"
          enterFrom="-translate-x-64 opacity-10"
          enterTo="translate-x-0 opacity-100"
          leave="transition duration-500"
          leaveFrom="translate-x-0"
          leaveTo="-translate-x-64"
        >
          <div className="fixed top-0 left-0 w-screen flex">
            <div>
              <Menu.Items className="w-64 h-screen bg-white dark:bg-slate-900 drop-shadow-md">
                <div className="w-full flex justify-end pt-2 px-2">
                  {/* prettier-ignore */}
                  <button type="button" className="button-closeMenu" onClick={menuHandler}>
                    <XmarkIcon size="w-4 h-4" fill="fill-gray-600 dark:fill-slate-500" />
                  </button>
                </div>
                {/* disclosure add contact */}
                <Gap gapClass="h-1" />
                {/* menu items */}
              </Menu.Items>
            </div>
            <Gap gapClass={`absolute -z-10 w-full h-full ${menu.show ? 'dialogPanel' : 'bg-transparent'} `} onClick={menuHandler} />
          </div>
        </Transition>
      </>
    </Menu>
  );
};

export default MainMenu;
