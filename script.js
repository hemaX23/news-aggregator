

  
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        const loginError = document.getElementById('login-error');

        loginForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const username = loginForm.username.value;
            const password = loginForm.password.value;

            // Replace with your actual login logic
            if (username === 'hema' && password === 'kooky'){
                window.location.href = 'preference.html'; // Redirect to the news page
            } else {
                loginError.textContent = 'Invalid username or password';
                loginError.style.display = 'block';
            }
        });
    } else {
        const urlParams = new URLSearchParams(window.location.search);
        const category = urlParams.get('category');
        fetchNews(category);
    }

    const preferencesForm = document.getElementById('preferences-form');
    if (preferencesForm) {
        preferencesForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const selectedPreferences = [];
            const checkboxes = preferencesForm.querySelectorAll('input[name="preferences"]:checked');
            checkboxes.forEach(checkbox => {
                selectedPreferences.push(checkbox.value);
            });

            if (selectedPreferences.includes('economic')) {
                window.location.href = 'economic-news.html';
            } else if (selectedPreferences.includes('politics')) {
                window.location.href = 'politics-news.html';
            } else if (selectedPreferences.includes('entertainment')) {
                window.location.href = 'entertainment-news.html';
            } else if (selectedPreferences.includes('sports')) {
                window.location.href = 'sports-news.html';
            } else {
                alert('Please select at least one preference.');
            }
        });
    }
});

const apiKey = '897c1992b6c74b11a4232572cbf19381';
const newsContainer = document.getElementById('news-container');

async function fetchNews(category = '') {
    try {
        const response = await fetch(`https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${apiKey}`);
        const data = await response.json();
        if (data.status === 'ok') {
            displayNews(data.articles);
        } else {
            console.error('Error fetching news:', data);
            newsContainer.innerHTML = '<p>Failed to fetch news articles.</p>';
        }
    } catch (error) {
        console.error('Error:', error);
        newsContainer.innerHTML = '<p>Failed to fetch news articles.</p>';
    }
}

function displayNews(articles) {
    newsContainer.innerHTML = '';
    articles.forEach(article => {
        const newsItem = document.createElement('div');
        newsItem.className = 'news-item';

        const title = document.createElement('h2');
        title.textContent = article.title;

        const description = document.createElement('p');
        description.textContent = article.description;

        const link = document.createElement('a');
        link.href = article.url;
        link.target = '_blank';
        link.textContent = 'Read more';

        newsItem.appendChild(title);
        newsItem.appendChild(description);
        newsItem.appendChild(link);
        
        newsContainer.appendChild(newsItem);
    });
}
document.addEventListener('DOMContentLoaded', () => {
    fetchNews('sports');
});




