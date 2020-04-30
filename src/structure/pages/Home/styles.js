import styled from 'styled-components';

import {CardMedia} from '@material-ui/core';
import {Link} from 'react-router-dom';
import Pagination from '@material-ui/lab/Pagination';

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
`;
