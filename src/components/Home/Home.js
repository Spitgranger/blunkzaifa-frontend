 import React from 'react'
 import { Container, Grow, Grid, Paper, AppBar, TextField, Button} from '@material-ui/core';
 import { useState, useEffect} from 'react';
 import {useDispatch} from 'react-redux'
import {useHistory, useLocation} from 'react-router-dom'
import ChipInput from "material-ui-chip-input"

 import {getPosts} from '../../actions/posts'
 import Posts from '../Posts/Posts'
 import Form from '../Form/Form';
 import useStyles from './styles'
 import Pagination from '../Pagination'

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

 function Home() {
    const [currentId, setCurrentId] = useState(null)
    const classes = useStyles();
    const dispatch = useDispatch();
    const query = useQuery();
    const history = useHistory();
    const page = query.get('page') || 1;
    const searchQuery = query.get('searchQuery')

    useEffect(() => {
        dispatch(getPosts());
    }, [currentId, dispatch])

   return (    
    <Grow in>
    <Container maxWidth="xl">
        <Grid container justifyContent="space-between" alignItems='stretch' spacing={3} className={classes.gridContainer}>
            <Grid item xs={12} sm={6} md={9}>
                <Posts setCurrentId={setCurrentId}/>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
                <AppBar className={classes.appBarSearch} position='static' color='inherit'>
                    <TextField name='search' variant='outlined' label='Search' fullWidth value='TEST' onChange={() => {} }/>
                </AppBar>
                <Form currentId={currentId} setCurrentId={setCurrentId}/>
                <Paper className={classes.pagination} elevation={6}>
                    <Pagination />
                </Paper>
            </Grid>
        </Grid>
    </Container>
    </Grow>
   )
 }
 
 export default Home           
            
            
            