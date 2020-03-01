import { makeStyles } from "@material-ui/core/styles";
import ClearIcon from "@material-ui/icons/Clear";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import { observer } from "mobx-react";
import * as React from "react";
import { DeskaStore } from "./DeskaStore";

const nulaJednaDva = [0, 1, 2];

const useClasses = makeStyles({
  krizek: {
    display: "block",
    color: "red",
    width: "40px",
    height: "40px",
    top: "9%",
    left: "9%",
    position: "relative"
  },
  kolecko: {
    display: "block",
    color: "blue",
    width: "40px",
    height: "40px",
    top: "9%",
    left: "9%",
    position: "relative"
  },
  policko: {
    border: "2px solid #888",
    margin: 3,
    height: 50,
    width: 50,
    display: "inline-block"
  },
  tlacitko: {
    backgroundColor: "#c6ffb8"
  },
  radek: {
    backgroundColor: "#c6ffb8"
  },
  deska: {
    position: "relative",
    backgroundColor: "#5FF33B",
    // marginLeft: "auto",
    // marginRight: "auto",
    width: 180,
  },
});

const Pole = observer(function(props: {
  store: DeskaStore;
  x: number;
  y: number;
}) {
  const { store, x, y } = props;
  const classes = useClasses();
  const hodnota = store.getXY(x, y);
  return (
    <div className={classes.policko} onClick={() => store.tahniXY(x, y)}>
      {/* {x}, {y}, {store.indexXY(x, y)} <br />  */}
      {hodnota > 0 ? (
        <ClearIcon className={classes.krizek} />
      ) : hodnota < 0 ? (
        <RadioButtonUncheckedIcon className={classes.kolecko} />
      ) : (
        <div />
      )}
    </div>
  );
});

const Radek = observer(function(props: { store: DeskaStore; y: number }) {
  const { store, y } = props;
  const classes = useClasses();
  return (
    <div className={classes.radek}>
      {nulaJednaDva.map((x: number) => (
        <Pole key={x} x={x} y={y} store={store} />
      ))}
    </div>
  );
});

export const Deska = observer(function(props: { store: DeskaStore }) {
  const { store } = props;
  const classes = useClasses();
  return (
    <div className={classes.deska}>
      {nulaJednaDva.map((y: number) => (
        <Radek key={y} y={y} store={store} />
      ))}
    </div>
  );
});
