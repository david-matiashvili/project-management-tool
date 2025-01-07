import {WrapperRequireAuth} from "../wrapper";
import {Dashboard} from "@pages/dashboard";

import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";


export const authenticatedRoutes = {
    element: <WrapperRequireAuth/>,
    children: [
        {path: "/", element: <DndProvider backend={HTML5Backend}><Dashboard/></DndProvider>},
    ],
}