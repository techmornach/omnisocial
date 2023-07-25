import {useEffect} from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import { socket } from '../socket';

const cookies = new Cookies();

export default function ApiEffects(props:any){
    const {setUser, setFriends, setAllUsers, setPosts, setUsers, posts, users, allUsers} = props
    const isAuthenticated = cookies.get("TOKEN");


    useEffect(() => {
        const config = {
            headers: {
                Authorization: `Bearer ${isAuthenticated}`, // Assuming the token is a JWT, you may need to adjust the format according to your server's requirements.
            },
            method: 'GET',
            url: `${process.env.REACT_APP_API}/users/user/private`,
        }

        axios(config).then((result)=>{
            setUser(result.data);
        }).catch((err)=>{
            err = new Error()
        })
    }, [])

    useEffect(() => {
        const config = {
            headers: {
                Authorization: `Bearer ${isAuthenticated}`, // Assuming the token is a JWT, you may need to adjust the format according to your server's requirements.
            },
            method: 'GET',
            url: `${process.env.REACT_APP_API}/friends/nonfriend/private`,
        }

        axios(config).then((result)=>{
            setUsers(result.data);
        }).catch((err)=>{
            err = new Error()
        })
    }, [])


    useEffect(() => {
        const config = {
            headers: {
                Authorization: `Bearer ${isAuthenticated}`, // Assuming the token is a JWT, you may need to adjust the format according to your server's requirements.
            },
            method: 'GET',
            url: `${process.env.REACT_APP_API}/friends/friend/private`,
        }

        axios(config).then((result)=>{
            setFriends(result.data);
        }).catch((err)=>{
            err = new Error()
        })
    }, [])

    useEffect(() => {
        const config = {
            headers: {
                Authorization: `Bearer ${isAuthenticated}`, // Assuming the token is a JWT, you may need to adjust the format according to your server's requirements.
            },
            method: 'GET',
            url: `${process.env.REACT_APP_API}/users/`,
        }

        axios(config).then((result)=>{
            setAllUsers(result.data);
        }).catch((err)=>{
            err = new Error()
        })
    }, [])

    useEffect(() => {
        const config = {
            headers: {
                Authorization: `Bearer ${isAuthenticated}`, // Assuming the token is a JWT, you may need to adjust the format according to your server's requirements.
            },
            method: 'GET',
            url: `${process.env.REACT_APP_API}/posts/`,
        }

        axios(config).then((result)=>{
            setPosts(result.data);
        }).catch((err)=>{
            err = new Error()
        })
    }, [socket])

    useEffect(() => {
        // no-op if the socket is already connected
        socket.connect();

        return () => {
            socket.disconnect();
        };
    }, []);

    useEffect(() => {

        const handleNewPost = (data: any) => {
            const updatedPosts = [data, ...posts];
            setPosts(updatedPosts);
        };

        const handleNewUser = (data:any)=>{
            const updatedUsers = [data, ...users];
            const updatedAllUsers = [data, ...allUsers];
            console.log(updatedUsers);
            setUsers(updatedUsers);
            setUsers(updatedAllUsers);
        }
        socket.on('new_post', handleNewPost)
        socket.on('new_user', handleNewUser)
    }, [posts]);

    return(
        <>
        </>
    )
}