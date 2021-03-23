export default {
  extends: Doughnut,
  data: function() {
    return {
      data: {
        columns: ["id", "name", "age"],
        tableData: [
          { id: 1, name: "John", age: "20" },
          { id: 2, name: "Jane", age: "24" },
          { id: 3, name: "Susan", age: "16" },
          { id: 4, name: "Chris", age: "55" },
          { id: 5, name: "Dan", age: "40" },
        ],
      },
    };
  },
};
