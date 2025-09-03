import { useState } from "react";
import { useDailyWinContext } from "../App";

interface Props extends Win {
  win_type: win_type;
  task_done: string;
  onHandleChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export default function Checkbox({
  win_type,
  task_done,
  onHandleChange,
}: Props) {
  const { dispatch } = useDailyWinContext();
  const [isChecked, setIsChecked] = useState<boolean | false>(false);
  const mentalWin: Win = {
    win_type: win_type,
    task_done: task_done,
  };

  function submitWin() {
    dispatch({ type: "LOG_WIN", payload: mentalWin });
  }
  function removeWin() {
    console.log("remove")
    dispatch({ type: "REMOVE_WIN", payload: "mental" });
  }
  return (
    <section className={`${win_type}-section section`}>
      <span>
        <input
          type="checkbox"
          onChange={(e) => {
            if (e.target.checked) {
              submitWin();
              setIsChecked(true);
            } else {
              removeWin();
              setIsChecked(false);
            }
          }}
          id={`${win_type}-checkbox`}
        />
        {isChecked ? (
          <p className="checkbox-title  success">
            {win_type.toUpperCase()} WIN LOGGED!
          </p>
        ) : (
          <p className="checkbox-title "> LOG {win_type.toUpperCase()} WIN</p>
        )}
      </span>

      <textarea
        id={`${win_type}-textarea`}
        className={`textarea ${win_type} ${isChecked ? " disabled" : ""}`}
        disabled={isChecked}
        onChange={(e) => onHandleChange(e)}
        defaultValue={
          "log something here according to your wins.... example -go for a walk"
        }
      />
    </section>
  );
}
