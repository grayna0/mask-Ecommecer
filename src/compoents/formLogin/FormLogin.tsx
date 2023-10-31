import React, { useState } from "react";
import { LayOut } from "./LayoutForm";

function FormLogin(): JSX.Element {
  const [ChangeLayout, setChangeLayout] = useState<boolean>(false);
  const changeLayout = () => {
    setChangeLayout((ChangeLayout) => !ChangeLayout);
  };

  return (
    <div className="content-flex">
      {!ChangeLayout && (
        <LayOut changeLayout={changeLayout} ChangeLayout={ChangeLayout} />
      )}
      {!ChangeLayout && <div className="content-right"></div>}

      {ChangeLayout && <div className="content-right"></div>}
      {ChangeLayout && (
        <LayOut changeLayout={changeLayout} ChangeLayout={ChangeLayout} />
      )}
    </div>
  );
}

export default FormLogin;

