module.exports = {
  "*.{js,jsx,ts,tsx}": ["organize-imports-cli", "prettier --write"],
  "*": "prettier --write --ignore-unknown",
}
