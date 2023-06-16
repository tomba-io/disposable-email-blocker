# 🔒 Welcome to the Disposable Email Blocker! 🔥

## Description 📝

The Disposable Email Blocker is a powerful tool designed to detect and prevent the use of disposable email services for account registrations. 🚫💻

[Demo](https://tomba-io.github.io/disposable-email-blocker/)

## Features ✨

-   🛡️ Protects all HTML forms.
-   🛡️ Detects invalid email addresses and domains
-   🛡️ Blocks disposable email services
-   🛡️ Blocks webmail email services
-   🛡️ Custom error messages
-   🛡️ Our system stays ahead of the game by continuously updating the database of disposable email providers to effectively identify new ones.

## How to use 🚀

To get started, follow these simple steps:

### Install

[![NPM version][npm-image]][npm-url]
[![NPM bundle size][npm-bundle-size-image]][npm-url]
[![npm download][download-image]][download-url]

```shell
$ npm install disposable-email-blocker --save
# or
$ yarn add disposable-email-blocker
```

### Usage 🖥️

```javascript
import { Blocker } from 'disposable-email-blocker';
```

```javascript
new Blocker();
```

### Use in browser

To use via a CDN include this in your HTML.

Using jsDelivr CDN:

```html
<script src="https://cdn.jsdelivr.net/npm/disposable-email-blocker/disposable-email-blocker.min.js"></script>
<script>
    new Disposable.Blocker();
</script>
```
or

```html
<script
    src="https://cdn.jsdelivr.net/npm/disposable-email-blocker/disposable-email-blocker.min.js"
    block
></script>
```

Using unpkg CDN:

```html
<script src="https://unpkg.com/disposable-email-blocker/disposable-email-blocker.min.js"></script>
<script>
    new Disposable.Blocker();
</script>
```

or

```html
<script
    src="https://cdn.jsdelivr.net/npm/disposable-email-blocker/disposable-email-blocker.min.js"
    block
></script>
```

### Customizing Blocker

The **_Blocker_** constructor parameter.

Simple options

```javascript
const defaults = {
    apiUrl: 'string',
    data: 'TombaStatusResponse[]',
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

-   `apiUrl` API URL.
-   `data` Custom Data.
-   `disposable.message` disposable error message.
-   `webmail.message` webmail error message.
-   `webmail.block` block webmail emails.
-   `emailError.className` HTML tag class .
-   `emailError.style` css style.

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

### Custom API URL

```javascript
const defaults = {
    apiUrl: 'string',
};
new Disposable.Blocker(defaults);
```

### Custom Data

This will stop API call

```javascript
const defaults = {
    data: [
        {
            domain: 'coronafleet.com',
            webmail: true,
            disposable: false,
        },
    ],
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

### Event

use the `on()` API method.
Available Event name `done` the Content is revealed on `onInput`

```javascript
const blocker = new Blocker();
blocker.on('done', (e) => {
    if (e.detail.disposable) {
        alert(blocker.options.disposable.message);
    }
});
```

## Free Plugins / Forum / E-Commerce / CMS ♾️

| Platform   | URL                                                                                                    | Status |
| ---------- | ------------------------------------------------------------------------------------------------------ | ------ |
| wordpress  | [wordpress-disposable-email-blocker](https://github.com/tomba-io/tomba-disposable)                     | ✅      |
| MyBB       | [mybb-disposable-email-blocker](https://github.com/tomba-io/mybb-disposable-email-blocker)             | ✅      |
| LiteCart   | [litecart-disposable-email-blocker](https://github.com/tomba-io/litecart-disposable-email-blocker)     | ✅      |
| Cloudflare | [cloudflare-disposable-email-blocker](https://github.com/tomba-io/cloudflare-disposable-email-blocker) | ✅      |
| Vue 2      | [disposable-email-blocker-vue-2](https://github.com/tomba-io/disposable-email-blocker-vue-2)           | ✅      |
| Vue 3      | [disposable-email-blocker-vue-3](https://github.com/tomba-io/disposable-email-blocker-vue-3)           | 🚧      |
| React      | [disposable-email-blocker-react](https://github.com/tomba-io/disposable-email-blocker-react)           | 🚧      |
| Joomla     |                                                                                                        | 🚧      |
| Drupal     |                                                                                                        | 🚧      |

## Development 👨‍💻

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

## Browsers support

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari-ios/safari-ios_48x48.png" alt="iOS Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>iOS Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/samsung-internet/samsung-internet_48x48.png" alt="Samsung" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Samsung | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Opera |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| IE11, Edge                                                                                                                                                                                                      | last 2 versions                                                                                                                                                                                                   | last 2 versions                                                                                                                                                                                               | last 2 versions                                                                                                                                                                                               | last 2 versions                                                                                                                                                                                                               | last 2 versions                                                                                                                                                                                                                     | last 2 versions                                                                                                                                                                                           |

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

<!-- Links: -->

[npm-image]: https://img.shields.io/npm/v/disposable-email-blocker
[npm-url]: https://npmjs.org/package/disposable-email-blocker
[npm-bundle-size-image]: https://img.shields.io/bundlephobia/min/disposable-email-blocker
[download-image]: https://img.shields.io/npm/dt/disposable-email-blocker
[download-url]: https://npmjs.org/package/disposable-email-blocker
