"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { CircleCheckBig, LoaderIcon, Share2 } from "lucide-react";

import "animate.css";
import { Leaderboard } from "@/types/GameTypes";
import { v4 as uuidv4 } from "uuid";

const formSchema = z.object({
  username: z
    .string()
    .min(3)
    .max(10)
    .regex(/^[a-z0-9]+$/i, {
      message: "String must only include a-z and 0-9 characters",
    }),
});

export default function HighscoreForm({
  score,
  mode,
  variant,
}: {
  score: number;
  mode: "Multiple" | "Manual";
  variant: "Normal" | "Timed";
}) {
  const [hidden, setHidden] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [share, setShare] = useState<boolean>(false);
  const [uuid, setUuid] = useState<string>("");

  const [prevScore, setPrevScore] = useState<Leaderboard>();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const postData = {
      name: values.username,
      score,
      mode,
      variant,
      uuid,
    };

    if (!prevScore) {
      setPrevScore(postData);
    }

    setLoading(true);

    fetch("/api/leaderboard", {
      method: "POST",
      body: JSON.stringify(prevScore),
    })
      .then(() => {
        setHidden(true);
        setLoading(false);
        setTimeout(() => {
          setShare(true);
        }, 2000);
      })
      .catch((er) => {
        toast.error("An error occurred, please try again!", {
          closeButton: true,
          duration: 5000,
        });
      });
  }

  function shareHandler() {
    const message = `I got a score of ${score} in ${mode}(${variant})!\nTry and do better than me!\nhttps://guessthebrand.vercel.app/`;

    navigator.clipboard
      .writeText(message)
      .then(() => {
        toast.success("Message copied to the clipboard!");
      })
      .catch(() => toast.error("An error occurred, try again!"));
  }

  // Set the UUID for the device on initial load and fetch the corresponding DB entry for said UUID.
  useEffect(() => {
    let uuid = localStorage.getItem("uuid");
    if (!uuid) {
      localStorage.setItem("uuid", uuidv4());
    }
    //@ts-ignore
    setUuid(localStorage.getItem("uuid"));

    fetch(`/api/leaderboard?uuid=${uuid}`)
      .then((res) => res.json())
      .then((data: Leaderboard[]) => {
        if (data.length <= 0) {
          return;
        } else {
          const entry = data.find(
            (v) => v.mode == mode && v.variant == variant
          );
          if (entry) {
            setPrevScore(entry);
          }
        }
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      {hidden ? (
        <>
          {share ? (
            <div className="flex items-center justify-center">
              <Button onClick={() => shareHandler()}>
                <Share2 className="pr-1" />
                <span>Share</span>
              </Button>
            </div>
          ) : (
            <div className="flex items-center justify-center">
              <span className="text-green-500 font-semibold animate__animated animate__fadeIn animate__fast">
                <CircleCheckBig className="inline" />
                Submitted!
              </span>
            </div>
          )}
        </>
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-3">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Username" {...field} type="text" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={loading}>
              {loading ? <LoaderIcon className="inline animate-spin" /> : <></>}
              Submit
            </Button>
          </form>
        </Form>
      )}
    </>
  );
}
