import React, { Component } from "react";
import axios from 'axios'
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Platform,
  TouchableOpacity,
  ImageBackground,
  Image,
} from "react-native";

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listData: [],
      imagePath: "",
      url: "https://486f-2804-d55-5866-a600-cd2b-b45c-ee02-ed42.sa.ngrok.io",
    };
  }

  componentDidMount() {
    //chame a função getPlanets aqui para que os dados sejam buscados assim que a tela for montada
    this.getPlanets()
  }

  getPlanets = () => {
    //escreva o código para buscar os dados do planeta da API
    const {url} = this.state
    axios
      .get(url)
      .then(response=>{
        this.setState({
          listData:response.data.data
        })
      })
      .catch(error=>{
        Alert.alert(error.message)
      })
  };



  /*esta função irá determinar o estado imagePath dependendo do planetType*/
  setDetails = (planetDetails) => {
    const planetType = planetDetails.planet_type;
    let imagePath = "";
    switch (planetType) {
      case "Gas Giant":
        imagePath = require("../assets/Gas_Giant.png");
        break;
      case "Terrestrial":
        imagePath = require("../assets/Terrestrial.png");
        break;
      case "Super Earth":
        imagePath = require("../assets/Super_Earth.png");
        break;
      case "Neptune Like":
        imagePath = require("../assets/Neptune-like.png");
        break;
      default:
        imagePath = require("../assets/Gas_Giant.png");
    }

    this.setState({
      details: planetDetails,
      imagePath: imagePath,
    });
  };

  /*esta função será usada na flatlist. Você precisa completar esta função observando os dados*/
  renderItem = ({ item, index }) => {
    this.setDetails(item);
    return (
      <TouchableOpacity
        style={[
          styles.listItem,
          { backgroundColor: this.selectColor(index), opacity: 0.7 },
        ]}
        onPress = {()=>{
          this.props.navigation.navigate("Details",{planet_name: item.name})
        }} 

      >
        <Image
          source={this.state.imagePath}
          style={styles.cardImage}
        ></Image>

        <View style={styles.nameCardPlanet}>
          <Text style={styles.title}> 
          {item.name}
          
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  /*esta função será usada na flatlist*/
  keyExtractor = (item, index) => index.toString();

  /*esta função irá ajudar a selecionar uma cor para os cartões na flatlist*/
  selectColor = (index) => {
    var color = ["#fbffd5", "#ffefff", "#ede5ff", "#eafff4"];
    var num = index % 4;
    return color[num];
  };

  render() {
    const { listData } = this.state;

    if (listData.length != 0) {
      return (
        <View style={styles.container}>
          <SafeAreaView
            style={{
              marginTop:
                Platform.OS === "android" ? StatusBar.currentHeight : 0,
            }}
          />
          <ImageBackground
            source={require("../assets/bg.png")}
            style={{ flex: 1, paddingTop: 20 }}
          >
            <View style={styles.upperContainer}>
              <Text style={styles.headerText}>Mundo dos Planetas</Text>
            </View>
            <View style={styles.lowerContainer}>
            {/* crie uma Xflatlist abaixo que exibirá a lista completa dos planetas que buscamos na API*/}
            <FlatList
            keyExtractor = {this.keyExtractor}
            data = {this.state.listData}
            renderItem = {this.renderItem}
            /> 



            </View>
          </ImageBackground>
        </View>
      );
    } else {
      return (
        <ImageBackground
          source={require("../assets/bg.png")}
          style={{ flex: 1, paddingTop: 20 }}
        >
          <View
            style={{ alignItems: "center", justifyContent: "center", flex: 1 }}
          >
            <Text style={styles.headerText}>Carregando...</Text>
          </View>
        </ImageBackground>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  upperContainer: {
    flex: 0.1,
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
    fontFamily: "monospace",
  },
  lowerContainer: {
    flex: 0.9,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyContainerText: {
    fontSize: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
    fontFamily: "monospace",
    textAlign: "center",
  },
  listContainer: {
    backgroundColor: "#eeecda",
  },
  listItem: {
    padding: 15,
    margin: "2.5%",
    width: "45%",
    height: 200,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "white",
  },
  cardImage:{
    width: 100,
    height: 100,
    paddingTop: 5,
    alignSelf: "center",
    alignItems: "center",
  },
  nameCardPlanet:{
    marginTop: 10,
    backgroundColor: "white",
    borderRadius: 5,
    width: "80%",
    alignItems: "center",
    alignSelf: "center",
  }
});
