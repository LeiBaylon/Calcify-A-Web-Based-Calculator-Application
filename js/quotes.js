// Quotes Manager for Mathematical, Wisdom, and Life Quotes
class QuotesManager {
    constructor() {
        this.quotes = {
            mathematics: [
                {
                    text: "Mathematics is the language with which God has written the universe.",
                    author: "Galileo Galilei"
                },
                {
                    text: "Pure mathematics is, in its way, the poetry of logical ideas.",
                    author: "Albert Einstein"
                },
                {
                    text: "Mathematics knows no races or geographic boundaries; for mathematics, the cultural world is one country.",
                    author: "David Hilbert"
                },
                {
                    text: "In mathematics, the art of proposing a question must be held of higher value than solving it.",
                    author: "Georg Cantor"
                },
                {
                    text: "Mathematics is not about numbers, equations, computations, or algorithms: it is about understanding.",
                    author: "William Paul Thurston"
                },
                {
                    text: "The beauty of mathematics only shows itself to more patient followers.",
                    author: "Maryam Mirzakhani"
                },
                {
                    text: "Mathematics is the most beautiful and most powerful creation of the human spirit.",
                    author: "Stefan Banach"
                },
                {
                    text: "God made the integers, man made the rest.",
                    author: "Leopold Kronecker"
                },
                {
                    text: "Mathematics is the music of reason.",
                    author: "James Joseph Sylvester"
                },
                {
                    text: "There is no Nobel Prize in mathematics, but there should be.",
                    author: "Paul Erdős"
                },
                {
                    text: "Mathematics compares the most diverse phenomena and discovers the secret analogies that unite them.",
                    author: "Joseph Fourier"
                },
                {
                    text: "A mathematician is a blind man in a dark room looking for a black cat which isn't there.",
                    author: "Charles Darwin"
                },
                {
                    text: "Mathematics is the alphabet with which God has written the universe.",
                    author: "Galileo Galilei"
                },
                {
                    text: "The essence of mathematics lies in its freedom.",
                    author: "Georg Cantor"
                },
                {
                    text: "Mathematics is the supreme judge; from its decisions there is no appeal.",
                    author: "Tobias Dantzig"
                }
            ],
            wisdom: [
                {
                    text: "The only true wisdom is in knowing you know nothing.",
                    author: "Socrates"
                },
                {
                    text: "Wisdom begins in wonder.",
                    author: "Socrates"
                },
                {
                    text: "The fool doth think he is wise, but the wise man knows himself to be a fool.",
                    author: "William Shakespeare"
                },
                {
                    text: "Knowledge speaks, but wisdom listens.",
                    author: "Jimi Hendrix"
                },
                {
                    text: "The journey of a thousand miles begins with one step.",
                    author: "Lao Tzu"
                },
                {
                    text: "Yesterday is history, tomorrow is a mystery, today is a gift.",
                    author: "Eleanor Roosevelt"
                },
                {
                    text: "It does not matter how slowly you go as long as you do not stop.",
                    author: "Confucius"
                },
                {
                    text: "The wise find pleasure in water; the virtuous find pleasure in hills.",
                    author: "Confucius"
                },
                {
                    text: "He who knows that enough is enough will always have enough.",
                    author: "Lao Tzu"
                },
                {
                    text: "The best time to plant a tree was 20 years ago. The second best time is now.",
                    author: "Chinese Proverb"
                },
                {
                    text: "Turn your face to the sun and the shadows fall behind you.",
                    author: "Maori Proverb"
                },
                {
                    text: "In the middle of difficulty lies opportunity.",
                    author: "Albert Einstein"
                },
                {
                    text: "The mind is everything. What you think you become.",
                    author: "Buddha"
                },
                {
                    text: "Believe you can and you're halfway there.",
                    author: "Theodore Roosevelt"
                },
                {
                    text: "The only impossible journey is the one you never begin.",
                    author: "Tony Robbins"
                }
            ],
            life: [
                {
                    text: "Life is what happens to you while you're busy making other plans.",
                    author: "John Lennon"
                },
                {
                    text: "The purpose of our lives is to be happy.",
                    author: "Dalai Lama"
                },
                {
                    text: "Life is really simple, but we insist on making it complicated.",
                    author: "Confucius"
                },
                {
                    text: "In the end, it's not the years in your life that count. It's the life in your years.",
                    author: "Abraham Lincoln"
                },
                {
                    text: "The way to get started is to quit talking and begin doing.",
                    author: "Walt Disney"
                },
                {
                    text: "Don't be afraid to give up the good to go for the great.",
                    author: "John D. Rockefeller"
                },
                {
                    text: "The future belongs to those who believe in the beauty of their dreams.",
                    author: "Eleanor Roosevelt"
                },
                {
                    text: "Your limitation—it's only your imagination.",
                    author: "Unknown"
                },
                {
                    text: "Push yourself, because no one else is going to do it for you.",
                    author: "Unknown"
                },
                {
                    text: "Great things never come from comfort zones.",
                    author: "Unknown"
                },
                {
                    text: "Dream it. Wish it. Do it.",
                    author: "Unknown"
                },
                {
                    text: "Success doesn't just find you. You have to go out and get it.",
                    author: "Unknown"
                },
                {
                    text: "The harder you work for something, the greater you'll feel when you achieve it.",
                    author: "Unknown"
                },
                {
                    text: "Dream bigger. Do bigger.",
                    author: "Unknown"
                },
                {
                    text: "Don't stop when you're tired. Stop when you're done.",
                    author: "Unknown"
                },
                {
                    text: "Wake up with determination. Go to bed with satisfaction.",
                    author: "Unknown"
                },
                {
                    text: "Be yourself; everyone else is already taken.",
                    author: "Oscar Wilde"
                },
                {
                    text: "Two things are infinite: the universe and human stupidity; and I'm not sure about the universe.",
                    author: "Albert Einstein"
                },
                {
                    text: "A room without books is like a body without a soul.",
                    author: "Marcus Tullius Cicero"
                },
                {
                    text: "You only live once, but if you do it right, once is enough.",
                    author: "Mae West"
                }
            ]
        };
        
        this.currentQuoteIndex = 0;
        this.currentCategory = 'mathematics';
        this.allQuotes = this.getAllQuotes();
        
        this.init();
    }

