import { FC, memo, useState } from "react";
import { Link } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";

// TODO: styled-systemへの参照をエイリアス化したい
import { css } from "../../../../styled-system/css";
import { Stack } from "../../../../styled-system/jsx";
import { Heading } from "../../../components/ui/heading";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";

type Inputs = {
  threadName: string;
};

// TODO: UIコンポーネント化（できればParkUIのLinkコンポーネントかませたい）
const linkStyles = css({
  width: "fit-content",
  _hover: {
    textDecoration: "underline",
  },
});

const errorMessageStyles = css({
  marginTop: "2",
  color: "red",
});

// TODO: 共通化する
const baseUrl = "https://railway.bulletinboard.techtrain.dev";

export const ThreadsNew: FC = memo(() => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const { threadName: thread_name } = data;

    try {
      setIsLoading(true);

      const response = await fetch(`${baseUrl}/threads`, {
        method: "POST",
        body: JSON.stringify({ title: thread_name }),
      });
      if (!response.ok) {
        throw new Error(`レスポンスステータス: ${response.status}`);
      }
      await response.json();
      setValue("threadName", "");
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Heading as="h2">スレッド新規作成</Heading>
      <Stack gap="1.5" maxWidth="lg" marginTop="4">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack gap="1.5" flexDirection="row">
            <Input
              type="text"
              placeholder="threads name"
              {...register("threadName", {
                required: "スレッド名を入力してください。",
              })}
            />
            <Button type="submit" loading={isLoading}>
              作成
            </Button>
          </Stack>
          {errors.threadName?.message && (
            <p className={errorMessageStyles}>{errors.threadName?.message}</p>
          )}
        </form>
      </Stack>
      <Stack marginTop="8" className={linkStyles}>
        <Link to={"/"}>TOPに戻る →</Link>
      </Stack>
    </>
  );
});
