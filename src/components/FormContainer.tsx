"use client";

import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";

const FormContainer = () => {
  const [answer, setAnswer] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [question, setQuestion] = useState("");
  const onChangeText = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setQuestion(e.currentTarget.value);

  useEffect(() => {
    setAnswer(localStorage.getItem("lastCall") || "");
  }, []);

  const submitForm = async () => {
    if (question) {
      setLoading(true);
      await axios.post("/api/openai", { prompt: question }).then((res) => {
        setQuestion("");
        setAnswer(res.data.answer);
        localStorage.setItem("lastCall", res.data.answer);
        setLoading(false);
      });
    }
  };

  return (
    <div className="flex flex-col gap-2 items-center mt-16 w-8/12">
      <h2 className="text-2xl">Build your JSON here!</h2>
      <div className=" flex flex-col w-11/12 gap-2">
        <div className="flex flex-col w-full gap-1.5 mt-8">
          <Label htmlFor="question">Write details below:</Label>
          <Textarea
            placeholder="Type details here."
            value={question}
            onChange={onChangeText}
          />
        </div>
        <Button
          variant="ghost"
          onClick={submitForm}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              submitForm;
            }
          }}
        >
          Submit
        </Button>
      </div>
      <ScrollArea className="flex flex-col rounded-md items-center max-h-[300px] w-full justify-center p-4 mt-8 bg-secondary">
        {isLoading ? (
          <div className="flex flex-col gap-2 items-center">
            <p>Waiting for GPT's answer</p>
            <Loader2 className="animate animate-spin" />
          </div>
        ) : !answer ? (
          <p>No data</p>
        ) : (
          <pre className="text-lg flex-wrap">{answer}</pre>
        )}
      </ScrollArea>
    </div>
  );
};

export default FormContainer;
