// @ts-ignore
import database from "../database";


export enum category {
  Comedy = 0,
  Science = 1,
  Story = 2,
  Bio = 3,
}

export type Book={
    id: number;
    name:string;
    price:number;
    category:category;
}

export class bookStore{
async index(): Promise<Book[]> {
    try {
      // @ts-ignore
      const conn = await database.connect()
      const sql = 'SELECT * FROM books'

      const result = await conn.query(sql)

      conn.release()

      return result.rows 
    } catch (err) {
      throw new Error(`Could not get books. Error: ${err}`)
    }
  }

  async show(id: number): Promise<Book> {
    try {
    // @ts-ignore
    const conn = await database.connect()
    const sql = 'SELECT * FROM books WHERE id=($1)'

    const result = await conn.query(sql, [id])

    conn.release()

    return result.rows[0]
    } catch (err) {
        throw new Error(`Could not find Book ${id}. Error: ${err}`)
    }
  }

  async showByCategory(categoryNum: number): Promise<Book> {
    try {
    const sql = 'SELECT * FROM books WHERE category=($1)'
    // @ts-ignore
    const conn = await database.connect()

    const result = await conn.query(sql, [category[categoryNum]])

    conn.release()

    return result.rows[0]
    } catch (err) {
        throw new Error(`Could not find Book ${category}. Error: ${err}`)
    }
  }

  async create(b: Book): Promise<Book> {
      try {
    const sql = 'INSERT INTO books ( name, price, category) VALUES($1, $2, $3) RETURNING *'
    // @ts-ignore
    const conn = await database.connect()
    var Book:Book
    if (b.category==0||b.category==1||b.category==2||b.category==3){
    const result = await conn
        .query(sql, [ b.name, b.price, category[b.category]])

   Book = result.rows[0];
  }
    else {
   
      throw new Error(`Could not add new Book ${b.name}. Error: invalid category (0,1,2,3) `)

    }

    conn.release()

    return Book
      } catch (err) {
          throw new Error(`Could not add new Book ${b.name}. Error: ${err}`)
      }
  }

  async delete(id: number): Promise<void> {
      try {
    const sql = 'DELETE FROM books WHERE id=($1)'
    // @ts-ignore
    const conn = await database.connect()
    await conn.query(sql, [id])

    conn.release()

      } catch (err) {
          throw new Error(`Could not delete Book ${id}. Error: ${err}`)
      }
  }
}