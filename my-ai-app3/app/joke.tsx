'use client';
import React, { useState } from 'react';
import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default function JokeGenerator() {
const [topic, setTopic] = useState('');
const [tone, setTone] = useState('');
const [jokeType, setJokeType] = useState('');
const [temperature, setTemperature] = useState(0.5);
const [generatedJoke, setGeneratedJoke] = useState('');
const [evaluation, setEvaluation] = useState('');

const generateJoke = async () => {
    try {
    const prompt = `Generate a ${jokeType} joke with a ${tone} tone about ${topic}. Use a temperature of ${temperature} for the joke generation.`;
    const response = await openai.createCompletion({
        model: 'text-davinci-003',
        prompt,
        temperature,
        max_tokens: 100,
    });
    const joke = response.data.choices[0].text;
    setGeneratedJoke(joke);
    // Evaluate the joke
    const jokeEvaluation = evaluateJoke(joke);
    setEvaluation(jokeEvaluation);
} catch (error) {
    console.error('Error generating joke:', error);
}
};

const evaluateJoke = (joke) => {
    // Perform evaluation logic here based on different criteria
    // For example, you can analyze funniness, appropriateness, offensiveness, etc.
    // Return a string indicating the evaluation result
    // This is just a placeholder, replace it with your actual evaluation logic
    return 'This joke is funny and appropriate!';
};

return (
    <div>
    <div>
        <label htmlFor="topic">Topic:</label>
        <input type="text" id="topic" value={topic} onChange={(e) => setTopic(e.target.value)} />
    </div>
    <div>
        <label htmlFor="tone">Tone:</label>
        <select id="tone" value={tone} onChange={(e) => setTone(e.target.value)}>
        <option value="">Select a tone</option>
        <option value="witty">Witty</option>
        <option value="sarcastic">Sarcastic</option>
        <option value="silly">Silly</option>
        <option value="goofy">Goofy</option>
        <option value="long">Long</option>
        </select>
    </div>
    <div>
        <label htmlFor="jokeType">Joke Type:</label>
        <select id="jokeType" value={jokeType} onChange={(e) => setJokeType(e.target.value)}>
        <option value="">Select a joke type</option>
        <option value="pun">Pun</option>
        <option value="knock-knock">Knock-knock</option>
        <option value="story">Story</option>
        <option value="boring">Boring</option>
        </select>
    </div>
    <div>
        <label htmlFor="temperature">Temperature:</label>
        <input
        type="range"
        id="temperature"
        min="0"
        max="1"
        step="0.1"
        value={temperature}
        onChange={(e) => setTemperature(parseFloat(e.target.value))}
        />
        <span>{temperature}</span>
    </div>
    <button onClick={generateJoke}>Generate Joke</button>
    {generatedJoke && (
        <div>
        Joke: {generatedJoke}
        <br />
        Evaluation: {evaluation}
        </div>
    )}
    </div>
);
}