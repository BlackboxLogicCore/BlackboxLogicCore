// Isolated synthetic contract test. No Rhodium proprietary implementation or customer data.
import { strict as assert } from 'node:assert';
import { createHash, createHmac, randomBytes, timingSafeEqual } from 'node:crypto';
const hash = data => createHash('sha256').update(data).digest('hex');
const ownerSecret = randomBytes(32);
const storage = new Map(); // simulated customer-funded external storage; not production storage
const registry = new Map(); // simulated metadata only
function seal(customerId, payload) {
  const id = randomBytes(16).toString('hex');
  const fingerprint = hash(payload);
  const impulse = randomBytes(1); // 1-byte trigger, NOT a representation of payload
  const authorization = createHmac('sha256', ownerSecret).update(customerId).update(id).digest();
  storage.set(id, Buffer.from(payload));
  registry.set(id, { customerId, fingerprint, trigger: impulse.toString('hex'), authorization });
  return { id, fingerprint, trigger: impulse.toString('hex'), authorization };
}
function retrieve(customerId, receipt) {
  const entry = registry.get(receipt.id);
  assert.ok(entry, 'unknown package');
  assert.equal(entry.customerId, customerId, 'wrong customer');
  assert.equal(entry.trigger, receipt.trigger, 'wrong impulse');
  assert.ok(Buffer.isBuffer(receipt.authorization) && timingSafeEqual(entry.authorization, receipt.authorization), 'wrong authorization');
  const payload = storage.get(receipt.id);
  assert.ok(payload, 'external data unavailable; cannot reconstruct from impulse or fingerprint');
  assert.equal(hash(payload), entry.fingerprint, 'integrity violation');
  return Buffer.from(payload);
}
const customer = 'synthetic-customer-A';
const original = randomBytes(8192);
const receipt = seal(customer, original);
assert.deepEqual(retrieve(customer, receipt), original);
assert.throws(() => retrieve('synthetic-customer-B', receipt), /wrong customer/);
assert.throws(() => retrieve(customer, { ...receipt, trigger: 'ff' === receipt.trigger ? '00' : 'ff' }), /wrong impulse/);
assert.throws(() => retrieve(customer, { ...receipt, authorization: randomBytes(32) }), /wrong authorization/);
const stored = storage.get(receipt.id);
storage.set(receipt.id, Buffer.concat([stored.subarray(0, -1), Buffer.from([stored.at(-1) ^ 1])]));
assert.throws(() => retrieve(customer, receipt), /integrity violation/);
storage.set(receipt.id, stored);
storage.delete(receipt.id);
assert.throws(() => retrieve(customer, receipt), /external data unavailable/);
console.log('PASS SYNTHETIC ONLY: customer assignment, one-byte trigger, authorized retrieval, bit-identical data, unauthorized access, tamper detection, missing-storage rejection');
console.log('NOT TESTED: sealed Arbeiterbox, proprietary fingerprint/packaging, real customer storage, real recovery');
