const sortedObject = (obj) => {
  const keys = Object.keys(obj).sort();
  return keys.reduce((res, key) => {
    return {
      ...res,
      [key]: obj[key]
    };
  }, {});
};

const cond = (
  conds,
  defaultValue
) => {
  return (key) => {
    const targetKey = JSON.stringify(sortedObject(key));
    const existItem = conds.find(item => JSON.stringify(sortedObject(item.key)) === targetKey);
    if(existItem) {
      return existItem.value;
    }
    return defaultValue;
  };
};

const isProduction = process.env.GATSBY_ENV === "production";

const siteMetadataMap = cond([
  {
    key: { isProduction: false },
    value: {
      description: "rnweb",
      og_image: "",
      siteUrl: "https://via.placeholder.com/150",
      title: "rnweb",
      titleTemplate: "%s",
      logo: "https://via.placeholder.com/150",
      backgroundColor: `#fff`,
      themeColor: `#005abf`
    }
  },
  {
    key: { isProduction: true },
    value: {
      description: "rnweb",
      og_image: "https://via.placeholder.com/150",
      siteUrl: "https://via.placeholder.com/150",
      title: "rnweb",
      titleTemplate: "%s",
      logo: "https://via.placeholder.com/150",
      backgroundColor: `#fff`,
      themeColor: `#005abf`
    }
  }
]);

module.exports = siteMetadataMap({ isProduction });
