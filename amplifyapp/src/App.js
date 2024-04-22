import Page from "./Components/Page";
import Amplify from 'aws-amplify';
import awsExports from './aws-exports';
Amplify.configure(awsExports);

function App() {
  return (
    <div>
      <Page />
    </div>
  );
}

export default App;
