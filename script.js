document.addEventListener('DOMContentLoaded', function() {
    const sourceLanguage = document.getElementById('sourceLanguage');
    const targetLanguage = document.getElementById('targetLanguage');
    const sourceText = document.getElementById('sourceText');
    const targetText = document.getElementById('targetText');
    const translateBtn = document.getElementById('translateBtn');
    const swapBtn = document.getElementById('swapBtn');
    const clearBtn = document.getElementById('clearBtn');
    const emailInput = document.getElementById('emailInput');
    const errorMessage = document.getElementById('errorMessage');
    const successMessage = document.getElementById('successMessage');
    const loadingIndicator = document.getElementById('loadingIndicator');
    const sourceWordCount = document.getElementById('sourceWordCount');
    
    // Set default target language
    targetLanguage.value = 'es';
    
    // Update word count when text changes
    sourceText.addEventListener('input', updateWordCount);
    
    function updateWordCount() {
        const text = sourceText.value.trim();
        const wordCount = text ? text.split(/\s+/).length : 0;
        sourceWordCount.textContent = `Words: ${wordCount}`;
        
        // Change color if approaching limit
        if (wordCount > 4500) {
            sourceWordCount.style.color = 'red';
        } else {
            sourceWordCount.style.color = '#666';
        }
    }
    
    // Translate button click event
    translateBtn.addEventListener('click', function() {
        const text = sourceText.value.trim();
        const source = sourceLanguage.value;
        const target = targetLanguage.value;
        const email = emailInput.value.trim();
        
        if (!text) {
            showError('Please enter text to translate');
            return;
        }
        
        if (target === source) {
            showError('Source and target languages cannot be the same');
            return;
        }
        
        // Check word count
        const wordCount = text.split(/\s+/).length;
        if (wordCount > 5000) {
            showError('Text exceeds the 5000 word daily limit. Please reduce the length.');
            return;
        }
        
        translateText(text, source, target, email);
    });
    
    // Swap languages button click event
    swapBtn.addEventListener('click', function() {
        const tempLang = sourceLanguage.value;
        sourceLanguage.value = targetLanguage.value;
        targetLanguage.value = tempLang;
        
        const tempText = sourceText.value;
        sourceText.value = targetText.value;
        targetText.value = tempText;
        
        updateWordCount();
    });
    
    // Clear button click event
    clearBtn.addEventListener('click', function() {
        sourceText.value = '';
        targetText.value = '';
        errorMessage.textContent = '';
        successMessage.textContent = '';
        updateWordCount();
    });
    
    // Function to translate text using MyMemory Translation API
    function translateText(text, source, target, email) {
        // Clear previous messages
        errorMessage.textContent = '';
        successMessage.textContent = '';
        
        // Show loading indicator
        loadingIndicator.style.display = 'block';
        
        // Prepare the API URL
        let apiUrl = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${source}|${target}`;
        
        // Add email if provided
        if (email) {
            apiUrl += `&de=${encodeURIComponent(email)}`;
        }
        
        // Make the API request
        fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Translation request failed with status: ' + response.status);
            }
            return response.json();
        })
        .then(result => {
            // Hide loading indicator
            loadingIndicator.style.display = 'none';
            
            if (result.responseData && result.responseData.translatedText) {
                targetText.value = result.responseData.translatedText;
                
                // Show remaining quota info if available
                if (result.responseData.quota) {
                    showSuccess(`Remaining daily quota: ${result.responseData.quota}`);
                }
            } else if (result.responseStatus && result.responseStatus === 403) {
                throw new Error('Daily limit exceeded. Try again tomorrow or add your email to increase the limit.');
            } else {
                throw new Error('Invalid response from translation service');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            loadingIndicator.style.display = 'none';
            showError('Translation failed: ' + error.message);
        });
    }
    
    // Function to display error messages
    function showError(message) {
        errorMessage.textContent = message;
        successMessage.textContent = '';
    }
    
    // Function to display success messages
    function showSuccess(message) {
        successMessage.textContent = message;
        errorMessage.textContent = '';
    }
});