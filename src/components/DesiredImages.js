import React from 'react';
import styled from 'styled-components';

const Img = styled.img`
width: 100%;
height: 100%;
object-fit: cover;
`;

const DesiredImages = ({url, alt, key, owner}) => {
  return (
  <div className="image">
  <Img className="image__img" src={url} alt={alt} key={key} />
  <div className="image__overlay image__overlay--blur">
  <div className="image__title">{alt}</div>
  <p className="image__description">
  {owner}
  </p>
  </div>
  </div>
  )
};

export default DesiredImages;
