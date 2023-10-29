import React from "react";
import { StyleSheet, Text } from "react-native";
import { Tabs } from "expo-router";
import { Entypo, AntDesign, Ionicons } from "@expo/vector-icons";

const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: styles.tabBarContainer,
      }}
    >
      <Tabs.Screen
        name="home/index"
        options={{
          tabBarLabel: ({ focused }) => (
            <Text
              style={[
                styles.tabBarLabelStyle,
                { color: focused ? "#008e97" : "black" },
              ]}
            >
              Home
            </Text>
          ),
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Entypo name="home" size={24} color="#008e97" />
            ) : (
              <AntDesign name="home" size={24} color="black" />
            ),
        }}
      />
      <Tabs.Screen
        name="profile/index"
        options={{
          tabBarLabel: ({ focused }) => (
            <Text
              style={[
                styles.tabBarLabelStyle,
                { color: focused ? "#008e97" : "black" },
              ]}
            >
              Profile
            </Text>
          ),
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Ionicons name="person" size={24} color="#008e97" />
            ) : (
              <Ionicons name="person-outline" size={24} color="black" />
            ),
        }}
      />
      <Tabs.Screen
        name="cart/index"
        options={{
          tabBarLabel: ({ focused }) => (
            <Text
              style={[
                styles.tabBarLabelStyle,
                { color: focused ? "#008e97" : "black" },
              ]}
            >
              Cart
            </Text>
          ),
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Entypo name="shopping-cart" size={24} color="#008e97" />
            ) : (
              <AntDesign name="shoppingcart" size={24} color="black" />
            ),
        }}
      />
      <Tabs.Screen
        name="offer/[offerId]"
        options={{
          headerShown: false,
          href: null,
        }}
      />
      <Tabs.Screen
        name="deals/[dealId]"
        options={{
          headerShown: false,
          href: null,
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;

const styles = StyleSheet.create({
  tabBarContainer: {
    height: 55,
    margin: 10,
    borderRadius: 10,
  },
  tabBarLabelStyle: {
    fontSize: 12,
    paddingBottom: 5,
  },
});
