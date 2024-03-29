import React, { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Button, Input } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import { signin } from "../api/userSlice";
import { unwrapResult } from "@reduxjs/toolkit";

const LoginScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [enteredPhone, setEnteredPhone] = useState("");
  const [enteredPass, setEnteredPass] = useState("");

  //const [isError, setIsError] = useState("");

  const loginHandler = async () => {
    try {
      const action = signin({
        phone: enteredPhone,
        password: enteredPass,
      });
      const resultAction = await dispatch(action);
      const user = unwrapResult(resultAction);
      navigation.navigate("Tabs");
    } catch (error) {
      //setIsError(error.message);
      console.log(error);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.container}>
        <Image style={styles.image} source={require("../images/logo.png")} />
        <View style={styles.container2}>
          <Input
            onChangeText={(text) => setEnteredPhone(text)}
            placeholder="Số điện thoại"
          />
          <Input
            onChangeText={(text) => setEnteredPass(text)}
            placeholder="Mật khẩu"
          />

          <Button
            containerStyle={styles.button}
            title="Đăng nhập"
            onPress={loginHandler}
          />
          <Button
            containerStyle={styles.button}
            title="Đăng kí"
            type="outline"
            onPress={() => navigation.navigate("Register")}
          />
        </View>
        <View style={{ alignItems: "center", marginTop: 15 }}>
          <Text
            onPress={() => navigation.navigate("Forget")}
            style={styles.text}
          >
            Quên mật khẩu
          </Text>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  button: {
    padding: 15,
  },
  image: {
    width: 150,
    height: 150,
  },
  text: {
    color: "black",
    fontWeight: "bold",
    fontSize: 16,
  },
  container2: {
    width: "80%",
    marginTop: 50,
  },
});
