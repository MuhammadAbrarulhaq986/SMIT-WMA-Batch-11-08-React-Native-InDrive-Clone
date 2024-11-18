import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "#DAFE2B",
        },
        headerTintColor: "#000",
        headerTitleStyle: {
          fontWeight: "bold",
          fontSize: 20,
        },
      }}
    >
      {/* Optionally configure static options outside the route.*/}
      {/* <Stack.Screen name="home" options={{}} /> */}
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  );
}

// import { Slot } from "expo-router";
// import { SessionProvider } from "../ctx";

// export default function Root() {
// Set up the auth context and render our layout inside of it.
//   return (
//     <SessionProvider>
//       <Slot />
//     </SessionProvider>
//   );
// }
