const { test } = require('node:test');
const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const root = process.env.PAIRING_TEST_ROOT || path.resolve(__dirname, '..');
const ts = require(require.resolve('typescript', { paths: [process.env.PAIRING_DEPS_ROOT || root] }));

// Exercise the component's event handlers with a deterministic hook host and fake USB receiver.
function mount({ cancel = false, fail = false } = {}) {
  const state = [];
  let cursor = 0;
  const calls = { request: 0, pair: 0, open: 0 };
  const adapter = { kind: 'bolt', open: async () => { calls.open++; if (fail) throw Error('USB busy'); }, close: async () => {}, startPairing: async () => { calls.pair++; return { index: 1, name: 'Mouse' }; } };
  const React = {
    createElement: (type, props, ...children) => ({ type, props: { ...props, children } }),
    useState: (initial) => { const i = cursor++; if (!(i in state)) state[i] = initial; return [state[i], (v) => { state[i] = typeof v === 'function' ? v(state[i]) : v; }]; },
    useCallback: (fn) => fn,
    useEffect: () => {},
    useRef: () => ({ current: null }),
  };
  const exports = {};
  const code = ts.transpileModule(readFileSync(path.join(root, 'src/components/PairingWidget/ui/PairFlow.tsx'), 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.React } }).outputText;
  vm.runInNewContext(code, {
    exports, console, setInterval, clearInterval,
    navigator: { hid: { requestDevice: async () => { calls.request++; return cancel ? [] : [{}]; } } },
    require: (name) => {
      if (name === 'react') return { ...React, default: React };
      if (name === '@docusaurus/Translate') return { default: 'translate', translate: ({ message }) => message };
      if (name.endsWith('receiver-adapter')) return { createAdapter: () => adapter, LOGITECH_VENDOR_ID: 0x046d };
      if (name.endsWith('/hidpp')) return { HidppTimeout: class extends Error {} };
      if (name.endsWith('codec.js')) return { AUTH_METHOD: {}, PASSKEY_KEYCODE: {} };
      return { default: name };
    },
  });
  const render = () => { cursor = 0; return exports.default({}); };
  function nodes(tree) { return !tree || typeof tree !== 'object' ? [] : [tree, ...(tree.props?.children || []).flat(Infinity).flatMap(nodes)]; }
  const button = (label) => nodes(render()).find(n => n.type === 'button' && JSON.stringify(n.props.children).includes(label));
  return { calls, render, button, nodes };
}

test('viewing paired devices connects the receiver without starting pairing', async () => {
  const app = mount();
  await app.button('See paired devices').props.onClick();
  assert.equal(app.calls.request, 1);
  assert.equal(app.calls.pair, 0);
  assert.ok(app.nodes(app.render()).some(n => n.props?.adapter));
});

test('cancelling the receiver chooser leaves the controls usable', async () => {
  const app = mount({ cancel: true });
  await app.button('See paired devices').props.onClick();
  assert.equal(app.calls.request, 1);
  assert.equal(app.calls.pair, 0);
  assert.ok(app.button('See paired devices'));
});

test('a receiver connection error is recoverable', async () => {
  const app = mount({ fail: true });
  await app.button('See paired devices').props.onClick();
  assert.equal(app.calls.pair, 0);
  assert.ok(app.button('Try again'));
});


test('pairing remains an explicit separate action', async () => {
  const app = mount();
  await app.button('See paired devices').props.onClick();
  await app.button('Pair a new device').props.onClick();
  assert.equal(app.calls.request, 1);
  assert.equal(app.calls.pair, 1);
});

test('cancelling the pairing chooser returns to idle without pairing', async () => {
  const app = mount({ cancel: true });
  await app.button('Pair a new device').props.onClick();
  assert.equal(app.calls.pair, 0);
  assert.ok(app.button('Pair a new device'));
});
