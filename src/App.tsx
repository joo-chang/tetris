import { Provider } from "react-redux";
import { store } from "./features/tetris/store";
import Tetris from "./components/Tetris";

function App() {
  return (
    <Provider store={store}>
      <div className="min-h-screen w-full flex items-center justify-center p-2 md:p-4 bg-gray-900 overflow-auto">
        <Tetris />
      </div>
    </Provider>
  );
}

export default App;
