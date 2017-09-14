/* global $, _, s */
const $event = $.event.special;
const pass = _.constant(true);
const events = { };

_.assign($.event, {
  catch(type) {
    let types = init(type);
    return {
      on(phase, unit) {
        types.each((type) => {
          events[type][phase] = unit;
        });
        return this;
      },
      then(proxy, test) {
        let [system, type] = proxy;
        proxy = {
          type,
          test: _.isFunction(test) ? test : pass
        };
        switch (system) {
          case 'hammer':
            let Type = s(type).capitalize();
            proxy.hammer = _.find(Hammer, (val, key) => {
              return Type.startsWith(key);
            });
        }
        types.each((type) => {
          events[type].push(proxy);
        });
        return this;
      }
    }
  },
  watch(type) {
    type = init(type);
  }
});

function init(type) {
  return _(s.words(type)).each((type) => {
    let event = events[type];
    if (event != null) {
      return;
    }
    event = events[type] = [];
    $event[type] = {
      setup(data, ns, $fn) {
        let { setup } = event;
        if (_.isEmpty(event)) {
          this.addEventListener(type, $fn, setup);
        } else {
          data.ns = ns;
        }
      },
      add(unit) {
        if (_.isEmpty(event)) {
          return;
        }
        let offList = [];
        let { ns } = unit.data;
        
      },
      remove({ offList }) {
        _.each(offList, (fn) => fn());
      }
    };
  });
}
