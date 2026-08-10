import { describe, expect, it } from "vitest";
import { act, render, screen } from "@testing-library/react";
import { FirstSkillMdArticle } from "../content/articles/FirstSkillMdArticle";

// The code blocks are syntax-highlighted by wrapping substrings in spans. That
// must never add or drop a character, so assert the copied text equals the
// rendered text for every card.
describe("FirstSkillMdArticle", () => {
  it("copied text matches the rendered code block for every card", async () => {
    const copied = [];
    Object.assign(navigator, {
      clipboard: {
        writeText: (text) => (copied.push(text), Promise.resolve()),
      },
    });

    const { container } = render(<FirstSkillMdArticle />);
    const buttons = screen.getAllByTitle("Copy snippet");
    const blocks = [...container.querySelectorAll(".sk-card pre.sk-block")];

    expect(buttons.length).toBeGreaterThan(0);
    expect(blocks).toHaveLength(buttons.length);

    for (const button of buttons) {
      await act(async () => button.click());
    }

    blocks.forEach((block, index) => {
      expect(copied[index]).toBe(block.textContent);
    });
  });

  it("renders the frontmatter fence and body heading as distinct tokens", () => {
    const { container } = render(<FirstSkillMdArticle />);

    // Highlighting is load-bearing for the article's argument: the reader needs
    // to see where frontmatter stops and the body starts.
    expect(container.querySelectorAll(".sk-fence").length).toBeGreaterThan(0);
    expect(container.querySelectorAll(".sk-key").length).toBeGreaterThan(0);
    expect(container.querySelectorAll(".sk-head").length).toBeGreaterThan(0);
  });

  it("shows both walkthrough screenshots with captions", () => {
    const { container } = render(<FirstSkillMdArticle />);
    const figures = [...container.querySelectorAll("figure.sk-figure")];

    expect(figures).toHaveLength(2);
    figures.forEach((figure) => {
      expect(figure.querySelector("img")?.getAttribute("alt")).toBeTruthy();
      expect(figure.querySelector("figcaption")?.textContent).toBeTruthy();
    });
  });
});
