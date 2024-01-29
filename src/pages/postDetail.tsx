// PostDetailPage.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, TextField, Button, List, ListItem, Paper } from '@mui/material';
import axios from 'axios';

const PostDetailPage = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8085/forums/${postId}`);
        setPost(response.data);
        setComments(response.data.comments);
      } catch (error) {
        console.error('Error fetching post details:', error);
      }
    };

    fetchPostDetails();
  }, [postId]);

  const handleAddComment = async () => {
    if (newComment.trim() !== '') {
      const newCommentData = {
        comment: newComment,
      };

      try {
        const response = await axios.post(`http://localhost:8085/forums/${postId}/comments`, newCommentData);
        setComments(response.data.comments);
        setNewComment('');
      } catch (error) {
        console.error('Error adding new comment:', error);
      }
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        {post ? post.title : 'بحث پیدا نشد.'}
      </Typography>

      {post && (
        <>
          <Typography variant="subtitle1" gutterBottom color="gray">
            نویسنده: {post.author}
          </Typography>
          <Typography variant="subtitle1" gutterBottom color="gray">
            تاریخ ایجاد: {new Date(post.createdAt).toLocaleString()}
          </Typography>

          <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
            <Typography variant="body1" align="justify" gutterBottom>
              {post.text}
            </Typography>
          </Paper>

          <Typography variant="h6" gutterBottom>
            نظرات:
          </Typography>

          <List>
            {comments.map((comment, index) => (
              <ListItem key={index}>{comment}</ListItem>
            ))}
          </List>

          <TextField
            label="افزودن نظر"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            margin="normal"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <Button variant="contained" color="primary" onClick={handleAddComment}>
            افزودن نظر
          </Button>
        </>
      )}
    </Container>
  );
};

export default PostDetailPage;