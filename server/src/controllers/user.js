import { users } from '../db';

class User {
  static register(req, res) {
    const {
      firstName, lastName, email, password, phoneNo, homeAddress, workAddress,
    } = req.body;

    const exists = users.find(user => user.email === email);
    if (exists) return res.status(422).json({ status: 422, error: 'User already exists' });

    const newUser = {
      id: users.length + 1,
      firstName,
      lastName,
      email,
      password,
      phoneNo,
      homeAddress,
      workAddress,
      status: 'unverified',
      isAdmin: false,
      createdAt: new Date().toLocaleString(),
    };

    users.push(newUser);
    return res.status(201).json({ status: '201', data: newUser });
  }
}

export default User;
