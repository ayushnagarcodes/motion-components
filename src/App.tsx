import DragTransform from "./components/DragTransform";
import ExitAnimation from "./components/ExitAnimation";
import TextStretch from "./components/TextStretch";

function App() {
  return (
    <main className="grid md:grid-cols-2">
      <TextStretch />
      <DragTransform />
      <ExitAnimation />
    </main>
  );
}

export default App;
