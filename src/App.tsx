import BottomStickyNav from "./components/BottomStickyNav";
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
