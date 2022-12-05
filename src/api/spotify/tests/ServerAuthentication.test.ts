import { authenticateWithEnv } from "./authenticateWithEnv"

describe("ServerAuthentication", () => {
  it("should return token", async () => {
    const { access_token, token_type } = await authenticateWithEnv()

    expect(access_token).toBeTruthy()
    expect(token_type).toBe("Bearer")
  })
})
