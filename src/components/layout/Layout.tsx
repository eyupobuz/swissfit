import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "#f7f5f2" }}>
      <Header />
      <main style={{ flex: 1, paddingTop: 66 }}>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;