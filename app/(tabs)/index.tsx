import { Ionicons } from "@expo/vector-icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import {
  Modal,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import Animated from "react-native-reanimated";

import { fetchUsers, updateUser } from "@/api";
import User from "@/models/User";

export default function HomeScreen() {
  const queryClient = useQueryClient();
  const [modalVisible, setModalVisible] = useState(false);
  const [user, setUser] = useState<User>();

  const { data, isLoading } = useQuery({
    queryKey: ["userList"],
    queryFn: fetchUsers,
  });

  const mutation = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userList"] });
      setModalVisible(false);
    },
    onError: (error) => {
      console.error(error);
      setModalVisible(false);
    },
  });

  const handleOnSave = (userId: number, username: string) => {
    mutation.mutate({ userId, username });
  };

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

                      <TouchableOpacity
                        style={styles.editButton}
                        onPress={() => {
                          setModalVisible(true);
                          setUser(item);
                        }}
                      >
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

      {user && (
        <Modal visible={modalVisible} transparent={true} animationType="fade">
          <Animated.View style={styles.modalContainer}>
            <Animated.View style={styles.modal}>
              <Animated.View style={styles.modalHeader}>
                <Animated.Text style={styles.modalHeaderText}>
                  Editar Usuário
                </Animated.Text>

                <Ionicons
                  name={"close-circle-outline"}
                  size={24}
                  color={"#2b6cb0"}
                  onPress={() => {
                    console.log("closing modal ...");
                    setModalVisible(false);
                  }}
                />
              </Animated.View>

              <Animated.View style={styles.modalBody}>
                <Animated.Text>Nome</Animated.Text>
                <TextInput
                  style={styles.textInput}
                  // value={username}
                  onChangeText={(text) => {
                    setUser((prevState) => ({
                      ...prevState!,
                      name: text,
                    }));
                  }}
                  value={user.name}
                ></TextInput>
              </Animated.View>

              <Animated.View style={styles.modalFooter}>
                <TouchableOpacity
                  style={styles.editButton}
                  onPress={() => handleOnSave(user.id, user.name)}
                >
                  <Animated.Text style={styles.editButtonText}>
                    Salvar
                  </Animated.Text>
                </TouchableOpacity>
              </Animated.View>
            </Animated.View>
          </Animated.View>
        </Modal>
      )}
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
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modal: {
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "column",
    width: "82%",
    height: "20%",
    margin: 20,
    borderRadius: 8,
    backgroundColor: "white",
    elevation: 5,
    shadowOpacity: 0.25,
    shadowRadius: 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  modalHeader: {
    width: "100%",
    height: "24%",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    paddingLeft: 16,
    paddingRight: 16,
    borderBottomWidth: 0.2,
    borderColor: "gray",
  },
  modalHeaderText: {
    fontSize: 16,
    fontWeight: 600,
    color: "#2b6cb0",
  },
  modalBody: {
    alignItems: "flex-start",
    justifyContent: "center",
    flexDirection: "column",
    width: "100%",
    height: "52%",
    paddingLeft: 16,
    paddingRight: 16,
  },
  modalFooter: {
    alignItems: "flex-start",
    justifyContent: "flex-end",
    flexDirection: "row",
    width: "100%",
    height: "24%",
    paddingRight: 16,
  },
  textInput: {
    width: "100%",
    borderWidth: 0.2,
    borderRadius: 4,
    padding: 10,
  },
});
