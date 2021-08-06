import PushNotification from 'react-native-push-notification';

 PushNotification.createChannel(
   {
     channelId: 'channel-id', // (required)
     channelName: 'My channel', // (required)
     channelDescription: 'A channel to categorise your notifications', // (optional) default: undefined.
     soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
     importance: 4, // (optional) default: 4. Int value of the Android notification importance
     vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
   },
   (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
 );
const configure = () => {
  PushNotification.configure({
   
   
   

    permissions: {
      alert: true,
      badge: true,
      sound: true,
    },

    popInitialNotification: true,
    requestPermissions: true,
  });
};

export { configure };
