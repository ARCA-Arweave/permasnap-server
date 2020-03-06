# Permasnap

## Server

To Start : 

From /server : `npm run start-dev`

don't @ me yo ;)

## Client

#### Prerequisites:
- Android: install latest Android Studio
- iOS: macBook+iPhone only, instructions to follow, but basically install Xcode
- Ensure ionic-cli installed: `npm install -g @ionic/cli`

`cd permasnap-client`

`npm install`

To start in the browser without mobile: -- (this will probably not work very well)

`ionic serve`

For mobile development:

`npm run build`

`ionic cap run android -l --host=your-dev-machines-ip-address`

or

`ionic cap run ios -l --host=your-dev-machines-ip-address`
