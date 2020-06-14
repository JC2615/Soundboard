import { Audio } from "expo-av";

const soundObject = new Audio.Sound();

export async function playSound(soundName) {
  await soundObject.unloadAsync();
      try {
        await soundObject.loadAsync(require("../../assets/bark.mp3"));
        await soundObject.playAsync();
        // Your sound is playing!
      } catch (error) {
        // An error occurred!
        await soundObject.playAsync();
      }
}
