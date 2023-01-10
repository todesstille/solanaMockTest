import { assert } from "chai";
import * as anchor from "@project-serum/anchor";
import { Mock } from "@todesstille/mocksolana";
const mock = new Mock(anchor);
const provider = mock.getProvider();

describe("Token test", () => {

  it("Could create associated account", async () => {
    let token = await mock.createToken(6);
    let account = await token.getOrCreateAssociatedAccount(provider.wallet.publicKey)
    assert.deepEqual(account.mint, token.mintAddress);
    assert.deepEqual(account.owner, provider.wallet.publicKey);
    assert.ok(account.amount == 0);
    assert((await token.balanceOf(account.address)).value.amount == '0');
    await token.mint(account.address, 1000000)
    assert((await token.balanceOf(account.address)).value.amount == '1000000');
  });

  it("Could transfer lamports", async () => {
    let user1 = mock.createKeypair();
    await mock.transfer(provider.wallet.payer, user1.publicKey, 1000000);
    assert.ok(await mock.getBalance(user1.publicKey) == 1000000);
  });

});
