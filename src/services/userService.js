import axios from "axios";

const APIclient = axios.create({
  baseURL: "http://localhost:3000",
});

export default {
  getData(token) {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    return APIclient.get(`/users`, config);
  },

  // postOperation(user, type, cripto, amount, money, dateTime) {
  //   return APIclient.post("/transactions", {
  //     user_id: user,
  //     action: type,
  //     crypto_code: cripto,
  //     crypto_amount: amount,
  //     money: money.toFixed(2),
  //     datetime: dateTime,
  //   });
  // },
  // deleteOperation(id) {
  //   return APIclient.delete("/transactions/" + id);
  // },
  // getOperation(id) {
  //   return APIclient.get("/transactions/" + id);
  // },
  // editOperation(movement) {
  //   return APIclient.patch("/transactions/" + movement._id, movement);
  // },
};
