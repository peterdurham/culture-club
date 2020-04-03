import Games from "../components/Games";

const ToPlayPage = props => {
  return (
    <div>
      <h1>Games To Play</h1>
      <Games filter="toPlay" />
    </div>
  );
};

export default ToPlayPage;
