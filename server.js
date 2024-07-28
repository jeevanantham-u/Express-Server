import express from 'express';

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
    res.send('Hello friends!')
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

app.post("/friends", (req, res) => {
    if (!req.body.name) {
        return res.status(400).json({
            error: "Missing friend name"
        });
    }

    const newFriend = {
        name: req.body.name,
        id: friends.length
    }

    friends.push(newFriend);

    res.status(200).json({
        success: "New friend added successfully"
    });
});


app.listen('3000', () => console.log('EXPRESS server is running on port 3000'));