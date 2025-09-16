import { useDailyWinContext } from "../hooks/useDailyWinContext";

interface Props extends Win {
  win_type: win_type;
  task_done: string;
  setTask: React.Dispatch<React.SetStateAction<string | null>>;
  isChecked: boolean;
  setIsChecked: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Checkbox({
  win_type,
  task_done,
  setTask,
  isChecked,
  setIsChecked,
}: Props) {
  const { dispatch } = useDailyWinContext();

  // SUBMIT THE WIN ON REDUCER
  function submitWin() {
    // SANITIZE VALUE
    const taskValue = task_done.trim();

    if (taskValue.length > 3) {
      // COMPILED WIN ON CERTAIN CATEGORY
      const win: Win = {
        win_type: win_type,
        task_done: taskValue,
      };
      dispatch({ type: "LOG_WIN", payload: win });
      dispatch({
        type: "SET_SERVER_MESSAGE",
        payload: {
          serverMessage: `${win_type} win added!`,
          messageType: "success",
        },
      });
    } else {
      console.log("this is run");
      dispatch({
        type: "SET_SERVER_MESSAGE",
        payload: {
          serverMessage: `Invalid task! ${win_type} win not logged`,
          messageType: "error",
        },
      });
      setIsChecked(false);
    }
  }

  const handleCheckboxChange = (event: any) => {
    setIsChecked(event.target.checked);

    if (!isChecked) {
      submitWin();
    } else {
      console.log("UNSUBMIT");
      removeWin();
    }
  };

  // REMOVE THE WIN ON REDUCER
  function removeWin() {
    console.log("remove");
    dispatch({ type: "REMOVE_WIN", payload: win_type });
    dispatch({
      type: "SET_SERVER_MESSAGE",
      payload: {
        serverMessage: `${win_type} win removed!`,
        messageType: "warning",
      },
    });
  }

  function handleClear() {
    if (!isChecked) {
      setTask("");
    } else {
    }
  }

  function HandleChange(e: any) {
    setTask(e.target.value);
  }

  return (
    <section className={`${win_type}-section section`}>
      <span className="controls-span">
        <span className="checkbox-span">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={handleCheckboxChange}
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

        <button className="clear-text-btn" onClick={handleClear}>
          Clear Text
        </button>
      </span>

      <textarea
        maxLength={500}
        id={`${win_type}-textarea`}
        className={`textarea ${win_type} ${isChecked ? " disabled" : ""}`}
        disabled={isChecked}
        value={task_done}
        onChange={(e) => HandleChange(e)}
      />
    </section>
  );
}
