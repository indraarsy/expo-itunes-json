import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Button, Text } from "react-native";
import { RootStackParamList } from "./rootStacksParams";

type authScreenProp = NativeStackNavigationProp<RootStackParamList, "Detail">;

export const Welcome = () => {
  const navigation = useNavigation<authScreenProp>();

  return (
    <>
      <Text style={{ color: "black" }}>Welcome to the app!</Text>
      <Button title="WKWK" onPress={() => navigation.navigate("Main")}>
        <Text>Go to main</Text>
      </Button>
    </>
  );
};
