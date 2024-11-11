import { FC, memo } from "react";
import { Outlet, Link } from "react-router-dom";

import { css } from "../../styled-system/css";
import { Heading } from "../components/ui/heading";

const headerStyles = css({
  display: "flex",
  justifyContent: "space-between",
  padding: "20px 20px",
  backgroundColor: "Menu",
  color: "MenuText",
  boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, .2)",
});

const mainStyles = css({
  maxWidth: "10/12",
  marginInline: "auto",
  paddingTop: "10",
  paddingBottom: "10",
});

// TODO: UIコンポーネント化（できればParkUIのLinkコンポーネントかませたい）
const linkStyles = css({
  _hover: {
    textDecoration: "underline",
  },
});

export const HeaderLayout: FC = memo(() => {
  return (
    <>
      <header className={headerStyles}>
        <Heading as="h1">
          <Link to="/">掲示板</Link>
        </Heading>
        <Link to="/threads/new" className={linkStyles}>
          スレッドを立てる
        </Link>
      </header>
      <main className={mainStyles}>
        <Outlet />
      </main>
    </>
  );
});
