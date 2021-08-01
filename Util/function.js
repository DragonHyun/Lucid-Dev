module.exports = {
  // property들이 정의 되어있는지 확인.
  isPropertyDefined: async (...properties) => {
    try {
      for (let i in properties) {
        let property = properties[i];

        if (property === undefined || property === null || property === "")
          return false;
      }
      return true;
    } catch (err) {
      next(err);
    }
  },
};
