import React, {useState, useRef} from 'react';
import styled from 'styled-components';

const Img = styled.img`
width: 100%;
height: 100%;
object-fit: cover;
`;

const DesiredImages = ({url, alt, imageKey, owner, photo}) => {
  const [favourites, setFavourites] = useState([]);
  // Add favorite method adds the photos to the flicker api favorite list
  const addFavourite = (props) => {
  let tempArray = favourites;
  let addTempArray = true;
  tempArray.forEach((item, key) => {
  if(item === props.imageKey) {
    tempArray.splice(key, 1);
    addTempArray = false;
    }
  });
  if(addTempArray) {
    tempArray.push(props.imageKey);
  }
  console.log("Add temp array status:", addTempArray);
  console.log("Favourite List:", tempArray);
  // setFavourites([...tempArray]);
  };
  return (
  <div className="image">
  <picture>
  <source media="(min-width:650px)" srcSet={url} />
  <source media="(min-width:465px)" srcSet={url} />
  <Img className="image-img" src={url} alt={alt} imageKey={imageKey} />
  <div className="image-overlay image-overlay-blur">
  <div className="image-title">{alt}</div>
  <p className="image-description">
  {owner}
  </p>
  {favourites.includes(imageKey) ? (
  <button className="add-favourite" onClick={addFavourite({photo, imageKey})}>Remove from Favourite</button>
  ) : (
  <button className="add-favourite" onClick={addFavourite({photo, imageKey})}>Add to Favourite</button>
  )}
  </div>
  </picture>
  </div>
  )
};

export default DesiredImages;
