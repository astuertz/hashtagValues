import React from "react";

const calculateMatchPercent = (hashtags, userValues) => {
    if (!hashtags || hashtags.length == 0) return 0;
    let addedWeight = 0;
    let totalWeight = 0;
    userValues.forEach(e => {
      totalWeight += e.weight;
      hashtags.find((item, index) => {
        if (item.name == e.name) return addedWeight += e.weight;
      });
    })
    if (totalWeight == 0) return 0;
    return Math.round((addedWeight / totalWeight) * 100);
  }

  export default calculateMatchPercent;