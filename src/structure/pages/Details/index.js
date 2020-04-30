import React, { useEffect, useState, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Container,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { InsertLink } from '@material-ui/icons';

import Marvel from '../../services/api';
import { Box, Avatar, Title } from './styles';

export default function Details() {
  const { heroeId } = useParams();
  const [heroe, setHeroe] = useState({});
  console.log(heroe)

  const getHeroeOnly = useCallback(async () => {
    await Marvel
      .get(`/v1/public/characters/${heroeId}?apikey=07c1f645455bac53aa1a11223f8669e2&hash=1f6a97f0aab4e9ca5104c63485e03f4b8ef1d7a7`)
      .then(hero => {
        setHeroe(hero.data.data.results[0]);
      })
  }, [heroeId]);

  useEffect(() => {
    getHeroeOnly();
  }, [getHeroeOnly]);

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={8} md={8}>
          <p>Oi</p>
        </Grid>
        <Grid item xs={4} md={4}>
          {heroe?.name ? (
            <Box>
              <Avatar background={`${heroe.thumbnail.path}.${heroe.thumbnail.extension}`} />
              <Title variant="h3" component="h2" gutterBottom>
                {heroe.name}
              </Title>
              <List component="nav" aria-label="main mailbox folders">
                {heroe.urls.map((url, i) => (
                  <ListItem button onClick={() => window.open(url.url)} key={i}>
                    <ListItemIcon>
                      <InsertLink />
                    </ListItemIcon>
                    <ListItemText primary={url.type} />
                  </ListItem>
                ))}
              </List>
            </Box>
          ) : (
            <Skeleton variant="rect" animation="wave" width={'100%'} height={300} />
          )}
        </Grid>
      </Grid>
      <Link to="/">Voltar</Link>
    </Container>
  );
}
