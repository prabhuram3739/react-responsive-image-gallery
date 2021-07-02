import React from 'react';
import styled from 'styled-components';

const Img = styled.img`
width: 100%;
height: 100%;
object-fit: cover;
`;

export const Desired = ({url, alt, key}) => {
  return (<Img src={url} alt={alt} key={key} />)
}
