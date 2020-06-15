import { Audio } from "expo-av";

const soundObject = new Audio.Sound();

const bark = require("../../assets/bark.mp3");
const bleat = require("../../assets/bleat.mp3");
const buzz = require("../../assets/buzz.mp3");
const meow = require("../../assets/meow.mp3");
const neigh = require("../../assets/neigh.mp3");
const moo = require("../../assets/moo.mp3");
const croak = require("../../assets/croak.mp3");
const chirp = require("../../assets/chirp.mp3");
const blub = require("../../assets/blub.mp3");
const hiss = require("../../assets/hiss.mp3");

export async function playSound(soundName) {
  await soundObject.unloadAsync();
  try {
    switch (soundName) {
      case "bark":
        await soundObject.loadAsync(bark);
        break;

      case "bleat":
        await soundObject.loadAsync(bleat);
        break;

      case "blub":
        await soundObject.loadAsync(blub);
        break;

      case "buzz":
        await soundObject.loadAsync(buzz);
        break;

      case "chirp":
        await soundObject.loadAsync(chirp);
        break;

      case "croak":
        await soundObject.loadAsync(croak);
        break;

      case "hiss":
        await soundObject.loadAsync(hiss);
        break;

      case "meow":
        await soundObject.loadAsync(meow);
        break;

      case "moo":
        await soundObject.loadAsync(moo);
        break;

      case "neigh":
        await soundObject.loadAsync(neigh);
        break;

      default:
        break;
    }
    await soundObject.playAsync();
    // Your sound is playing!
  } catch (error) {
    // An error occurred!
    await soundObject.playAsync();
  }
}
