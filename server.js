import express from 'express';

const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  res.send('<h1>Welcome to StudyHub</h1>');
});

//list of study groups
app.get('/groups', (req, res) => {
  res.send('<h1>Available Study Groups</h1>');
});

//page to create a study group
app.get('/create-group', (req, res) => {
  res.send('<h1>Create a Study Group</h1>');
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
