import React, { useEffect, useState, useCallback } from 'react';
import { 
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  IconButton,
  Button
} from '@material-ui/core';
import { Search, Delete } from '@material-ui/icons';
import Input from '../../components/Input';
import Loading from './components/Loading';

import Marvel from '../../services/api'; 
import { Header, Media, A, Pages, BoxForm, BoxEmpety, BoxPagination } from './styles';

export default function Home() {
  const [heroes, setHeroes] = useState([]);
  const [pageNow, setPageNow] = useState(1);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false); 
  const [emptySearch, setEmptySearch] = useState(false); 

  const getHeroes = useCallback(async () => {
    setLoading(true);
    setEmptySearch(false);

    await Marvel
      .get(`/v1/public/characters?apikey=07c1f645455bac53aa1a11223f8669e2&hash=1f6a97f0aab4e9ca5104c63485e03f4b8ef1d7a7&offset=${page}`)
      .then(hero => {
        setHeroes(hero.data.data.results);
        setTotalPages(Math.round(hero.data.data.total/20));
        setLoading(false);
      });
  }, [page]);

  function setPagination(event, value){
    setLoading(true);
    setPageNow(value);
    window.scrollTo({top: 0, behavior: 'smooth' });

    if( value > pageNow ){
      if( value === 2 ){
        setPage(20);
      }else {
        setPage((value * 20) - 20);
      }
    }else {
      if( value === 1 ){
        setPage(0);
      }else {
        setPage((value * 20) - 20);
      }
    }

    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }

  async function handleSearch(data){
    setLoading(true);

    if(data.search) {
      setTotalPages(0);

      await Marvel
        .get(`/v1/public/characters?apikey=07c1f645455bac53aa1a11223f8669e2&hash=1f6a97f0aab4e9ca5104c63485e03f4b8ef1d7a7&limit=${100}`)
        .then(hero => {
          setHeroes([hero.data.data.results.find(h => h.name?.toLowerCase() === data.search.toLowerCase())]);
          setEmptySearch(true);
          setLoading(false);
        });
    }else {
      getHeroes();
    }
  }

  function removeSearch(){
    setLoading(true);
    setEmptySearch(true);
    getHeroes();
  }

  useEffect(() => {
    getHeroes();
  }, [getHeroes]);

  return (
    <Container>
      <Header>
        <Typography variant="h3" component="h2" gutterBottom>
          SoftMarvel
        </Typography>
        <BoxForm onSubmit={handleSearch}>
          <Input name="search" type="text" placeholder="Busque aqui" />
          <IconButton aria-label="search" type="submit">
            <Search />
          </IconButton>
        </BoxForm>
      </Header>
      {emptySearch && (
        <BoxEmpety>
          <Button
            variant="contained"
            color="secondary"
            startIcon={<Delete />}
            onClick={() => removeSearch()}
          >
            Limpar Busca
          </Button>
        </BoxEmpety>
      )}
      <Grid container spacing={2}>
        {loading ? (
          <Loading />
        ) : (
          heroes.map(hero => (
            hero ? (
              <Grid item xs={6} md={3} key={hero.id}>
                <Card>
                  <A to={`/detail/${hero.id}`}>
                    {hero.thumbnail ? (
                      <Media
                        image={`${hero.thumbnail.path}.${hero.thumbnail.extension}`}
                        title={hero.name}
                      />
                      ) : (
                        <Media
                          image={hero.imagem}
                          title={hero.name}
                        />
                    )}
                    <CardContent>
                      <Typography variant="body2" color="textSecondary" component="p">
                        {hero.name}
                      </Typography>
                    </CardContent>
                  </A>
                </Card>
              </Grid>
            ) : (
              <Typography variant="h5" component="h5" gutterBottom>
                Nenhum herói foi encontrado
              </Typography>
            )
          ))
        )}
      </Grid>
      {totalPages > 0 && (
        <BoxPagination>
          <Pages count={totalPages} color="primary" shape="rounded" onChange={setPagination} />
        </BoxPagination>
      )}
    </Container>
  );
}
