'use strict';
 
const functions = require('firebase-functions');
const {WebhookClient} = require('dialogflow-fulfillment');
const {Card, Suggestion} = require('dialogflow-fulfillment');
 
process.env.DEBUG = 'dialogflow:debug'; // enables lib debugging statements
 
exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
  const agent = new WebhookClient({ request, response });
  console.log('Dialogflow Request headers: ' + JSON.stringify(request.headers));
  console.log('Dialogflow Request body: ' + JSON.stringify(request.body));
 
  function welcome(agent) {
    agent.add(`Welcome to cryptobot!`);
    agent.add(`Welcome to cryptobot! What can I help you today?`);
  }
 
  function fallback(agent) {
    agent.add(`I didn't understand. Would you like to check balance, sell bitcoin, buy bitcoin, check bitcoin price or convert to dollars?`);
    agent.add(`I'm sorry I did'nt get it. Would you like to check balance, sell bitcoin, buy bitcoin, check bitcoin price or convert to dollars?`);
  }

  function buy(agent) {
    agent.add(`How much bitcoin would you like to buy?`);
  }

  function confirm_buy(agent) {
    agent.add(`You are going to buy bitcoin, please confirm?`);
  }

    function confirm_sell(agent) {
    agent.add(`You are going to sell bitcoin, please confirm?`);
  }

  function sell(agent) {
    agent.add(`How much bitcoin would you like to sell?`);
  }

  function convert(agent) {
    agent.add(`How much bitcoin would you like to convert?`);
    agent.add(`Which currency would you like to convert to?`);
  }

  function passphrase(agent) {
    agent.add(`Please provide 3-4 words as passphrase`);
  }

    function check_price(agent) {
    agent.add(`Would you like to check bitcoin price for today?`);
  }

  let intentMap = new Map();
  intentMap.set('Welcome Intent', welcome);
  intentMap.set('Fallback Intent', fallback);
  intentMap.set('Buy bitcoin', buy);
  intentMap.set('Buy bitcoin - confirm', confirm_buy);
  intentMap.set('Sell bitcoin', sell);
  intentMap.set('Sell bitcoin - confirm', confirm_sell);
  intentMap.set('Transfer dollars', convert);
  intentMap.set('Change passphrase', passphrase);
  intentMap.set('check bitcoin price', check_price);
  agent.handleRequest(intentMap);
});
