import requireAll from 'require-all';
import pathOr from 'ramda/src/pathOr';
import set from 'ramda/src/set';
import lensPath from 'ramda/src/lensPath';
const debug = require('debug')('sass-bolirplate')

//@todo: LOAD FROM CACHE
// clean for each request
// load first after use server

class Config {
  constructor () {
    this._configPath = null;
    this._config = {};
  }

  init(configPath) {
    this.configPath = configPath + '/config';
    this.syncWithFileSystem();
  }

  get configPath() {
    return this._configPath;
  }

  set configPath(configPath) {
    this._configPath = configPath;
  }

  get(key, defaultValue = null) {
    return pathOr(defaultValue, key.split('.'))(this._config);
  }

  set(key, value) {
    this._config = set(lensPath(key.split('.')), value, this._config);
  }

  has(key) {
    return !!pathOr(null, key.split('.'))(this._config);
  }

  syncWithFileSystem () {
    try {
      this._config = requireAll({
        dirname: this._configPath,
        filter: /(.*)\.js$/
      })
      debug('loaded all config files from %s', this._configPath)
    } catch (error) {
      if (error.code !== 'ENOENT') {
        throw error
      }
    }
  }
}

export default new Config();