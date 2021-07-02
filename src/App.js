
import React, {useEffect, useState} from 'react';
import {Heading} from './components/Heading';
import {Loader} from './components/Loader';
import {DesiredImage} from './components/DesiredImage';
import styled from 'styled-components';
import {createGlobalStyle } from 'styled-components';


//style
const GlobalStyle = createGlobalStyle`
  = {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
`;
function App() {
  const [image, setImage] = useState([]);

  useEffect(() => {
    const accessKey = process.env.REACT_APP_ACCESSKEY;
    console.log(accessKey);
    const apiRoot = "https://www.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=7dd615cadb8c870b64acc69a1e8cf827&format=json&nojsoncallback=1&auth_token=72157719538848220-b1c5a1d6ad0f3500&api_sig=5493b629fe03ddba638d27da6b5ca08e"

    // GET request using fetch inside useEffect React hook
  fetch(apiRoot)
  .then(response => response.json())
  .then(data => setImage(data.photos.photo));
// empty dependency array means this effect will only run once (like componentDidMount in classes)
  }, []);
  console.log("Images Data:", image);
  return (
    <div className="App">
    <Heading />
    <GlobalStyle />
    <Loader />
    {image.map(i => {
      let imageUrl = 'https://live.staticflickr.com/' + i.server + '/' + i.id + '_' + i.secret + '_w.jpg';
      console.log('Image Url:', imageUrl);
      <DesiredImage url={imageUrl} key={i.id} />
    })}
    </div>
  );
}

export default App;
