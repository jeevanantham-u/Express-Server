const express = require('express');

const friendsController = require('./controllers/friends.controller');

const app = express();

// down stream middlewere to calclate req and res delay time
app.use((req, res, next) => {
    const start = Date.now();
    next();
    const delta = Date.now() - start;
    console.log(`${req.method}, ${req.url} delay ${delta}ms `);
});

// to parese req as json
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello friends!')
});

app.get('/friends', friendsController.getFriends);

app.get('/friends/:friendId', friendsController.getFriend);

app.post("/friends", friendsController.postFriend);


app.listen('3000', () => console.log('EXPRESS server is running on port 3000'));