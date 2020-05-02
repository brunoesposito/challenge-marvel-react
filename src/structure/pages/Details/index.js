import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Input from '../../components/Input';
import { 
  Container,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  CardContent,
  Typography,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Breadcrumbs,
  Modal,
  Button,
  Paper
} from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { InsertLink, Edit } from '@material-ui/icons';

import Marvel from '../../services/api';
import { 
  Box,
  Avatar,
  BoxCard,
  Media,
  Title,
  TitleHeroe,
  CardTypography,
  BreadcrumbsLink,
  BoxModal,
  BoxForm
} from './styles';

export default function Details() {
  const dispatch = useDispatch();
  const {heroeChange} = useSelector(state => state);
  const { heroeId } = useParams();
  const [open, setOpen] = useState(false);
  const [heroe, setHeroe] = useState({});
  const [comic, setComic] = useState([]);
  const [events, setEvents] = useState([]);
  const [series, setSeries] = useState([]);
  const [stories, setStories] = useState([]);
  const [change, setChange] = useState({});

  const getHeroeOnly = useCallback(async () => {
    await Marvel
      .get(`/v1/public/characters/${heroeId}?apikey=07c1f645455bac53aa1a11223f8669e2&hash=1f6a97f0aab4e9ca5104c63485e03f4b8ef1d7a7`)
      .then(hero => {
        setHeroe(hero.data.data.results[0]);
        Comics(hero.data.data.results[0].comics.collectionURI);
        Events(hero.data.data.results[0].events.collectionURI);
        Series(hero.data.data.results[0].series.collectionURI);
        Stories(hero.data.data.results[0].stories.collectionURI);
      })
  }, [heroeId]);

  async function Stories(collectionURI){
    let route = collectionURI.replace('http://gateway.marvel.com', '');

    await Marvel
      .get(`${route}?apikey=07c1f645455bac53aa1a11223f8669e2&hash=1f6a97f0aab4e9ca5104c63485e03f4b8ef1d7a7`)
      .then(comic => {
        setStories(comic.data.data.results);
      })
  }

  async function Series(collectionURI){
    let route = collectionURI.replace('http://gateway.marvel.com', '');

    await Marvel
      .get(`${route}?apikey=07c1f645455bac53aa1a11223f8669e2&hash=1f6a97f0aab4e9ca5104c63485e03f4b8ef1d7a7`)
      .then(comic => {
        setSeries(comic.data.data.results);
      })
  }

  async function Events(collectionURI){
    let route = collectionURI.replace('http://gateway.marvel.com', '');

    await Marvel
      .get(`${route}?apikey=07c1f645455bac53aa1a11223f8669e2&hash=1f6a97f0aab4e9ca5104c63485e03f4b8ef1d7a7`)
      .then(comic => {
        setEvents(comic.data.data.results);
      })
  }

  async function Comics(collectionURI){
    let route = collectionURI.replace('http://gateway.marvel.com', '');

    await Marvel
      .get(`${route}?apikey=07c1f645455bac53aa1a11223f8669e2&hash=1f6a97f0aab4e9ca5104c63485e03f4b8ef1d7a7`)
      .then(comic => {
        setComic(comic.data.data.results);
      })
  }

  function openDetails(link){
    window.open(link);
  }

  function handleSubmit(data, {reset}) {
    let existHeroe = heroeChange.find(hc => hc.id === data.id);

    if(!existHeroe){
      dispatch({ type: 'SET_HEROE_CHANGE', change: data })
    }

    setOpen(false);
    reset();
  }

  useEffect(() => {
    getHeroeOnly();
    setChange(heroeChange.find(h => h.id === heroeId));
  }, [getHeroeOnly, heroeChange, heroeId]);

  return (
    <Container>
      <Breadcrumbs aria-label="breadcrumb">
        <BreadcrumbsLink to='/'>Home</BreadcrumbsLink>
        <span>{heroe?.name}</span>
      </Breadcrumbs>
      <Grid container spacing={2}>
        <Grid item xs={8} md={8}>
          <Title variant="h3" color="textSecondary" component="p">
            Comics
          </Title>
          {comic && Object.keys(comic).length > 0 ? (
            <Grid container spacing={2}>
              {comic.map(item => (
                <Grid item xs={6} md={3} key={item.id}>
                  <BoxCard onClick={() => openDetails(item.urls[0].url)}>
                    <Media
                      image={`${item.thumbnail.path}.${item.thumbnail.extension}`}
                      title={item.title}
                    />
                    <CardContent>
                      <CardTypography variant="body2" color="textSecondary" component="p">
                        {item.title}
                      </CardTypography>
                    </CardContent>
                  </BoxCard>
                </Grid>
              ))}
            </Grid>
          ) : (
            <CardTypography variant="body2" color="textSecondary" component="p">
              Nenhuma Comic foi encontrado
            </CardTypography>
          )}
          <Title variant="h3" color="textSecondary" component="p">
            Events
          </Title>
          {events && Object.keys(events).length > 0 ? (
            <Grid container spacing={2}>
              {events.map(item => (
                <Grid item xs={6} md={3} key={item.id}>
                  <BoxCard onClick={() => openDetails(item.urls[0].url)}>
                    <Media
                      image={`${item.thumbnail.path}.${item.thumbnail.extension}`}
                      title={item.title}
                    />
                    <CardContent>
                      <CardTypography variant="body2" color="textSecondary" component="p">
                        {item.title}
                      </CardTypography>
                    </CardContent>
                  </BoxCard>
                </Grid>
              ))}
            </Grid>
          ) : (
            <CardTypography variant="body2" color="textSecondary" component="p">
              Nenhum evento foi encontrado
            </CardTypography>
          )}
          <Title variant="h3" color="textSecondary" component="p">
            Series
          </Title>
          {series && Object.keys(series).length > 0 ? (
            <Grid container spacing={2}>
              {series.map(item => (
                <Grid item xs={6} md={3} key={item.id}>
                  <BoxCard onClick={() => openDetails(item.urls[0].url)}>
                    <Media
                      image={`${item.thumbnail.path}.${item.thumbnail.extension}`}
                      title={item.title}
                    />
                    <CardContent>
                      <CardTypography variant="body2" color="textSecondary" component="p">
                        {item.title}
                      </CardTypography>
                    </CardContent>
                  </BoxCard>
                </Grid>
              ))}
            </Grid>
          ) : (
            <CardTypography variant="body2" color="textSecondary" component="p">
              Nenhuma Serie foi encontrado
            </CardTypography>
          )}
          <Title variant="h3" color="textSecondary" component="p">
            Stories
          </Title>
          {stories && Object.keys(stories).length > 0 ? (
            <TableContainer component={Paper}>
              <Table size="small" aria-label="a dense table">
                <TableBody>
                  {stories.map(item => (
                    <TableRow key={item.id}>
                      <TableCell>{item.title}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <CardTypography variant="body2" color="textSecondary" component="p">
              Nenhum Storie foi encontrado
            </CardTypography>
          )}
        </Grid>
        <Grid item xs={4} md={4}>
          {heroe?.name ? (
            <Box>
              {change?.imagem ? (
                <Avatar background={change.imagem} />
              ) : (
                <Avatar background={`${heroe.thumbnail.path}.${heroe.thumbnail.extension}`} />
              )}
              <TitleHeroe variant="h3" component="h2" gutterBottom onClick={() => setOpen(true)}>
                {change?.name ? (
                  change.name
                ) : (
                  heroe.name
                )}
                <Edit />
              </TitleHeroe>
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
            <>
              <Skeleton variant="rect" animation="wave" width={'100%'} height={200} />
              <Skeleton variant="text" height={60} />
              <Skeleton variant="text" height={200} />
            </>
          )}
        </Grid>
      </Grid>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <BoxModal>
          <Typography variant="h4" color="textPrimary" component="h4">
            Altere as informações do usuário
          </Typography>
          <BoxForm onSubmit={handleSubmit}>
            <Input name="id" type="hidden" value={heroeId} />
            <Input name="name" type="text" placeholder="Nome do personagem" />
            <Input name="imagem" type="text" placeholder="Imagem do personagem" />
            <Button variant="contained" color="primary" type="submit">Salvar</Button>
          </BoxForm>
        </BoxModal>
      </Modal>
    </Container>
  );
};