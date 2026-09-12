# B5 — Persistence and Recovery

Status: **Documented — approved by Leonardo on 2026-09-10 (Block B5).**

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
