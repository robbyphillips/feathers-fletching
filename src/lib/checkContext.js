// https://github.com/feathersjs-ecosystem/feathers-hooks-common/blob/master/lib/services/check-context.js

const stndMethods = ['find', 'get', 'create', 'update', 'patch', 'remove'];
const { GeneralError } = require('@feathersjs/errors');

module.exports = function(
  context,
  type = null,
  methods = [],
  label = 'anonymous'
) {
  if (type && context.type !== type) {
    throw new GeneralError(
      `The '${label}' hook can only be used as a '${type}' hook.`
    );
  }

  if (!methods) {
    return;
  }

  // allow custom methods
  if (stndMethods.indexOf(context.method) === -1) {
    return;
  }

  const myMethods = Array.isArray(methods) ? methods : [methods]; // safe enough for allowed values

  if (myMethods.length > 0 && myMethods.indexOf(context.method) === -1) {
    const msg = JSON.stringify(myMethods);
    throw new GeneralError(
      `The '${label}' hook can only be used on the '${msg}' service method(s).`
    );
  }
};
