import './Loader.css'

/**
 * Loader from https://loading.io/css/
 * @returns {JSX.Element}
 * @constructor
 */
const Loader = () => {
  return (
    <div>
      <div className="lds-ellipsis">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loader;
