import styled from 'styled-components';

import { Form } from '@unform/web';
import {CardMedia} from '@material-ui/core';
import {Link} from 'react-router-dom';
import Pagination from '@material-ui/lab/Pagination';

export const BoxEmpety = styled.div`
  text-align: right;
  margin-bottom: 20px;
`;

export const BoxPagination = styled.div`
  text-align: right;
`;

export const Media = styled(CardMedia)`
  height: 200px;
  
  @media (min-width: 960px){
    height: 300px;
  }
`;

export const A = styled(Link)`
  text-decoration: none;
`;

export const Pages = styled(Pagination)`
  margin-top: 30px;
  display: inline-block;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;

  h2 {
    margin: 0;
  }
`;

export const BoxForm = styled(Form)`
  display: flex;
  align-items: center;
  width: 100%;
  margin-left: 40px;

  input {
    width: 100%;
    height: 35px;
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 0 10px;
    outline: none;
    color: #333;

    &::-webkit-input-placeholder {
      color: #ccc;
    }
  }
`;