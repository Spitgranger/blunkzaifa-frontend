 import React from 'react'
 import { Container, Grow, Grid, Paper, AppBar, TextField, Button} from '@material-ui/core';
 import { useState, useEffect} from 'react';
 import {useDispatch} from 'react-redux'
import {useHistory, useLocation} from 'react-router-dom'
import ChipInput from "material-ui-chip-input"

 import {getPosts, searchPosts} from '../../actions/posts'
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
    const [search, setSearch] = useState('');
    const [tags, setTags] = useState([]);

    // useEffect(() => {
    //     dispatch(getPosts());
    // }, [currentId, dispatch])

    
    const handleKeyPress = (e) => {
        if(e.keyCode === 13){
            searchPost();
            console.log('SEARCHED.')
        }
    }

    const handleAdd = (tag) => {
     
        setTags([...tags, tag])
    }

    const handleDelete = (tag) => {
        setTags(tags.filter((t) => t !== tag ))
    }

    const searchPost = () => {
        if(search.trim() || tags){
            dispatch(searchPosts({search, tags: tags.join(',')}))
            history.push(`/posts/search?searchQuery=${search.trim()||'none'}&tags=${tags.join(',')}`);
        } else {
            history.push('/')
        }
    }


   return (    
    <Grow in>
    <Container maxWidth="xl">
        <Grid container justifyContent="space-between" alignItems='stretch' spacing={3} className={classes.gridContainer}>
            <Grid item xs={12} sm={6} md={9}>
                <Posts setCurrentId={setCurrentId}/>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
                <AppBar className={classes.appBarSearch} position='static' color='inherit'>
                    <TextField name='search' variant='outlined' label='Search' fullWidth value={search} onChange={(e) => {setSearch(e.target.value)}} onKeyDown={handleKeyPress} />
                    <ChipInput 
                        style={{margin: "10px 0"}}
                        value={tags}
                        onAdd={handleAdd}
                        onDelete={handleDelete}
                        label="Search Tags"
                        variant='outlined'
                     />
                     <Button onClick={searchPost} className={classes.searchButton} color='primary'>Search</Button>
                </AppBar>
                <Form currentId={currentId} setCurrentId={setCurrentId}/>
                <Paper className={classes.pagination} elevation={6}>
                    <Pagination page={page}/>
                </Paper>
            </Grid>
        </Grid>
    </Container>
    </Grow>
   )
 }
 
 export default Home           
            
            
            