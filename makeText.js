/** Command-line tool to generate Markov text. */

const fs = require('fs');
const process = require('process');
const axios = require('axios');
const { MarkovMachine } = require('./markov');
const { createInflate } = require('zlib');

function processRequest(content) {
    let newMarkov = new MarkovMachine(content);
    console.log(newMarkov.makeText());
} 

function catFile(input) {
    fs.readFile(input, 'utf8', (err, data) => {
        if (err) {
            console.log(`Error reading ${input}`, err);
            process.exit(1);
        }
        else {
            processRequest(data);
        }
    });
}

async function catWeb(input) {
    try {
        let response = await axios.get(input);
        processRequest(response.data);
    }
    catch (err) {
        console.log(`Error fetching ${input}: ${err}`);
        process.exit(1)
    }
}

let inputType = process.argv[2];
let inputString = process.argv[3];

if (inputType === 'file') {
    catFile(inputString);
} else if (inputType === 'url') {
    catWeb(inputString);
    }
