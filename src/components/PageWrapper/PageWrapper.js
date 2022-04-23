import { memo } from "react";
import "./PageWrapper.css";

export const PageWrapper = memo(({ children }) => {
  return <div className="page-wrapper">{children}</div>;
});
