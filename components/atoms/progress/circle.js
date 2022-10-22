import { bool } from "prop-types";
import ClipLoader from "react-spinners/ClipLoader";

const Circle = (props) => {
  const { loading } = props;
  return (
    // prettier-ignore
    <div className={loading ? 'flex absolute z-10 inset-0 justify-center items-center cursor-not-allowed' : 'hidden absolute z-10 inset-0 justify-center items-center'}>
      <ClipLoader
        loading={loading}
        color="#6B7280"
        size={20}
        speedMultiplier={0.8}
      />
    </div>
  );
};

Circle.propTypes = {
  loading: bool,
};

Circle.defaultProps = {
  loading: true,
};

export default Circle;
