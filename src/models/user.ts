// @ts-ignore
import database from '../database';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();


export type User={
    id: number;
    username:string;
    first_name:string;
    last_name:string;
    password:string;
}

export class userStore{
async index(): Promise<User[]> {
    try {
      // @ts-ignore
      const conn = await database.connect()
      const sql = 'SELECT * FROM Users'

      const result = await conn.query(sql) 

      conn.release()

      return result.rows 
    } catch (err) {
      throw new Error(`Could not get users. Error: ${err}`)
    }
  }

  async show(id: number): Promise<User> {
    try {
    const sql = 'SELECT * FROM Users WHERE id=($1)'
    // @ts-ignore
    const conn = await database.connect()

    const result = await conn.query(sql, [id])
    conn.release()

    return result.rows[0]
    } catch (err) {
        throw new Error(`Could not find User ${id}. Error: ${err}`)
    }
  }

  async create(b: User): Promise<User> {
      try {
    const sql = 'INSERT INTO users (username,first_name, last_name, password) VALUES($1, $2, $3, $4) RETURNING *'
    // @ts-ignore
    const conn = await database.connect() 
    const hash = bcrypt.hashSync(b.password+process.env.BCRYPT_PASSWORD,parseInt(process.env.SALT_ROUNDS as string)) as string;
    const result = await conn
        .query(sql, [ b.username, b.first_name, b.last_name, hash])
    let User = result.rows[0];
    User.id=result.rows[0].id;

    conn.release()   
    return User
      } catch (err) {
          throw new Error(`Could not add new User ${b.username}. Error: ${err}`)
      }
  }

  async delete(id: number): Promise<void> {
      try {
    const sql = 'DELETE FROM users WHERE id=($1)'
    // @ts-ignore
    const conn = await database.connect()

    await conn.query(sql, [id])


    conn.release()

      } catch (err) {
          throw new Error(`Could not delete User ${id}. Error: ${err}`)
      }
  }


  async login(username: string, password: string): Promise<User | null> {
   // @ts-ignore
    const conn = await database.connect()
    const sql = 'SELECT password FROM users WHERE username=($1)'

    const result = await conn.query(sql, [username])

    if(result.rows.length) {

      const user = result.rows[0]

      if (bcrypt.compareSync(password+process.env.BCRYPT_PASSWORD, user.password)) {
        return user
      }
    }

    return null
  }
}