import { FC, memo, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";

// TODO: styled-systemへの参照をエイリアス化したい
import { css } from "../../../../styled-system/css";
import { Stack } from "../../../../styled-system/jsx";
import { Heading } from "../../../components/ui/heading";
import { Card } from "../../../components/ui/card";
import { Textarea } from "../../../components/ui/textarea";
import { Button } from "../../../components/ui/button";

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

const errorMessageStyles = css({
  marginTop: "2",
  color: "red",
});

const textareaStyles = css({
  height: "40",
});

// TODO: 共通化する
const baseUrl = "https://railway.bulletinboard.techtrain.dev";

type TPosts = {
  id: string;
  post: string;
}[];

type Inputs = {
  post_text: string;
};

export const ThreadsId: FC = memo(() => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<Inputs>();
  const params = useParams();
  const { id } = params;
  const [isLoading, setIsLoading] = useState(false);
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

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const { post_text } = data;

    try {
      setIsLoading(true);

      const response = await fetch(`${baseUrl}/threads/${id}/posts`, {
        method: "POST",
        body: JSON.stringify({ post: post_text }),
      });
      if (!response.ok) {
        throw new Error(`レスポンスステータス: ${response.status}`);
      }
      await response.json();
      setValue("post_text", "");

      fetchThreadPosts();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchThreadTitle();
    fetchThreadPosts();
  }, []);

  return (
    <>
      <Heading as="h2">{threadTitle}</Heading>
      <Stack marginTop="4" gap="8" flexDirection="row">
        <Stack width="9/12">
          <Card.Root padding="12">
            {posts.length > 0 ? (
              posts.map((post) => <p className={postStyles}>{post.post}</p>)
            ) : (
              <p>投稿されていません。</p>
            )}
          </Card.Root>
          <Stack marginTop="8" className={linkStyles}>
            <Link to={"/"}>TOPに戻る →</Link>
          </Stack>
        </Stack>
        <Stack width="3/12">
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack gap="4" flexDirection="column">
              <Textarea
                row={10}
                className={textareaStyles}
                placeholder="投稿しよう！"
                {...register("post_text", {
                  required: "入力してください。",
                })}
              />
              <Button type="submit" loading={isLoading}>
                投稿
              </Button>
            </Stack>
            {errors.post_text?.message && (
              <p className={errorMessageStyles}>{errors.post_text?.message}</p>
            )}
          </form>
        </Stack>
      </Stack>
    </>
  );
});
