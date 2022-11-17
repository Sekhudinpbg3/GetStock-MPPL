const Spinner = ({ loading }) => {
  return (
    <div className={loading ? "loader-loading" : "hidden"}>
      <div className="h-10 w-10 bg-green-200 dark:bg-green-300 rounded-full grid-center-xy">
      <p className="font-semibold text-green-700 dark:text-green-800 animate-pulse">Loading</p>
      </div>
    </div>
  );
};

export default Spinner;
