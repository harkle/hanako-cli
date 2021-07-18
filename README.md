# hanako CLI

A CLI for hanako.

## Customizing your CLI

Check out the documentation at https://github.com/infinitered/gluegun/tree/master/docs.

## Install

```shell
$ npm link
$ npm run build
```

## Commands

```shell
$ hanako add # add a new module
$ hanako update # update the autoincludes files
```

## Publishing to NPM

To package your CLI up for NPM, do this:

```shell
$ npm login
$ npm whoami
$ npm lint
$ npm test
(if typescript, run `npm run build` here)
$ npm publish
```

# License

MIT - see LICENSE

