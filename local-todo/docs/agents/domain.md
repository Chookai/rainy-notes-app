# Domain Docs

## Layout

This is a single-context repo:
- Root `CONTEXT.md`: domain glossary.
- Root `docs/adr/`: architectural decision records, created lazily.

## Before exploring

Read `CONTEXT.md` and ADRs relevant to the area being explored.

If `CONTEXT-MAP.md` exists in the future, follow its pointers to the
relevant context glossaries and context-specific ADR directories.

If domain files or directories do not exist, proceed silently.
Do not flag their absence or suggest creating them upfront.
The domain-modeling skill creates them when terms or decisions resolve.

## Vocabulary

Use the glossary's canonical terms in issues, proposals, hypotheses,
and tests. Avoid synonyms explicitly discouraged by the glossary.

If a needed concept is missing, reconsider the terminology or note
the gap for domain modeling.

## ADR conflicts

Explicitly flag proposals that contradict existing ADRs rather than
silently overriding them. Identify the ADR and explain why reopening
the decision might be justified.
