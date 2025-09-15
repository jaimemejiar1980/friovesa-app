# Fríovesa mobile 🛒

<p align="center">
  <img src="src/assets/images/logo.png" alt="Logo">
</p>

<div style="display: flex; justify-content: center; align-items: center; gap: 20px;">
  <a href="https://play.google.com/store/apps/details?id=com.friovesa.store&amp;pcampaignid=web_share" target="_blank">
    <img alt="Google Play" src="https://friovesa.com/wp-content/uploads/2023/12/google-paly-badge.webp" style="width: 150px;">
  </a>

  <a href="https://apps.apple.com/ec/app/friovesa/id1639810429" target="_blank">
    <img alt="App Store" src="https://friovesa.com/wp-content/uploads/2024/02/apple.png" style="width: 150px;">
  </a>
</div>

## Technologies Used

- React Native
- Expo
- React Query
- NativeWind

## Getting Started

To start the project, first install the dependencies with:

```sh
npm install
```

Then, you can start the project with:

```sh
npm start
```

You can also start the project specifically for Android or iOS with npm run android or npm run ios respectively.

## Scripts

- `start`: Starts the Expo development server to connect with Expo Go App.
- `android`: Starts the Expo development server and opens the app on a connected Android device/emulator.
- `ios`: Starts the Expo development server and opens the app on a connected iOS device/emulator.

## License

This project is private and not licensed for public use.

## Contribution

To ensure a clean development cycle and consistency this project use the following conventions.

⚠️ **Log the changes in [changelog.md](changelog.md) is a must.**

### Branch Naming Conventions

We use a structured branch naming system to clearly identify the purpose of each branch. Please adhere to the following naming conventions based on the type of changes you are making:

| **Prefix**   | **Description**                                            | **Example**                                |
|--------------|------------------------------------------------------------|--------------------------------------------|
| `feature/`   | For new features or functionalities                        | `feature/add-search-functionality`         |
| `fix/`       | For bug fixes or error corrections                         | `fix/issue-567-invalid-email-format`       |
| `hotfix/`    | For urgent critical fixes in production                    | `hotfix/security-patch`                    |
| `chore/`     | For maintenance tasks or minor improvements                | `chore/remove-unused-dependencies`         |
| `release/`   | For preparing specific project releases                    | `release/v2.1.0`                           |
| `test/`      | For branches dedicated to testing or experimentation       | `test/new-api-integration`                 |
| `refactor/`  | For refactoring code without adding new functionality      | `refactor/improve-login-component`         |
| `docs/`      | For changes or updates in the documentation                | `docs/improve-api-documentation`           |
