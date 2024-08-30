import axios from "axios";
import { useEffect, useState } from "react";
import { StyleSheet, SafeAreaView } from "react-native";

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
      <Animated.View style={styles.titleContainer}>
        <Animated.Text style={styles.title}>React Query Usage</Animated.Text>
      </Animated.View>

      <Animated.View style={styles.bodyContainer}>
        {userList && (
          <Animated.FlatList
            data={userList}
            renderItem={({ item }) => {
              return (
                <Animated.View key={item.id} style={styles.userContainer}>
                  <Animated.View>
                    <Animated.Image
                      source={{ uri: `${item.avatar}` }}
                      style={styles.image}
                    />
                  </Animated.View>

                  <Animated.View style={styles.nameContainer}>
                    <Animated.Text style={styles.nameText}>
                      {item.name}
                    </Animated.Text>
                  </Animated.View>
                </Animated.View>
              );
            }}
          />
        )}
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: 60,
  },
  bodyContainer: {
    flex: 1,
    width: "100%",
  },
  userContainer: {
    justifyContent: "flex-start",
    flexDirection: "row",
    width: "100%",
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 24,
  },
  title: {
    fontWeight: "700",
    textTransform: "uppercase",
    fontSize: 22,
    color: "#2b6cb0",
  },
  nameText: {
    fontSize: 18,
    paddingBottom: 6,
    textAlign: "center",
    justifyContent: "center",
  },
  nameContainer: {
    justifyContent: "center",
    marginLeft: 12,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 50,
  },
});
