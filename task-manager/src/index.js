const express = require('express');
require('./db/mongoose');
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');
const { Task } = require('./model/task');

const app = express();

const port = process.env.PORT || '3000';

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
  console.log(`server is running on port: ${port}`);
});

(async () => {
  // const task = await Task.findById('626ae3eb81e8584cdc672ee8');
  // await task.populate('owner');
  // console.log(task);
})();