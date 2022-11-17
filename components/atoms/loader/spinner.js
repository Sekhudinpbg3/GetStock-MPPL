import { ClipLoader } from "react-Spinners";

const Spinner = ({ loading }) => {
  return (
    <div className={loading ? "loader-loading" : "hidden"}>
      <ClipLoader
        className="grid-center-xy"
        loading={loading}
        color="#6B7280"
        size={20}
        speedMultiplier={0.8}
      />
    </div>
  );
};

export default Spinner;
