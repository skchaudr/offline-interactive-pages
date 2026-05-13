/*
 * shared/signals.js
 *
 * Reference signals primitive. Copy the body of createStore into each page's
 * inline <script>; do not link this file. The single-file doctrine forbids
 * <script src=...>.
 *
 * Mental model: a Proxy-wrapped state object plus a per-key subscriber map.
 * Reassign a top-level key to fire its subscribers. Nested mutations are not
 * observed -- replace whole arrays / objects to trigger updates. This keeps
 * change tracking predictable and small.
 *
 * Performance budget: each subscriber should do targeted DOM work, not a
 * whole-page re-render. Subscribe to the keys you actually read.
 */

function createStore(initial) {
  const subs = new Map();

  function notify(key, value) {
    const set = subs.get(key);
    if (!set) return;
    for (const fn of set) fn(value, key);
  }

  const state = new Proxy({ ...initial }, {
    set(target, key, value) {
      if (target[key] !== value) {
        target[key] = value;
        notify(key, value);
      }
      return true;
    },
  });

  function subscribe(keys, fn) {
    const list = Array.isArray(keys) ? keys : [keys];
    for (const key of list) {
      if (!subs.has(key)) subs.set(key, new Set());
      subs.get(key).add(fn);
    }
    fn();
    return function unsubscribe() {
      for (const key of list) subs.get(key)?.delete(fn);
    };
  }

  return { state, subscribe };
}

/*
 * Usage:
 *
 *   const { state, subscribe } = createStore({ filter: 'all', items: [...] });
 *
 *   subscribe(['filter', 'items'], () => {
 *     const visible = state.items.filter(i => state.filter === 'all' || i.tag === state.filter);
 *     renderList(visible);
 *   });
 *
 *   state.filter = 'open';   // fires the subscriber once
 *   state.items = [...state.items, newItem];  // reassign, do not push in place
 */
