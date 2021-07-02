
import React, {useEffect, useState, useRef, lazy, Suspense} from 'react';
import {Heading} from './components/Heading';
import {Loader} from './components/Loader';
// import {DesiredImages} from './components/DesiredImages';
import styled from 'styled-components';
import {FLICKER_API} from './API.constants';
//Implemented the lazy loading of the image component
const DesiredImages = lazy(() => import('./components/DesiredImages'));

//style to showcase the use of styled components, can be done in a seperate file as well

const WrapperImage = styled.section`
max-width: 70rem;
margin: 4rem auto;
display: grid;
grid-gap: 1em;
grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
grid-auto-rows: 300px;
animation: scale 0.5s linear;

@keyframes scale {
  from{transform: scale(0.5)}
}
`;

function App() {
  const [images, setImages] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(false);

  // Function to fetch the images from the Flicker API
  const fetchImages = async(pageNumber) => {
    //Flicker API url construction to fetch the images
    const apiRoot = FLICKER_API.GET_RECENT_DATA + '&api_key=' + FLICKER_API.API_KEY + '&page=' + pageNumber + '&per_page=10&format=json&nojsoncallback=1';
    // GET request using fetch inside useEffect React hook
    console.log()
    const res = await fetch(apiRoot);
    const data = await res.json();
    //Appending the images to the existing ones to show the more photos
    setImages(prevImages => [...prevImages, ...data.photos.photo]);
    setLoading(true);
    return res;
  }

  useEffect(() => { 
    fetchImages(pageNumber);
  }, [pageNumber]);

  //Function to load more images on change of the page number
  const loadMore = () => {
    setPageNumber(prevPageNumber => prevPageNumber + 1);
  }
const pageEnd = useRef();
// let num = 1;
  useEffect(() => {
if(loading) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if(entry.isIntersecting) {
        // num++; //To restrict the infinite loading after a certain page number
        loadMore();
        //To restrict the infinite loading after a certain page number
        /* if(num >=5) {
          observer.unobserve(pageEnd.current);
        } */
      }
    });
  }, {threshold: 1});
  observer.observe(pageEnd.current)
}
  // }, [loading, num]); //To restrict the infinite loading after a certain page number
}, [loading]);

  return (
    <div className="App">
    <Heading />
    <WrapperImage>
    {images.map(image => {
      let imageUrl = FLICKER_API.IMAGE_ROOT_URL + image.server + '/' + image.id + '_' + image.secret + '_w.jpg';

      //Loading the images based on the requirement - lazy loading
      return <Suspense fallback={<img src={imageUrl} alt='Avatar' style={{ width: '50%' }} />}>
     <DesiredImages url={imageUrl} alt={image.title} key={image.id} />
    </Suspense>
    
    })}
    </WrapperImage>
    <Loader />
    <p>Page Number: {pageNumber}</p>
    <p>Total Images Loaded: {images.length}</p>
    <button className="loadMore" onClick={loadMore} ref={pageEnd}>Load More</button>
    
    </div>
  );
}

export default App;
