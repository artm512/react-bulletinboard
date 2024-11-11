import { useEffect, useState } from "react";

import { css } from "../styled-system/css";
import { Heading } from "./components/ui/heading";
import { Card } from "./components/ui/card";

type TThreads = {
  id: string;
  title: string;
}[];

const cardStyles = css({
  padding: "4",
});

const threadListStyles = css({
  marginTop: "4",
  display: "flex",
  flexDirection: "column",
  gap: "4",
});

const LoadingStyles = css({
  marginTop: "4",
});

const baseUrl = "https://railway.bulletinboard.techtrain.dev";

function App() {
  const [threads, setThreads] = useState<TThreads>([]);
  const fetchThread = async () => {
    try {
      const response = await fetch(`${baseUrl}/threads`, {
        method: "GET",
      });
      if (!response.ok) {
        throw new Error(`レスポンスステータス: ${response.status}`);
      }
      const data = await response.json();
      setThreads(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchThread();
  }, []);

  return (
    <>
      <Heading as="h2">新着スレッド</Heading>
      {threads.length > 0 ? (
        <ul className={threadListStyles}>
          {threads.map((thread) => (
            <li key={thread.id}>
              <Card.Root className={cardStyles}>
                <Card.Title>{thread.title}</Card.Title>
              </Card.Root>
            </li>
          ))}
        </ul>
      ) : (
        <p className={LoadingStyles}>Loading...</p>
      )}
    </>
  );
}

export default App;
