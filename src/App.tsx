import { css } from "../styled-system/css";
import { Link } from "./components/ui/link";
import { Heading } from "./components/ui/heading";
import { Card } from "./components/ui/card";

const headerStyles = css({
  display: "flex",
  justifyContent: "space-between",
  padding: "20px 20px",
  backgroundColor: "Menu",
  color: "MenuText",
  boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.2);",
});

const mainStyles = css({
  maxWidth: "10/12",
  marginInline: "auto",
  paddingTop: "10",
  paddingBottom: "10",
});

const cardStyles = css({
  padding: "4",
});

const threadListStyles = css({
  marginTop: "4",
  display: "flex",
  flexDirection: "column",
  gap: "4",
});

function App() {
  return (
    <>
      <header className={headerStyles}>
        <Heading as="h1">掲示板</Heading>
        <Link href="#">スレッドを立てる</Link>
      </header>
      <main className={mainStyles}>
        <Heading as="h2">新着スレッド</Heading>
        <ul className={threadListStyles}>
          <li>
            <Card.Root className={cardStyles}>
              <Card.Title>推しについて語るスレ</Card.Title>
            </Card.Root>
          </li>
          <li>
            <Card.Root className={cardStyles}>
              <Card.Title>今期覇権アニメ</Card.Title>
            </Card.Root>
          </li>
          <li>
            <Card.Root className={cardStyles}>
              <Card.Title>TechTrainってどうなの？</Card.Title>
            </Card.Root>
          </li>
          <li>
            <Card.Root className={cardStyles}>
              <Card.Title>暇な人雑談しませんか</Card.Title>
            </Card.Root>
          </li>
          <li>
            <Card.Root className={cardStyles}>
              <Card.Title>Rustについて語るスレ</Card.Title>
            </Card.Root>
          </li>
          <li>
            <Card.Root className={cardStyles}>
              <Card.Title>自宅警備員だけどなんか質問ある？</Card.Title>
            </Card.Root>
          </li>
          <li>
            <Card.Root className={cardStyles}>
              <Card.Title>大阪でおすすめのラーメン屋教えて</Card.Title>
            </Card.Root>
          </li>
        </ul>
      </main>
    </>
  );
}

export default App;
