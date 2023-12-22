import type { FC } from "react";
import { Outlet } from "react-router-dom";
import Wrapper from "./Wrapper/Wrapper";
import Header from "./Header/Header";
import Main from "./Main/Main";
import Footer from "./Footer/Footer";

interface LayoutProps {}

const Layout: FC<LayoutProps> = () => {
  return (
    <Wrapper>
      <Header />

      <Main>
        <Outlet />
      </Main>

      <Footer />
    </Wrapper>
  );
};

export default Layout;
