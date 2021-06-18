import React, { useContext } from "react";
import {
  Text,
  View,
  SafeAreaView,
  ImageBackground,
  TouchableOpacity,
  Image,
  useWindowDimensions,
  ScrollView,
  Dimensions,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Background from "../Stylesheet/Background";
import SmallTextGrid from "./SmallTextGrid";
import HTML from "react-native-render-html";
import { AuthContext } from "../config/AuthProvider";

const eventdetail = ({ navigation, route }) => {
  const contentWidth = useWindowDimensions().width;

  let item = route.params.item;
  const { user } = useContext(AuthContext);
  console.log("000000000000000000000000000000", user.id);
  // user.role = "user";
  const userValidation = () => {
    if (user == "") {
      navigation.navigate("Login");
    } else {
      if (user.role == "user") {
        navigation.navigate("QrCode", {
            event: item,
          },
        );
      }
    }
  };
  return (
    <SafeAreaView>
      <Background style={{ width: "100%", backgroundColor: "blue" }}>
        <View style={{ height: 100, width: "100%", backgroundColor: "#191919" }}>
          <LinearGradient colors={["#231F20", "#312A2C"]} style={{ marginTop: 20 }}>

            <View style={{ padding: 10, flexDirection: "row" }}>
              <View style={{ flex: 1, alignItems: "center" }}>
                <Image source={require("../Assets/NewLogo.png")}
                       style={{
                         height: 62,
                         width: 100,
                       }} />
              </View>

              {user.role == "admin" ? (
                  <></>
                ) :
                <TouchableOpacity
                  style={{ alignItems: "flex-end", justifyContent: "center" }} onPress={() => {
                  userValidation();
                }}>
                  <Text
                    style={{
                      color: "#fff",
                      fontSize: 20,
                    }}>JOIN</Text>
                </TouchableOpacity>
              }
            </View>

          </LinearGradient>
        </View>

        <ScrollView style={{
          marginVertical: 5,
          backgroundColor: "rgba(0,0,0,0.4)",
          borderWidth: 1,
          borderColor: "#5d5d5d",
          margin: 10,
          flex: 1,
          padding: 10,
          borderRadius: 5,
          height: Dimensions.get("window").height - 200,
          marginBottom: 100,
        }}>
          <Image source={{ uri: item.image }} style={{ height: 200 }} />
          <View>

            <View style={{ width: "100%", backgroundColor: "#191919" }}>
              <Text style={{
                fontSize: 24,
                paddingLeft: 40,
                paddingTop: 10,
                color: "#FEFEFE",
              }}
              >
                {item.title}
              </Text>
            </View>

            <View
              style={{
                backgroundColor: "#191919",
                height: 75,
                width: "100%",
              }}>
              <SmallTextGrid icon="title" title={item.speaker_name} />
              <SmallTextGrid icon="theme" title={item.event_theme} />
              <SmallTextGrid icon="location" title={item.venue} />

            </View>
          </View>

          <View
            style={{
              flex: 1,
              marginBottom: 30,
              backgroundColor: "rgba(0,0,0,0.1)",
              width: "95%",
              marginLeft: "2%",
              marginRight: "3%",
              marginTop: 5,
            }}>
            {/*<HTML source={{ html: item.description }} contentWidth={contentWidth} />*/}
            <Text style={{ color: "#fff", textAlign: "justify" }}>{item.description}</Text>
          </View>
        </ScrollView>

        <View style={{
          backgroundColor: "#fff5",
          borderTopLeftRadius: 38,
          borderTopRightRadius: 38,
          bottom: 0,
          position: "absolute",
          height: 55,
          elevation: 0,
          width: "100%",
        }}>

          {user.role == "admin" ? (
              <></>
            ) :
            <TouchableOpacity
              onPress={() => {
                userValidation();
              }}>
              <ImageBackground source={require("../Assets/Qr.png")}
                               style={{
                                 marginTop: -45,
                                 height: 95,
                                 width: 95,
                                 alignSelf: "center",
                               }}>
              </ImageBackground>
            </TouchableOpacity>
          }
        </View>

      </Background>
    </SafeAreaView>
  );
};
export default eventdetail;
