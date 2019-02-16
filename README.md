# React Native In-App Browser

[![npm (scoped)][npm_shield]][npm] [![CircleCI][circleci_shield]][circleci] [![Code Climate Maintainability][codeclimate_main_shield]][codeclimate_main] [![Code Climate Test Coverage][codeclimate_cov_shield]][codeclimate_cov] ![license: mit][license_shield]

In-App browser support for React Native, using [Chrome Custom Tabs][chromecustomtabs]
on Android
and [Safari View Controller][sfsafariviewcontroller] on iOS.

### Features

- [x] Typescript and Flow definitions
- [x] Actively developed

## Compatibility

This library will always target the most recent React Native package. If you are
using an older release of React Native, use the correct version of this library
from the compatibility table below (if available):

|  React Native   | Library |
| :-------------: | :-----: |
| 0.57.0 - 0.59.x | latest  |

## Installation

Install the package via Yarn or npm:

```
yarn add @matt-block/react-native-in-app-browser

// or

npm install --save @matt-block/react-native-in-app-browser
```

Proceed to link the native module to your project:

```
react-native link @matt-block/react-native-in-app-browser
```

### Note for iOS projects

In order for Xcode projects to build when using Swift-based libraries, your
main app project must contain Swift code and a bridging header. If your app
project does not contain any Swift code, add a single empty `.swift` file and an
empty bridging header to your app.

If your Xcode project already makes use of Swift code you can safely ignore this
note.

## Usage

