import React, {useState} from "react";
import { View, Text, StyleSheet, Alert, TouchableOpacity, ScrollView} from "react-native";
import { playSound } from "../apis/audio_api";
import SortableGridView from "react-native-sortable-gridview";
import { SimpleLineIcons } from '@expo/vector-icons';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

function chooseName(nameList, state) {
  let namesUsed = [];
  for (const soundObject in state) {
    namesUsed.push(state[soundObject].name);
  }
  let randomElement = nameList[Math.floor(Math.random() * nameList.length)];
  while(namesUsed.includes(randomElement)){
    randomElement = nameList[Math.floor(Math.random() * nameList.length)];
  }
  return randomElement;
}

function HomeScreen() {
  const [sounds, setSounds] = useState([]);
  let lockData = [];
  const soundNames = ["Bark", "Meow", "Bleat", "Chirp", "Blub", "Neigh", "Buzz", "Croak", "Hiss", "Moo"];
  if (sounds.length < 10) {
    lockData.push({
      name: 'Add box',
    })
  }
  return (
    <ScrollView>
      <SortableGridView
      data={sounds}
      lockData={lockData}
      aspectRatio={1}
      sensitivity={150} 
      selectAnimation="shake"
      numPerRow={2}
      onDragStart={() => {}}
      onDragRelease={(data) => {setSounds(sounds)}}
      renderItem={(item, index) => {
        return (
          <View
            uniqueKey={item.backgroundColor} // Important! Should add this props!!!
            onTap={() => playSound(item.name.toLowerCase())}
            style={[styles.item, { backgroundColor: item.backgroundColor }]}
          >
            <Text style={[styles.text, { color: item.color }]}>
              {item.name}
            </Text>
          </View>
        );
      }}

      itemCoverStyle={{marginTop: 5, marginLeft: 5}}
      renderItemCover={(item, index) => {
        return (
          <TouchableOpacity
            style={styles.cover}
            onPress={() => {
              Alert.alert(
                "Delete Sound",
                "Tap Delete to delete this sound",
                [
                  {text: "Cancel"},
                  {text: "Delete", onPress: () => {
                    let data = [...sounds];
              data.splice(index, 1);
              setSounds(data);
                  } },
                ]
              )
              
            }}
          >
            <SimpleLineIcons name="trash" size={24} color="gray" />
          </TouchableOpacity>
        )
      }}

      renderLockItem={(item, index) => {
        return (
          <View
            uniqueKey={index}
            style={styles.lockItem}
            onTap={() => {
              Alert.alert(
                "Add Sound",
                "Tap OK to add a new sound",
                [
                  {text: "Cancel"},
                  {text: "OK", onPress: () => {
                    let data = [...sounds];
              const randomColor = `#rgba(${Math.round(Math.random() * 255)}, ${Math.round(Math.random() * 255)}, ${Math.round(Math.random() * 255)}, 1)`;
              const name = chooseName(soundNames, sounds);
              data.push({
                name,
                backgroundColor: randomColor,
                color: '#fff'
              });
              setSounds(data);
                  }}
                ]
              )
            }}
          >
            <Text>{item.name} +</Text>
          </View>
        )
      }}
    />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  item: {
    flex: 1,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  cover: {
    backgroundColor: "transparent",
  },
  lockItem: {
    flex: 1,
    backgroundColor: "gray",
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
  }
});

export default HomeScreen;
