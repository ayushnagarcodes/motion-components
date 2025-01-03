import DragTransform from "./components/DragTransform";
import TextStretch from "./components/TextStretch";

function App() {
  return (
    <main className="grid md:grid-cols-2">
      <TextStretch />
      <DragTransform />
    </main>
  );
}

export default App;
