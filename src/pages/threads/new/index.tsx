import { FC, memo } from "react";
import { Link } from "react-router-dom";

// TODO: styled-systemへの参照をエイリアス化したい
import { css } from "../../../../styled-system/css";
import { Stack } from "../../../../styled-system/jsx";
import { Heading } from "../../../components/ui/heading";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";

// TODO: UIコンポーネント化（できればParkUIのLinkコンポーネントかませたい）
const linkStyles = css({
  width: "fit-content",
  _hover: {
    textDecoration: "underline",
  },
});

export const ThreadsNew: FC = memo(() => {
  const onSubmit = () => {
    console.log("submit");
  };

  return (
    <>
      <Heading as="h2">スレッド新規作成</Heading>
      <Stack gap="1.5" maxWidth="lg" marginTop="4">
        <form>
          <Stack gap="1.5" flexDirection="row">
            <Input id="name" placeholder="threads name" />
            <Button type="button" onClick={onSubmit}>
              作成
            </Button>
          </Stack>
        </form>
      </Stack>
      <Stack marginTop="8" className={linkStyles}>
        <Link to={"/"}>TOPに戻る →</Link>
      </Stack>
    </>
  );
});
