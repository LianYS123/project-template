import dva from "dva";
import app from "./app";

const DVA = dva();
const models = [app];

models.map(model => DVA.model(model));

export default DVA;
