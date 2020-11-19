// const fs = require('fs');
module.exports = class GetSystemDictionary {

  constructor() {
    this.access = 'all';
  }

  async handler(payload, user) {
    // const dictionary = JSON.parse(fs.readFileSync('./utils/dictionary.json', 'utf8'));
    const dictionary = require('../../../utils/dictionary.json');

    return dictionary;
  }
}