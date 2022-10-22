import PropTypes from 'prop-types';

const ScanIcon = (props) => {
  const { size, stroke, strokeWidth = 2 } = props;

  return (
    <svg
      className={`fill-transparent ${size} ${stroke}`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={`${strokeWidth}`}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"
      />
    </svg>
  );
};

ScanIcon.propTypes = {
  size: PropTypes.string,
  stroke: PropTypes.string,
  strokeWidth: PropTypes.number,
};

// props deafault value
ScanIcon.defaultProps = {
  size: 'h-5 w-5',
  stroke: 'stroke-gray-500 dark:fill-stroke-300',
  strokeWidth: 2,
};

export default ScanIcon;
