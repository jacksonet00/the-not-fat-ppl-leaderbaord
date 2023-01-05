# the not fat ppl

an app for some fat friends to track workouts with iMessage, [check it out](https://nfp-leaderboard.vercel.app/)!

## modules

- `app` - Next.js 13 server side rendered web app
- `components` - composable web elements for `app`
- `firebase` - exports initialized app and db
- `firestore-uploader` - python connection to firebase admin sdk for data upload
- `types` - types and type utility functions for e2e type safety between firestore and `app`
- `util` - exports utility functions that do not relate to existing types such as generating unique keys
