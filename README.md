## To Run

TODO: do something with this

0. back up your tags in case?

1. make a file in this package `src/data.ts` and fill it with the contents:

```javascript
export const apiUrl =
  'https://us-central1-my-magic-endpoint.cloudfunctions.net/api/graphql'
export const authHeader = 'Basic blahblahblah'
```

2. in magic root project, run `npm run tag-editor:gen`

3. then `npm run tag-editor:dev`

## Helpful stuff

If you want to console out a mobx object, do it like so:

```javascript
import { toJS } from 'mobx'
console.log(toJS(crazyMobxThing))
```

TODO: since only ts, use @
