const prodConfig = {
    apiKey: "AIzaSyDm2zfZS1UaZ0yq-DJqGfnLSHnfTVh8uKM",
    authDomain: "momnpophub-test.firebaseapp.com",
    databaseURL: "https://momnpophub-test.firebaseio.com",
    projectId: "momnpophub-test",
    storageBucket: "momnpophub-test.appspot.com",
    messagingSenderId: "866510338071",
    appId: "1:866510338071:web:2a9910e33ef7c38e"
};

const devConfig = {
    apiKey: "AIzaSyDm2zfZS1UaZ0yq-DJqGfnLSHnfTVh8uKM",
    authDomain: "momnpophub-test.firebaseapp.com",
    databaseURL: "https://momnpophub-test.firebaseio.com",
    projectId: "momnpophub-test",
    storageBucket: "momnpophub-test.appspot.com",
    messagingSenderId: "866510338071",
    appId: "1:866510338071:web:2a9910e33ef7c38e"
};

const config = process.env.NODE_ENV === 'production' ? prodConfig : devConfig;

export default config;
