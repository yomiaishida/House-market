import { useState, useEffect, useRef } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";

const CreateListing = () => {
  const [geolocationEnabled, setgeolocationEnabled] = useState(false);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    type: "rent",
    name: "",
    bedrooms: 1,
    bathrooms: 1,
    parking: false,
    furnished: false,
    address: "",
    offer: false,
    regularPrice: 0,
    discountedPrice: 0,
    images: {},
    latitude: 0,
    longitude: 0,
  });

  const {
    type,
    name,
    bedrooms,
    bathrooms,
    parking,
    furnished,
    address,
    offer,
    regularPrice,
    discountedPrice,
    images,
    latitude,
    longitude,
  } = formData;

  const auth = getAuth();
  const navigate = useNavigate();
  const isMounted = useRef(true);

  useEffect(() => {
    if (isMounted) {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setFormData({ ...formData, userRef: user.uid });
        } else {
          navigate("/sign-in");
        }
      });
    }

    return () => {
      isMounted.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMounted]);

  const onSubmit = (e) => {
    e.preventDefault();
  };

  const onMutate = (e) => {};

  if (loading) {
    return <Spinner />;
  }
  return (
    <div className="profile">
      <header>
        <p className="pageHeader">Create a Listing</p>
      </header>

      <main>
        <form onSubmit={onSubmit}>
          <label className="formLabel">Sell / Rent</label>
          <div className="formButtons">
            <button
              type="button"
              className={type === "rent" ? "formButtonActive" : "formButton"}
              id="type"
              value="rent"
              onClick={onMutate}
            >
              Sell
            </button>
            <button
              type="button"
              className={type === "rent" ? "formButtonActive" : "formButton"}
              id="type"
              value="rent"
              onClick={onMutate}
            >
              Rent
            </button>
          </div>

          <label className="fromLabel">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={onMutate}
            maxLength="32"
            minLength="10"
            required
            className="formInputName"
          />

          <div className="formRooms flex">
            <div>
              <label className="formLabel">Bedrooms</label>
              <input
                type="number"
                id="bedrooms"
                value={bedrooms}
                onChange={onMutate}
                min="1"
                max="50"
                required
                className="formInputSmall"
              />
            </div>
            <div>
              <label className="formLabel">Bathrooms</label>
              <input
                type="number"
                id="bathrooms"
                value={bathrooms}
                onChange={onMutate}
                min="1"
                max="50"
                required
                className="formInputSmall"
              />
            </div>
          </div>

          <label className="formLabel">Parking spot</label>
          <div className="formButtons">
            <button
              type="button"
              id="parking"
              value={true}
              onChange={onMutate}
              min="1"
              max="50"
              className={parking ? "formButtonActive" : "formButton"}
            >
              Yes
            </button>
            <button
              type="button"
              id="parking"
              value={false}
              onChange={onMutate}
              className={
                !parking && parking !== null ? "formButtonActive" : "formButton"
              }
            >
              No
            </button>
          </div>

          <label className="formLabel">Furnished</label>
          <div className="formButtons">
            <button
              type="button"
              id="furnished"
              value={true}
              onChange={onMutate}
              className={furnished ? "formButtonActive" : "formButton"}
            >
              Yes
            </button>
            <button
              type="button"
              id="furnished"
              value={false}
              onChange={onMutate}
              className={
                !furnished && furnished !== null
                  ? "formButtonActive"
                  : "formButton"
              }
            >
              No
            </button>
          </div>

          <label className="formLabel">Address</label>
          <textarea
            id="address"
            type="text"
            value={address}
            onChange={onMutate}
            required
          ></textarea>

          {!geolocationEnabled && (
            <div className="formLatLng flex">
              <div>
                <label className="formLabel">Latitude</label>
                <input
                  type="number"
                  value={latitude}
                  onChange={onMutate}
                  required
                  id="latitude  "
                  className="formInputSmall"
                />
              </div>
            </div>
          )}

          <label className="formLabel">Offers</label>
          <div className="formButtons">
            <button
              type="button"
              id="offer"
              value={true}
              onChange={onMutate}
              className={offer ? "formButtonActive" : "formButton"}
            >
              Yes
            </button>
            <button
              type="button"
              id="offer"
              value={false}
              onChange={onMutate}
              className={
                !offer && offer !== null ? "formButtonActive" : "formButton"
              }
            >
              No
            </button>
          </div>

          <label className="formLabel">Regular Price</label>
          <div className="formPriceDiv">
            <input
              type="number"
              value={regularPrice}
              onChange={onMutate}
              min="50"
              max="750000000"
              required
              className="formInputSmall"
            />
            {type === "rent" && <p className="fromPriceText">$/ Month</p>}
          </div>

          {offer && (
            <>
              <label className="formLabel">Discounted Price</label>
              <input
                type="number"
                id="discountedPrice"
                className="formInputSmall"
                value={discountedPrice}
                onChange={onMutate}
                min="50"
                max="750000000"
                required
              />
            </>
          )}

          <label className="formLabel">Images</label>
          <p className="imagesInfo">
            The firs image will be the cover (max 6).
          </p>
          <input
            type="file"
            id="images"
            className="formInputFile"
            onChange={onMutate}
            max="6"
            accept=".jpg,.png,.jpeg"
            multiple
            required
          />
          <button className="primaryButton createListingButton" type="submit">
            Create Listing
          </button>
        </form>
      </main>
    </div>
  );
};

export default CreateListing;
