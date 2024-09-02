import { useQuery } from "@tanstack/react-query";
import React from "react";
import { SafeAreaView, StyleSheet, TouchableOpacity } from "react-native";
import Animated from "react-native-reanimated";

import { fetchUsers } from "@/api";

export default function HomeScreen() {
  const { data, isLoading } = useQuery({
    queryKey: ["userList"],
    queryFn: fetchUsers,
  });

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View style={styles.titleContainer}>
        <Animated.Text style={styles.title}>React Query Usage</Animated.Text>
      </Animated.View>

      <Animated.View style={styles.bodyContainer}>
        {data && (
          <Animated.FlatList
            data={data}
            renderItem={({ item }) => {
              return (
                <Animated.View key={item.id} style={styles.userContainer}>
                  <Animated.View style={styles.userCard}>
                    <Animated.View style={styles.userAvatar}>
                      <Animated.Image
                        source={{ uri: `${item.avatar}` }}
                        style={styles.image}
                      />
                    </Animated.View>

                    <Animated.View style={styles.nameContainer}>
                      <Animated.Text style={styles.nameText}>
                        {item.name}
                      </Animated.Text>

                      <TouchableOpacity style={styles.editButton}>
                        <Animated.Text style={styles.editButtonText}>
                          Editar
                        </Animated.Text>
                      </TouchableOpacity>
                    </Animated.View>
                  </Animated.View>
                </Animated.View>
              );
            }}
          />
        )}

        {isLoading && (
          <Animated.Text style={styles.nameText}>Loading ...</Animated.Text>
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
    justifyContent: "center",
    flexDirection: "row",
    width: "100%",
    marginBottom: 12,
  },
  userCard: {
    justifyContent: "space-between",
    flexDirection: "row",
    width: "90%",
    padding: 12,
    borderRadius: 10,
    borderColor: "gray",
    borderWidth: 2,
  },
  userAvatar: {},
  editButton: {
    alignItems: "center",
    justifyContent: "center",
    width: 92,
    height: 26,
    color: "white",
    backgroundColor: "#3182ce",
    borderRadius: 4,
  },
  editButtonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 12,
    textTransform: "uppercase",
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
    alignItems: "flex-end",
    flexDirection: "column",
    marginLeft: 12,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 50,
  },
});
