const req = require.context('./', true, /\.json.*$/);

let messages = {};
req.keys().forEach(function (file) {
  const msg = file.replace('./', '').replace('.json', '');
  messages[msg] = req(file);
});
module.exports = messages;
