import PropTypes from 'prop-types';

const ContactIcon = (props) => {
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
        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
        clipRule="evenodd"
      />
    </svg>
  );
};

ContactIcon.propTypes = {
  size: PropTypes.string,
  fill: PropTypes.string,
};

// props deafault value
ContactIcon.defaultProps = {
  size: 'h-5 w-5',
  fill: 'fill-gray-500 dark:fill-slate-300',
};

export default ContactIcon;
