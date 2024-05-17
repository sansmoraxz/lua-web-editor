import "./App.css";

import CodeEditorWindow from "./CodeEditorWindow";
import Footer from "./Footer";

// Create a standalone lua environment from the factory

function App() {
  return (
    <>
      <h1 className="text-4xl text-center mb-10 text-gray-100 md:font-bold">
        Lua Web Editor
      </h1>
      <CodeEditorWindow />

      <Footer />
    </>
  );
}

export default App;
