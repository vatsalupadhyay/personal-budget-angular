const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors({
    origin: 'http://localhost:4200', 
}));

const budget = {
    myBudget: [
        {
            title: 'Eat out',
            budget: 25
        },
        {
            title: 'Rent',
            budget: 275
        },
        {
            title: 'Grocery',
            budget: 110
        },
    ]
};

app.get('/budget', (req, res) => {
    console.log('Budget data requested');
    res.json(budget);
});

app.get('/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.listen(port, () => {
    console.log(`✅ API served at http://localhost:${port}`);
   
});