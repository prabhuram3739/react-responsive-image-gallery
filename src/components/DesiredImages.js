import React from 'react';
import styled from 'styled-components';

const Img = styled.img`
width: 100%;
height: 100%;
object-fit: cover;
`;

const DesiredImages = ({url, alt, key}) => {
  return (<Img src={url} alt={alt} key={key} />)
};

export default DesiredImages;