    init() {
        this.bindEvents();
        this.displayRandomQuote();
        this.startAutoRotation();
    }

    getAllQuotes() {
        return [
            ...this.quotes.mathematics,
            ...this.quotes.wisdom,
            ...this.quotes.life
        ];
    }

    bindEvents() {
        const refreshBtn = document.getElementById('quote-refresh');
        if (refreshBtn) {
            refreshBtn.addEventListener('click', () => {
                this.displayRandomQuote();
                this.resetAutoRotation();
            });
        }

        // Add keyboard shortcut for quote refresh (Ctrl/Cmd + Q)
        document.addEventListener('keydown', (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'q') {
                e.preventDefault();
                this.displayRandomQuote();
                this.resetAutoRotation();
            }
        });
    }

    displayRandomQuote() {
        if (this.allQuotes.length === 0) return;

        const randomIndex = Math.floor(Math.random() * this.allQuotes.length);
        const quote = this.allQuotes[randomIndex];
        
        this.displayQuote(quote);
        this.currentQuoteIndex = randomIndex;
    }

    displayQuote(quote) {
        const quoteTextElement = document.getElementById('quote-text');
        const quoteAuthorElement = document.getElementById('quote-author');
        
        if (quoteTextElement && quoteAuthorElement) {
            // Fade out
            quoteTextElement.style.opacity = '0';
            quoteAuthorElement.style.opacity = '0';
            
            setTimeout(() => {
                quoteTextElement.textContent = quote.text;
                quoteAuthorElement.textContent = `- ${quote.author}`;
                
                // Fade in
                quoteTextElement.style.opacity = '1';
                quoteAuthorElement.style.opacity = '1';
            }, 300);
        }
    }

    displayNextQuote() {
        this.currentQuoteIndex = (this.currentQuoteIndex + 1) % this.allQuotes.length;
        const quote = this.allQuotes[this.currentQuoteIndex];
        this.displayQuote(quote);
    }

    displayQuoteByCategory(category) {
        if (!this.quotes[category]) return;
        
        const categoryQuotes = this.quotes[category];
        const randomIndex = Math.floor(Math.random() * categoryQuotes.length);
        const quote = categoryQuotes[randomIndex];
        
        this.displayQuote(quote);
        this.currentCategory = category;
    }

    startAutoRotation() {
        // Auto-rotate quotes every 30 seconds
        this.autoRotationInterval = setInterval(() => {
            this.displayNextQuote();
        }, 30000);
    }

    resetAutoRotation() {
        if (this.autoRotationInterval) {
            clearInterval(this.autoRotationInterval);
        }
        this.startAutoRotation();
    }

    stopAutoRotation() {
        if (this.autoRotationInterval) {
            clearInterval(this.autoRotationInterval);
            this.autoRotationInterval = null;
        }
    }

    // Search functionality
    searchQuotes(searchTerm) {
        const results = this.allQuotes.filter(quote => 
            quote.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
            quote.author.toLowerCase().includes(searchTerm.toLowerCase())
        );
        return results;
    }

    // Get quote by author
    getQuotesByAuthor(author) {
        return this.allQuotes.filter(quote => 
            quote.author.toLowerCase().includes(author.toLowerCase())
        );
    }

    // Get random quote from specific category
    getRandomQuoteFromCategory(category) {
        if (!this.quotes[category]) return null;
        
        const categoryQuotes = this.quotes[category];
        const randomIndex = Math.floor(Math.random() * categoryQuotes.length);
        return categoryQuotes[randomIndex];
    }

    // Add new quote (for future Firebase integration)
    addQuote(text, author, category = 'life') {
        if (!this.quotes[category]) {
            this.quotes[category] = [];
        }
        
        const newQuote = { text, author };
        this.quotes[category].push(newQuote);
        this.allQuotes = this.getAllQuotes();
        
        // Save to localStorage for now
        this.saveQuotesToStorage();
        
        return newQuote;
    }

    // Remove quote
    removeQuote(text, author) {
        Object.keys(this.quotes).forEach(category => {
            this.quotes[category] = this.quotes[category].filter(
                quote => !(quote.text === text && quote.author === author)
            );
        });
        
        this.allQuotes = this.getAllQuotes();
        this.saveQuotesToStorage();
    }

    // Save quotes to localStorage
    saveQuotesToStorage() {
        try {
            localStorage.setItem('calculator-quotes', JSON.stringify(this.quotes));
        } catch (error) {
            console.error('Error saving quotes to storage:', error);
        }
    }

    // Load quotes from localStorage
    loadQuotesFromStorage() {
        try {
            const savedQuotes = localStorage.getItem('calculator-quotes');
            if (savedQuotes) {
                const parsedQuotes = JSON.parse(savedQuotes);
                
                // Merge with default quotes
                Object.keys(parsedQuotes).forEach(category => {
                    if (this.quotes[category]) {
                        // Add new quotes to existing categories
                        parsedQuotes[category].forEach(quote => {
                            const exists = this.quotes[category].some(
                                existing => existing.text === quote.text && existing.author === quote.author
                            );
                            if (!exists) {
                                this.quotes[category].push(quote);
                            }
                        });
                    } else {
                        // Add new category
                        this.quotes[category] = parsedQuotes[category];
                    }
                });
                
                this.allQuotes = this.getAllQuotes();
            }
        } catch (error) {
            console.error('Error loading quotes from storage:', error);
        }
    }

    // Get quotes statistics
    getStatistics() {
        const stats = {
            total: this.allQuotes.length,
            byCategory: {}
        };
        
        Object.keys(this.quotes).forEach(category => {
            stats.byCategory[category] = this.quotes[category].length;
        });
        
        return stats;
    }

    // Get quote of the day (based on date)
    getQuoteOfTheDay() {
        const today = new Date();
        const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
        const index = dayOfYear % this.allQuotes.length;
        return this.allQuotes[index];
    }

    // Export quotes (for backup/sharing)
    exportQuotes() {
        return JSON.stringify(this.quotes, null, 2);
    }

    // Import quotes (from backup/sharing)
    importQuotes(jsonString) {
        try {
            const importedQuotes = JSON.parse(jsonString);
            
            // Validate structure
            if (typeof importedQuotes === 'object') {
                Object.keys(importedQuotes).forEach(category => {
                    if (Array.isArray(importedQuotes[category])) {
                        importedQuotes[category].forEach(quote => {
                            if (quote.text && quote.author) {
                                this.addQuote(quote.text, quote.author, category);
                            }
                        });
                    }
                });
                
                return true;
            }
        } catch (error) {
            console.error('Error importing quotes:', error);
        }
        
        return false;
    }

    // Cleanup method
    destroy() {
        this.stopAutoRotation();
    }
}

// Initialize quotes manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('quote-section')) {
        window.quotesManager = new QuotesManager();
        
        // Load custom quotes from storage
        window.quotesManager.loadQuotesFromStorage();
    }
});

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
    if (window.quotesManager) {
        window.quotesManager.destroy();
    }
});

// Export for use in other modules
window.QuotesManager = QuotesManager;