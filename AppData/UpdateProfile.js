import React, { useState, useContext } from "react";
import { Text, SafeAreaView, View, Image, TextInput, TouchableOpacity, ScrollView } from "react-native";
import Background from "../Stylesheet/Background";
import LinearGradient from "react-native-linear-gradient";
import * as CON from "../component/Constants";
import { AuthContext } from "../config/AuthProvider";
import axios from "axios";

const UpdateProfile = () => {
  const { user } = useContext(AuthContext);

  const [id, setID] = useState(user["id"]);
  const [name, setName] = useState(user["name"]);
  const [email, setEmail] = useState(user["email"]);
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [cnic, setCnic] = useState("");
  const [country, setCountry] = useState("");
  const [nationality, setNationality] = useState("");
  const [setLoading] = useState("");

  const handleSubmitButton = () => {
    // setErrortext("");
    if (!name) {
      alert("Please fill name");
      return;
    }
    if (!email) {
      alert("Please fill email");
      return;
    }
    if (!phone) {
      alert("Please fill phone");
      return;
    }
    if (!date) {
      alert("Please fill date");
      return;
    }
    if (!month) {
      alert("Please fill month");
      return;
    }
    if (!year) {
      alert("Please fill year");
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

    let formdata = new FormData();
    formdata.append("id", id);
    formdata.append("name", name);
    formdata.append("phone", phone);
    formdata.append("date", date);
    formdata.append("email", email);
    formdata.append("month", month);
    formdata.append("year", year);
    formdata.append("cnic", cnic);
    formdata.append("country", country);
    formdata.append("nationality", nationality);

    console.log(nationality, "nationltyyyyyyy");

    axios.post(CON.URL + "/api/update-profile", formdata)
      .then(function(response) {
        var jsonData = JSON.stringify(response);
        console.log("jahdkjsdksjlksjfkdjsklksl", response.data);
        if (response.data == true) {
          alert("Info updated successfully.");
        } else {
          alert("update successfully");
        }
      })
      .catch(function(error) {
        console.log(error);
      });

    // fetch(CON.URL + "/api/update-profile/", {
    //   method: "POST",
    //   body: data,
    // }).then(responseJson => {
    //   alert("0-0-0-0-0-0-0-0", JSON.stringify(responseJson.data));
    //
    //   // var jsonData = JSON.parse(responseJson["profile"]);
    //   // alert("helooooooooo",jsonData);
    //   // if (responseJson["success"] == 1) {
    //   //   alert("Info updated successfully.");
    //   // } else {
    //   //   alert("update failed");
    //   // }
    //   // setLoading(false);
    // }).catch(error => {
    //   // console.error(errorrrrrrrrrrrrrrrrrrrrrrrr);
    //   console.log("failed");
    //   // setLoading(false);
    // });

    // setLoading(true);
  };
  return (
    <SafeAreaView>
      <Background>
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
            </View>
          </LinearGradient>
        </View>

        <ScrollView>
          <View
            style={{
              height: 600,
              width: "90%",
              borderWidth: 1,
              borderColor: "#5d5d5d",
              marginLeft: "5%",
              marginRight: "5%",
              marginTop: 5,
              borderRadius: 25,
              backgroundColor: "rgba(0,0,0,0.4)",
            }}>
            <View
              style={{
                height: 265,
                width: 400,
                //  marginTop: 20,
                padding: 10,
                alignSelf: "center",
              }}>
              <TextInput
                placeholder="     Name"
                placeholderTextColor="white"
                editable={false}
                onChangeText={name => setName(name)}
                value={name}
                style={{
                  borderBottomWidth: 1,
                  color: "#fff",
                  height: 50,
                  width: "70%",
                  alignSelf: "center",
                  borderColor: "#989292",
                }} />

              <TextInput
                placeholder="     Email"
                onChangeText={email => setEmail(email)}
                value={email}
                editable={false}
                placeholderTextColor="white"
                style={{
                  borderBottomWidth: 1,
                  height: 50,
                  color: "#fff",
                  width: "70%",
                  alignSelf: "center",
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
                  borderColor: "#989292",
                }} />

              <TextInput
                placeholder="     Month"
                onChangeText={month => setMonth(month)}
                value={month}
                placeholderTextColor="white"
                style={{
                  borderBottomWidth: 1,
                  height: 50,
                  color: "#fff",
                  width: "70%",
                  alignSelf: "center",
                  borderColor: "#989292",
                }} />

              <TextInput
                placeholder="     Year"
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
                  alignSelf: "center",
                  borderColor: "#989292",
                }} />

              <TextInput
                placeholder="     country"
                onChangeText={country => setCountry(country)}
                value={country}
                placeholderTextColor="white"
                style={{
                  borderBottomWidth: 1,
                  height: 50,
                  color: "#fff",
                  width: "70%",
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

              <TouchableOpacity
                onPress={() => {
                  handleSubmitButton();
                }}
                style={{
                  height: 50,
                  width: "70%",
                  margin: 20,
                  justifyContent: "center",
                  alignSelf: "center",
                  borderRadius: 30,
                  backgroundColor: "#62788B",
                }}>
                <Text style={{ color: "white", textAlign: "center" }}>Update</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </Background>
    </SafeAreaView>
  );
};
export default UpdateProfile;
