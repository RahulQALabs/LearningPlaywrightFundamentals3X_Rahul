import fs from "fs";
import path from "path";

const filePath = path.join(__dirname, 'user.json');
console.log(filePath);

const fileData = fs.readFileSync(filePath, 'utf-8');
const userDataJSObject = JSON.parse(fileData);
console.log(userDataJSObject);


console.log(userDataJSObject.username);
console.log(userDataJSObject.password);

//Writing data to the JSON file

const user = {
    name: "Rahul",
    role: "QA Tester"
};

const jsonData = JSON.stringify(user);

fs.writeFileSync('./tests/19_Data_Driven_Testing/output.json', jsonData);
console.log("Json file successfully created!!!!");