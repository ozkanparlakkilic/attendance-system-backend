import bcrypt from 'bcryptjs';

const teachers = [
  {
    empId: 'EMP2345',
    fullName: 'Surya Prakash',
    email: 'suryaprakash@gmail.com',
    password: bcrypt.hashSync('123456', 10),
    classes: ['5faa9e1ec0defe3348aa44f4', '5faa9e1ec0defe3348aa44f5'],
    addedBy: '6049d95bf41e013b94328a9c',
  },
];

export default teachers;
