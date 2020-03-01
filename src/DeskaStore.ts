import { action, computed, observable } from "mobx";
import * as React from "react";

/**
 * 0 = prazdny = nikdo
 * 1 = krizek
 * -1 = kolecko
 */

export class DeskaStore extends React.Component {
  @observable private pole = [0, 0, 0, 0, 0, 0, 0, 0, 0];

  private indexXY(x: number, y: number) {
    return 3 * y + x;
  }

  getXY(x: number, y: number) {
    return this.pole[this.indexXY(x, y)];
  }

  @computed get tahneKrizek() {
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce
    return this.pole.reduce((a, b) => a + b) <= 0;
  }

  @computed get vitez() {
    //developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get
    console.log("vitez...");
    function podvitez(a: number, b: number, c: number) {
      const s = a + b + c;
      return s >= 3 ? +1 : s <= -3 ? -1 : 0;
    }

    const g = (x: number, y: number) => this.getXY(x, y);

    let r = 0;

    r = podvitez(g(0, 0), g(0, 1), g(0, 2));
    if (r !== 0) return r;
    r = podvitez(g(1, 0), g(1, 1), g(1, 2));
    if (r !== 0) return r;
    r = podvitez(g(2, 0), g(2, 1), g(2, 2));
    if (r !== 0) return r;

    r = podvitez(g(0, 0), g(1, 0), g(2, 0));
    if (r !== 0) return r;
    r = podvitez(g(0, 1), g(1, 1), g(2, 1));
    if (r !== 0) return r;
    r = podvitez(g(0, 2), g(1, 2), g(2, 2));
    if (r !== 0) return r;

    r = podvitez(g(0, 0), g(1, 1), g(2, 2));
    if (r !== 0) return r;
    r = podvitez(g(0, 2), g(1, 1), g(2, 0));
    return r;
  }

  // @action incXY(x: number, y: number) {
  //   // this.pole[this.indexXY(x, y)] = this.pole[this.indexXY(x, y)] + 1; //TODO
  //   // this.pole[3 * y + x] += 1;
  //   // this.pole[3 * y + x]++;
  //   ++this.pole[this.indexXY(x, y)];
  // }

  @action tahniXY(x: number, y: number) {
    if (this.vitez) return;
    if (this.getXY(x, y)) return;
    this.pole[this.indexXY(x, y)] += this.tahneKrizek ? +1 : -1;
  }

  @action restartovat = () => {
    for (let i = 0; i < this.pole.length; ++i) this.pole[i] = 0;
  };
}
