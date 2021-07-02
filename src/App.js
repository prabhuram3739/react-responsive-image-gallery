
import React, {useEffect, useState} from 'react';
import {Heading} from './components/Heading';
import {Loader} from './components/Loader';
import {Desired} from './components/Desired';
import styled from 'styled-components';
import {createGlobalStyle } from 'styled-components';
import {FLICKER_API} from './API.constants';

//style
const GlobalStyle = createGlobalStyle`
  = {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: sans-serif
}
`;

const WrapperImage = styled.section`
max-width: 70rem;
margin: 4rem auto;
display: grid;
grid-gap: 1em;
grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
grid-auto-rows: 300px;
`;
function App() {
  const [image, setImage] = useState([]);

  useEffect(() => { 
    fetchImages();
  }, []);

  const fetchImages = () => {
    const apiRoot = FLICKER_API.GET_RECENT_DATA + '&api_key=' + FLICKER_API.API_KEY + '&format=json&nojsoncallback=1&auth_token=' + FLICKER_API.AUTH_TOKEN + '&api_sig=' + FLICKER_API.API_SIG_KEY;
    // GET request using fetch inside useEffect React hook
  fetch(apiRoot)
  .then(response => response.json())
  .then(data => setImage(data.photos.photo));
  }
  return (
    <div className="App">
    <Heading />
    <GlobalStyle />
    <Loader />
    <WrapperImage>
    {image.map(i => {
      let imageUrl = FLICKER_API.IMAGE_ROOT_URL + i.server + '/' + i.id + '_' + i.secret + '_w.jpg';
      return <Desired url={imageUrl} alt={i.title} key={i.id} />
    })}
    </WrapperImage>
    </div>
  );
}

export default App;
