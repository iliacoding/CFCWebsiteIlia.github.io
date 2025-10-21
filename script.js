document.addEventListener('DOMContentLoaded', () => {
    const flashcardDeck = document.getElementById('flashcard-deck');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const cardCounter = document.getElementById('card-counter');

    // =================================================================
    // == EDIT YOUR QUESTIONS AND ANSWERS HERE ==
    // =================================================================
    const cardData = [
        { question: 'How did he improve gender equality?', answer: 'He allowed Women to vote in 1963 which was 8 years before Switzerland. He also raised the minimum age of marriage from 13 to 18 and gave women rights to initiate divorce. He also gave women greater education and made it the same as the men' },
        { question: 'Did he create and maintain peace?', answer: 'Yes, there was peace all across the middle east and especially within Iran. Iran has many different types of Persian. e.g. Kurdish, Fars, Azeri, Baluch. And Mohammad Reza Shah Pahlavi made sure that there was no systemic discrimination and that everyone was treated equally.' },
        { question: 'How did he acheive SDG 3 - Quality Education?', answer: '1. Young soldiers would be sent to rural areas to educate younger children and teach them Literacy and numeracy. 2. Children enrolled in schools increased by 6 times and universities by 8 times in just one decade. 3. Education was completely free under the Shah\'s government. 4. Iranian students were able to travel and study abroad in countries such as the UK, US, France and many more due to the deals that he made with those countries. Not only was this free but students were even given pocket money' },
        { question: 'Why is he important?', answer: 'He is very important as he fundamentally changed and revolutionized Iran in a very good way. He gave freedom to all people and improved Iran in an unmeasurable amount. He was 50 years ahead of his time and did things that helped not only Iran but the whole entire world.' },
        { question: 'What was his 2500 year founding of Iran/Persia and how did it help?', answer: 'What was his 2500 year founding of Iran/Persia and how did it help? It was a celebration/parade which marked 2500 years of the founding of Iran. It was a 4 day ceremony marked by a military parade and important political figures from all around the world were invited. It cost roughly 20 million dollars USD at the time(1971) and it returned over 8 folds from the tourism and trade that it brought from its global recognition.' },
        { question: 'How did the Shah\'s early life/family/education shape his worldview?', answer: 'When he was a child, he saw his father Reza Shah Pahlavi was the king and he learnt how to be a good Shah and built connections with other world leaders and learnt how the world works. He went to Switzerland for his education in 1931 and returned attending an Iranian military school. In Switzerland, he learnt how to speak many languages like French and English but also world politics. ' },
        { question: 'Are there any leaders/CFC\'s who\'ve been inspired by the Shah?', answer: 'Yes, there are several leaders and political figures who have cited the Shah as an influence on their own ideologies and policies. Some of these leaders include: Mustafa Kemal Atatürk, Reza Shah Pahlavi III, Anwar Sadat (Former President of Egypt), Ebi(singer)'  },
        { question: 'How did he improve the life of people all around the world.', answer: 'For students all across the nation of Iran, he gave free education and made deals with many countries to allow Persian students to study in those countries and even receive pocket money for free. He improved life allowing people to express their feelings freely and allowed people to live their lives without being forced to wear hijabs or without being forced to believe something. He also restored peace within the Middle east.' },
        { question: 'What SDG did he mainly achieve?', answer: 'Mainly SDG 8 and 16. as Iran experienced economical growth rates that were in the double digits and one of the highest in history.' },
        { question: 'When did he become the Shah of Iran?', answer: 'He became Shah of Iran in 1941 after his Father Reza Shah who freed Iran stepped down.' },
    ];
    // =================================================================

    let currentCard = 0;

    function createCards() {
        flashcardDeck.innerHTML = '';
        cardData.forEach((data, index) => {
            const cardElement = document.createElement('div');
            cardElement.className = 'flashcard';
            cardElement.innerHTML = `
                <div class="front">
                    <p>${data.question}</p>
                    <small>Click to reveal</small>
                </div>
                <div class="back">
                    <p>${data.answer}</p>
                </div>
            `;
            cardElement.addEventListener('click', () => {
                cardElement.classList.toggle('flipped');
                adjustDeckHeight(); // adjust when user flips card (content can change height)
            });
            flashcardDeck.appendChild(cardElement);
        });
    }

    function adjustDeckHeight() {
        const active = document.querySelector('.flashcard.active');
        if (!active) {
            flashcardDeck.style.height = ''; // fallback to CSS min-height
            return;
        }
        // measure the visible side (front/back) because backface-hidden sides don't contribute
        const visibleSide = active.classList.contains('flipped')
            ? active.querySelector('.back')
            : active.querySelector('.front');
        // use scrollHeight so wrapped multi-line content is measured
        const height = visibleSide ? visibleSide.scrollHeight : active.scrollHeight;
        // add a little padding for borders/padding (optional)
        flashcardDeck.style.height = (height + 40) + 'px';
    }

    function updateDisplay() {
        const cards = document.querySelectorAll('.flashcard');
        cards.forEach((card, index) => {
            if (index === currentCard) {
                card.classList.add('active');
            } else {
                card.classList.remove('active');
                // ensure non-active cards are not flipped (optional)
                card.classList.remove('flipped');
            }
        });
        cardCounter.textContent = `${currentCard + 1} / ${cardData.length}`;
        adjustDeckHeight(); // ensure deck height matches active card
    }

    nextBtn.addEventListener('click', () => {
        currentCard = (currentCard + 1) % cardData.length;
        updateDisplay();
    });

    prevBtn.addEventListener('click', () => {
        currentCard = (currentCard - 1 + cardData.length) % cardData.length;
        updateDisplay();
    });

    // adjust on resize so layout changes don't clip content
    window.addEventListener('resize', () => {
        adjustDeckHeight();
    });

    // Initialize
    createCards();
    updateDisplay();
});