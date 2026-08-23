import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, beforeEach, vi } from 'vitest';
import { buildCommentTree } from '../services/commentService';
import { CommentsSection } from '../components/CommentsSection';

// Use vi.hoisted for variables accessed inside vi.mock factory
const {
  mockFlatComments,
  getMockListeners,
  addMockListener,
  removeMockListener,
} = vi.hoisted(() => {
  const flatComments = [];
  let listeners = [];
  return {
    mockFlatComments: flatComments,
    getMockListeners: () => listeners,
    addMockListener: (l) => {
      listeners.push(l);
    },
    removeMockListener: (l) => {
      listeners = listeners.filter((item) => item !== l);
    },
  };
});

// Mock firebase modules for deterministic unit testing
vi.mock('../lib/firebase', () => ({
  db: {},
}));

vi.mock('../services/commentService', async () => {
  const actual = await vi.importActual('../services/commentService');
  return {
    ...actual,
    subscribeToComments: vi.fn((postSlug, onUpdate) => {
      const filtered = mockFlatComments.filter(
        (item) => item.postSlug === postSlug,
      );
      const tree = actual.buildCommentTree(filtered);
      onUpdate(tree, filtered.length);

      const listener = { postSlug, onUpdate };
      addMockListener(listener);

      return () => {
        removeMockListener(listener);
      };
    }),
    addComment: vi.fn(async ({ postSlug, parentId, author, content }) => {
      const newComment = {
        id: `comment-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
        postSlug,
        parentId: parentId || null,
        author: author || 'Anonymous Reader',
        content,
        createdAt: new Date().toISOString(),
      };
      mockFlatComments.push(newComment);

      // Trigger listeners
      getMockListeners().forEach((l) => {
        if (l.postSlug === postSlug) {
          const filtered = mockFlatComments.filter(
            (item) => item.postSlug === postSlug,
          );
          const tree = actual.buildCommentTree(filtered);
          l.onUpdate(tree, filtered.length);
        }
      });
      return newComment.id;
    }),
  };
});

describe('Comments feature', () => {
  beforeEach(() => {
    mockFlatComments.length = 0;
    window.localStorage.clear();
  });

  describe('buildCommentTree utility', () => {
    it('correctly nests replies under parent comments', () => {
      const flat = [
        {
          id: '1',
          parentId: null,
          author: 'Alice',
          content: 'Parent comment',
          createdAt: '2026-08-23T10:00:00Z',
        },
        {
          id: '2',
          parentId: '1',
          author: 'Bob',
          content: 'Reply to Alice',
          createdAt: '2026-08-23T10:05:00Z',
        },
        {
          id: '3',
          parentId: '2',
          author: 'Charlie',
          content: 'Reply to Bob',
          createdAt: '2026-08-23T10:10:00Z',
        },
      ];

      const tree = buildCommentTree(flat);
      expect(tree).toHaveLength(1);
      expect(tree[0].id).toBe('1');
      expect(tree[0].replies).toHaveLength(1);
      expect(tree[0].replies[0].id).toBe('2');
      expect(tree[0].replies[0].replies).toHaveLength(1);
      expect(tree[0].replies[0].replies[0].id).toBe('3');
    });

    it('returns empty array when given invalid or empty input', () => {
      expect(buildCommentTree(null)).toEqual([]);
      expect(buildCommentTree([])).toEqual([]);
    });
  });

  describe('CommentsSection component', () => {
    it('renders empty comments state initially', () => {
      render(<CommentsSection postSlug='test-article' />);

      expect(
        screen.getByRole('heading', { name: /comments/i }),
      ).toBeInTheDocument();
      expect(screen.getByText(/no comments yet/i)).toBeInTheDocument();
    });

    it('allows posting a root comment', async () => {
      const user = userEvent.setup();
      render(<CommentsSection postSlug='test-article' />);

      const nameInput = screen.getByPlaceholderText(/your name \(optional\)/i);
      const textarea = screen.getByPlaceholderText(/leave a comment/i);
      const submitBtn = screen.getByRole('button', { name: /post comment/i });

      await user.type(nameInput, 'Senthil');
      await user.type(textarea, 'This article is very insightful!');
      await user.click(submitBtn);

      await waitFor(() => {
        expect(screen.getByText('Senthil')).toBeInTheDocument();
        expect(
          screen.getByText('This article is very insightful!'),
        ).toBeInTheDocument();
      });

      expect(textarea).toHaveValue('');
    });

    it('allows replying to an existing comment', async () => {
      const user = userEvent.setup();

      // Seed an initial comment
      mockFlatComments.push({
        id: 'c1',
        postSlug: 'test-article',
        parentId: null,
        author: 'Dave',
        content: 'Original comment',
        createdAt: '2026-08-23T12:00:00Z',
      });

      render(<CommentsSection postSlug='test-article' />);

      expect(screen.getByText('Dave')).toBeInTheDocument();
      expect(screen.getByText('Original comment')).toBeInTheDocument();

      const replyBtn = screen.getByRole('button', { name: /reply/i });
      await user.click(replyBtn);

      const replyTextarea = screen.getByPlaceholderText(/reply to dave/i);
      await user.type(replyTextarea, 'I agree with Dave!');

      const postReplyBtn = screen.getByRole('button', { name: /post reply/i });
      await user.click(postReplyBtn);

      await waitFor(() => {
        expect(screen.getByText('I agree with Dave!')).toBeInTheDocument();
      });
    });
  });
});
