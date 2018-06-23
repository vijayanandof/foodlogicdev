This is an email and password authentication system built with Ionic and Firebase.

## How to use this template

Using your terminal navigate to the application folder (_it's right here where you're reading this file_), and install all the dependencies from npm.

```bash
$ cd firebase-email-auth/
$ npm install
```

Right there your app is ready to work, all you need to do this is go into the **app.component.ts** file and add your firebase credentials to the configuration object

```js
const config = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  storageBucket: "",
  messagingSenderId: ""
};
```

You can find those inside your Firebase Console: https://console.firebase.google.com.

Feel free to use mine to test things out if you want, but don't use it for anything serious, since I'm always cleaning out the app's data when I'm testing things.

The Starter offers:

* Login Page.
* Reset Password Page.
* Signup Page.

All of those functional and connected with an authentication provider.