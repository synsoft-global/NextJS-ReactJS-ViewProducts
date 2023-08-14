export * from "./validator";
export * from "./message";
export * from "./commanMessage";
export * from "./countries";
export * from "./helpers";

export const getCountry = (storeData) => {
  if (storeData && storeData.countries) {
    // if (storeData.Store_Meta && storeData.Store_Meta.length > 0) {
    //   const selling_location = storeData.Store_Meta.find(
    //     (i) => i.key == "selling_location"
    //   );

    //   if (selling_location && selling_location.value == "specific") {
    //     const specific_countries = storeData.Store_Meta.find(
    //       (i) => i.key == "specific_countries"
    //     );
    //     specific_countries &&
    //       (storeData.countries = storeData.countries.filter(
    //         (country) => specific_countries.value.indexOf(country.id) > -1
    //       ));
    //   }
    // }
    return storeData.countries;
  } else {
    return [];
  }
};

export const getAllCountries = (storeData) => {
  if (storeData && storeData.countries) {
    return storeData.countries;
  } else {
    return [];
  }
};

export const getCurrency = (storeData) => {
  if (storeData && storeData.currencies) {
    return storeData.currencies;
  } else {
    return [];
  }
};

export const getCountryName = (storeData, country_id) => {
  if (storeData && storeData.countries) {
    const country = storeData.countries.find((val) => val.id == country_id);

    return (country && country.name) || "";
  } else {
    return "";
  }
};

export const getCountryId = (storeData, country_name) => {
  if (storeData && storeData.countries) {
    const country = storeData.countries.find(
      (val) => val.name.toLowerCase() == country_name.toLowerCase()
    );

    return (country && country.id) || "";
  } else {
    return "";
  }
};

export const getCountryCode = (storeData, country_id) => {
  if (storeData && storeData.countries) {
    const country = storeData.countries.find((val) => val.id == country_id);

    return (country && country.iso_code_2) || "";
  } else {
    return "";
  }
};

export const getState = (storeData, country_id: any) => {
  if (storeData && storeData.states && country_id) {
    const states = storeData.states.filter(
      (val) => val.country_id == country_id
    );

    return states;
  } else {
    return [];
  }
};

export const getStateName = (storeData, state_id: any) => {
  if (storeData && storeData.states) {
    const state = storeData.states.find((val) => val.id == state_id);

    return (state && state.name) || "";
  } else {
    return "";
  }
};

export const getStateId = (storeData, state_name: any) => {
  if (storeData && storeData.states) {
    const state = storeData.states.find(
      (val) => val.name.toLowerCase() == state_name.toLowerCase()
    );

    return (state && state.id) || "";
  } else {
    return "";
  }
};

export const getStateCode = (storeData, state_id: any) => {
  if (storeData && storeData.states) {
    const state = storeData.states.find((val) => val.id == state_id);

    return (state && state.code) || "";
  } else {
    return "";
  }
};
