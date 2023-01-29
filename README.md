# @bryce-loskie/flip

transfomer to convert js module

[![NPM version](https://img.shields.io/npm/v/@bryce-loskie/flip?color=a1b858&label=)](https://www.npmjs.com/package/@bryce-loskie/flip)

## Get Started

```bash
pnpm i @bryce-loskie/flip
```

```ts
import { transformCMD2AMD, transformESM2AMD } from '@bryce-loskie/flip'

const code = `
  const foo = 'foo'
  const bar = 'nar'
  const fn = () => {}

  module.exports = {
    foo,
    bar,
    fn,
  }
`

it('transform cmd to amd', async () => {
  const result = await transformCMD2AMD(code)
  expect(result).toMatchInlineSnapshot(`
    "const foo = 'foo';
    const bar = 'nar';
    const fn = () => {};
    define(() => ({
      foo,
      bar,
      fn
    }));
    "
  `)
})

const code = `
    const foo = 'foo'
    const bar = 'nar'
    const fn = () => {}

    export {
      foo,
      bar,
      fn,
    }
`

it('transform esm to amd', async () => {
  const result = await transformESM2AMD(code)
  expect(result).toMatchInlineSnapshot(`
    "const foo = 'foo';
    const bar = 'nar';
    const fn = () => {};
    define(() => ({
      foo,
      bar,
      fn
    }));
    "
  `)
})
```

## License

[MIT](./LICENSE) License © 2023 [guygubaby](https://github.com/guygubaby)
