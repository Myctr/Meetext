import React from "react";
import Create from "../Components/Create";
import Join from "../Components/Join";
import History from "../Components/History";
const Panel = (props) => {
  return (
    <div style={props.style} className="col-12">
      {(() => {
        switch (props.active) {
          case "create":
            return <Create />;
          case "join":
            return <Join />;
          case "history":
            return <History />;
          default:
            return <Create />;
        }
      })()}
    </div>
  );
};
export default Panel;
