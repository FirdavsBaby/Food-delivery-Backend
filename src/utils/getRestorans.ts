import User from "../models/User.model.js";

export const getRestorans = (users: User[], myLatitude:number, myLongitude:number) => {
  function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {        
    const R = 6371;
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance;
  }
  
  const SortedtRestoran = users
    .map((restoran: User) => {
      const distance = calculateDistance(
        myLatitude,
        myLongitude,
        restoran.dataValues.location.split(" ")[1],
        restoran.dataValues.location.split(" ")[3]
      );

      return { ...restoran.dataValues, distance };
    })
    .sort((a, b) => a.distance - b.distance);

    const closestRestoranCount:number = SortedtRestoran.length;
    
  if (closestRestoranCount >= 10) {
      return SortedtRestoran.slice(0,10)
  } else {
    const otherRestoran = SortedtRestoran.filter((r)=> Math.round(r.distance) < 3);
    return otherRestoran
  }
}