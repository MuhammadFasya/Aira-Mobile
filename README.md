This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

# Getting Started

> **Note**: Make sure you have completed the [Set Up Your Environment](https://reactnative.dev/docs/set-up-your-environment) guide before proceeding.

## Step 1: Start Metro

First, you will need to run **Metro**, the JavaScript build tool for React Native.

To start the Metro dev server, run the following command from the root of your React Native project:

```sh
# Using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Build and run your app

With Metro running, open a new terminal window/pane from the root of your React Native project, and use one of the following commands to build and run your Android or iOS app:

### Android

```sh
# Using npm
npm run android

# OR using Yarn
yarn android
```

### iOS

For iOS, remember to install CocoaPods dependencies (this only needs to be run on first clone or after updating native deps).

The first time you create a new project, run the Ruby bundler to install CocoaPods itself:

```sh
bundle install
```

Then, and every time you update your native dependencies, run:

```sh
bundle exec pod install
```

For more information, please visit [CocoaPods Getting Started guide](https://guides.cocoapods.org/using/getting-started.html).

```sh
# Using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up correctly, you should see your new app running in the Android Emulator, iOS Simulator, or your connected device.

This is one way to run your app — you can also build it directly from Android Studio or Xcode.

## Important: run the Aira web backend first

This mobile app integrates with the Aira web backend for features such as user profiles, session history and generative responses. To use the mobile app end-to-end you should run the web/backend first.

1. Clone the Aira web repository :

```powershell
git clone https://github.com/MuhammadFasya/Aira.git
cd aira-web
```

2. Start the backend server:

```powershell
cd backend
# (optional) create and activate a virtual environment
python -m venv .venv
. .venv/Scripts/activate
pip install -r requirements.txt
python app.py
```

Take note of the backend URL (for example `http://localhost:5000`).

3. Configure mobile to reach the backend

- Update any client endpoints in `screens/Homescreen.tsx` to point to your backend URL. When running on the Android emulator use `http://10.0.2.2:5000` to reach a host machine's localhost.
- If you rely on the Netlify serverless proxy (`netlify/functions/generate.js`) make sure that it is configured (or that the web backend is reachable) because some features (history, user storage) depend on it.

4. Run the mobile app

```powershell
# from the mobile repo root
npm start
npm run android   # or npm run ios
```

Notes

- If you want to pick images from device gallery, install and rebuild with `react-native-image-picker`:

```powershell
npm install react-native-image-picker
npx pod-install   # iOS only
# Rebuild the app after new native deps
npm run android
npm run ios
```

## Step 3: Modify your app

Now that you have successfully run the app, let's make changes!

Open `App.tsx` in your text editor of choice and make some changes. When you save, your app will automatically update and reflect these changes — this is powered by [Fast Refresh](https://reactnative.dev/docs/fast-refresh).

When you want to forcefully reload, for example to reset the state of your app, you can perform a full reload:

- **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Dev Menu**, accessed via <kbd>Ctrl</kbd> + <kbd>M</kbd> (Windows/Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (macOS).
- **iOS**: Press <kbd>R</kbd> in iOS Simulator.

## Congratulations!

You've successfully run and modified your React Native App.

# Troubleshooting

If you're having issues getting the above steps to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

# Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.
