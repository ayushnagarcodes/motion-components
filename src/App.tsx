import BottomStickyNav from "./components/BottomStickyNav";
import CanvasPaintReveal1 from "./components/CanvasPaintReveal1";
import CanvasPaintReveal2 from "./components/CanvasPaintReveal2";
import CursorHoverMaskReveal from "./components/CursorHoverMaskReveal";
import DragTransform from "./components/DragTransform";
import ExitAnimation from "./components/ExitAnimation";
import FormSubmit from "./components/FormSubmit";
import MusicApp from "./components/musicApp/MusicApp";
import MusicPlayer from "./components/MusicPlayer";
import QuotesSlider from "./components/QuotesSlider";
import ResponsiveNotify from "./components/ResponsiveNotify";
import SharedLayoutNav from "./components/SharedLayoutNav";
import StaggeredNav from "./components/StaggeredNav";
import StaggeredScroll from "./components/StaggeredScroll";
import TextSlideOnScroll from "./components/TextSlideOnScroll";
import TextStretch from "./components/TextStretch";
// import Practice from "./components/Practice";

function App() {
  return (
    <main className="grid md:grid-cols-2">
      {/* <Practice /> */}
      <CanvasPaintReveal1 />
      <CanvasPaintReveal2 />
      <CursorHoverMaskReveal />
      <MusicApp />
      <BottomStickyNav />
      <TextSlideOnScroll />
      <TextStretch />
      <MusicPlayer />
      <SharedLayoutNav />
      <FormSubmit />
      <DragTransform />
      <ExitAnimation />
      <QuotesSlider />
      <StaggeredNav />
      <ResponsiveNotify />
      <StaggeredScroll />
    </main>
  );
}

export default App;
