const data = [
  {
    id: 1,
    title: "Temp",
  },
  {
    id: 2,
    title: "Redhold",
  },
  {
    id: 3,
    title: "Ventosanzap",
  },
];
const timeOut = 500;
const apis = {
  getTodos: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(data);
      }, timeOut);
    });
  },
  getTodo: (id) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(data.find((d) => d.id === id));
      }, timeOut);
    });
  },
};

export default apis;
