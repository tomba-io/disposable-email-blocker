# Disposable email blocker

Detect and Block if new account registrations are using disposable email services with javascript.

[Demo](https://tomba-io.github.io/disposable-email-blocker/)

The Disposable email blocker provide :

-   Protect all HTML Forms.
-   Detect invalid emails.
-   Detect invalid Domains.
-   Detect and Block disposable emails.
-   We crawl the disposable email domains daily to keep safe from fake uses.
-   Custom Error Message.
-   Detect and Block webmail emails.

## How to use

### Use in browser

To use via a CDN include this in your HTML.

Using jsDelivr CDN:

```html
<script src="https://cdn.jsdelivr.net/npm/disposable-email-blocker/disposable-email-blocker.min.js"></script>
<script>
    new Disposable.Blocker();
</script>
```

Using unpkg CDN:

```html
<script src="https://unpkg.com/disposable-email-blocker/disposable-email-blocker.min.js"></script>
<script>
    new Disposable.Blocker();
</script>
```

### Customizing Blocker

The **_Blocker_** constructor parameter.

Simple options

```javascript
const defaults = {
    disposable: {
        message: 'string',
    },
    webmail: {
        message: 'string',
        block: false,
    },
    emailError: {
        className: 'string',
        style: `string`,
    },
};
new Disposable.Blocker(defaults);
```

- `disposable.message` disposable error message.
- `webmail.message` webmail error message.
- `webmail.block` block webmail emails.
- `emailError.className` HTML tag class .
- `emailError.style` css style.

#### Custom disposable message

To disposable message:

```javascript
const defaults = {
    disposable: {
        message:
            'Abuses, strongly encourage you to stop using disposable email',
    },
};
new Disposable.Blocker(defaults);
```

### Custom webmail message

To webmail message:

```javascript
const defaults = {
    webmail: {
        message:
            'Warning, You can create an account with this email address, but we strongly encourage you to use a professional email address',
    },
};
new Disposable.Blocker(defaults);
```

### Block webmail emails

```javascript
const defaults = {
    webmail: {
        block: true,
    },
};
new Disposable.Blocker(defaults);
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

-   [Mohamed Ben](https://github.com/benemohamed) - creator and maintainer

## License

[![GitHub license](https://img.shields.io/github/license/tomba-io/disposable-email-blocker.svg)](https://github.com/tomba-io/disposable-email-blocker)
