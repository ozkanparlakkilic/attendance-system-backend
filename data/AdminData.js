import bcrypt from "bcryptjs";
const admins = [
  {
    empId: "EMPADMIN1",
    fullName: "Ramkrishna Murthy",
    email: "r.murthy@gmail.com",
    password: bcrypt.hashSync("123456", 10),
  },
];

export default admins;
