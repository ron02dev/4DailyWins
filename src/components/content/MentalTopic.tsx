import { useEffect, useState } from "react";
import Notes from "./Notes";

export default function MentalTopic() {
  const [task, setTask] = useState<string[] | null>(null);

  function handleCreate(input: string) {
    setTask((prev) => (prev ? [...prev, input] : [input]));
  }

  useEffect(() => {
    console.log(task);
  }, [task]);
  return (
    <div className="topic-content">
      <input type="checkbox" id="mental-check" />
      <label htmlFor="mental-check">Mental Win</label>
      <Notes />
    </div>
  );
}
