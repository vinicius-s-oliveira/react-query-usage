import axios from "axios";
import { useEffect, useState } from "react";
import { StyleSheet, SafeAreaView, Image } from "react-native";

import Animated from "react-native-reanimated";

export interface UserList {
  id: number;
  name: string;
  avatar: string;
}

export default function HomeScreen() {
  const [userList, setUserList] = useState<UserList[]>();

  useEffect(() => {
    axios
      .get("https://66d0d61d181d059277dfde9c.mockapi.io/react-query-list/users")
      .then((response) => {
        const users = response.data as UserList[];
        setUserList(users);
        console.log(
          "users:",
          users.map((user) => user.name)
        );
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Animated.ScrollView>
        <Animated.View style={styles.textContainer}>
          <Animated.Text style={styles.text}>React Query Usage</Animated.Text>
        </Animated.View>

        {userList && (
          <>
            {userList.map((user) => {
              return (
                <Animated.View key={user.id} style={styles.userContainer}>
                  <Animated.View
                    style={{
                      backgroundColor: "blue",
                    }}
                  >
                    <Animated.Image
                      source={{ uri: `${user.avatar}` }}
                      style={styles.image}
                    />
                  </Animated.View>

                  <Animated.Text style={styles.nameText}>
                    {user.name}
                  </Animated.Text>
                </Animated.View>
              );
            })}
          </>
        )}
      </Animated.ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: 60,
  },
  userContainer: {
    justifyContent: "center",
    flexDirection: "row",
    width: "100%",
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 24,
  },
  text: {
    fontWeight: "600",
    fontSize: 24,
    color: "#2b6cb0",
  },
  nameText: {
    fontSize: 18,
    paddingBottom: 6,
  },
  image: {
    width: 80,
    height: 80,
  },
});
