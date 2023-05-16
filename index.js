const _ = require("lodash");

function showTree(data1, data2) {
   const files = _.sortBy(_.union(Object.keys(data1), Object.keys(data2)));
   const result = files.map((key) => {
      if (!Object.hasOwn(data2, key)) {
         return {
            key,
            type: "deleted",
            value: data1[key],
         };
      }
      if (!Object.hasOwn(data1, key)) {
         return {
            key,
            type: "added",
            value: data2[key],
         };
      }
      if (_.isPlainObject(data1[key]) && _.isPlainObject(data2[key])) {
         return {
            key,
            children: getTree(data1[key], data2[key]),
            type: "nested",
         };
      }
      if (!_.isEqual(data1[key], data2[key])) {
         return {
            key,
            type: "changed",
            value1: data1[key],
            value2: data2[key],
         };
      }
      return {
         key,
         type: "unchanged",
         value: data1[key],
      };
   });

   return result;
}

function genDiff(filepath1, filepath2) {
   const fileTree = showTree(filepath1, filepath2);
   let stringForm = "";
   stringForm += "{" + "\n";
   const objToStr = () => {
      for (let item of fileTree) {
         switch (item.type) {
            case "unchanged":
               stringForm += "    " + "  " + item.key + ": " + " " + item.value + "\n";
               break;
            case "deleted":
               stringForm += "    " + "-" + " " + item.key + ": " + " " + item.value + "\n";
               break;
            case "added":
               stringForm += "    " + "+" + " " + item.key + ": " + " " + item.value + "\n";
               break;
            case "changed":
               stringForm += "    " + "-" + " " + item.key + ": " + " " + item.value1 + "\n";
               stringForm += "    " + "+" + " " + item.key + ": " + " " + item.value2 + "\n";
               break;
         }
      }
   };
   objToStr();
   stringForm += "}";

   return stringForm;
}

module.exports = genDiff;
