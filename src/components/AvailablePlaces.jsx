import { useEffect, useState } from "react";
import Places from "./Places.jsx";

export default function AvailablePlaces({ onSelectPlace }) {
  const [isFetching, setIsFetching] = useState(false);
  const [availablePlaces, setAvailablePlaces] = useState([]);

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
  useEffect(() => {
    async function fetchPlaces() {
      try {
        setIsFetching(true);
        const response = await fetch("http://localhost:3000/places");
        const resData = await response.json();
        setAvailablePlaces(resData.places);
        setIsFetching(false);
      } catch (err) {
        console.log(err);
      }
    }
    fetchPlaces();
  }, []);

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
