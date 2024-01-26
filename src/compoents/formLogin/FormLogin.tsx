import { useState } from "react";
import { ContentForm } from "./LayoutForm";

function FormLogin(): JSX.Element {
  const [ChangeLayout, setChangeLayout] = useState<boolean>(false);
  const changeLayout = () => {
    setChangeLayout((ChangeLayout) => !ChangeLayout);
  };

  return (
    <div className="content-flex">
      {!ChangeLayout && (
        <ContentForm changeLayout={changeLayout} ChangeLayout={ChangeLayout} />
      )}
      {!ChangeLayout && <div className="content-right"></div>}

      {ChangeLayout && <div className="content-right"></div>}
      {ChangeLayout && (
        <ContentForm changeLayout={changeLayout} ChangeLayout={ChangeLayout} />
      )}
    </div>
  );
}

export default FormLogin;

