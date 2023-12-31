import {red} from "@mui/material/colors";
import React from "react";
import Avatar from "@mui/material/Avatar";
import {useRouter} from "next/router";

const getRandomColor = (userId: any) => {
    const colors = [red[500], "#3f51b5", "#009688", "#ff5722", "#9c27b0"];
    return colors[userId.charCodeAt(7) % colors.length];
};


export default function UserAvatar(props:any){
    const {user} = props;
    const router = useRouter();

    const routeToUser = () => {
        router.push(`/profile/${user.username}`);
    }
    const avatarSrc = user.profilePicture || "/static/images/avatar/1.jpg";
    const userColor = getRandomColor(user._id);

    return (
        !user.profilePicture ? (
            <Avatar
                alt={user.name || "user"}
                src={avatarSrc}
                sx={{ bgcolor: userColor }}
                onClick={routeToUser}
            >
                {user.username.charAt(0)}
            </Avatar>
        ) : (
            <Avatar
                alt={user.name || "user"}
                src={avatarSrc}
                onClick={routeToUser}
            />
        )
    );
}

