const datastore = require('@google-cloud/datastore')({
  projectId: 'ianpattison-gcp-action'
});

const entity = {
  key: datastore.key(['weather']),
  data: [
    { name: 'city', value: 'Glasgow' },
    { name: 'temperature', value: 2 }
  ]
};

datastore
  .save(entity)
  .then(() => {
    console.log('Success');
  })
  .catch(err => { console.error('Error ' + err );
  });
