import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { Main } from "../screens/Main";
import { Welcome } from "../screens/Welcome";

interface ILayoutProps {
  children: React.ReactNode;
}

const Stack = createNativeStackNavigator();

const Layout: React.FunctionComponent = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Main" component={Main} />
        <Stack.Screen name="Detail" component={Welcome} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Layout;
