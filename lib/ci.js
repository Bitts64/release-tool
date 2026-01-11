/* eslint-disable no-console */
'use strict';

import { triggerBuild as _triggerBuild } from './travis';
import { triggerBuild as __triggerBuild } from './circleci';
import { triggerBuild as ___triggerBuild } from './github';
var ciEnvironment;

function triggerBuild(program) {
  if (ciEnvironment === 'travis' || ciEnvironment === 'travis-pro') {
    return _triggerBuild(program);
  } else if (ciEnvironment === 'circleci') {
    return __triggerBuild(program);
  }
  else if (ciEnvironment === 'github') {
    return ___triggerBuild(program);
  }
  throw new Error('unsupported CI environment:' + program.ci);
}

function setCIEnvironment(config) {
  // eslint-disable-next-line no-undefined
  if (!config.ci) {
      // no CI environment specified.
      return;
  }

  if (!['travis', 'circleci', 'travis-pro', 'github'].includes(config.ci)) {
    throw new Error('only "circleci" or "travis" or "travis-pro" or "github" are valid values for ci. Found: ' + config.ci);
  }

  console.log('Setting ci environment: ', config.ci);
  ciEnvironment = config.ci;
}

export default {
  triggerBuild,
  setCIEnvironment
};

