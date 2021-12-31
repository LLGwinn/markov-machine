const { MarkovMachine } = require('./markov');

const testPhrase = new MarkovMachine('the cat in the hat');

test ('constructor should create list of words from input text', function() {
    expect(testPhrase.words).toEqual(['the','cat','in','the','hat', null]);
})

test ('makeChains should associate words with correct next-words', function() {
    expect(testPhrase.wordChains)
        .toEqual({"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]});
})

test ('makeText result should have <= number of words passed in arg', function() {
    let text = testPhrase.makeText(10);
    expect(text.split(' ').length).toBeLessThanOrEqual(10);
})

test ('makeText result should have >= 1 word', function() {
    let text = testPhrase.makeText(10);
    expect(text.split(' ').length).toBeGreaterThanOrEqual(1);
})

test ('makeText result shorter than arg should have last word "hat"', function() {
    let text = testPhrase.makeText(10);
    if (text.split(' '.length) < 10) {
        expect(text.split(' ').slice(-1)[0]).toBe('hat.')
    }
})