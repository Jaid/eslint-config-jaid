# ESLint Config

This is just my personal [ESLint](https://github.com/eslint/eslint) config. You most certainly will not think it's pretty, and that's okay! I still recommend you to take a look into the [`src`](https://github.com/Jaid/eslint-config-jaid/tree/master/src) folder, because my ESLint configs are generated with a pretty cool build setup!

## FAQ

### You can import ready-to-use ESLint configs in a JavaScript project?

Yes, it's great! If you need one, you should take a look at [Airbnb's one](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb). It seems to be quite popular. 80000 stars are a lot, aren't they?

### But I want to use yours!

Well, fine.

Execute this:

```sh
npm install --save-dev eslint
npx install-peerdeps --dev --yarn eslint-config-jaid
```

And add this to your `package.json`:

```json
{
  "eslintConfig": {
    "extends": "jaid"
  }
}
```