import { MutatingDots } from "react-loader-spinner";

const  Loading = () => {
  return (
    <div className="loading-spinner">
      <MutatingDots
        visible={true}
        height="150"
        width="150"
        color="#F9B233"
        secondaryColor="#F9B233"
        radius="12.5"
        ariaLabel="mutating-dots-loading"
      />
    </div>
  );
};

export default  Loading;