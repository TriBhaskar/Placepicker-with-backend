/* eslint-disable react/prop-types */
import Places from "./Places.jsx";
import Error from "./Error.jsx";
import { sortPlacesByDistance } from "../loc.js";
import fetchAvailablesPlaces from "../http.js";
import useFetch from "../hooks/useFetch.jsx";

async function fetchSortedPlaces() {
  const places = await fetchAvailablesPlaces();
  return new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition((position) => {
      const sortedPlaces = sortPlacesByDistance(
        places,
        position.coords.latitude,
        position.coords.longitude
      );
      resolve(sortedPlaces);
    });
  });
}

export default function AvailablePlaces({ onSelectPlace }) {
  const {
    isFetching,
    error,
    fetchedData: availablePlaces,
  } = useFetch(fetchSortedPlaces, []);

  //fetch request using .then() syntax
  // useEffect(() => {
  //   fetch("http://localhost:3000/places")
  //     .then((response) => {
  //       return response.json();
  //     })
  //     .then((resData) => {
  //       setAvailablePlaces(resData.places);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

  //fetch request using async/await syntax
  // useEffect(() => {
  //   async function fetchPlaces() {
  //     try {
  //       setIsFetching(true);
  //       const response = await fetch("http://localhost:3000/places");
  //       const resData = await response.json();
  //       setAvailablePlaces(resData.places);
  //       setIsFetching(false);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   }
  //   fetchPlaces();
  // }, []);

  //how to handle errors with fetch requests in react

  if (error) {
    return <Error title="An error occurred!" message={error.message} />;
  }
  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      isLoading={isFetching}
      loadingText="Fetching places data..."
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
