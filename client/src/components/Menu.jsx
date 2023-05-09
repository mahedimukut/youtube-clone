import React from 'react'
import styled from 'styled-components'
import LamaTube from "../../src/img/logo.png"
import { Link } from 'react-router-dom'
import { AccountCircleOutlined, DarkMode, Explore, Help, History, Home, LibraryMusic, LiveTv, LocalMovies, Newspaper, Report, Settings, Sports, SportsEsports, Subscriptions, VideoLibrary } from '@mui/icons-material';
import { useSelector } from "react-redux";

const Container = styled.div`
   flex: 1;
   background-color: ${({ theme }) => theme.bgLighter};
   color: ${({ theme }) => theme.text};

`
const Wrapper = styled.div`
    padding: 18px 26px;
`
const Logo = styled.div`
    display: flex;
    align-items: center;
    gap: 5px;
    font-weight: bold;
    margin-bottom: 25px;
`
const Img = styled.img`
  height: 25px;  
`
const Item = styled.div`
    display: flex;
    align-items: center;
    gap: 20px;
    cursor: pointer;
    padding: 7.5px 0px;
    &:hover{
        background-color:${({ theme }) => theme.soft};
    }
`
const Hr = styled.hr`
    margin: 15px 0;
    border: 0.5px solid ${({ theme }) => theme.soft};
`
const Login = styled.div`
    
`
const Button = styled.button`
    padding: 5px 15px;
    background-color: transparent;
    border: 1px solid #3ea6ff;
    color:#3ea6ff;
    border-radius: 3px;
    font-weight: 500;
    margin-top: 10px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap:5px;
`
const Title = styled.h2`
   font-size :14px;
   font-weight: 500;
   color:#aaaaaa;
   margin-bottom: 20px;
`

function Menu({ darkMode, setDarkMode }) {
    const { currentUser } = useSelector(state => state.user);
    return (
        <Container>
            <Wrapper>
                <Link to='/' style={{ textDecoration: 'none', color: "inherit" }}><Logo><Img src={LamaTube} />YouTube</Logo></Link>
                <Item><Home />Home</Item>
                <Link to='trends' style={{ textDecoration: 'none', color: "inherit" }}> <Item><Explore />Explore</Item></Link>
                <Link to='subscriptions' style={{ textDecoration: 'none', color: "inherit" }}> <Item><Explore />Subscriptions</Item></Link>
                <Hr />
                <Item><VideoLibrary />Library</Item>
                <Item><History />History</Item>

                <Hr />
                {!currentUser && (
                    <>
                        <Login>Sign in to like videos, comment, and subscribe.
                            <Link to='signin' style={{ textDecoration: "none" }}>
                                <Button><AccountCircleOutlined /> SIGN IN</Button>
                            </Link>
                        </Login>
                        <Hr />
                    </>

                )}

                <Title>Best of YouTube</Title>
                <Item><LibraryMusic />Music</Item>
                <Item><Sports />Sports</Item>
                <Item><SportsEsports />Gaming</Item>
                <Item><LocalMovies />Movies</Item>
                <Item><Newspaper />News</Item>
                <Item><LiveTv />Live</Item>
                <Hr />
                <Item><Settings />Settings</Item>
                <Item><Report />Report</Item>
                <Item><Help />Help</Item>
                <Item onClick={() => setDarkMode(!darkMode)}><DarkMode />{darkMode ? 'Light' : 'Dark'} Mode</Item>
            </Wrapper>
        </Container>
    )
}

export default Menu