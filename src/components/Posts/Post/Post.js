import React from 'react'
import useStyles from './styles'
import { Card, CardActions, CardContent, CardMedia, Typography, ButtonBase, Button} from '@material-ui/core'
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import moment from 'moment'
import {useDispatch} from 'react-redux'
import { deletePost, likePost } from '../../../actions/posts'
import { useHistory } from 'react-router-dom';
    
const Post = ({ post, setCurrentId }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'))
    const history = useHistory();

    const Likes = () => {
        if (post.likes.length > 0) {
            return post.likes.find((like) => like === user?.result?._id) ? (
                <><ThumbUpAltIcon fontSize='small'/>&nbsp;{post.likes.length > 2 ? `You and ${post.likes.length - 1} people like this post`: `${post.likes.length} like${post.likes.length>1 ? 's': ''}`}</>
            ) : (   
                <><ThumbUpAltIcon fontSize='small'/>&nbsp;{post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'}</>
            )
        }
        return <><ThumbUpAltIcon fontSize='small'/>&nbsp; Like </>
    }

    const openPost = () => {
        history.push(`/posts/${post._id}`)
    }

    return (
        
        <Card className={classes.card} rasied elevation={6}>
            <CardMedia className={classes.media} image={post.selectedFile} title={post.title}/>
            <div className={classes.overlay}>
                <Typography variant='h6'>{post.name}</Typography> 
                <Typography variant='body2'>{moment(post.createdAt).fromNow()}</Typography> 
            </div>
            {/* {(user?.result?._id === post?.creator) ? (
            <div className={classes.overlay2}>
                <Button style={{color: 'white'}} size='small' onClick={() => setCurrentId(post._id)}>
                    <MoreHorizIcon fontSize='medium'/>
                </Button>
            </div>
            ) : null } */}
            <div className={classes.details}>
                <Typography variant='body2' color='textSecondary'>{post.tags.map((tag) => `#${tag} `)}</Typography>
            </div>
            <Typography className={classes.title} variant='h5' gutterBottom>{post.title}</Typography>
            <CardContent>
                <Typography variant='body2' color='textSecondary' component='p' gutterBottom>{post.message}</Typography>
            </CardContent>
            
            <CardActions className={classes.cardActions}>
                <Button size="small" color="primary" disabled={!user?.result} onClick={()=> {dispatch(likePost(post._id))}}>
                    <Likes/>
                </Button>
                {(user?.result?._id === post?.creator) ? (
                    <Button size="small" color="primary" onClick={()=> {dispatch(deletePost(post._id))}}>
                    <DeleteIcon fontSize="small"/>
                    Delete
                    </Button>
                ): null }
            </CardActions>
        </Card>
    )
}
export default Post