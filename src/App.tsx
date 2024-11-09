import { css } from "../styled-system/css";

const headerStyles = css({
  display: "flex",
  justifyContent: "space-between",
  padding: "10px 20px",
  backgroundColor: "Menu",
});

function App() {
  return (
    <>
      <header className={headerStyles}>
        <h1>掲示板</h1>
        <a href="#">スレッドを立てる</a>
      </header>
      <main>
        <h2>新着スレッド</h2>
        <ul>
          <li>推しについて語るスレ</li>
          <li>今期覇権アニメ</li>
          <li>TechTrainってどうなの？</li>
          <li>暇な人雑談しませんか</li>
          <li>Rustについて語るスレ</li>
          <li>自宅警備員だけどなんか質問ある？</li>
          <li>大阪でおすすめのラーメン屋教えて</li>
        </ul>
      </main>
    </>
  );
}

export default App;
