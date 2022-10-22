import PropTypes from 'prop-types';

const MenuIcon = (props) => {
  const { size, fill } = props;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`${size} ${fill}`}
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
        clipRule="evenodd"
      />
    </svg>
  );
};

MenuIcon.propTypes = {
  size: PropTypes.string,
  fill: PropTypes.string,
};

// props deafault value
MenuIcon.defaultProps = {
  size: 'h-5 w-5',
  fill: 'fill-gray-500 dark:fill-slate-300',
};

export default MenuIcon;
