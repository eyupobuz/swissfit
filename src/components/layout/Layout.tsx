import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "#0d0d0d" }}>
      <Header />
      <main style={{ flex: 1, paddingTop: 66 }}>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;