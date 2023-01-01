import React from "react";
import { NativeBaseProvider, Box } from "native-base";

export default function Root() {
  return (
    <NativeBaseProvider>
      <Box>BWorks-mobile!</Box>
    </NativeBaseProvider>
  );
}