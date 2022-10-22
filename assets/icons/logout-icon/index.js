import PropTypes from 'prop-types';

const LogoutIcon = (props) => {
  const { size, fill } = props;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`${size} ${fill}`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
      />
    </svg>
  );
};

LogoutIcon.propTypes = {
  size: PropTypes.string,
  fill: PropTypes.string,
};

// props deafault value
LogoutIcon.defaultProps = {
  size: 'h-5 w-5',
  fill: 'stroke-gray-500 dark:stroke-slate-300',
};

export default LogoutIcon;
