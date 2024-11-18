import { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
  Image,
} from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import * as Location from "expo-location";

// Define the types for the GraphHopper response
interface GraphHopperResponse {
  paths: Path[];
}

interface Path {
  points: Points;
}

interface Points {
  coordinates: [number, number][]; // Array of tuples with longitude and latitude
}

// Define the type for the coordinates
interface Coordinate {
  latitude: number;
  longitude: number;
}

const Home = () => {
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [errorMsg, setErrorMsg] = useState<null | string>(null);
  const [address, setAddress] = useState<string | null>(null);
  const [search, setSearch] = useState<string>("");
  const [places, setPlaces] = useState<any[]>([]);
  const [singlesearchPlace, setsinglesearchPlace] = useState<any | null>(null);
  const [region, setRegion] = useState<any>(null);
  const [routeCoordinates, setRouteCoordinates] = useState<Coordinate[]>([]);

  const GRAPHHOPPER_API_KEY = "fa1e1eaf-80ea-431a-ac6e-a03c33117690";

  const fetchGraphhopperDirections = async (
    origin: Coordinate,
    destination: Coordinate
  ): Promise<Coordinate[]> => {
    const url = `https://graphhopper.com/api/1/route?point=${origin.latitude},${origin.longitude}&point=${destination.latitude},${destination.longitude}&vehicle=car&locale=en&instructions=false&points_encoded=false&key=${GRAPHHOPPER_API_KEY}`;
    try {
      const response = await fetch(url);
      const data: GraphHopperResponse = await response.json();
      if (data.paths && data.paths.length > 0) {
        return data.paths[0].points.coordinates.map(([lon, lat]) => ({
          latitude: lat,
          longitude: lon,
        }));
      }
    } catch (error) {
      console.error("Error fetching directions from GraphHopper:", error);
    }
    return [];
  };

  useEffect(() => {
    if (location && singlesearchPlace) {
      fetchGraphhopperDirections(
        {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        },
        {
          latitude: singlesearchPlace.latitude,
          longitude: singlesearchPlace.longitude,
        }
      ).then((coordinates) => setRouteCoordinates(coordinates));
    }
  }, [location, singlesearchPlace]);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      try {
        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);

        // Set the region for the map
        const newRegion = {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        };
        setRegion(newRegion);

        const [geoAddress] = await Location.reverseGeocodeAsync({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });
        setAddress(
          `${geoAddress.name}, ${geoAddress.city}, ${geoAddress.region}, ${geoAddress.country}`
        );
      } catch (error) {
        console.error("Error getting location:", error);
        setErrorMsg("Error getting location");
      }
    })();
  }, []);

  useEffect(() => {
    if (search) {
      searchPlaces();
    } else {
      setPlaces([]);
    }
  }, [search]);

  const searchPlaces = () => {
    if (!search || !location) return;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: "fsq3qbL9ORBTq2ZaS6TUHxpAQZNDJjTlkT2lBeAynwmhZ8I=",
      },
    };

    fetch(
      `https://api.foursquare.com/v3/places/search?query=${search}&ll=${location.coords.latitude}%2C${location.coords.longitude}&radius=100000`,
      options
    )
      .then((res) => res.json())
      .then((res) => {
        setPlaces(res.results);
      })
      .catch((err) => console.error(err));
  };

  const handleSelectPlace = (item: any) => {
    setSearch(item.name);
    setPlaces([]);
    const selectedPlace = {
      latitude: item.geocodes.main.latitude,
      longitude: item.geocodes.main.longitude,
    };
    setsinglesearchPlace(selectedPlace);
    setRegion({
      latitude: selectedPlace.latitude,
      longitude: selectedPlace.longitude,
      latitudeDelta: 0.05,
      longitudeDelta: 0.05,
    });
  };

  const vehicleImages = [
    { id: "1", src: require("../../assets/images/moto.jpg") },
    { id: "2", src: require("../../assets/images/ride-mini.jpg") },
    { id: "3", src: require("../../assets/images/ride-ac.jpg") },
    { id: "4", src: require("../../assets/images/auto.jpg") },
    // Add more vehicle images as needed
  ];

  const renderVehicleItem = ({ item }: { item: { id: string; src: any } }) => (
    <View style={styles.vehicleItem}>
      <Image source={item.src} style={styles.vehicleImage} />
    </View>
  );

  return (
    <View style={styles.container}>
      {location && (
        <MapView style={styles.map} region={region}>
          <Marker
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
          />
          {singlesearchPlace && (
            <Marker
              coordinate={{
                latitude: singlesearchPlace.latitude,
                longitude: singlesearchPlace.longitude,
              }}
            />
          )}

          {routeCoordinates.length > 0 && (
            <Polyline
              coordinates={routeCoordinates}
              strokeColor="blue"
              strokeWidth={3}
            />
          )}
        </MapView>
      )}

      {address && (
        <View style={styles.addressContainer}>
          <Text style={styles.addressText}>Current Location: {address}</Text>
        </View>
      )}

      <View>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.input}
            onChangeText={(text) => setSearch(text)}
            value={search}
            placeholder="Search"
          />
          <TouchableOpacity style={styles.searchButton} onPress={searchPlaces}>
            <Text style={styles.buttonText}>Search</Text>
          </TouchableOpacity>
        </View>

        {search && places && (
          <FlatList
            data={places}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleSelectPlace(item)}>
                <View style={styles.list}>
                  <Text>{item.name}</Text>
                </View>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.fsq_id}
            style={styles.scrolballist}
            scrollEnabled={true}
          />
        )}
      </View>

      <FlatList
        data={vehicleImages}
        renderItem={renderVehicleItem}
        keyExtractor={(item) => item.id}
        horizontal
        style={styles.vehicleList}
      />
    </View>
  );
};

export default Home;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: 20,
    backgroundColor: "white",
  },
  input: {
    height: 40,
    width: 240,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  searchButton: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 5,
    marginLeft: 5,
  },
  buttonText: {
    color: "white",
  },
  addressContainer: {
    marginTop: 20,
    padding: 10,
    borderRadius: 8,
    alignSelf: "stretch",
    alignItems: "center",
  },
  addressText: {
    fontSize: 16,
    color: "#333",
  },
  map: {
    height: "50%",
    width: "100%",
  },
  list: {
    backgroundColor: "#f6f5f4",
    padding: 10,
    width: 350,
    marginLeft: 20,
    marginBottom: 5,
  },
  scrolballist: {
    width: 320,
    maxHeight: 200,
  },
  vehicleList: {
    marginTop: 20,
    width: "100%",
  },
  vehicleItem: {
    marginHorizontal: 10,
    alignItems: "center",
  },
  vehicleImage: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
});
