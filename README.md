# Minor Revisions

_Minor Revisions_ is a planned first-person Three.js academic-survival game
about a developmental-biology postdoc trying to turn a promising cardiac
organoid result into a publishable paper before a final semester ends.

The tone is witty, sarcastic, and bitterly comic. The science remains legible;
the institution becomes increasingly surreal through plausible bureaucratic
accretion, contradiction, and absence. Publication is not automatically a
happy ending, and an industry role can offer an exit from the academic
survival loop without being presented as a perfect life.

## Repository status

Development restarted on 2026-09-10 for the opencode workflow. The repository
currently contains the high-level design documents, the technical-specification
baseline, the opencode agent configuration, and the preserved toolchain
configuration, but no game code. Read
[development-status.md](docs/implementation/development-status.md) for the
current resume point and the exact next action, and the
[acceptance log](docs/implementation/step-acceptance-log.md) for historical
approvals and tests. The [AI-use log](docs/implementation/ai-use-log.md)
records actual contributions. The
[development roadmap](docs/implementation/development-roadmap.md) defines the
replacement pathway R1–R63; the legacy path is preserved in its appendix, and
every step still needs Leonardo's explicit plan approval before it starts.

The numbered design documents define game meaning; the files under
`docs/implementation/specs/` define approved technical contracts. The
[interface register](docs/implementation/interfaces.md) gives current versions.
Legacy work orders, contributions, and plans remain as historical evidence. A
documented plan or candidate patch is not an accepted implementation.

Earlier Opus review reports remain under [reviews](docs/reviews/); the
[recommendation register](docs/reviews/recommendation-register.md) preserves
their resolution history. The
[Astra correction package](docs/reviews/2026-09-05-astra/baseline-candidate.md)
records the later correction decision and its evidence.

## Documentation

The numbered documents divide the design into implementation-owned domains.
Confirmed decisions, unresolved questions, and acceptance requirements must
remain explicit. Start with the design index and decision log. During technical
specification, also start with the implementation status and roadmap. Review
reports remain advisory and cannot change the numbered documents without
Leonardo's later decision.

## Repository boundary

This repository owns detailed game design, future source code, tests, assets,
and runtime configuration. Leonardo's private Career Center remains canonical
for project status, career evidence, and portfolio-readiness decisions.

`origin` is
`git@github.com:LeonardoPaccianiMori/portfolio-game-minor-revisions.git`.
Approved, checked, reviewed, and integrated `main` commits are pushed there
under the standing authorization recorded in `AGENTS.md`. A future public
release is planned to use MIT for code and CC BY 4.0 for Leonardo's original
non-code work. No public licence file is added now. Every third-party asset
keeps its own verified licence and attribution path.

## OpenCode workflow

- `opencode.json` fixes the main session model and default agent.
- `.opencode/agent/` defines the focused subagent roles; `.opencode/command/`
  defines the repeatable workflow prompts.
- `docs/implementation/specs/13-agent-work-orders-and-integration.md` is the
  authoritative model, permission, step-record, review, and integration
  contract.
- One approved development step at a time; every step needs its own exact plan
  and Leonardo's explicit approval.
