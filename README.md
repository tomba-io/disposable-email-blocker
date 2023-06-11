# Disposable email blocker

Detect and Block if new account registrations are using disposable email services with javascript.

The Disposable email blocker provide :

- Detect invalid emails.
- Detect invalid Domains.
- Detect disposable emails.
- We crawl the disposable email domains daily to keep safe from fake uses.
- Easy to use

## How to use

### Use in browser

To use via a CDN include this in your HTML:

```html
<script src="https://cdn.jsdelivr.net/npm/disposable-email-blocker/disposable-email-blocker.min.js"></script>
<script>
  new Disposable.Blocker();
</script>
```

## Development

For development

### Setup

1. Clone this repository into it:

```shell
git clone https://github.com/tomba-io/disposable-email-blocker.git
cd disposable-email-blocker
yarn
```

### Develop & debug

To start debugging session run:

```shell
yarn start
```

**Note** that while changes to `experiments.ts`
are hot-reloaded, changes to `template.html` are not.

**Note** You can set breakpoints in your code and run a debugging session in vsc and other editors.

### Build

```shell
yarn build
```

The output is in the `/dist`.

## Contributing

1. Fork it (<https://github.com/tomba-io/disposable-email-blocker/fork>)
2. Create your feature branch (`git checkout -b my-new-email`)
3. Commit your changes (`git commit -am 'Add new email'`)
4. Push to the branch (`git push origin my-new-email`)
5. Create a new Pull Request

## Contributors

- [Mohamed Ben](https://github.com/benemohamed) - creator and maintainer

## License

[![GitHub license](https://img.shields.io/github/license/tomba-io/disposable-email-blocker.svg)](https://github.com/tomba-io/disposable-email-blocker)