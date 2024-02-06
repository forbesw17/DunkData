import { useAuth } from "@clerk/clerk-expo";
import { Link } from "expo-router";
import React from "react";
import { View, Text, Button } from "react-native";

const Page = () => {

    const { signOut, isSignedIn } = useAuth();
    

  
    return (
      <View>
        <Text>Profile</Text>
        {isSignedIn && (
            <Button title="Log out" onPress={() => {signOut()}} />
        )}
        {!isSignedIn && (
            <Link href='/(modals)/login'>
                <Text style={{fontSize: 24}}>Login</Text>
            </Link>
        )}
      </View>
    );
  };
  
  export default Page;