import { describe, expect, it } from "vitest";
import { act, render, screen } from "@testing-library/react";
import { StructuredAiSkillsArticle } from "../content/articles/StructuredAiSkillsArticle";

// The code blocks are hand-marked-up for syntax highlighting, so the copyable
// snippet constants and the rendered <pre> can silently drift apart. Guard that:
// clicking Copy must yield exactly the text the reader sees.
describe("StructuredAiSkillsArticle code cards", () => {
  it("copied text matches the rendered code block for every card", async () => {
    const copied = [];
    Object.assign(navigator, {
      clipboard: {
        writeText: (text) => (copied.push(text), Promise.resolve()),
      },
    });

    const { container } = render(<StructuredAiSkillsArticle />);
    const buttons = screen.getAllByTitle("Copy snippet");
    const blocks = [...container.querySelectorAll("pre.code-block")];

    expect(buttons).toHaveLength(5);
    expect(blocks).toHaveLength(buttons.length);

    for (const button of buttons) {
      await act(async () => button.click());
    }

    blocks.forEach((block, index) => {
      expect(copied[index]).toBe(block.textContent);
    });
  });
});
