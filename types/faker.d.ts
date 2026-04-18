// faker v9 exposes types via the `exports` field in package.json, which
// requires `moduleResolution: bundler` or `node16`. Until the tsconfig is
// updated, this shim keeps `tsc --noEmit` clean.
declare module '@faker-js/faker';
