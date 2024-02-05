import React, { useState } from "react";
import { Stack } from "expo-router";

// interface User {
//   username: string;
//   password: string;
// }

export default function UserAuthLayout() {

  return (
    <Stack screenOptions={{headerShown: false, gestureEnabled: false}} initialRouteName="welcome">
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen name="forgot-password" options={{ headerShown: false }} />
      <Stack.Screen name="two-factor" options={{ headerShown: false }} />
      <Stack.Screen name="signup" options={{ headerShown: false }} />
    </Stack>
  );
};
