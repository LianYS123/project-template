import dva from "dva";
import { createBrowserHistory, createHashHistory } from "history";
import app from "./app";

// const history = createBrowserHistory();
const history = createHashHistory();

const DVA = dva({ history });
const models = [app];

models.map(model => DVA.model(model));

export default DVA;
