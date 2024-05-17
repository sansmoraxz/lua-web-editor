import Editor from "@monaco-editor/react";
import { useState } from "react";
import { LogsContainer } from "./LogsContainer";
import { LuaFactory } from "wasmoon";

const factory = new LuaFactory();

const defaultCode = `-- What's this? A Lua editor?
-- Yes! You can write Lua scripts and run them here.
-- There is no server-side code running here.
-- Everything is in the browser (yes even the compiler).
-- Powered by wasmoon (webassembly).
-- Enjoy!
--
-- Return values are printed to the output window.
-- Logs are printed to the logs window.


-- For details about the compilation process for lua, check https://www.lua.org/pil/8.html
`;

type CodeEditorWindowProps = {
  language?: string;
};

const CodeEditorWindow = ({ language }: CodeEditorWindowProps) => {
  const [srCode, setSrCode] = useState<string>("");
  const [output, setOutput] = useState<string>("Press run to execute the script.");

  const [isRunning, setIsRunning] = useState<boolean>(false);

  function handleEditorChange(value: string | undefined) {
    setSrCode(value || "");
    return;
  }

  async function process() {
    console.clear();
    console.warn("Running script...");
    console.time("Execution Time");

    try {
      const engine = await factory.createEngine();

      // override print function to use console.log
      engine.global.set("print", (...args: unknown[]) => {
        console.info("Lua Console output: ", ...args);
      });


      try {
        const output = await engine.doString(srCode);
        if (output) {
          console.log("Script Output:", output);
          setOutput(output);
        } else {
          console.log("Script Output: No output");
          setOutput("No output");
        }
        console.timeEnd("Execution Time");
      } catch (err) {
        console.error("Script Error:", err);
        setOutput(`Error occured. Check the logs.`);
        console.timeEnd("Execution Time");
      }
    } catch (err) {
      console.error("Engine Error:", err);
    }
  }

  function runScript() {
    setIsRunning(true);
    process().finally(() => {
      setIsRunning(false);
    });
  }

  return (
    <div className="flex flex-row">
      <div>
        <Editor
          height="80vh"
          width="50vw"
          language={language || "lua"}
          theme="vs-dark"
          value={srCode}
          onChange={handleEditorChange}
          defaultValue={defaultCode}
        />
      </div>
      <div className="h-1/4 w-[50vw] min-w-[30vw] pl-10">
        <button
          onClick={() => runScript()}
          disabled={isRunning}
          className="relative inline-flex items-center justify-center p-0.5 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 mb-10"
        >
          <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
            Run
          </span>
        </button>

        <div className="h-36 overflow-x-scroll border-2 border-cyan-900 rounded-t-lg">
          <div className="text-lg  text-gray-400 pb-4 md:font-semibold">
            Output
          </div>
          <code className="text-sm text-gray-300 md:font-light">
            {isRunning ? "Running..." : JSON.stringify(output)}
          </code>
        </div>
        <br />

        <div className="h-96 w-full overflow-y-auto border-2 border-sky-800 rounded-t-lg">
          <div className="text-lg text-gray-400 pb-4 md:font-semibold">
            Logs
          </div>
          <LogsContainer />
        </div>
      </div>
    </div>
  );
};

export default CodeEditorWindow;
