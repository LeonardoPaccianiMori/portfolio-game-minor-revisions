# B5 — Persistence and Recovery

Status: **Documented — approved by Leonardo on 2026-09-10 (Block B5); revised
2026-09-13 with the development-save decision and 2026-09-15 with the archive
entry shape.**

## Database (approved)

One local IndexedDB database, `minor-revisions`, with these stores:

| Store      | Contents                                             | Key        |
| ---------- | ---------------------------------------------------- | ---------- |
| `campaign` | One active serialized campaign state                 | `active`   |
| `backup`   | The last known good campaign state                   | `backup`   |
| `settings` | Local preferences: accessibility, audio, controls    | `settings` |
| `archive`  | Completed runs: ending cards and personnel files     | run ID     |
| `meta`     | Schema version, content version, and save timestamps | `meta`     |

No other browser storage is used for game data, and nothing leaves the machine.

An archived entry holds the caller-supplied run ID and archive timestamp, the
seed, the ending, the cause, the resolving week, and the personnel file. The
application layer supplies the ID and timestamp, so the rules never read the
clock; the store lists entries newest first and validates every entry it reads
and writes.

## Save points (approved)

- Autosave at each week boundary and after scene resolution.
- The player can also save at safe points, and the interface states when saving
  is safe.
- Closing the game never advances time or resolves pending events.

## Campaign lifecycle (approved)

- One active campaign at a time.
- New Game requires explicit confirmation and replaces the active campaign.
- The archive retains completed runs and never blocks a new game.
- Completing or deleting a run updates the archive without touching settings.

## Recovery (approved)

- Every load validates shape and version.
- On corruption, offer the last-known-good backup with a plain explanation.
- Never guess, repair silently, or partially accept a save.
- If no valid save exists, offer a new campaign; invalid data is preserved
  until the player clears it.

## Migration (approved)

- Forward-only, versioned migrations.
- An incompatible or unknown save is refused and preserved.
- A content version change cannot silently reinterpret old facts.

## Development saves (approved 2026-09-13)

While the schema is incomplete, the state version stays 1 and saves are
development-only: an outdated shape is refused safely, not migrated. Versioned
migrations begin at the first release candidate and are owned by STEP-034.

## Clear data (approved)

- One explicit, confirmed destructive action clears the database.
- It states exactly what is removed: campaign, backup, archive, and settings.
- Local only; there is no account or remote deletion.

## Privacy and concurrency (approved)

- No accounts, telemetry, analytics, or external sync.
- A stale tab cannot overwrite a newer save: writes check the stored revision
  and refuse with a plain message.
- Storage unavailable, quota exceeded, and blocked upgrades have their own
  clear failure messages.

## Open items moved to later blocks

- Exact serialized field names and transaction boundaries (implementation).
- Content version linkage (B4 and implementation).
- Fixtures and acceptance evidence (B10).
