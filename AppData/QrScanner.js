import React, { useContext, useState, useEffect } from "react";
import QRCodeScanner from "react-native-qrcode-scanner";
import { View, SafeAreaView, Text, Linking, Alert, ImageBackground, Image } from "react-native";
import { RNCamera } from "react-native-camera";
import * as CON from "../component/Constants";
import Background from "../Stylesheet/Background";
import base64 from "react-native-base64";
import axios from "axios";
import LinearGradient from "react-native-linear-gradient";

const QRScanner = ({}) => {
  const [userid, setUserid] = useState("");
  const [eventid, setEventid] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  var ifScaned = (e, navigation) => {
    console.warn(e);
    var response_data = JSON.parse(base64.decode(e.data));
    if (response_data.em !== "" || response_data.em !== undefined) {
      setEmail(response_data.em);
      setName(response_data.nm);
      let data = {
        "user_id": response_data.us,
        "event_id": response_data.ev,
      };
      axios.post(CON.URL + `/api/mark_attendance`, data)
        .then((res) => {
          setUserid(res.data);
          setEventid(res.data);
          console.log("gdjahdkjashfksjhfksjhfkshfskhkshfskhfskjhfkshf", res);
        }).catch((err) => {
          // alert("Scanning Failed");
          console.log(err);
        },
      );
    } else {
      alert("Failed due to scanner issue.");
      console.log("false");
    }
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Background>
        {userid ? (
          <>
            <View style={{ height: 180, width: "100%", backgroundColor: "#191919" }}>
              <LinearGradient colors={["#231F20", "#312A2C"]} style={{ marginTop: 20 }}>
                <View style={{ padding: 10, width: "100%", alignItems: "center", justifyContent: "center" }}>
                  <Image source={require("../Assets/NewLogo.png")}
                         style={{
                           height: 62,
                           width: 100,
                         }} />
                </View>
              </LinearGradient>
            </View>
            <View style={{
              height: 300,
              width: "90%",
              borderWidth: 1,
              borderColor: "#5d5d5d",
              marginLeft: "5%",
              marginRight: "5%",
              marginTop: 10,
              borderRadius: 25,
              backgroundColor: "rgba(0,0,0,0.4)",
            }}>

              <View style={{
                height: 50,
                width: 300,
                alignSelf: "center",
                marginTop: "25%",
                borderRadius: 30,
                borderColor: "#62788B",
                borderWidth: 1,
              }}>
                <Text style={{ margin: 15, color: "#fff" }}>{name} </Text>
              </View>

              <View style={{
                height: 50,
                width: 300,
                alignSelf: "center",
                marginTop: "10%",
                borderRadius: 30,
                borderColor: "#62788B",
                borderWidth: 1,
              }}>
                <Text style={{ margin: 15, color: "#fff" }}>{email}</Text>
              </View>

            </View>
          </>
        ) : (
          <>
            <QRCodeScanner
              onRead={ifScaned}
              flashMode={RNCamera.Constants.FlashMode.off}
              reactivate={true}
              permissionDialogMessage="Need Permission to access camera"
              reactivateTimeout={10}
              showMarker={true}
              cameraStyle={{ height: 300, width: "100%", justifyContent: "center", alignSelf: "center" }}
              cameraProps={{ autoFocus: "on" }}
              markerStyle={{ borderColor: "#890021", borderRadius: 10 }}
            />
          </>
        )}
      </Background>
    </SafeAreaView>
  );
};
export default QRScanner;
