const express = require('express');
require('./db/mongoose');
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');
const { Task } = require('./model/task');
const { User } = require('./model/user');

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

  const user = await User.findById('626ae30474a1a457a503dd76');
  await user.populate('tasks');
  console.log(user.tasks);
})();