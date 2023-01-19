import { assert } from "chai";
import * as anchor from "@project-serum/anchor";
import { Mock } from "@todesstille/mocksolana";
const mock = new Mock(anchor);
const provider = mock.getProvider();
let admin, alice, bob 

describe("Token test", () => {

  before(async () => {
    admin = provider.wallet.payer;
    alice = mock.createKeypair();
    bob = mock.createKeypair();
  });

  beforeEach(async () => {});

  it("Could transfer lamports", async () => {
    let user1 = mock.createKeypair();
    await mock.transfer(provider.wallet.payer, user1.publicKey, 1000000);
    assert.ok(await mock.getBalance(user1.publicKey) == 1000000);
  });

});
