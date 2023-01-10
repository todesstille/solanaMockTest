import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { SolanaMockTest } from "../target/types/solana_mock_test";
import { Mock } from "@todesstille/mocksolana";
const mock = new Mock(anchor);
const provider = mock.getProvider();

describe("solanaMockTest", () => {

  const program = anchor.workspace.SolanaMockTest as Program<SolanaMockTest>;

  it("Is initialized!", async () => {
    // Add your test here.
    const tx = await program.methods.initialize().rpc();
  });
});
