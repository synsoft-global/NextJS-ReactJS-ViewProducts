export const getAddressFormatted = (address: any, storeDetail) => {
  const addressList = [];
  address.address_2 && (addressList["address_2"] = address.address_2);

  address.city && (addressList["city"] = address["city"]);

  address.postcode && (addressList["postcode"] = address.postcode);

  address.state &&
    (addressList["state"] = getStateName(address.state, storeDetail));

  address.country &&
    (addressList["country"] = getCountryName(address.country, storeDetail));
  return Object.keys(addressList)
    .map(function (key) {
      return [addressList[key]];
    })
    .join(",");
};

export const getAddressFormattedShipping = (address: any, storeDetail) => {
  const addressList = [];
  if (address) {
    address.shipping_address_2 &&
      (addressList["address_2"] = address.shipping_address_2);

    address.shipping_city &&
      (addressList["shipping_city"] = address.shipping_city);

    address.shipping_postcode &&
      (addressList["postcode"] = address.shipping_postcode);

    address.shipping_state &&
      (addressList["shipping_state"] = getStateName(
        address.shipping_state,
        storeDetail
      ));
    address.shipping_country &&
      (addressList["country"] = getCountryName(
        address.shipping_country,
        storeDetail
      ));
  }
  return Object.keys(addressList)
    .map(function (key) {
      return [addressList[key]];
    })
    .join(",");
};

const getStateName = (state_id: any, storeDetail) => {
  if (!storeDetail.countries) return "";
  const state = storeDetail.states.find((val) => val.id == state_id);
  return state ? state.name : "";
};

const getCountryName = (country_id, storeDetail): any => {
  if (!storeDetail.countries) return "";
  const country = storeDetail.countries.find((val) => val.id == country_id);
  return country ? country.name : "";
};
