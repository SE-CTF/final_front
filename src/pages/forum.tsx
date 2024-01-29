// ForumPage.js
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  List,
  ListItem,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import axios from 'axios';
import TokenService from '../utils/tokenAccess';

const ForumPage = () => {
  const [posts, setPosts] = useState([]);
  const [newPostTopic, setNewPostTopic] = useState('');
  const [newPostText, setNewPostText] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [error, setError] = useState(null);
  const [selectedPost, setSelectedPost] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:8085/forums');
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []); // Empty dependency array means this effect runs once when the component mounts


  const handleCancle = () => {
    setIsDialogOpen(false)
    setError(null)
  }

  const handleAddPost = async () => {
    if (newPostTopic.trim() !== '' && newPostText.trim() !== '') {
      const newPostData = {
        title: newPostTopic,
        text: newPostText,
      };

      try {
        const response = await axios.post('http://localhost:8085/forums', newPostData, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + TokenService.getToken(),
          },
        });
        setPosts((prevPosts) => [...prevPosts, response.data]);
        setNewPostTopic('');
        setNewPostText('');
        setIsDialogOpen(false);
        setError(null); // Clear any previous errors
      } catch (error) {
        if (error.response && error.response.status === 403) {
          setError('.شما نمیتوانید قبل از ثبت نام و ورود، بحثی ایجاد کنید');
        } else {
          console.error('Error adding new post:', error);
          setError('.خطایی رخ داده است. بعدا امتحان کنید');
        }
      }
    }
  };

  const handlePostClick = (postId) => {
    const post = posts.find((p) => p._id === postId);
    setSelectedPost(post);
    navigate(`/post/${postId}`);
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        بحث ها
      </Typography>

      <List>
        {posts.map((post) => (
          <ListItem key={post._id}>
            <Link to={`/post/${post._id}`} onClick={() => handlePostClick(post._id)}>
              <strong>{post.title}</strong>
            </Link>
          </ListItem>
        ))}
      </List>

      <Typography variant="h6" align="center" gutterBottom>
        <Button variant="contained" color="primary" onClick={() => setIsDialogOpen(true)}>
          ایجاد بحث جدید
        </Button>
      </Typography>

      <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
        <DialogTitle>ایجاد بحث جدید</DialogTitle>
        <DialogContent>
          <TextField
            label="موضوع"
            variant="outlined"
            fullWidth
            margin="normal"
            value={newPostTopic}
            onChange={(e) => setNewPostTopic(e.target.value)}
          />
          <TextField
            label="متن"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            margin="normal"
            value={newPostText}
            onChange={(e) => setNewPostText(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancle} color="secondary">
            لغو
          </Button>
          <Button onClick={handleAddPost} color="primary">
            ایجاد
          </Button>
        </DialogActions>
      </Dialog>

      {error && (
        <Typography variant="body1" color="error" gutterBottom>
          {error}
        </Typography>
      )}
    </Container>
  );
};

export default ForumPage;
