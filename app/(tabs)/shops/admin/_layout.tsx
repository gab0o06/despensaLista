import { Stack } from "expo-router";

export default function AdminShopLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="delete" />
      <Stack.Screen name="index" />
      <Stack.Screen name="edit" />
    </Stack>
  );
}
