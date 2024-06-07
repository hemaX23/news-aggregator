const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to serve static files
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));

// Routes to serve HTML files
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/preference', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'preference.html'));
});

app.get('/economic-news', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'economic-news.html'));
});

app.get('/entertainment-news', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'entertainment-news.html'));
});

app.get('/news', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'news.html'));
});

app.get('/politics-news', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'politics-news.html'));
});

app.get('/sports-news', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'sports-news.html'));
});

app.get('/comment', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'comment.html'));
});

app.get('/submission-form', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'submission-form.html'));
});

// Handle login
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (username === 'hema' && password === 'kooky') {
        res.redirect('/preference');
    } else {
        res.redirect('/?error=invalid-credentials');
    }
});

// Handle preferences submission
app.post('/preferences', (req, res) => {
    const preferences = req.body.preferences;
    if (preferences.includes('economic')) {
        res.redirect('/economic-news');
    } else if (preferences.includes('politics')) {
        res.redirect('/politics-news');
    } else if (preferences.includes('entertainment')) {
        res.redirect('/entertainment-news');
    } else if (preferences.includes('sports')) {
        res.redirect('/sports-news');
    } else {
        res.send('Please select at least one preference.');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
