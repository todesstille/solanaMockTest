import { assert } from "chai";
import * as anchor from "@project-serum/anchor";
import { Mock } from "@todesstille/mocksolana";
const mock = new Mock(anchor);
const provider = mock.getProvider();
let admin, alice, bob, token

describe("Token test", () => {

  before(async () => {
    admin = provider.wallet.payer;
    alice = mock.createKeypair();
    bob = mock.createKeypair();
  });

  beforeEach(async () => {
    token = await mock.createToken(6);
  });

  it("Could create associated account", async () => {
    let account = await token.getOrCreateAssociatedAccount(admin.publicKey)
    assert.deepEqual(account.mint, token.mintAddress);
    assert.deepEqual(account.owner, admin.publicKey);
    assert.ok(account.amount == 0);
    assert((await token.balanceOf(account.address)).amount == '0');
    await token.mint(account.address, 1000000)
    assert((await token.balanceOf(account.address)).amount == '1000000');
  });

  it("Could mint", async () => {
    let account = await token.getOrCreateAssociatedAccount(alice.publicKey)
    assert((await token.balanceOf(account.address)).amount == '0');
    await token.mint(account.address, 1000000)
    assert((await token.balanceOf(account.address)).amount == '1000000');
  });

  it("Could transfer", async () => {
    let account1 = await token.getOrCreateAssociatedAccount(alice.publicKey)
    let account2 = await token.getOrCreateAssociatedAccount(bob.publicKey)
    await token.mint(account1.address, 1000000)
    await token.transfer(alice, account1.address, account2.address, 500000)
    assert((await token.balanceOf(account1.address)).amount == '500000');
    assert((await token.balanceOf(account1.address)).amount == '500000');
  });

  it("Could approve", async () => {
    let account1 = await token.getOrCreateAssociatedAccount(alice.publicKey)
    let account2 = await token.getOrCreateAssociatedAccount(bob.publicKey)
    await token.mint(account1.address, 1000000);
    await token.approve(alice, account1.address, account2.address, 500000);
    assert((await token.balanceOf(account1.address)).delegatedAmount == '500000');
    await token.revoke(alice, account1.address)
    assert((await token.balanceOf(account1.address)).delegatedAmount == '0');
  });

});
