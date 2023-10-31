import {Suspense} from "react"
import CircularIndeterminate from "./LazyLoadSreen"

export function delayForDemo(promise:any) {
    return new Promise(resolve => {
      setTimeout(resolve, 2000);
    }).then(() => promise);
  }