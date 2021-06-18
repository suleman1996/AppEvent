import React, { useState, useContext, useEffect } from "react";
import { SafeAreaView, Text, View, Image, TextInput, TouchableOpacity, ScrollView } from "react-native";
import Background from "../Assets/Background";
import RNFetchBlob from "rn-fetch-blob";
import * as CON from "../component/Constants";
import { AuthContext } from "../config/AuthProvider";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login = ({ navigation }) => {
  const [userEmail, setUserEmail] = useState("admin@gmail.com");
  const [userPassword, setUserPassword] = useState("123456");
  const { login, appData } = useContext(AuthContext);

  AsyncStorage.getItem("USER_ID").then(res => {
    // console.log("000000000000000000000000",res);
  });

  const handleSubmitPress = async () => {
    if (!userEmail) {
      alert("Please fill email");
      return;
    }
    if (!userPassword) {
      alert("please fill Password");
      return;
    }

    let proceeding_data = [
      { name: "email", data: userEmail },
      { name: "password", data: userPassword },

    ];
    RNFetchBlob.fetch("POST", CON.URL + "/api/login", {
      "Content-Type": "application/json",
      "Accept": "application/json",
    }, proceeding_data)
      .then(res => {
        let usr = JSON.parse(res.data);
        if (usr.status === true) {
          login(usr, navigation);
        } else {
          alert("Login failed. Please try again later");
        }
      }).catch(error => {
      //
    });
  };
  return (
    <SafeAreaView>
      <Background>
        <View
          style={{
            height: "100%",
            width: "100%",
            opacity: 0.6,
            backgroundColor: "black",
          }}>
        </View>

        <View
          style={{
            // backgroundColor:'red',
            position: "absolute",
            flex: 1,
            width: "100%",
          }}>

          <Image source={require("../Assets/NewLogo.png")} style={{
            height: 135,
            alignSelf: "center",
            width: 210,
            marginLeft: "22%",
            marginRight: "22%",
            marginTop: 80,
          }} />

          <View
            style={{
              flexDirection: "row",
              alignSelf: "center",
            }}>
            <Text style={{
              color: "#fff",
              fontSize: 32,
              //paddingLeft: 50,
              paddingTop: 50,
            }}>
              Hello !
            </Text>

            <Text style={{
              color: "#62788B",
              // paddingLeft: 20,
              fontSize: 32,
              paddingTop: 50,
            }}> Login Here
            </Text>
          </View>

          <View
            style={{
              height: 200,
              width: 400,
              alignSelf: "center",
              // backgroundColor: "white",
            }}>
            <TextInput
              placeholder="     Email"
              placeholderTextColor="white"
              onChangeText={userEmail => setUserEmail(userEmail)}
              value={userEmail}
              style={{
                borderBottomWidth: 1,
                height: 50,
                color: "#fff",
                width: "70%",
                alignSelf: "center",
                marginTop: 30,
                borderColor: "#989292",
              }} />

            <TextInput
              placeholder="  Password"
              secureTextEntry={true}
              placeholderTextColor="white"
              onChangeText={userPassword => setUserPassword(userPassword)}
              value={userPassword}
              style={{
                borderBottomWidth: 1,
                height: 50,
                width: "70%",
                color: "#fff",
                alignSelf: "center",
                marginTop: 30,
                borderColor: "#989292",
              }} />
          </View>

          <TouchableOpacity onPress={() => {
            handleSubmitPress();
          }}>
            <View style={{
              marginLeft: "10%",
              height: 50,
              width: "80%",
              marginTop: 20,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 30,
              backgroundColor: "#62788B",
            }}>
              <Text style={{ color: "white" }}>Login</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <View
              style={{
                marginLeft: "10%",
                height: 50,
                width: "80%",
                marginTop: 20,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 30,
                backgroundColor: "#62788B",
              }}>
              <Text style={{ color: "white" }}>Register</Text>
            </View>
          </TouchableOpacity>

        </View>
      </Background>
    </SafeAreaView>
  );
  // }
};
export default Login;
