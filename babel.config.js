// eslint-disable-next-line func-names
module.exports = function (api) {
  api.cache(true)
  return {
    plugins: [
      [
        require.resolve('babel-plugin-module-resolver'),
        {
          root: ['./build'],
          extensions: ['.js', '.d.ts', '.ts']
        }
      ],
    ]
  }
}