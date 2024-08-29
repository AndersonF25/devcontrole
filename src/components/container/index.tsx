import React, { ReactNode } from "react";

const Container = ({ children }: { children: ReactNode }) => {
  return <main className="w-5/6 flex flex-col h-auto m-auto">{children}</main>;
};

export default Container;
