## To Use

`npm install --save react-graph-db-editor`

Pass down the initial state and implementations of what I call actionHandlers (functions that react to graph events -- gives you an opportunity to call your DBs/APIs to sync the update you made on the graph editor).

Look at example/ if you need help

## Develop

#### Helpful stuff

If you want to console log a mobx object, do it like so:

```javascript
import { toJS } from 'mobx'
console.log(toJS(crazyMobxThing))
```

#### Develop TODOs:

- make nodes and edges classes that implement interfaces to reduce code redundancy?
- types in action handlers are probably a little off (update is partial fully?)
