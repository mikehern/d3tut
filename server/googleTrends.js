const fs = require('fs');
const googleTrends = require('google-trends-api');

const query = { keyword: 'blockchain', resolution: 'CITY' };
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const saveOutput = (queryType, queryResults) => {
  fs.writeFile(`../tmp/${queryType}.txt`, queryResults, null, () => console.log('Completed write!'));
};

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
};

module.exports = {collectData};
