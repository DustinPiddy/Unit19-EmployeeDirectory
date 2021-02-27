import axios from "axios";

export const getRandomUsers = (n) =>
  axios.get(`https://randomuser.me/api/?results=${n}&nat=us`);

