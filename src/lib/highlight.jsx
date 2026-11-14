/* ---------------------------------------------------------------------------
   A tiny regex-based syntax highlighter for the CodeCard component.
   Each language has one regex whose capture groups map, in order, to a token
   class (or to a function that picks one). Text outside any group is left
   plain. It only needs to be good enough for short article snippets.
   ------------------------------------------------------------------------- */

const SQL_KEYWORDS = new Set(
  'select from join left right inner outer full cross on where and or not in is null as group by order having limit offset distinct union all case when then else end with insert into values update set delete create table asc desc between like'.split(
    ' ',
  ),
);

const sqlWord = (word, code, end) => {
  if (SQL_KEYWORDS.has(word.toLowerCase())) return 'tok-keyword';
  if (/^\s*\(/.test(code.slice(end))) return 'tok-func';
  return null;
};

const LANGS = {
  turtle: {
    re: /(#[^\n]*)|("(?:[^"\\\n]|\\.)*")|(\b[a-z]+:[A-Za-z_]\w*)|(:[A-Za-z_]\w*)|(\ba\b)|(\b\d+\b)|([;.[\]])/g,
    groups: ['tok-comment', 'tok-string', 'tok-prop', 'tok-type', 'tok-keyword', 'tok-number', 'tok-punct'],
  },
  yaml: {
    re: /(#[^\n]*)|('[^'\n]*'|"(?:[^"\\\n]|\\.)*")|((?<=^\s*(?:-\s+)?)[A-Za-z_][\w-]*(?=:))|((?<=^\s*)-(?=\s))|((?<=:\s+)[A-Za-z_][\w-]*(?=\s*$))/gm,
    groups: ['tok-comment', 'tok-string', 'tok-key', 'tok-punct', 'tok-value'],
  },
  sql: {
    re: /(--[^\n]*)|('(?:[^'\n]|'')*')|(\b\d+(?:\.\d+)?\b)|(\b[A-Za-z_]\w*\b)|(>=|<=|<>|[=<>])/g,
    groups: ['tok-comment', 'tok-string', 'tok-number', sqlWord, 'tok-punct'],
  },
  bash: {
    re: /((?:^|(?<=\s))#[^\n]*)|("(?:[^"\\\n]|\\.)*"|'[^'\n]*')|((?<=^|\s)--?[A-Za-z][\w-]*)|(\b[A-Z_][A-Z0-9_]*(?==))|((?<=^\s*|&&\s*|\(\s*|\|\s*)[a-z][\w.-]*)|(&&|\\$)/gm,
    groups: ['tok-comment', 'tok-string', 'tok-prop', 'tok-var', 'tok-func', 'tok-punct'],
  },
  chat: {
    re: /(^(?:You|Agent):)|(\b[a-z]+_[a-z_]+\b|->)|("[^"\n]*")|(\b\d+(?:\.\d+)?\b)/gm,
    groups: ['tok-keyword', 'tok-func', 'tok-string', 'tok-number'],
  },
};

export function highlight(code, lang) {
  const spec = LANGS[lang];
  if (!spec) return code;

  const parts = [];
  let last = 0;
  for (const match of code.matchAll(spec.re)) {
    const text = match[0];
    if (!text) continue;
    const groupIndex = match.findIndex((g, i) => i > 0 && g !== undefined);
    const rule = spec.groups[groupIndex - 1];
    const end = match.index + text.length;
    const cls = typeof rule === 'function' ? rule(text, code, end) : rule;
    if (!cls) continue;
    if (match.index > last) parts.push(code.slice(last, match.index));
    parts.push(
      <span key={match.index} className={cls}>
        {text}
      </span>,
    );
    last = end;
  }
  if (last < code.length) parts.push(code.slice(last));
  return parts;
}
