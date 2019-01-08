config = {
  presets: [
    [
      "@babel/env",
      {
        targets: {
          node: "current"
        }
      }
    ]
  ],
  plugins: [
    // I want to switch the proposal as soon as this is merged: https://github.com/babel/babel/pull/9179
    ["@babel/proposal-pipeline-operator", {proposal: "minimal"}]
  ]
}

module.exports = config