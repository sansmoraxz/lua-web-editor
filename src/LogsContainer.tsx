import { useState, useEffect } from "react";
import { Console, Hook, Unhook } from "console-feed";

const LogsContainer = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [logs, setLogs] = useState<any[]>([]);

  // run once!
  useEffect(() => {
    const hookedConsole = Hook(
      window.console,
      (log) => {
        if(log.method === "clear") {
          setLogs([]);
          return;
        }
        setLogs((currLogs) => [...currLogs, log]);
      },
      false
    );

    console.log("Init...")
    return () => { Unhook(hookedConsole); }
  }, []);

  return <Console logs={logs} variant="dark" />;
};

export { LogsContainer };
