import { NotificationProvider } from "./context/NotificationContext";
import { UserProvider } from "./context/UserContext";
import Main from "./Main";

function App() {
  return (
    <div >
      <NotificationProvider>
        <UserProvider>
          <Main />
        </UserProvider>
      </NotificationProvider>

    </div>
  );
}

export default App;
