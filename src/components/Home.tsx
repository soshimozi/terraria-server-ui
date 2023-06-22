import { Box, Button, Chip, Grid, Paper, Typography } from "@mui/material"
import styled from "styled-components";
import terraria from "../assets/terraria.png"
import Image from 'mui-image'
import ApiService from "../services/ec2InstanceAPI"
import { useEffect, useState } from "react"
import { serverName } from '../constants'
import { GetTokenSilentlyOptions, useAuth0 } from "@auth0/auth0-react";

const Form = styled.div`
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    border-radius: 5px;
    width: 80%;
    max-width: 600px;
    margin: 0 auto;
    padding: 2em;
    background-color: white;
`

const Img = styled('img')({
    display: 'block',
    maxWidth: '400px',
  });

const HomeComponent = () => {

    const { stopInstance, startInstance, getInstanceState } = ApiService;
    const [instanceState, setInstanceState ] = useState<string | undefined>()

    const [apiLoading, setApiLoading] = useState(false)

    const [ token, setToken ] = useState<string | undefined>()

    const { getAccessTokenSilently  } = useAuth0()

    useEffect(() => {

        setApiLoading(true)

        const loadInstanceState = async() : Promise<string>  => {
            return await getInstanceState()
        }

        const getAccessToken = async() : Promise<string> => {
          return await getAccessTokenSilently()
        }

        loadInstanceState()
        .then(result => {
            console.log(result)
            setInstanceState(result)
        })
        .catch((e) => {
            console.error(e)
        })
        .finally(() => {
            setApiLoading(false)
        })
        
        getAccessToken()
        .then(result => {
          console.log(`token: ${result}`)
          setToken(result)
        })
        .catch((e) => {
          console.error(e)
        });
      

    }, [getAccessTokenSilently, getInstanceState])

    let intervalCheck: any;

    const checkStatus = ()  => {

      clearInterval(intervalCheck)
      // Check server status continuously for one minute, with 2 second intervals
      // Stops in about 18-40 seconds, starts in 6-20 seconds
      intervalCheck = setInterval(getServerStatus, 2*1000)
      setTimeout(() => clearInterval(intervalCheck), 60*1000)
    }

    const getServerStatus = async() => {
      var state = await getInstanceState()
      setInstanceState(state)
    }

    const toggleInstance = async () => {
      if(instanceState === "running") {
        await stopInstance(token ?? '')
      } else if(instanceState === "stopped") {
        await startInstance(token ?? '')
      } else {
        var state = await getInstanceState()
        setInstanceState(state)
      }
      
      checkStatus()
    }

    if(apiLoading) {
        return <div>Loading...</div>
    }


    return (
        <Paper
        sx={{
          p: 2,
          margin: 'auto',
          maxWidth: 1100,
          marginTop: 2,
          flexGrow: 1,
          backgroundColor: (theme) =>
            theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        }}
      >
        <Grid container spacing={2}>
          <Grid item>
              <Img alt="complex" src={terraria} />
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="subtitle1" component="div">
                  {serverName}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  {instanceState === "running" ? (<Chip label="running" color="success" />) : (<Chip label="stopped" color="error" />)}
                </Typography>
              </Grid>
              <Grid item>
                <Button onClick={toggleInstance}>{instanceState === "running" ? "Stop" : instanceState === "stopped" ? "Start" : "Refresh"}</Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
       
    )
}

export default HomeComponent;
