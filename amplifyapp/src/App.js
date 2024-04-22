import Page from "./Components/Page";
import { Amplify } from 'aws-amplify';
Amplify.configure();

function App() {
  return (
    <div>
      <Page />
    </div>
  );
}

export default App;
