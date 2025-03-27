import { Provider } from "react-redux";
import { store } from "./features/tetris/store";
import Tetris from "./components/Tetris";

function App() {
  return (
    <Provider store={store}>
      <div className="h-full w-full flex items-center justify-center p-4 bg-gray-900">
        <Tetris />
      </div>
    </Provider>
  );
}

export default App;
