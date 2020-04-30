import React, { useEffect, useState } from 'react';
import { 
  Container,
  Grid,
  Card,
  CardContent,
  Typography
} from '@material-ui/core';

import Marvel from '../../services/api';
import { Media, A, Pages } from './styles';

export default function Home() {
  const [heroes, setHeroes] = useState([]);

  async function getHeroes(){
    await Marvel
      .get('/v1/public/characters?apikey=07c1f645455bac53aa1a11223f8669e2&hash=1f6a97f0aab4e9ca5104c63485e03f4b8ef1d7a7')
      .then(hero => {
        console.log(hero);
        setHeroes(hero.data.data.results)
      })
  }

  useEffect(() => {
    getHeroes();
  }, []);

  return (
    <Container>
      <Typography variant="h3" component="h2" gutterBottom>
        SoftMarvel
      </Typography>
      <Grid container spacing={2}>
        {heroes.map(hero => (
          <Grid item xs={6} md={3} key={hero.id}>
            <Card>
              <A to={`/detail/${hero.id}`}>
                <Media
                  image={`${hero.thumbnail.path}.${hero.thumbnail.extension}`}
                  title={hero.name}
                />
                <CardContent>
                  <Typography variant="body2" color="textSecondary" component="p">
                    {hero.name}
                  </Typography>
                </CardContent>
              </A>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Pages count={10} color="primary" shape="rounded" />
    </Container>
  );
}
