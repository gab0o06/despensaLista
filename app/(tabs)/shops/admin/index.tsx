import { useCallback, useState } from "react";
import { useRouter, useLocalSearchParams, useFocusEffect } from "expo-router";
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  TextInput,
  Alert,
} from "react-native";
import {
  doc,
  getDoc,
  Timestamp,
  query,
  where,
  getDocs,
  updateDoc,
  arrayUnion,
  arrayRemove,
  collection,
} from "firebase/firestore";

import { Colors } from "../../../../constants/theme";
import { HeaderShopsBack } from "../../../../components/HeaderShopsBack";
import { Button } from "../../../../components/Btn";
import { auth, db } from "../../../../utils/firebase";
import { useTheme } from "../../../../contexts/ThemeContext";
import { Entypo } from "@expo/vector-icons";
import { MemberShop } from "../../../../components/MemberShop";

export default function AdminShop() {
  const [nameShop, setNameShop] = useState("");
  const [createdAt, setCreatedAt] = useState<Timestamp | null>(null);
  const [membersInfo, setMembersInfo] = useState<
    { uid: string; email: string; username: string; owner: boolean }[]
  >([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [invitingMember, setInvitingMember] = useState(false);
  const [mailInput, setMailInput] = useState("");
  const { colors } = useTheme();
  const styles = getStyles(colors);

  const id = useLocalSearchParams<{ id: string }>().id;

  const router = useRouter();

  const handleInvitation = async () => {
    if (!mailInput) {
      return Alert.alert("Error", "Por favor ingresa un correo electrónico.");
    }

    if (!/\S+@\S+\.\S+/.test(mailInput)) {
      return Alert.alert(
        "Error",
        "Por favor ingresa un correo electrónico válido.",
      );
    }

    try {
      setInvitingMember(true);
      const q = query(collection(db, "users"), where("email", "==", mailInput));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty)
        return Alert.alert(
          "Error",
          "No se encontró un usuario con ese correo electrónico.",
        );

      if (membersInfo.some((member) => member.uid === querySnapshot.docs[0].id))
        return Alert.alert("Error", "El usuario ya es miembro de la tienda.");

      const shopRef = doc(db, "shops", id);
      await updateDoc(shopRef, {
        members: arrayUnion(querySnapshot.docs[0].id),
      });

      const productsQuery = query(
        collection(db, "products"),
        where("shopId", "==", id),
      );
      const productsSnapshot = await getDocs(productsQuery);
      await Promise.all(
        productsSnapshot.docs.map(async (productDoc) => {
          await updateDoc(productDoc.ref, {
            members: arrayUnion(querySnapshot.docs[0].id),
          });
        }),
      );

      Alert.alert("Éxito", "Miembro agregado correctamente.");
      fetchShopData();
    } catch (error) {
      console.error("Error sending invitation:", error);
      Alert.alert(
        "Error",
        "Hubo un problema al agregar nuevo miembro. Por favor, inténtalo de nuevo más tarde.",
      );
    } finally {
      setInvitingMember(false);
      setMailInput("");
    }
  };

  const handleRemoveMember = (memberId: string) => {
    if (memberId === auth.currentUser?.uid) {
      return Alert.alert(
        "Error",
        "No puedes eliminarte a ti mismo de la tienda.",
      );
    }
    if (!isAdmin)
      return Alert.alert("Error", "No tienes permisos para eliminar miembros.");

    Alert.alert(
      "CONFIRMAR",
      "¿Estás seguro de que deseas eliminar a este miembro?",
      [
        {
          text: "Aceptar",
          style: "destructive",
          onPress: async () => {
            try {
              const shopRef = doc(db, "shops", id);
              await updateDoc(shopRef, {
                members: arrayRemove(memberId),
              });

              const productsQuery = query(
                collection(db, "products"),
                where("shopId", "==", id),
              );
              const productsSnapshot = await getDocs(productsQuery);
              await Promise.all(
                productsSnapshot.docs.map(async (productDoc) => {
                  await updateDoc(productDoc.ref, {
                    members: arrayRemove(memberId),
                  });
                }),
              );

              Alert.alert("Éxito", "Miembro eliminado correctamente.");
              fetchShopData();
            } catch (error) {
              console.error("Error removing member:", error);
              Alert.alert(
                "Error",
                "Hubo un problema al eliminar el miembro. Por favor, inténtalo de nuevo más tarde.",
              );
            }
          },
        },
        {
          text: "Negar",
          style: "cancel",
        },
      ],
    );
  };

  const fetchShopData = async () => {
    setFetching(true);
    try {
      const shopDoc = await getDoc(doc(db, "shops", id));
      if (shopDoc.exists()) {
        const shopData = shopDoc.data();
        const isAdmin = shopData?.ownerId === auth.currentUser?.uid;
        setIsAdmin(isAdmin);

        try {
          const resultsMembers = await Promise.all(
            shopData.members.map(async (memberId: string) => {
              const userDoc = await getDoc(doc(db, "users", memberId));
              if (!userDoc.exists()) return null;
              const userData = userDoc.data();
              return {
                uid: memberId,
                email: userData.email,
                username: userData.username,
                owner: memberId === shopData.ownerId,
              };
            }),
          );
          const filteredMembers = resultsMembers.filter(
            (member) => member !== null,
          );
          filteredMembers.sort((a, b) => Number(b.owner) - Number(a.owner));
          setMembersInfo(filteredMembers);
        } catch (err) {
          console.error("Error fetching members info:", err);
        }

        setNameShop(shopData.name || "");
        setCreatedAt(shopData.createdAt || null);
      }
    } catch (error) {
      console.error("Error fetching shop data:", error);
    } finally {
      setFetching(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      if (id) {
        fetchShopData();
      }

      return () => {};
    }, [id]),
  );

  if (fetching) {
    return (
      <View style={styles.body}>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" color={colors.action} />
        </View>
      </View>
    );
  }

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
      keyboardDismissMode="on-drag"
      style={styles.body}
    >
      <HeaderShopsBack
        title="Administrar"
        subtitle="Acciones que puedes hacer para tu tienda"
      />
      <View>
        <View>
          <View style={styles.headerShopInfo}>
            <View style={styles.imageContainer}>
              <Entypo name="shop" size={50} color="white" />
            </View>
            <View style={styles.bodyShopInfo}>
              <Text style={styles.shopName}>
                {nameShop.length > 8
                  ? nameShop.slice(0, 8) + "..."
                  : nameShop || "Nombre de la tienda"}
              </Text>
              <Text style={styles.descShop}>
                {membersInfo.length} miembros - Creado:{" "}
                {createdAt?.toDate().toLocaleDateString() ||
                  "Fecha no disponible"}
              </Text>
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <Button
              title="EDITAR"
              onPress={() => {
                router.push({
                  pathname: "/(tabs)/shops/admin/edit",
                  params: { id },
                });
              }}
            />
            <Button
              title="ELIMINAR"
              backgroundColor={colors.error}
              onPress={() => {
                router.push({
                  pathname: "/(tabs)/shops/admin/delete",
                  params: { id },
                });
              }}
            />
          </View>
        </View>
        <View style={styles.inviteMembersContainer}>
          <Text style={styles.inviteMembersText}>Invitar nuevos miembros</Text>
          <View style={styles.inviteMembersActionContainer}>
            <View style={styles.searchContainer}>
              <Entypo name="mail" size={24} color={colors.icons} />
              <TextInput
                placeholder="Correo del usuario"
                style={styles.searchInput}
                placeholderTextColor={colors.searchText}
                value={mailInput}
                onChangeText={setMailInput}
              />
            </View>
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={handleInvitation}
              disabled={invitingMember}
            >
              <Text style={styles.primaryButtonText}>INVITAR</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.membersContainer}>
          <Text style={styles.membersTitle}>Miembros Tienda</Text>
          {membersInfo &&
            membersInfo.map((member) => (
              <MemberShop
                key={member.uid}
                alias={member.username.slice(0, 2).toUpperCase()}
                name={member.username}
                email={member.email}
                role={member.owner ? "ADMIN" : "MEMBER"}
                isAdmin={isAdmin}
                onPressDelete={() => handleRemoveMember(member.uid)}
              />
            ))}
          <View style={{ marginVertical: 10 }}></View>
          {membersInfo.length === 1 && (
            <Text style={{ color: colors.text, fontSize: 16 }}>
              No has invitado a nadie...
            </Text>
          )}
        </View>
      </View>
    </ScrollView>
  );
}

