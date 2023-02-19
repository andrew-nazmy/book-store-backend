
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
let hash_pass:string
let test_user_id:number
describe("user endpoints", () => {
    beforeAll( async () => {
        const response = await request.post(
          "/users"
        ).send(test_user);
        expect(response.status).toBe(200);
        expect (response.body.username).toBe("test_end_point");
        test_user_id=response.body.id
        hash_pass=response.body.password
      });
    it("endpoints uses authenticaction fail without token", async () => {
        const response = await request.get(
          "/users"
        );
        expect(response.status).toBe(401);
        
      });
      it("login user endpoint", async () => {
        const response = await request.post(
          "/users/login"
        ).send({username:test_user.username,
        password:test_user.password
    });
        expect(response.status).toBe(200);
        expect (response.body).toBeDefined();
        token=response.body
        
      });
  it("index api endpoint", async () => {
    const response = await request.get(
      "/users"
    ).set('Authorization','Bearer '+token);
    expect(response.status).toBe(200);
    expect(response.body.some((item: { username: string; })=>item.username==="test_end_point")).toBeTrue();
  });
  it("show user api endpoint", async () => {
    const response = await request.get(
      "/users/"+test_user_id
    ).set('Authorization','Bearer '+token);
    expect(response.status).toBe(200);   
    expect(response.body.username).toBe("test_end_point");
  });

});

