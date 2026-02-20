import { NotificationProvider } from "./context/NotificationContext";
import Main from "./Main";

function App() {
  return (
    <div >
      <NotificationProvider>
        <Main />
      </NotificationProvider>

    </div>
  );
}

export default App;
