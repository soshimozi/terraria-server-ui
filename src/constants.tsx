import { v4 as uuid } from "uuid"
import Home from "./views/Home";

export const TimeConstant = 35/12;

export interface Page {
    id: string;
    name: string;
    path: string;
    menuLabel?: string;
    element: React.ReactNode;
    mobileIcon?: React.ReactNode;
    dropDownMenu?: boolean;
  }
  

export const pages: Page[] = [
	{
		id: uuid(),
		name: "Home",
		path: "/",
		element: <Home />,
	},
];

export const serverName: string  = "The Coolest Server"

export const baseUrl: string = "https://kwlkuq6hlf.execute-api.us-west-2.amazonaws.com/prod"