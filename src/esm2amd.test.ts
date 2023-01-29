import { expect, it } from 'vitest'
import { transformESM2AMD } from './esm2amd'

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
