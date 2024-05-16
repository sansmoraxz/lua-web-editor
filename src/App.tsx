import "./App.css";

import CodeEditorWindow from "./CodeEditorWindow";

// Create a standalone lua environment from the factory

function App() {
  return (
    <>

      <h1 className="text-4xl text-center">Lua Web Editor</h1>
      <br />
      <CodeEditorWindow />

      <div className="text-center mt-4">Free to use, no sign up required.</div>
    </>
  );
}

export default App;
