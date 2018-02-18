const express = require('express');
const app = express();
const d3 = require('d3');
const googleTrends = require('google-trends-api');
const fs = require('fs');

const port = 3000;

app.get('/', (req, res) => res.send('Test!'));

app.listen(port, () => console.log(`Listening on port ${port}`));

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const saveOutput = (queryType, queryResults) => {
  fs.writeFile(`./tmp/${queryType}.txt`, queryResults, null, () => console.log('Completed write!')
)};

let query = {keyword: 'blockchain'};

async function collectData() {
  let geoResult = await googleTrends.interestByRegion(query);
  await saveOutput('geo', geoResult);
  await delay(3000);
  let timeResult = await googleTrends.interestOverTime(query);
  await saveOutput('time', timeResult);
  await delay(3000);
  let autoCompleteResult = await googleTrends.autoComplete(query);
  await saveOutput('autoComplete', autoCompleteResult);
  await delay(3000);
  let relatedQueriesResult = await googleTrends.relatedQueries(query);
  await saveOutput('relatedQueries', relatedQueriesResult);
  await delay(3000);
  let relatedTopicsResult = await googleTrends.relatedTopics(query);
  await saveOutput('relatedTopics', relatedTopicsResult);
}

collectData().catch(err => console.error(err));