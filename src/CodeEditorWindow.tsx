import Editor from "@monaco-editor/react";
import { useState } from "react";
import { LogsContainer } from "./LogsContainer";
import { LuaFactory } from "wasmoon";

const factory = new LuaFactory();


const defaultCode =
`-- What's this? A Lua editor?
-- Yes! You can write Lua scripts and run them here.
-- There is no server-side code running here.
-- Everything is in the browser (yes even the compiler).
-- Powered by wasmoon (webassembly).
-- Enjoy!
--
-- Return values are printed to the output window.
-- Logs are printed to the logs window.
`;

type CodeEditorWindowProps = {
  language?: string;
};

const CodeEditorWindow = ({ language }: CodeEditorWindowProps) => {
  const [srCode, setSrCode] = useState<string>("");
  const [output, setOutput] = useState<string>("");

  function handleEditorChange(
    value: string | undefined
  ) {
    setSrCode(value || "");
    return;
  }

  function runScript() {
    console.log("Running script...");

    const lua = factory.createEngine();
    lua.then((engine) => {
      engine.doString(srCode).then((output) => {
        console.log("Script Output:", output);
        setOutput(output);
      });
    });
  }

  return (
    <div className="flex flex-row">
      <div>
        <Editor
          height="85vh"
          width="50vw"
          language={language || "lua"}
          theme="vs-dark"
          value={srCode}
          onChange={handleEditorChange}
          defaultValue={defaultCode}
        />
      </div>
      <div className="h-1/4 w-96 p-4">
        <button
          onClick={() => runScript()}
          className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
        >
          <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
            Run
          </span>
        </button>

        <div className="h-36 w-full overflow-y-auto">
          <h3>Output:</h3>
          <br />
          <pre>{output}</pre>
        </div>
        <br />

        <div className="h-fit w-full overflow-y-auto">
          <h3>Logs:</h3>
          <br />
        <LogsContainer />
        </div>
      </div>
    </div>
  );
};

export default CodeEditorWindow;
