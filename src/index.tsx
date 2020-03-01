import { observer } from "mobx-react";
import * as React from "react";
import { render } from "react-dom";
import { Deska } from "./Deska";
import { DeskaStore } from "./DeskaStore";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useClasses = makeStyles(theme => ({
  tlacitko: {
    backgroundColor: "yellow"
  }
}));

const store = new DeskaStore({});

const App = observer(function(props: {}) {
  const classes = useClasses();
  return (
    <div>
      <h1>TicTacToe</h1>
      <Deska store={store} />
      <div>Táhne : {store.tahneKrizek ? "x" : "o"}</div>
        <div>Vítěz : {store.vitez <0 ? "Kolecko" : store.vitez >0 ? "Krizek" : "Zadny"}</div>
      <button className={classes.tlacitko} onClick={store.restartovat}>
        Nová hra
      </button>
    </div>
  );
});

const rootElement = document.getElementById("root");
render(<App />, rootElement);
