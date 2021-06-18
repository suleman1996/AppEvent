import React, { useState, useEffect, useContext } from "react";
import { Text, View, Image, FlatList, ActivityIndicator, TouchableOpacity, SafeAreaView }
  from "react-native";
import Background from "../Assets/Background";
import LinearGradient from "react-native-linear-gradient";
import SmallTextGrid from "./SmallTextGrid";
import * as CON from "../component/Constants";
import { AuthContext } from "../config/AuthProvider";

const URL = CON.URL + "/api/get-all-events";

export const ViewEvent = ({ navigation, item }) => {
  const { user, appData } = useContext(AuthContext);
  const [isLoading, setLoading] = useState(true);
  const [data, setdata] = useState([]);

  useEffect(() => {
    fetch(URL)
      .then((response) => response.json())
      .then((json) => {
        setdata(json.data);
      })
      .catch((error) => {
        // NOTHING
      })
      .finally(setLoading(false));
  }, []);

  return (
    <SafeAreaView>
      <Background>
        <View style={{ height: 200, width: "100%", backgroundColor: "#191919" }}>
          <LinearGradient colors={["#231F20", "#312A2C"]} style={{ marginTop: 20 }}>
            <View style={{
              flexDirection: "row",
              padding: 10,
            }}>
              <View style={{ flex: 1, alignItems: "center" }}>
                <Image source={require("../Assets/NewLogo.png")}
                       style={{
                         height: 62,
                         width: 100,

                       }} />
              </View>

              {user.role == "admin" ? (
                <TouchableOpacity style={{ alignItems: "flex-end", justifyContent: "center", marginRight: 5 }}
                                  onPress={() => navigation.navigate("QrScanner")}>
                  <Image
                    style={{
                      height: 40,
                      width: 40,
                    }}
                    source={require("../Assets/qrcode.png")} />
                </TouchableOpacity>
              ) : null}

            </View>
          </LinearGradient>

          <View style={{ height: 25, margin: 30 }}>
            <Text
              style={{
                color: "#F8F8F8",
                fontSize: 20,
              }}>PLAN IT OUT </Text>
            <Text style={{ fontSize: 15, color: "#F8F8F8" }}>
              ALL EVENT
            </Text>
          </View>
        </View>

        {isLoading ? (<ActivityIndicator size="large" color="black" />
        ) : (
          <View
            style={{
              height: "64%",
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}>

            <FlatList
              data={data}
              style={{ width: "100%" }}
              keyExtractor={({ id }, index) => index}
              renderItem={({ item }) => (

                <TouchableOpacity
                  style={{
                    marginVertical: 5,
                    backgroundColor: "rgba(0,0,0,0.4)",
                    borderWidth: 1,
                    borderColor: "#5d5d5d",
                    margin: 10,
                    borderRadius: 5,
                  }}
                  onPress={() => navigation.navigate("EventDetails", {
                    item: item,
                  })}>

                  <View
                    style={{
                      backgroundColor: "#5d5d5d",
                      width: "94%",
                      margin: "3%",
                      flex: 1,
                      height: 300,
                    }}>

                    <Image
                      style={{
                        width: "100%",
                        height: "100%",
                      }}
                      source={{ uri: item.image }} />

                    <LinearGradient colors={["#000",
                      "#b1b0b0",
                      "transparent"]}
                                    start={{ x: 0, y: 1 }}
                                    end={{ x: 1, y: 1 }}
                                    style={{
                                      height: 45,
                                      width: "100%",
                                      opacity: 0.8,
                                      position: "absolute",
                                      bottom: 0,
                                      zIndex: 100,
                                    }}>
                      <Text style={{
                        color: "#fff",
                        paddingLeft: 15,
                        paddingTop: "3%",
                        fontSize: 18,
                      }}>{item.short_description}</Text>
                    </LinearGradient>
                  </View>

                  <SmallTextGrid icon="title" title={item.title} />
                  <SmallTextGrid icon="location" title={item.venue} />
                  <SmallTextGrid icon="dresscode" title={item.event_dress} />
                  <SmallTextGrid icon="time" title={item.start_time} />
                </TouchableOpacity>
              )} />
          </View>
        )}
      </Background>
    </SafeAreaView>
  );
};
