const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const csvWriter = createCsvWriter({
  path: 'document.csv',
  header: [
    { id: 'urlPrimary', title: 'Url Primary' },
    { id: 'urlSecondary', title: 'URL Secondary' },
    { id: 'queryPrimary', title: 'Query Primary' },
    { id: 'querySecondary', title: 'Query Secondary' },
    { id: 'bodyPrimary', title: 'Body Primary' },
    { id: 'bodySecondry', title: 'Body Secondary' },
    { id: 'ResponsePrimary', title: 'Response Primary' },
    { id: 'ResponseSecondary', title: 'Response Secondary' },
  ]
});

const data = [
  { urlPrimary: 'http://example.com', queryPrimary: 'sample query', bodyPrimary: 'sample body', ResponsePrimary: 'sample response' },
];

csvWriter.writeRecords(data)
  .then(() => {
    console.log('CSV file created successfully.');
  })
  .catch((err) => {
    console.error('Error:', err);
  });