const getStyles = (colors: typeof Colors.dark) =>
  StyleSheet.create({
    body: {
      flex: 1,
      backgroundColor: colors.background,
      paddingHorizontal: 20,
    },
    headerShopInfo: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 10,
      paddingHorizontal: 15,
      gap: 15,
      backgroundColor: colors.elementBackground,
      borderRadius: 16,
    },
    imageContainer: {
      width: 70,
      height: 70,
      borderRadius: 16,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: colors.accentText,
    },
    bodyShopInfo: {
      flexDirection: "column",
      gap: 10,
    },
    shopName: {
      fontSize: 20,
      fontWeight: "bold",
      color: colors.text,
    },
    descShop: {
      fontSize: 16,
      color: colors.searchText,
    },
    buttonContainer: {
      flexDirection: "row",
      flex: 1,
      gap: 10,
      justifyContent: "space-between",
      alignContent: "center",
    },
    inviteMembersContainer: {
      backgroundColor: colors.elementBackground,
      padding: 15,
      borderRadius: 16,
      marginTop: 25,
    },
    inviteMembersText: {
      fontSize: 20,
      fontFamily: "Sen_700Bold",
      color: colors.text,
    },
    inviteMembersActionContainer: {
      flexDirection: "row",
      alignContent: "center",
      gap: 10,
      marginTop: 10,
    },
    searchContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-start",
      backgroundColor: colors.search,
      borderRadius: 8,
      gap: 10,
      paddingHorizontal: 10,
      overflow: "scroll",
      width: "70%",
      height: 50,
    },
    searchInput: {
      color: colors.text,
      borderRadius: 8,
    },
    primaryButton: {
      flex: 1,
      backgroundColor: colors.action,
      borderRadius: 12,
      alignItems: "center",
      justifyContent: "center",
    },
    primaryButtonText: {
      color: colors.text,
      fontSize: 12,
      fontFamily: "Sen_700Bold",
    },
    membersContainer: {
      flexDirection: "column",
      gap: 10,
      marginTop: 25,
      marginBottom: 120,
    },
    membersTitle: {
      fontSize: 24,
      fontFamily: "Sen_700Bold",
      color: colors.text,
    },
  });
