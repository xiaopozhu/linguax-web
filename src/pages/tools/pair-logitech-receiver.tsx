import React from 'react';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';
import Link from '@docusaurus/Link';
import PairingWidget from '@site/src/components/PairingWidget';

const FAQ = [
  {
    q: 'Which receivers does this tool support?',
    a: 'Logi Bolt, Logitech Unifying, and Lightspeed (G-series) receivers. It pairs, lists, and unpairs devices. Firmware updates and dongle replacement are out of scope — use Logitech’s own tools for those.',
  },
  {
    q: 'Why does it need Chrome or Edge?',
    a: 'The tool talks to the receiver over WebHID, a browser API that Safari and Firefox don’t implement. Nothing is installed and nothing leaves your machine — the protocol runs entirely between your browser and the receiver.',
  },
  {
    q: 'My receiver has no free slots. What do I do?',
    a: 'Unifying and Bolt receivers hold up to six devices. Connect the receiver, open "See paired devices", and unpair one you no longer use — the slot frees up immediately.',
  },
  {
    q: 'Is this an official Logitech tool?',
    a: 'No. It is an independent implementation of the publicly documented HID++ protocol, offered by LinguaX as a convenience. For Logitech’s own web pairing tool, see logiwebconnect.com.',
  },
  {
    q: 'What do I do after pairing?',
    a: 'macOS drives the mouse immediately. To remap side buttons, add gestures, or set up push-to-talk, install LinguaX — a ~10MB native app with a 30-day free trial.',
  },
];

export default function PairReceiverPage() {
  return (
    <Layout
      title="Pair a Logitech Bolt / Unifying / Lightspeed receiver in your browser"
      description="Pair, list, and unpair devices on a Logitech Bolt, Unifying, or Lightspeed receiver — right in Chrome or Edge, no Logitech software required."
    >
      <Head>
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: FAQ.map(({ q, a }) => ({
              '@type': 'Question',
              name: q,
              acceptedAnswer: { '@type': 'Answer', text: a },
            })),
          })}
        </script>
      </Head>

      <main className="container margin-vert--lg" style={{ maxWidth: 760 }}>
        <h1>Pair a Logitech receiver in your browser</h1>
        <p>
          Just unboxed a Logitech mouse, or moving one to a new receiver? Pair it here — no Logi Options+, no G HUB, no
          account. Works with <strong>Bolt</strong>, <strong>Unifying</strong>, and <strong>Lightspeed</strong>{' '}
          receivers in Chrome or Edge.
        </p>

        <PairingWidget />

        <h2>How it works</h2>
        <ol>
          <li>Plug the receiver into a USB port and click <strong>Pair a new device</strong>.</li>
          <li>Pick the receiver in the browser prompt (it lists as “USB Receiver”).</li>
          <li>Turn the mouse off and on, or press its connect / Easy-Switch button.</li>
          <li>Done — the device name appears when the receiver accepts it.</li>
        </ol>

        <h2>Frequently asked questions</h2>
        {FAQ.map(({ q, a }) => (
          <details key={q} style={{ marginBottom: '0.75rem' }}>
            <summary style={{ fontWeight: 600, cursor: 'pointer' }}>{q}</summary>
            <p style={{ marginTop: '0.5rem' }}>{a}</p>
          </details>
        ))}

        <h2>After pairing: make the buttons worth it</h2>
        <p>
          Pairing gets the pointer moving; LinguaX makes the mouse feel native — smooth scrolling, side-button and
          gesture mapping, per-app behavior, and push-to-talk. See the{' '}
          <Link to="/docs/mouse-plus/device-compatibility">per-model setup guides</Link> or{' '}
          <Link to="/download">download LinguaX</Link> (30-day free trial, $9.9 one-time).
        </p>
      </main>
    </Layout>
  );
}
