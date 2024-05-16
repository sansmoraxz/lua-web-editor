import "./App.css";

import CodeEditorWindow from "./CodeEditorWindow";

// Create a standalone lua environment from the factory

function App() {
  return (
    <>
      <h1 className="text-4xl text-center mb-10 text-gray-100 md:font-bold">
        Lua Web Editor
      </h1>
      <CodeEditorWindow />

      <div className="text-center mt-4">Free to use, no sign up required.</div>
    </>
  );
}

export default App;
