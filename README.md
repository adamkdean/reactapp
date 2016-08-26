### Installing react-native-camera

```bash
npm install react-native-camera@https://github.com/lwansbrough/react-native-camera.git --save
react-native link react-native-camera
```

### Linking libraries

https://facebook.github.io/react-native/docs/linking-libraries-ios.html

### CameraRoll

    {
        first: ..., // (required) The number of photos wanted in reverse order of the photo application
        after: ..., // A cursor returned from a previous call to 'getPhotos'
        groupTypes: ..., // Specifies which group types to filter the results to
                         // One of ['Album', 'All', 'Event', 'Faces', 'Library', 'PhotoStream', 'SavedPhotos'(default)]
        groupName: ..., // Specifies filter on group names, like 'Recent Photos' or custom album titles
        assetType: ... // Specifies filter on assetType
                       // One of ['All', 'Videos', 'Photos'(default)]
    }
