import {app} from './app'

const port = 4000;

 export const server = app.listen(port, function () {
  console.log(`Server was started at port http://localhost:${port}`);
});
