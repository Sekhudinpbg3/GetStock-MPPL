import PropTypes from 'prop-types';

const PaperPlaneIcon = (props) => {
  const { size, fill } = props;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`${size} ${fill}`}
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
    </svg>
  );
};

PaperPlaneIcon.propTypes = {
  size: PropTypes.string,
  fill: PropTypes.string,
};

// props deafault value
PaperPlaneIcon.defaultProps = {
  size: 'h-5 w-5',
  fill: 'fill-gray-500 dark:fill-slate-300',
};

export default PaperPlaneIcon;
