
import supertest from "supertest";
import app from "../../server";

const request = supertest(app);

let token :string
const test_user={
    username:"test_end_point",
    first_name:"andrew",
    last_name:"george",
    password:"12345"
};
const test_book={
        name:"Science Book",
        price:13,
        category:1
}
let test_book_id: number
describe("book endpoints", () => {
    beforeAll(async () => {
        const response = await request.post(
            "/users/login"
          ).send({username:test_user.username,
          password:test_user.password
      });
          token=response.body
    })

    it("create book endpoint", async () => {
        const response = await request.post(
          "/books"
        ).send(test_book).set('Authorization','Bearer '+token);
        expect(response.status).toBe(200);
        expect (response.body.name).toBe("Science Book");
        test_book_id=response.body.id
      });




  it("index api endpoint", async () => {
    const response = await request.get(
      "/books"
    );
    expect(response.status).toBe(200);
    expect(response.body.some((item: { name: string; })=>item.name==="Science Book")).toBeTrue();
  });

  it("show book api endpoint", async () => {
    const response = await request.get(
      "/books/"+test_book_id
    );
    expect(response.status).toBe(200);
    expect(response.body.name).toBe("Science Book")
  });


});

