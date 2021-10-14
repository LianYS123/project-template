import React from "react";
import { useIntl } from "react-intl";

export default function Chrome() {
  const intl = useIntl();
  return (
    <div>
      <h2>{intl.formatMessage({ id: "USE_CHROME" })}</h2>
    </div>
  );
}
