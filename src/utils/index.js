module.exports = () => {

  const hammer = require('./hammer');
  const Sorter = require('./Sorter');
  const Resizer = require('./Resizer');
  const Dragger = require('./Dragger');

  return {
    /**
     * Name of the module
     * @type {String}
     * @private
     */
    name: 'Utils',

    /**
     * Initialize module
     */
    init() {
      hammer('touchstart touchmove').on('setup', { passive: false });
      hammer('click').then('tap');
      hammer('dblclick').then('tap', (e) => e.tapCount === 2);

      hammer.fork('withDirection');
      hammer.withDirection
        .match('namespace', /^\^(\w+)$/)
        .on('config', (config, [m, direction]) => { config.direction = direction });
      hammer.withDirection('mousemove').then('panstart');

      return this;
    },

    Sorter,
    Resizer,
    Dragger,
  };
};
