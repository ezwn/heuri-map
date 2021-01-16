module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          alias: {
            "ezwn-ux-native": "./lib/ezwn-ux-native",
            "ezwn-storage-native": "./lib/ezwn-storage-native",
            "ezwn-react-app": "./lib/ezwn-react-app",
            "ezwn-react-app-ux-native": "./lib/ezwn-react-app-ux-native",
            features: "./features",
            shared: "./shared"
          }
        }
      ]
    ]
  };
};
