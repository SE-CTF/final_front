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

const UserAdmin = () => {
    const [users, setUsers] = useState([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [newUsername, setNewUsername] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/admin/users/', {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + TokenService.getToken(),
                    },
                });
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };

        fetchUsers();
    }, []); // Empty dependency array means this effect runs once when the component mounts


    const handleAddUser = async () => {
        if (!newUsername || !newEmail || !newPassword) {
            return
        }

        const newUserData = {
            username: newUsername,
            email: newEmail,
            password: newPassword,
        }

        try {
            const response = await axios.post('http://localhost:8000/api/admin/users/', newUserData, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + TokenService.getToken(),
                },
            });
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

    const handleUserClick = (userEmail) => {
        console.log(userEmail)
        // const post = users.find((p) => p._id === postId);
        // setSelectedPost(post);
        // navigate(`/post/${postId}`);
    };

    return (
        <Container maxWidth="sm">
            <Typography marginTop={2} variant="h4" align="center" gutterBottom>
                مدیریت کاربر‌ها
            </Typography>
            <List>
                {users.map((user) => (
                    <ListItem key={user.email}>
                        <Link to={`/user-admin/${user.email}`} onClick={() => handleUserClick(user.email)}>
                            <strong>{user.email}</strong>
                        </Link>
                    </ListItem>
                ))}
            </List>

            <Typography variant="h6" align="center" gutterBottom>
                <Button variant="contained" color="primary" onClick={() => setIsDialogOpen(true)}>
                    ایجاد کاربر جدید
                </Button>
            </Typography>

            <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
                <DialogContent>
                    <TextField
                        label="نام کاربری"
                        variant="outlined"
                        fullWidth
                        // multiline
                        rows={4}
                        margin="normal"
                        value={newUsername}
                        onChange={(e) => setNewUsername(e.target.value)}
                    />
                    <TextField
                        label="ایمیل"
                        variant="outlined"
                        fullWidth
                        // multiline
                        rows={4}
                        margin="normal"
                        value={newEmail}
                        onChange={(e) => setNewEmail(e.target.value)}
                    />
                    <TextField
                        label="رمز عبور"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setIsDialogOpen(false)} color="secondary">
                        لغو
                    </Button>
                    <Button onClick={handleAddUser} color="primary">
                        ایجاد
                    </Button>
                </DialogActions>
            </Dialog>

            {/* {error && (
                <Typography variant="body1" color="error" gutterBottom>
                    {error}
                </Typography>
            )} */}

        </Container>
    );
};

export default UserAdmin;
