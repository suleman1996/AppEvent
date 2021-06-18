import React, { useState, useContext } from "react";
import { SafeAreaView, Text, View, ImageBackground, Image, TextInput, TouchableOpacity, ScrollView }
  from "react-native";
import RNFetchBlob from "rn-fetch-blob";
import Background from "../Stylesheet/Background";
import DatePicker from "react-native-date-picker";
import * as CON from "../component/Constants";
import axios from "axios";
import { AuthContext } from "../config/AuthProvider";

const Register = ({ navigation, route }) => {
  const {data,user} =useContext(AuthContext);
  const [isRegistraionSuccess, setIsRegistraionSuccess] = useState(false);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userConfirmPassword, setuserConfirmPassword] = useState(null);
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [cnic, setCnic] = useState("");
  const [country, setCountry] = useState("");
  const [nationality, setNationality] = useState("");
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState("");

  const handleSubmitButton = () => {
    setErrortext("");
    if (!userName) {
      alert("Please fill name");
      return;
    }
    if (!userEmail) {
      alert("Please fill email");
      return;
    }
    if (!userPassword) {
      alert("Please fill password");
      return;
    }
    if (!userConfirmPassword) {
      alert("Please fill confirmpassword");
      return;
    }
    if (!phone) {
      alert("Please fill phone");
      return;
    }
    if (!date) {
      alert("Please fill D/O/B");
      return;
    }
    if (!month) {
      alert("Please fill D/O/B");
      return;
    }
    if (!year) {
      alert("Please fill D/O/B");
      return;
    }
    if (!cnic) {
      alert("Please fill cnic");
      return;
    }
    if (!country) {
      alert("Please fill country");
      return;
    }
    if (!nationality) {
      alert("Please fill nationality");
      return;
    }
    setLoading(true);

    let proceeding_data = [
      { name: "name", data: userName },
      { name: "email", data: userEmail },
      { name: "password", data: userPassword },
      { name: "c_password", data: userConfirmPassword },
      { name: "phone", data: phone },
      { name: "date", data: date },
      { name: "month", data: month },
      { name: "year", data: year },
      { name: "cnic", data: cnic },
      { name: "country", data: country },
      { name: "nationality", data: nationality },
    ];
    RNFetchBlob.fetch("POST", CON.URL + "/api/register", {
      "Content-Type": "application/json",
      "Accept": "application/json",
    }, proceeding_data)
      .then((res) => {
        var jsonData = JSON.parse(res["data"]);
        if (res["data"].indexOf("Validation Error") == -1) {
          setIsRegistraionSuccess(true);
        } else {
          if (res["data"].indexOf("The email has already been taken") !== -1) {
            alert("The email has already been taken");
          }
          setErrortext("Registration Unsuccessful");
        }
        console.log("sjahdkjshkfdjslkfjs###########################4444444", jsonData.data.user_id);

        data({
          uid:jsonData.data.user_id
        })
        setLoading(false);
      }).catch(error => {
      setLoading(false);
    });
  };

  if (isRegistraionSuccess) {
    return (

      <View
        style={{
          flex: 1,
          justifyContent: "center",
          backgroundColor: "#000",
        }}>
        <ImageBackground source={require("../Stylesheet/Background")}
                         style={{
                           flex: 1,
                           width: "100%",
                           height: "100%",
                           alignItems: "center",
                           position: "absolute",
                           opacity: 0.1,
                         }} />
        <Image
          source={require("../Assets/check.png")}
          style={{ height: 150, resizeMode: "contain", alignSelf: "center" }}
        />
        <Text style={{
          color: "white",
          textAlign: "center",
          fontSize: 25,
          fontWeight: "bold",
          textShadowColor: "rgba(0, 0, 0, 0.3)",
          textShadowOffset: { width: -5, height: 5 },
          textShadowRadius: 10,
          padding: 30,
          margin: 20,
        }}>Registration Successfull</Text>
        <TouchableOpacity
          style={{
            backgroundColor: "#62788B",
            borderWidth: 0,
            color: "#FFFFFF",
            borderColor: "#7DE24E",
            height: 50,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 30,
            marginTop: 20,
            marginBottom: 20,
            marginLeft: 35,
            marginRight: 35,
          }}
          activeOpacity={0.5}
          onPress={() => navigation.navigate("Login")}>
          <Text style={{
            color: "#FFFFFF",
            paddingVertical: 10,
            fontSize: 16,
          }}>Login Now</Text>
        </TouchableOpacity>

      </View>
    );
  }
  return (
    <SafeAreaView>
      <Background>
        <View
          style={{
            height: "100%",
            width: "100%",
            backgroundColor: "rgba(0,0,0,0.5)",
          }}>
        </View>

        <View
          style={{
            //backgroundColor: "red",
            position: "absolute",
            height: "100%",
            width: "100%",
          }}>

          <View style={{ justifyContent: "center" }}>
            <Image source={require("../Assets/NewLogo.png")} style={{
              height: 100,
              width: 160,
              alignSelf: "center",
              marginTop: 15,
            }} />
          </View>

          <View
            style={{
              // backgroundColor:'blue',
              flexDirection: "row",
              width: "100%",
            }}>
            <Text style={{
              color: "white",
              fontSize: 32,
              paddingLeft: 30,
              paddingTop: 10,
            }}>
              Hello !
            </Text>

            <Text style={{
              color: "#62788B",
              paddingLeft: 20,
              fontSize: 32,
              paddingTop: 10,
            }}>Register Here
            </Text>
          </View>
          <ScrollView>
            <View
              style={{
                //backgroundColor:"green",
                width: 400,
                // margin: 10,
                alignSelf: "center",
              }}>

              <TextInput
                placeholder="     Name"
                placeholderTextColor="white"
                onChangeText={userName => setUserName(userName)}
                value={userName}
                style={{
                  borderBottomWidth: 1,
                  color: "#fff",
                  height: 50,
                  width: "70%",
                  // margin: 2,
                  alignSelf: "center",
                  borderColor: "#989292",
                }} />

              <TextInput
                placeholder="     Email"
                onChangeText={userEmail => setUserEmail(userEmail)}
                value={userEmail}
                placeholderTextColor="white"
                style={{
                  borderBottomWidth: 1,
                  height: 50,
                  color: "#fff",
                  width: "70%",
                  alignSelf: "center",
                  // margin: 2,
                  borderColor: "#989292",
                }} />

              <TextInput
                placeholder="  Password"
                onChangeText={userPassword => setUserPassword(userPassword)}
                value={userPassword}
                secureTextEntry={true}
                placeholderTextColor="white"
                style={{
                  borderBottomWidth: 1,
                  height: 50,
                  color: "#fff",
                  width: "70%",
                  alignSelf: "center",
                  // margin: 2,
                  borderColor: "#989292",
                }} />

              <TextInput
                placeholder="  Confirm Password"
                onChangeText={userCnfirmPassword => setuserConfirmPassword(userCnfirmPassword)}
                value={userConfirmPassword}
                secureTextEntry={true}
                placeholderTextColor="white"
                style={{
                  borderBottomWidth: 1,
                  height: 50,
                  color: "#fff",
                  width: "70%",
                  alignSelf: "center",
                  // margin: 2,
                  borderColor: "#989292",
                }} />

              <TextInput
                placeholder="     Phone"
                onChangeText={phone => setPhone(phone)}
                value={phone}
                maxLength={11}
                placeholderTextColor="white"
                style={{
                  borderBottomWidth: 1,
                  height: 50,
                  color: "#fff",
                  width: "70%",
                  alignSelf: "center",
                  // margin: 2,
                  borderColor: "#989292",
                }} />

              <TextInput
                placeholder="     Date"
                onChangeText={date => setDate(date)}
                value={date}
                placeholderTextColor="white"
                style={{
                  borderBottomWidth: 1,
                  height: 50,
                  color: "#fff",
                  width: "70%",
                  alignSelf: "center",
                  // margin: 2,
                  borderColor: "#989292",
                }} />
              <TextInput
                placeholder="     month"
                onChangeText={month => setMonth(month)}
                value={month}
                placeholderTextColor="white"
                style={{
                  borderBottomWidth: 1,
                  height: 50,
                  color: "#fff",
                  width: "70%",
                  alignSelf: "center",
                  // margin: 2,
                  borderColor: "#989292",
                }} />
              <TextInput
                placeholder="     year"
                onChangeText={year => setYear(year)}
                value={year}
                maxLength={4}
                placeholderTextColor="white"
                style={{
                  borderBottomWidth: 1,
                  height: 50,
                  color: "#fff",
                  width: "70%",
                  alignSelf: "center",
                  // margin: 2,
                  borderColor: "#989292",
                }} />

              <TextInput
                placeholder="     CNIC"
                onChangeText={cnic => setCnic(cnic)}
                value={cnic}
                maxLength={15}
                placeholderTextColor="white"
                style={{
                  borderBottomWidth: 1,
                  height: 50,
                  color: "#fff",
                  width: "70%",
                  margin: 2,
                  alignSelf: "center",
                  borderColor: "#989292",
                }} />
              <TextInput
                placeholder="     Country"
                onChangeText={country => setCountry(country)}
                value={country}
                placeholderTextColor="white"
                style={{
                  borderBottomWidth: 1,
                  height: 50,
                  color: "#fff",
                  width: "70%",
                  margin: 2,
                  alignSelf: "center",
                  borderColor: "#989292",
                }} />
              <TextInput
                placeholder="     Nationality"
                onChangeText={nationality => setNationality(nationality)}
                value={nationality}
                placeholderTextColor="white"
                style={{
                  borderBottomWidth: 1,
                  height: 50,
                  color: "#fff",
                  width: "70%",

                  alignSelf: "center",
                  borderColor: "#989292",
                }} />
            </View>

            <View
              style={{
                // backgroundColor: "grey",
                height: 50,
                flexDirection: "row",
                alignSelf: "center",
                marginTop: "3%",
              }}>
              <TouchableOpacity
                onPress={() => {
                  handleSubmitButton();
                }}
                style={{
                  height: 50,
                  width: "80%",
                  margin: "20%",
                  justifyContent: "center",
                  alignSelf: "center",
                  borderRadius: 30,
                  backgroundColor: "#62788B",
                }}>
                <Text style={{ color: "white", textAlign: "center" }}>Registeration</Text>
              </TouchableOpacity>
            </View>

            <View style={{ marginLeft: "27%", flexDirection: "row", alignItems: "center" }}>
              <Text style={{ color: "#fff", fontSize: 13, padding: 2 }}>I ' m already memeber,</Text>
              <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                <Text style={{ color: "#62788B", fontSize: 13, padding: 2 }}> login</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </Background>
    </SafeAreaView>
  );
};
export default Register;
