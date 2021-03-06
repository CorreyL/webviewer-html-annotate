import Viewer from './components/viewer/Viewer';
import Nav from './components/navigation/Nav';
import { useState } from 'react';
import { Spinner, Layer, Box } from 'gestalt';
import 'gestalt/dist/gestalt.css';
import './App.css';

function App() {
  const [response, setResponse] = useState([]);
  const [show, setShow] = useState(false);
  const [fetchError, setFetchError] = useState('');

  const handleSubmit = (url, width, height) => {
    setShow(true);
    fetch(`http://127.0.0.1:3001/website?url=${url}&width=${width}&height=${height}`)
      .then(async response => {
        if (!response.ok) {
          setShow(false);
          const json = await response.json();
          setFetchError(JSON.stringify(json));
          return;
        }
        const json = await response.json();
        setResponse([json.data, width, height]);
        setShow(false);
      })
      .catch(err => {
        setShow(false);
        setFetchError(err);
      });
  };

  return (
    <div>
      <Layer>
        <Box
          fit
          dangerouslySetInlineStyle={{
            __style: {
              top: '50%',
              left: '50%',
              transform: 'translateX(-50%)',
            },
          }}
          paddingX={1}
          position="fixed"
        >
          <Spinner show={show} accessibilityLabel="Loading website" />
        </Box>
      </Layer>

      <div className="App">
        <Nav handleSubmit={handleSubmit} fetchError={fetchError}/>
        <Viewer res={response} />
      </div>
    </div>
  );
}

export default App;
