const datastore = require('@google-cloud/datastore')({
  projectId: 'ianpattison-gcp-action'
});

const query = datastore.createQuery('weather');

datastore
  .runQuery(query)
  .then(data => {
    const weather = data[0];
    console.log('Weather:');
    weather.forEach((item) => {
      const key = item[datastore.KEY];
      console.log(key.id, item);
    })
  })
  .catch(err => { console.error('Error ' + err );
  });
