'use strict';

const utils = require('../../../utils');
const file_path1 = utils.getFilePath('apps/watcher-chokidar-app/tmp-agent.txt');
const dir_path = utils.getFilePath('apps/watcher-chokidar-app/tmp-agent');

module.exports = function(agent) {
  let count = 0;
  function listener() {
    count++;
  }

  agent.messenger.on('i-want-agent-file-changed-count', function() {
    agent.messenger.broadcast('agent-file-changed-count', count);
  });

  agent.messenger.on('agent-unwatch', function() {
    agent.watcher.unwatch([ file_path1, dir_path ], listener);
    agent.messenger.broadcast('agent-unwatch-success', 'agent unwatch success');
  });

  agent.messenger.on('agent-watch', function() {
    agent.watcher.watch([ file_path1, dir_path ], listener);
    agent.messenger.broadcast('agent-watch-success', 'agent watch success');
  });
};
