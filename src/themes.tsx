import { createTheme, Theme } from '@mui/material/styles'

export const lightTheme: Theme = createTheme({
    typography: {
        fontFamily: ["Poppins", "sans-serif"].join(","),
        fontWeightLight: 100,
        fontWeightRegular: 400,
        fontWeightMedium: 600,
        allVariants: {
            color: "#000"
        },
        h1: {
            fontSize: "2.5rem",
            fontWeight: "100",
        },
        h2: {
            fontSize: "2rem",
            fontWeight: "400",
        },
        h3: {
            fontSize: "1.6rem",
            fontWeight: "400",
        },
        h4: {
            fontSize: "0.9rem",
            fontWeight: "bold",
        },
        body1: {
            fontWeight: "400",
            lineHeight: "1.4",
        },
    },
	palette: {
		primary: {
			main: "#000000",
		},
		secondary: {
			main: "#dd9933",
		},
		divider: "#939696",
		background: {
			default: "#DADBE8",
		},
	},
	components: {
		MuiIconButton: {
			styleOverrides: {
				root: {
					padding: "15px",
				},
			},
		},
		MuiTooltip: {
			styleOverrides: {
				tooltipArrow: {
					"& .MuiTooltip-arrow": {
						color: "#C1C1C1",
					},
				},
				tooltipPlacementTop: {
					height: "75px",
					width: "250px",
					color: "black",
					backgroundColor: "#C1C1C1",
					boxShadow: "none",
				},
			},
		},
		MuiButton: {
			variants: [
				{
					props: { variant: "contained" },
					style: {
						color: "#ffffff",
						height: "100%",
						maxHeight: "60px",
						borderRadius: "0",
					},
				},
			],
		},
	},
});
