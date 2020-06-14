import React, {useState} from "react";
import { View, Text, StyleSheet, Alert, TouchableOpacity } from "react-native";
import { playSound } from "../apis/audio_api";
import SortableGridView from "react-native-sortable-gridview";
import { SimpleLineIcons } from '@expo/vector-icons';



function HomeScreen() {
  const [sounds, setSounds] = useState([
    { name: "Bark", backgroundColor: "#09f", color: "#fff" },
        { name: "Meow", backgroundColor: "#f60", color: "#fff" },
        { name: "Bleat", backgroundColor: "#333", color: "#fff" },
        {
          name: "Recording",
          backgroundColor: "#rgba(255, 216, 58, 1)",
          color: "#333",
        },
  ]);

  return (
    <View>
      <SortableGridView
      data={sounds}
      sensitivity={150} 
      onDragStart={() => {
        console.log("Default onDragStart");
      }}
      onDragRelease={(data) => {
        //console.log("Default onDragRelease", data);
        //setSounds(sounds);
      }}
      renderItem={(item, index) => {
        return (
          <View
            uniqueKey={item.name} // Important! Should add this props!!!
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
              let data = [...sounds];
              data.splice(index, 1);
              setSounds(data);
            }}
          >
            <SimpleLineIcons name="trash" size={24} color="gray" />
          </TouchableOpacity>
        )
      }}
    />
    </View>
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
  }
});

export default HomeScreen;
