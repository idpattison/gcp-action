const gce = require('@google-cloud/compute')({
  projectId: 'ianpattison-gcp-action'
});
const zone = gce.zone('europe-west1-b');
console.log('Getting your VMs...');

zone.getVMs().then((data) => {
  data[0].forEach((vm) => {
    console.log('Found a VM called', vm.name);
  });
  console.log("Done");
});
