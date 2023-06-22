import React, { ReactElement } from 'react'
import styled, { keyframes } from 'styled-components'
import { Container, ThemeProvider } from '@mui/material'
import { lightTheme } from './themes'
import backgroundImage from './assets/terraria.png'
import { User, useAuth0 } from '@auth0/auth0-react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import PageNotFound from './views/PageNotFound'
import { v4 as uuid } from "uuid";
import { Page, pages, serverName } from './constants'
import ResponsiveAppBar from './components/AppBar'


// Create a Title component that'll render an <h1> tag with some styles
const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  position: relative;
  line-height: 0.9;
`;

const rotate = keyframes`
from {
  transform: rotate(0deg);
}

to {
  transform: rotate(360deg);
}
`;

// Here we create a component that will rotate everything we pass in over two seconds
const Rotate = styled.div`
width: 100%;
display: inline-block;
animation: ${rotate} 2s linear infinite;
padding: 2rem 1rem;
font-size: 1.2rem;
text-align: center;
`;


/**
 * Turns URL path into router basename by removing everything after the last slash
 * @param {string} path URL path, probably window.location.pathname
 * @returns {string} final basename
 */
const getBasename = (path:string) => path.substr(0, path.lastIndexOf('/'));

const Loading = () => {
  const rotationImage = "< 💅🏾 >"
  
  return   (
    <ThemeProvider theme={lightTheme}>
      <Container>
        <Rotate>
          <div style={{textAlign: "center", width: "100%", margin: "0 auto"}}>{rotationImage}</div>
        </Rotate>
      </Container>
    </ThemeProvider>
  )

}

function App() {

  const { user, isAuthenticated, isLoading, loginWithRedirect, error } = useAuth0();

  if (error) {
    return (
    <ThemeProvider theme={lightTheme}>
      <Title>{error.message}</Title>
    </ThemeProvider>
    );
  }
  
  
  if (isLoading) {
    return <Loading></Loading>
  }
  
  if (!isAuthenticated) {
    loginWithRedirect();
  }


  return (
    <ThemeProvider theme={lightTheme}>
      <Container>
        <BrowserRouter basename={getBasename(window.location.pathname)}>
          <ResponsiveAppBar user={user} serverName={serverName} />
          <Routes>
            {pages.map((page: Page) => {
              return (
                <Route key={page.id} path={page.path} element={page.element} />
              );
            })}
            <Route key={uuid()} path="*" element={<PageNotFound />} />              
          </Routes>
        </BrowserRouter>
        </Container>
      </ThemeProvider>
  );
}

export default App;
