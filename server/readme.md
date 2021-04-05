## ts-express-boilerplate

---

This is my Typescript Node Express server boilerplate. There are 2 version here. You can use either ts-node or just node with tsc watch. I also use yarn for this one, but you can use whatever you like.

### Using node \w typescript compiler

This is my recomendation, because it's a lot faster compared to using ts-node. The downside is, it will require more memory because you need to run 2 terminal window at the same time.

This is how it works :

1. Run `npm run watch` or `yarn watch` to run typescript compiler in watch mode. It will detect changes in `/src` folder & generate the result in the `/dist` folder.
2. Open new terminal, and run `npm run dev` or `yarn dev`. This will run nodemon and watch for change in `/dist/index.js` from watch script before.
3. For production, you can use `npm run start` or `yarn start` to start node server in `dis/index.js` file.

### Using ts-node

If you don't want to run 2 terminal window at the same time, this is the method for you. It's a bit slower compared to the first method (especially in large project), but you only need to run 1 terminal window and save some memory.

This is how it works :

1. Run `npm run dev2` or `yarn dev2`. This will run nodemon with ts-node, and watch for change in `/src/index.ts`.
2. For production, you can use `npm run start2` or `yarn start2` to start ts-node server in `src/index.ts` file.
