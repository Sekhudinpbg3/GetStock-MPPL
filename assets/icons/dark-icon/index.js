import PropTypes from 'prop-types';

const DarkIcon = (props) => {
  const { size, fill } = props;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`${size} ${fill}`}
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
    </svg>
  );
};

DarkIcon.propTypes = {
  size: PropTypes.string,
  fill: PropTypes.string,
};

// props deafault value
DarkIcon.defaultProps = {
  size: 'h-5 w-5',
  fill: 'stroke-gray-500 dark:fill-stroke-300',
};

export default DarkIcon;
