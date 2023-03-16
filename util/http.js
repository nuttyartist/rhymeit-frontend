import axios from "axios";

const BACKEND_URL =
  "http://rhymeit-env.eba-ks9v23db.us-west-2.elasticbeanstalk.com";

export async function fetchRyhmes(input1, input2) {
  const response = await axios.get(BACKEND_URL, {
    params: { firstInputs: input1, secondInputs: input2 },
  });

  // console.log(response);

  // const rhymeData = [];

  // for (const key in response.data) {
  //   const expenseObj = {
  //     id: key,
  //     amount: response.data[key].amount,
  //     date: new Date(response.data[key].date),
  //     description: response.data[key].description,
  //   };
  //   expenses.push(expenseObj);
  // }

  return response.data.body;
}
