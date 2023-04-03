import axios from "axios";

export const getClauses = async () => {
  const res = await axios
    .get("https://gbmentor-testserver.herokuapp.com/clauses")
    .then((clauses) => {
      console.log(clauses);
      return clauses;
    });
  return res;
};

export const insertInto = async ({ tier1, tier2, tier3, tier4, clause }) => {
  const res = await axios
    .post("https://gbmentor-testserver.herokuapp.com/insertItem", {
      // .post("http://localhost:5000/insertItem", {
      tier1,
      tier2,
      tier3,
      tier4,
      clause,
    })
    .then((clauses) => {
      return clauses;
    })
    .catch((_error) => {
      console.log(_error);
      return "error";
    });
  return res;
};
