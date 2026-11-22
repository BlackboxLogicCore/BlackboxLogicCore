// Isolated, synthetic contract test. No proprietary Rhodium technology, customer data or competition trigger.
import { strict as assert } from 'node:assert';
import { createHash, createHmac, randomBytes, timingSafeEqual } from 'node:crypto';
const hash = data => createHash('sha256').update(data).digest('hex');
const secret = randomBytes(32);
const externalStorage = new Map(); // simulated customer-funded storage, not a Rhodium implementation
const registry = new Map();
function dock(customerId, payload) {
  const packageId = randomBytes(16).toString('hex');
  const integrityReference = hash(payload); // test-only SHA-256; NOT proprietary fingerprint or reconstruction blueprint
  const authorization = createHmac('sha256', secret).update(customerId).update(packageId).digest();
  externalStorage.set(packageId, Buffer.from(payload));
  registry.set(packageId, { customerId, integrityReference, authorization });
  return { packageId, authorization };
}
function retrieve(customerId, receipt) {
  const record = registry.get(receipt.packageId);
  assert.ok(record, 'unknown package');
  assert.equal(record.customerId, customerId, 'wrong customer');
  assert.ok(Buffer.isBuffer(receipt.authorization) &&
    receipt.authorization.length === record.authorization.length &&
    timingSafeEqual(record.authorization, receipt.authorization), 'wrong authorization');
  const data = externalStorage.get(receipt.packageId);
  assert.ok(data, 'storage unavailable');
  assert.equal(hash(data), record.integrityReference, 'integrity violation');
  return Buffer.from(data);
}
const customerId = 'synthetic-customer-A';
const original = randomBytes(8192);
const receipt = dock(customerId, original);
assert.deepEqual(retrieve(customerId, receipt), original);
assert.throws(() => retrieve('synthetic-customer-B', receipt), /wrong customer/);
assert.throws(() => retrieve(customerId, { ...receipt, authorization: randomBytes(32) }), /wrong authorization/);
const stored = externalStorage.get(receipt.packageId);
externalStorage.set(receipt.packageId, Buffer.concat([stored.subarray(0, -1), Buffer.from([stored.at(-1) ^ 1])]));
assert.throws(() => retrieve(customerId, receipt), /integrity violation/);
externalStorage.set(receipt.packageId, stored);
externalStorage.delete(receipt.packageId);
assert.throws(() => retrieve(customerId, receipt), /storage unavailable/);
console.log('PASS SYNTHETIC ONLY: customer isolation, authorization, bit-identical retrieval, tamper detection, missing-storage rejection');
console.log('NOT TESTED: proprietary packaging, storage size, fingerprint, blueprint, sealed Arbeiterbox, real recovery');
