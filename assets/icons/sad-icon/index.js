import PropTypes from 'prop-types';

const SadIcon = (props) => {
  const { size, stroke, strokeWidth = 2 } = props;

  return (
    <svg
      className={`fill-transparent ${size} ${stroke}`}
      viewBox="0 0 24 24"
      strokeWidth={`${strokeWidth}`}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
};

SadIcon.propTypes = {
  size: PropTypes.string,
  stroke: PropTypes.string,
  strokeWidth: PropTypes.number,
};

// props deafault value
SadIcon.defaultProps = {
  size: 'h-5 w-5',
  stroke: 'stroke-gray-500 dark:fill-slate-300',
  strokeWidth: 2,
};

export default SadIcon;
