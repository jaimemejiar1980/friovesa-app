# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [4.5.6] 2025-02-15

### Changed

- Improved invalid username error message for clarity.
- Disabled auto-capitalization for email and username fields on the Sign-Up screen.

## [4.5.5] 2025-02-11

### Added

- Link to password reset web page.

## [4.5.4] 2025-01-20

### Added

- App Availability Screen.

### Changed

- WooCommerce Consumer Key and Consumer Secret.

## [4.5.3] 2025-01-15

### Changed

- WooCommerce Consumer Key and Consumer Secret.

## [4.5.2] 2025-01-14

### Changed

- WooCommerce Consumer Key and Consumer Secret.

## [4.5.1] 2025-01-02

### Added

- Privacy Policy Screen.

## [4.5.0] 2024-12-30

### Added

- App version notification screen.
- App version notification modal.

## [4.4.0] 2024-12-16

### Added

- Search products by city.
- Bundle products to handle `woosb` product type of WooCommerce (This is for [WPC Product Bundles for WooCommerce
  ](https://es-ec.wordpress.org/plugins/woo-product-bundle/)).

### Changed

- Include bundles of the product in the cart (concat).

### Removed

- Minimum products purchasing quantity.

## [4.3.1] 2024-11-27

### Changed

- Product Cart Controls restyle.

## [4.3.0] 2024-11-27

### Added

- Use access and refresh token in private request (requires login).
- Product variations selection in product details screen.
- Go back in orders history and product details screen.

## [4.2.0] 2024-10-27

### Added

- Credit Card payment method based on payment request (fulfilled payment link).
- New screen to show payment request via webview.

### Changed

- Order body format to create a new order.
- Order creation response to handle payment info.

## [4.1.0] - 2024-09-18

### Added

- Google Sign In using expo-auth-session.
- Apple Sign In using expo-apple-authentication.

### Changed

- Update login screen to a modern style.
- Login structure to handle future login methods and google sign in.
- Reduce padding of TouchableCity component to make city icon bigger and reduce the height of the touchable.
- Restyle the AppHeader component using react-native-safe-area-context SafeAreaView for Android devices only and SafeAreaView from react native for IOS devices. Also, the component's height was reduced.
- Add an optional title property to the AppLoadingScreen component, this title is displayed below the app icon when provided.
- Add platform based shadow with ShadowView component.
- API endpoints of Friovesa-Mobile-API plugin.

### Removed

- Unused LoadingScreen component.

## [4.0.2] - 2024-08-26

### Added

- Fix home carousel using react-native-pager-view and the new carousel endpoint from friovesa-mobile-api (WordPress plugin).

## [4.0.1] - 2024-08-05

### Added

- Delete account feature
- IOS NSUserTrackingUsageDescription using expo-tracking-transparency plugin

## [4.0.0] - 2024-07-29

### Added

- Sign in with username/email password.
- Access to categories by city.
- Access to products by categories.
- Add products to cart.
- Orders history.
- Product details screen.
- Payment with direct bank transfer

### Fixed

- Issues with the previous versions caused by app template used.

### Changed

- All the projects, new project develop from scratch.

### Removed

- Previous project
