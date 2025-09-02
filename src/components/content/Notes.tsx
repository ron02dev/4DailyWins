import { useState } from "react";

interface TasksProps {
  tasks: string[] | null;
  onHandleCreate: (input: string) => void;
}
export default function Tasks() {
  return (
    <div>
      <textarea className="textarea" name="" id=""></textarea>
    </div>
  );
}
