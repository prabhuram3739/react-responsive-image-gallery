import React from 'react';
import styled from 'styled-components';

const Img = styled.img`
width: 100%;
height: 100%;
object-fit: cover;
`;

const DesiredImages = ({url, alt, imageKey, owner}) => {
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
  </div>
  </picture>
  </div>
  )
};

export default DesiredImages;
