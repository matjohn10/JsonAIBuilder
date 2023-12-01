import FormContainer from "@/components/FormContainer";
import { ModeToggle } from "@/components/ModeToggle";

export default function Home() {
  return (
    <main className="flex flex-col items-center w-full h-full p-4">
      <div className="absolute top-4 right-4 flex justify-center items-center">
        <ModeToggle />
      </div>
      <div className="flex flex-col mt-12 justify-center items-center gap-3 w-8/12">
        <h1 className="text-4xl">JSON AI Builder</h1>
        <p className="text-lg flex-wrap">
          Using OpenAI's ChatGPT, create any kind of JSON placeholder for your
          projects!
        </p>
      </div>
      <FormContainer />
    </main>
  );
}
