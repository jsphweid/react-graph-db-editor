## To Use

`npm install --save react-graph-db-editor`

Pass down the initial state and implementations of what I call actionHandlers (functions that react to graph events -- gives you an opportunity to call your DBs/APIs to sync the update you made on the graph editor).

Look at example/ if you need help

Don't forget to import css from node_modules/react-graph-db-editor/dist/index.css.

React is a peer dependency and is required to be installed by your host application. This library will not install it for you.

## Develop

#### Running locally

Simple run `npm run start` and the example will spin up

#### Helpful stuff

If you want to console log a mobx object, do it like so:

```javascript
import { toJS } from 'mobx'
console.log(toJS(crazyMobxThing))
```

#### Develop TODOs:

- make nodes and edges classes that implement interfaces to reduce code redundancy?
- types in action handlers are probably a little off (update is partial fully?)
