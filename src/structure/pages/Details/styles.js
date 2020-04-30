import styled from 'styled-components';
import { Typography } from '@material-ui/core';

export const Box = styled.div`
  text-align: center;
  background: #202020;
  padding: 20px;
  border-radius: 5px;
`;

export const Avatar = styled.div`
  border-radius: 5px;
  border: 5px solid #ec1d24;
  background: url(${props => props.background}) no-repeat center transparent scroll;
  background-size: cover;
  height: 200px;
`;

export const Title = styled(Typography)`
  color: #fff;
`;
