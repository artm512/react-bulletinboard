import { FC, memo, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

// TODO: styled-systemへの参照をエイリアス化したい
import { css } from "../../../../styled-system/css";
import { Stack } from "../../../../styled-system/jsx";
import { Heading } from "../../../components/ui/heading";
import { Card } from "../../../components/ui/card";

import { type TThreads } from "../../../App";

// TODO: UIコンポーネント化（できればParkUIのLinkコンポーネントかませたい）
const linkStyles = css({
  width: "fit-content",
  _hover: {
    textDecoration: "underline",
  },
});

const postStyles = css({
  marginTop: "8",
  paddingTop: "8",
  borderTop: "1px solid GrayText",
  _first: {
    marginTop: "0",
    paddingTop: "0",
    borderTop: "none",
  },
});

// TODO: 共通化する
const baseUrl = "https://railway.bulletinboard.techtrain.dev";

type TPosts = {
  id: string;
  post: string;
}[];

export const ThreadsId: FC = memo(() => {
  const params = useParams();
  const { id } = params;
  const [threadTitle, setThreadTitle] = useState<string>("");
  const [posts, setPosts] = useState<TPosts>([]);

  const fetchThreadPosts = async () => {
    try {
      // Q: このAPIにthreadのタイトルも入ってると良いのでは
      const response = await fetch(`${baseUrl}/threads/${id}/posts`, {
        method: "GET",
      });
      if (!response.ok) {
        throw new Error(`レスポンスステータス: ${response.status}`);
      }
      const data = await response.json();
      setPosts(data.posts);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchThreadTitle = async () => {
    try {
      const response = await fetch(`${baseUrl}/threads`, {
        method: "GET",
      });
      if (!response.ok) {
        throw new Error(`レスポンスステータス: ${response.status}`);
      }
      const data = (await response.json()) as TThreads;
      const title = data.find((thread) => thread.id === id)?.title;
      setThreadTitle(title || "");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchThreadTitle();
    fetchThreadPosts();
  }, []);

  return (
    <>
      <Heading as="h2">{threadTitle}</Heading>
      <Card.Root marginTop="4" padding="12">
        {posts.length > 0 ? (
          posts.map((post) => <p className={postStyles}>{post.post}</p>)
        ) : (
          <p>投稿されていません。</p>
        )}
      </Card.Root>
      <Stack marginTop="8" className={linkStyles}>
        <Link to={"/"}>TOPに戻る →</Link>
      </Stack>
    </>
  );
});
