import React from 'react'
import styled from 'styled-components'
import { AddTaskOutlined, Share, ThumbDownAltOutlined, ThumbDownAltRounded, ThumbUpOutlined, ThumbUpRounded } from '@mui/icons-material'
import Comments from '../components/Comments'
import { useLocation } from 'react-router-dom'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { useSelector, useDispatch } from "react-redux"
import { dislike, fetchSuccess, like } from '../redux/videoSlice'
import { format } from 'timeago.js'
import { subscription } from '../redux/userSlice'
import Recommendation from '../components/Recommendation'

const Container = styled.div`
display: flex;
gap: 24px;
`
const Content = styled.div`
flex:5;
`
const VideoWrapper = styled.div`
width: 100%;
`
const Title = styled.h1`
font-size: 18px;
font-weight: 400;
margin-top: 20px;
margin-bottom: 10px;
color: ${({ theme }) => theme.text};
`
const Details = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
`
const Info = styled.span`
color: ${({ theme }) => theme.textSoft};
`
const Buttons = styled.div`
display: flex;
gap: 20px;
color: ${({ theme }) => theme.text};
`
const Button = styled.div`
display: flex;
align-items: center;
gap: 5px;
cursor:pointer; 
`
const Hr = styled.hr`
  border: 0.5px solid ${({ theme }) => theme.soft};
  margin: 15px 0; 
`
const Channel = styled.div`
display: flex;
justify-content: space-between;
`
const ChannelInfo = styled.div`
display: flex;
gap: 20px;
`
const Image = styled.img`
width: 50px;
height: 50px;
border-radius: 50%;
object-fit: cover;
`
const ChannelDetail = styled.div`
    display: flex;
    flex-direction: column;
    color: ${({ theme }) => theme.text};
`
const ChannelName = styled.span`
font-weight: 500;
`
const ChannelCounter = styled.span`
margin-top: 5px;
margin-bottom: 20;
font-size: 12px;
color: ${({ theme }) => theme.textSoft};
`
const Description = styled.p`
font-size: 14px;
`
const Subscribe = styled.button`
background-color: #cc1a00;
font-weight: 500;
color: white;
border:none;
cursor: pointer;
border-radius: 3px;
height: max-content;
padding: 10px 20px;
`
const VideoFrame = styled.video`
   max-height:720px;
   height: 70%;
   max-width: 100%;
   width: 100%;
   object-fit: cover;
`
function Video() {
    const { currentUser } = useSelector((state) => state.user);
    const { currentVideo } = useSelector((state) => state.video);
    const dispatch = useDispatch();

    const path = useLocation().pathname.split("/")[2];

    // const [video, setVideo] = useState({});
    const [channel, setChannel] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {

                const videoRes = await axios.get(`/videos/find/${path}`)

                const channelRes = await axios.get(`/users/find/${videoRes.data.userId}`)
                // setVideo(videoRes.data);
                setChannel(channelRes.data);
                dispatch(fetchSuccess(videoRes.data))
            } catch (err) {

            }
        }

        fetchData();
    }, [path, dispatch])

    const handleLike = async () => {
        await axios.put(`/users/like/${currentVideo._id}`)
        dispatch(like(currentUser._id))
    }
    const handleDislike = async () => {
        await axios.put(`/users/dislike/${currentVideo._id}`)
        dispatch(dislike(currentUser._id))
    }

    const handleSub = async () => {
        currentUser.subscribedUsers.includes(channel._id) ? await axios.put(`/users/unsub/${channel._id}`) : await axios.put(`/users/sub/${channel._id}`);
        dispatch(subscription(channel._id))
    }

    return (
        <Container>
            <Content>
                <VideoWrapper>
                    <VideoFrame src={currentVideo.videoUrl} controls />
                </VideoWrapper>
                <Title>{currentVideo.title}</Title>
                <Details>
                    <Info>{currentVideo.views} views . {format(currentVideo.createdAt)}</Info>
                    <Buttons>
                        <Button onClick={handleLike}>
                            {currentVideo.likes?.includes(currentUser._id) ? <ThumbUpRounded /> : <ThumbUpOutlined />}{currentVideo.likes?.length}
                        </Button>
                        <Button onClick={handleDislike}> {currentVideo.dislikes?.includes(currentUser._id) ? <ThumbDownAltRounded /> : <ThumbDownAltOutlined />} Dislike</Button>
                        <Button> <Share /> Share</Button>
                        <Button> <AddTaskOutlined /> Save</Button>
                    </Buttons>
                </Details>
                <Hr />
                <Channel>
                    <ChannelInfo>
                        <Image src={channel.img} />
                        <ChannelDetail>
                            <ChannelName>
                                {channel.name}
                            </ChannelName>
                            <ChannelCounter>
                                {channel.subscribers}k subscribers
                            </ChannelCounter>
                            <Description>{currentVideo.desc}</Description>
                        </ChannelDetail>
                    </ChannelInfo>
                    <Subscribe onClick={handleSub}>{currentUser.subscribedUsers?.includes(channel._id) ? "SUBSCRIBED" : "SUBSCRIBE"}</Subscribe>
                </Channel>
                <Hr />
                <Comments videoId={currentVideo._id} />
            </Content>
            <Recommendation tags={currentVideo.tags} />
        </Container>
    )
}

export default Video