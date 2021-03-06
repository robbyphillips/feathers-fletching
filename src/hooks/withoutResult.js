const { skippable } = require('../lib');
const {
  virtualsSerializer,
  filterResolver
} = require('../lib/virtualsSerializer');
const { getResults, replaceResults, omit } = require('../lib/utils');

module.exports = (virtuals, prepFunc = () => {}) => {
  return skippable('withoutResult', async context => {
    const results = getResults(context);

    if (!results) {
      return context;
    }

    if (Array.isArray(virtuals)) {
      const filtered = Array.isArray(results)
        ? results.map(result => omit(result, virtuals))
        : omit(results, virtuals);
      replaceResults(context, filtered);
      return context;
    }

    const filtered = await virtualsSerializer(
      filterResolver,
      results,
      virtuals,
      context,
      prepFunc
    );
    replaceResults(context, filtered);
    return context;
  });
};