> ⚠️ Some functions have been deprecated in favor of an object-wrapping approach
> to expose functionalities (see rationale [here](https://github.com/matt-block/react-native-in-app-browser/issues/19)).
> Update your projects to use the new preferred
> approach showcased in this section and check the [Deprecated Features](#deprecated-features) section
> for migration details.

```javascript
import { InAppBrowser } from "@matt-block/react-native-in-app-browser";


// Minimal setup.
InAppBrowser.open("https://www.wikipedia.org/").catch(error => {
  console.log(error);
});


// With platform-specific optional settings.
InAppBrowser.open("https://www.wikipedia.org/", {
  android: {
    //...,
  },
  ios: {
    //...,
  },
}).catch(error => {
  console.log(error);
});


// Using async/await.
async onClickHandler() {
  try {
    await InAppBrowser.open("https://www.wikipedia.org/");
  } catch (error) {
    console.log(error);
  }
}
```

### Programmatically close (iOS only)

It is possible to manually dismiss the iOS in-app instance by calling the method `close`.

```javascript
import { InAppBrowser } from "@matt-block/react-native-in-app-browser";

InAppBrowser.close();
```

This is not possible on Android since Chrome Custom Tabs do not expose such functionality and [Activity workarounds][customtabsmanualclose] would bring this package way out of scope.

## Settings

The main method `open` accepts an object with settings objects for each
platform:

```javascript
import { InAppBrowser } from "@matt-block/react-native-in-app-browser";

InAppBrowser.open("https://www.wikipedia.org/", {
  android: {},
  ios: {}
});
```

Settings can also be initialized separately with `configure` so that each `open` call won't need to specify them each time:

```javascript
import { InAppBrowser } from "@matt-block/react-native-in-app-browser";

// Somewhere in your app initialization logic.
InAppBrowser.configure({
  android: {},
  ios: {}
});

// Other part of your code base.
// Previously initialized settings will apply.
InAppBrowser.open("https://www.wikipedia.org/");
```

Note that `open` will still accept settings as always but will effectively perform a merge between the initialized properties and the provided settings object (which will have priority over the initialized properties):

```javascript
import { InAppBrowser } from "@matt-block/react-native-in-app-browser";

// Somewhere in your app initialization logic.
InAppBrowser.configure({
  android: {
    toolbarColor: "red",
    showTitle: true
  }
});

// Other part of your code base.
// Merged settings for this call will result in:
//
// - toolbarColor: "blue",
// - showTitle: true
InAppBrowser.open("https://www.wikipedia.org/", {
  android: {
    toolbarColor: "blue"
  }
});
```

The properties for each platform settings are described below.

### Android

Each setting is optional. Furthermore, settings with invalid values will be
ignored and their default values will be used.

| Setting               | Type                                                | Default     | Description                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| --------------------- | --------------------------------------------------- | ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `toolbarColor`        | `string`                                            | `undefined` | The color to tint the background of the toolbar.<br/><br/>Provided color can be in a hexadecimal format: <br/><ul><li>#RRGGBB</li><li>#RGB</li><li>#AARRGGBB</li><li>#ARGB</ul>The following names are also accepted: `red`, `blue`, `green`, `black`, `white`, `gray`, `cyan`, `magenta`, `yellow`, `lightgray`, `darkgray`, `grey`, `lightgrey`, `darkgrey`, `aqua`, `fuchsia`, `lime`, `maroon`, `navy`, `olive`, `purple`, `silver`, and `teal`. |
| `showTitle`           | `boolean`                                           | `false`     | Flag to toggle if the page title should be shown in the custom tab.                                                                                                                                                                                                                                                                                                                                                                                  |
| `closeButtonIcon`     | `string` _(as resolved by importing an image file)_ | `undefined` | Custom close button icon.<br/><br/>Provided icon must be a `.png`, `.jpg`, or `.gif` file.                                                                                                                                                                                                                                                                                                                                                           |
| `addDefaultShareMenu` | `boolean`                                           | `false`     | Flag to toggle the default share menu.                                                                                                                                                                                                                                                                                                                                                                                                               |

### iOS

Each setting is optional. Furthermore, settings with invalid values will be
ignored and their default values will be used. Also, settings that are not
supported by the iOS version at runtime will be ignored as well.

| Setting                     | Type      | Default     | Description                                                                                                                                                                                                                               |
| --------------------------- | --------- | ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `preferredBarTintColor`     | `string`  | `undefined` | The color to tint the background of the navigation bar and the toolbar.<br/><br/>Provided color can be in a hexadecimal format: <br/><ul><li>#RRGGBB</li><li>#RGB</li><li>#AARRGGBB</li><li>#ARGB</ul>**Available on**: iOS >= 10.0.      |
| `preferredControlTintColor` | `string`  | `undefined` | The color to tint the control buttons on the navigation bar and the toolbar.<br/><br/>Provided color can be in a hexadecimal format: <br/><ul><li>#RRGGBB</li><li>#RGB</li><li>#AARRGGBB</li><li>#ARGB</ul>**Available on**: iOS >= 10.0. |
| `barCollapsingEnabled`      | `boolean` | `true`      | **Available on**: iOS >= 11.0.                                                                                                                                                                                                            |

## Deprecated features

Some functions have been deprecated and will be removed in version `2.0.0` which
is scheduled for release on June 1st 2019. You can check the rationale behind
these braking changes [here](https://github.com/matt-block/react-native-in-app-browser/issues/19).

The affected features are:

- `openInApp`
- `initialize`
- `closeInAppInstance`

Below are migration paths for the deprecated features.

### openInApp

This function is now exposed as the method `open` of the object `InAppBrowser`.
Both functions share the same signature.

```javascript
import openInApp, {
  InAppBrowser
} from "@matt-block/react-native-in-app-browser";

// New usage.
InAppBrowser.open("https://www.wikipedia.org/").catch(error => {
  console.log(error);
});

// Deprecated.
openInApp("https://www.wikipedia.org/").catch(error => {
  console.log(error);
});
```

### initialize

This function is now exposed as the method `configure` of the object `InAppBrowser`.
Both functions share the same signature.

```javascript
import {
  initialize,
  InAppBrowser
} from "@matt-block/react-native-in-app-browser";

// New usage.
InAppBrowser.configure({
  android: {
    toolbarColor: "red",
    showTitle: true
  }
});

// Deprecated.
initialize({
  android: {
    toolbarColor: "red",
    showTitle: true
  }
});
```

### closeInAppInstance

This function is now exposed as the method `close` of the object `InAppBrowser`.
Both functions share the same signature.

```javascript
import {
  closeInAppInstance,
  InAppBrowser
} from "@matt-block/react-native-in-app-browser";

// New usage.
InAppBrowser.close();

// Deprecated.
closeInAppInstance();
```

## License

Copyright (c) 2018-present Matei Bogdan Radu.

This source code is licensed under the MIT license found in the
[LICENSE][license] file in the root directory of this source tree.

<!-- Sources -->

[chromecustomtabs]: https://developer.chrome.com/multidevice/android/customtabs
[customtabsmanualclose]: https://stackoverflow.com/a/41596629/1887860
[sfsafariviewcontroller]: https://developer.apple.com/documentation/safariservices/sfsafariviewcontroller
[license]: https://github.com/matt-block/react-native-in-app-browser/blob/master/LICENSE
[license_shield]: https://img.shields.io/badge/license-MIT-blue.svg
[prettier_shield]: https://img.shields.io/badge/code_style-prettier-ff69b4.svg
[prettier]: https://github.com/prettier/prettier
[npm]: https://www.npmjs.com/package/@matt-block/react-native-in-app-browser
[npm_shield]: https://img.shields.io/npm/v/@matt-block/react-native-in-app-browser.svg
[circleci]: https://circleci.com/gh/matt-block/react-native-in-app-browser/tree/master
[circleci_shield]: https://circleci.com/gh/matt-block/react-native-in-app-browser/tree/master.svg?style=shield
[codeclimate_main]: https://codeclimate.com/github/matt-block/react-native-in-app-browser/maintainability
[codeclimate_main_shield]: https://img.shields.io/codeclimate/maintainability/matt-block/react-native-in-app-browser.svg
[codeclimate_cov]: https://codeclimate.com/github/matt-block/react-native-in-app-browser/test_coverage
[codeclimate_cov_shield]: https://img.shields.io/codeclimate/coverage/matt-block/react-native-in-app-browser.svg
