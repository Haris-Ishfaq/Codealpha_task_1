# Language Translator Project

This project is a web-based language translator that uses the MyMemory Translation API to provide translations between multiple languages.

## Features

- **Multi-language Support**: Translate between 17 languages including English, Spanish, French, German, Japanese, and more
- **User-Friendly Interface**: Clean and intuitive design with responsive layout
- **Real-time Word Count**: Shows word count with color-coded warning when approaching limit
- **Language Swapping**: Easily swap source and target languages with one click
- **Email Verification**: Optional email input to increase daily translation limit
- **Loading Indicators**: Visual feedback during translation process
- **Error Handling**: Clear error messages for common issues
- **Daily Limit Tracking**: Shows remaining daily quota after each translation

## How to Use

1. Enter text in the source text area
2. Select source and target languages from dropdown menus
3. Optionally enter your email to increase daily limit
4. Click "Translate" to get your translation
5. Use "Swap Languages" to quickly switch between source and target
6. Use "Clear" to reset both text areas

## Technical Implementation

### Files Structure
```
language-translator/
├── index.html         - Main HTML structure
├── script.js          - JavaScript functionality
├── style.css          - Styling for the application
└── README.md          - This documentation file
```

### Key Components

**HTML (index.html)**
- Dual text areas for source and translated text
- Language selection dropdowns
- Action buttons (Translate, Swap, Clear)
- Optional email input field
- Word counter display
- Status indicators (loading, success, error)

**JavaScript (script.js)**
- Handles all user interactions
- Performs API requests to MyMemory Translation API
- Manages language swapping functionality
- Implements word counting with limit warnings
- Handles API responses and error cases
- Manages UI state (loading indicators, messages)

**CSS (style.css)**
- Responsive layout using Flexbox
- Clean, modern interface with appropriate spacing
- Visual feedback for interactive elements
- Loading animation for translation process
- Color-coded word count and status messages

## API Information

This application uses the [MyMemory Translation API](https://mymemory.translated.net/). Key details:

- **Free Limit**: 5000 words per day
- **Email Benefit**: Adding a valid email increases daily limit
- **Rate Limiting**: API returns 403 error when daily limit is exceeded
- **Response Format**: JSON with translated text and quota information

## Technologies Used

- HTML5
- CSS3 (Flexbox, Animations)
- JavaScript (ES6)
- Fetch API for HTTP requests
- MyMemory Translation API
