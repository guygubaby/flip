export const transformESM2AMD = async (code: string) => {
  const { parse } = await import('acorn')
  const { walk } = await import('estree-walker')

  const ast = parse(code, {
    sourceType: 'module',
    ecmaVersion: 2020,
  })

  walk(ast as any, {
    enter(node) {
      if (node.type === 'ExportNamedDeclaration') {
        const { specifiers } = node
        const properties = specifiers.map((specifier) => {
          return {
            type: 'Property',
            kind: 'init',
            shorthand: true,
            method: false,
            key: {
              type: 'Identifier',
              name: specifier.exported.name,
            },
            value: {
              type: 'Identifier',
              name: specifier.local.name,
            },
          }
        })

        // @ts-expect-error ignore
        node.type = 'ExpressionStatement'
        // @ts-expect-error ignore
        node.expression = {
          type: 'CallExpression',
          callee: {
            type: 'Identifier',
            name: 'define',
          },
          arguments: [
            {
              type: 'ArrowFunctionExpression',
              params: [],
              async: false,
              id: null,
              body: {
                type: 'ObjectExpression',
                properties,
              },
            },
          ],
        }
      }
    },
  })

  const { generate } = await import('astring')
  return generate(ast)
}
