import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {
  AspectRatio,
  Box,
  Center,
  Heading,
  HStack,
  Image,
  Menu,
  Pressable,
  Spinner,
  Stack,
  Text,
  View,
} from "native-base";
import * as React from "react";
import { ScrollView } from "react-native";
import { MultipleSelectList } from "react-native-dropdown-select-list";
import { trpc } from "../client";
import { RootStackParamList } from "./rootStacksParams";

type mainScreenProp = NativeStackNavigationProp<RootStackParamList, "Main">;

export const Main = () => {
  const navigation = useNavigation<mainScreenProp>();
  const album = trpc.getAllAlbums.useQuery();

  const [selected, setSelected] = React.useState<any>([]);

  const categoryName = album.data?.map(
    (album) => album.category.attributes.label
  );

  const uniqueCategory = React.useMemo(
    () => Array.from(new Set(categoryName)),
    [categoryName]
  );

  const getFilteredAlbum = (genre: string) => {
    const filteredAlbum = album.data?.filter(
      (album) => album.category.attributes.label === genre
    );

    const sortByReleaseDate = (a: any, b: any) => {
      const dateA = new Date(a["im:releaseDate"].attributes.label);
      const dateB = new Date(b["im:releaseDate"].attributes.label);
      return dateB.getTime() - dateA.getTime();
    };

    const filteredAlbumSorted = filteredAlbum?.sort(sortByReleaseDate);

    const filtered = filteredAlbumSorted?.slice(0, 4);
    return filtered;
  };

  React.useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Menu
          closeOnSelect={false}
          w="300"
          onOpen={() => console.log("opened")}
          onClose={() => console.log("closed")}
          trigger={(triggerProps) => {
            return (
              <Pressable {...triggerProps}>
                <Ionicons name="filter" size={24} color="black" />
              </Pressable>
            );
          }}
          m="2"
          p="2"
        >
          <MultipleSelectList
            setSelected={(val: string) => setSelected(val)}
            data={uniqueCategory}
            save="value"
            onSelect={() => console.log("selected", selected)}
            label="Categories"
            dropdownShown={false}
          />
        </Menu>
      ),
    });
  }, [navigation, selected, uniqueCategory]);

  if (album.isFetching) {
    return (
      <HStack
        space={2}
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Spinner accessibilityLabel="Loading albums" />
        <Heading color="primary.900" fontSize="md">
          Loading
        </Heading>
      </HStack>
    );
  }

  console.log(selected.length);

  return (
    <View>
      {album.isFetched && (
        <View my="4">
          <ScrollView>
            {selected.length === 0 && (
              <>
                {uniqueCategory.map((cat, index) => (
                  <View key={index}>
                    <Center
                      bg={index % 2 === 0 ? "violet.500" : "gray.200"}
                      _dark={{
                        bg: "violet.400",
                      }}
                      borderRadius="3xl"
                      _text={
                        index % 2 === 0
                          ? {
                              color: "white",
                              fontWeight: "700",
                              fontSize: "xs",
                            }
                          : {
                              color: "gray",
                              fontWeight: "700",
                              fontSize: "xs",
                            }
                      }
                      maxW="1/4"
                      w="auto"
                      px="3"
                      py="1.5"
                      h="8"
                      ml="2"
                      mb="2"
                    >
                      {cat}
                    </Center>
                    <ScrollView horizontal>
                      {getFilteredAlbum(cat)!.map((item, indexAlbum) => (
                        <Box
                          key={indexAlbum}
                          alignItems="start"
                          mb={8}
                          mx={2}
                          shadow="9"
                        >
                          <Box
                            maxW="40"
                            rounded="lg"
                            overflow="hidden"
                            borderColor="white"
                            borderWidth="1"
                            _dark={{
                              borderColor: "coolGray.600",
                              backgroundColor: "gray.700",
                            }}
                            _web={{
                              shadow: 2,
                              borderWidth: 0,
                            }}
                            _light={{
                              backgroundColor: "gray.50",
                            }}
                          >
                            <Box>
                              <AspectRatio w="100%" ratio={16 / 9}>
                                <Image
                                  source={{
                                    uri: item["im:image"][2].label,
                                  }}
                                  alt="image"
                                />
                              </AspectRatio>
                              <Center
                                bg={index % 2 === 0 ? "violet.500" : "gray.200"}
                                _dark={{
                                  bg: "violet.400",
                                }}
                                borderTopRightRadius="lg"
                                _text={
                                  index % 2 === 0
                                    ? {
                                        color: "white",
                                        fontWeight: "700",
                                        fontSize: "xs",
                                      }
                                    : {
                                        color: "gray",
                                        fontWeight: "700",
                                        fontSize: "xs",
                                      }
                                }
                                position="absolute"
                                bottom="0"
                                px="3"
                                py="1.5"
                              >
                                {item["im:releaseDate"].attributes.label}
                              </Center>
                            </Box>
                            <Stack p="4" space={3}>
                              <Stack space={2}>
                                <Text
                                  fontSize="xs"
                                  _light={{
                                    color: "violet.500",
                                  }}
                                  _dark={{
                                    color: "violet.400",
                                  }}
                                  fontWeight="500"
                                  ml="-0.5"
                                  mt="-1"
                                >
                                  {item["im:artist"].label}
                                </Text>
                              </Stack>
                            </Stack>
                          </Box>
                        </Box>
                      ))}
                    </ScrollView>
                  </View>
                ))}
              </>
            )}

            {selected.length > 0 && (
              <>
                {selected.map((cat: string, index: number) => (
                  <View key={index}>
                    <Center
                      bg={index % 2 === 0 ? "violet.500" : "gray.200"}
                      _dark={{
                        bg: "violet.400",
                      }}
                      borderRadius="3xl"
                      _text={
                        index % 2 === 0
                          ? {
                              color: "white",
                              fontWeight: "700",
                              fontSize: "xs",
                            }
                          : {
                              color: "gray",
                              fontWeight: "700",
                              fontSize: "xs",
                            }
                      }
                      maxW="1/4"
                      w="auto"
                      px="3"
                      py="1.5"
                      h="8"
                      ml="2"
                      mb="2"
                    >
                      {cat}
                    </Center>
                    <ScrollView horizontal>
                      {getFilteredAlbum(cat)!.map((item, indexAlbum) => (
                        <Box
                          key={indexAlbum}
                          alignItems="start"
                          mb={8}
                          mx={2}
                          shadow="9"
                        >
                          <Box
                            maxW="40"
                            rounded="lg"
                            overflow="hidden"
                            borderColor="white"
                            borderWidth="1"
                            _dark={{
                              borderColor: "coolGray.600",
                              backgroundColor: "gray.700",
                            }}
                            _web={{
                              shadow: 2,
                              borderWidth: 0,
                            }}
                            _light={{
                              backgroundColor: "gray.50",
                            }}
                          >
                            <Box>
                              <AspectRatio w="100%" ratio={16 / 9}>
                                <Image
                                  source={{
                                    uri: item["im:image"][2].label,
                                  }}
                                  alt="image"
                                />
                              </AspectRatio>
                              <Center
                                bg={index % 2 === 0 ? "violet.500" : "gray.200"}
                                _dark={{
                                  bg: "violet.400",
                                }}
                                borderTopRightRadius="lg"
                                _text={
                                  index % 2 === 0
                                    ? {
                                        color: "white",
                                        fontWeight: "700",
                                        fontSize: "xs",
                                      }
                                    : {
                                        color: "gray",
                                        fontWeight: "700",
                                        fontSize: "xs",
                                      }
                                }
                                position="absolute"
                                bottom="0"
                                px="3"
                                py="1.5"
                              >
                                {item["im:releaseDate"].attributes.label}
                              </Center>
                            </Box>
                            <Stack p="4" space={3}>
                              <Stack space={2}>
                                <Text
                                  fontSize="xs"
                                  _light={{
                                    color: "violet.500",
                                  }}
                                  _dark={{
                                    color: "violet.400",
                                  }}
                                  fontWeight="500"
                                  ml="-0.5"
                                  mt="-1"
                                >
                                  {item["im:artist"].label}
                                </Text>
                              </Stack>
                            </Stack>
                          </Box>
                        </Box>
                      ))}
                    </ScrollView>
                  </View>
                ))}
              </>
            )}
          </ScrollView>
        </View>
      )}
      {/* <Fab
        m="4"
        renderInPortal={false}
        shadow={2}
        size="sm"
        backgroundColor={"violet.200"}
        // icon={<Icon color="white" name="plus" size="sm"  />}
        icon={<Ionicons name="search" size={24} color="black" />}
      /> */}
    </View>
  );
};
