import styled from 'styled-components';
import { Form } from '@unform/web';
import { Typography, Card, CardMedia } from '@material-ui/core';
import { Link } from 'react-router-dom';

export const Box = styled.div`
  
`;

export const Avatar = styled.div`
  background: url(${props => props.background}) no-repeat center transparent scroll;
  background-size: cover;
  height: 200px;
`;

export const Title = styled(Typography)`
  margin: 20px 0;
`;

export const TitleHeroe = styled(Typography)`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

export const BoxCard = styled(Card)`
  cursor: pointer;
`;

export const Media = styled(CardMedia)`
  height: 200px;
  
  @media (min-width: 960px){
    height: 300px;
  }
`;

export const CardTypography = styled(Typography)`
  min-height: 70px;
`;

export const BreadcrumbsLink = styled(Link)`
  color: #ec1d24;
  text-decoration: none;
`;

export const BoxModal = styled.div`
  background: #fff;
  max-width: 600px;
  width: 80%;
  border-radius: 5px;
  padding: 20px;
  margin: 10px auto;
  outline: none;
`;

export const BoxForm = styled(Form)`
  display: flex;
  flex-direction: column;

  input {
    border-radius: 2px;
    border: 1px solid #ccc;
    height: 30px;
    padding: 0 10px;
    margin: 15px 0 0;

    ::-webkit-input-placeholder: {
      color: #ccc
    }
  }
  button {
    margin-top: 15px;
  }
`;