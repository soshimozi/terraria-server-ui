import { Container, Grid, Stack, Typography } from "@mui/material"

export default function DefaultErrorUI() {
    return (
        <Container>
            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justifyContent="center"
                style={{ minHeight: "100vh" }}
                >

                <Grid item xs={12}>
                    <Stack spacing="10px">
                        <Typography textAlign={"center"} variant="h2" color="error">
                            Oops!
                        </Typography>
                        <Typography textAlign={"center"} color="error">
                            An error has occured.  We are working on it!
                        </Typography>
                    </Stack>
                </Grid>
            </Grid>
        </Container>
    )
}