import express from 'express';

const app = express();

const friends = [
    {
        id: 1,
        name: 'isaac newton'
    },
    {
        id: 2,
        name: 'APJ Abdul kalam'
    },
    {
        id: 3,
        name: 'Dhoni'
    }
];

app.get('/', (req, res) => {
    res.send('Hello World!')
  });

app.get('/friends', (req, res) => {
    res.json(friends);
});  

app.get('/friends/:friendId', (req, res) => {
    const friendId = Number(req.params.friendId);
    const friend = friends[friendId];
    if (friend) {
        res.status(200).json(friend);
    } else {
        res.status(404).json({
            error: "sorry, not found"
        });
    } 
});


  

app.listen('3000', () => console.log('EXPRESS server is running on port 3000'));