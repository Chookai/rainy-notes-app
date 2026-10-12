# Ticket 04 verification

Chrome DevTools MCP against the real app on port 3017 and its disposable persistent SQLite database.

- **Red:** no task deletion control existed before this slice.
- **Unfinished deletion/Undo:** removed Keyboard task without confirmation; counts became 4/1/3, then Undo restored original ordering and 5/1/4. Assertions waited for the completed UI update, not an intermediate React render.
- **Completed deletion/navigation:** deleted Finished note, reducing list counts to 4/0/4 and combined counts to 6/0/6. Navigated to the overview within the recovery window and restored it there, recovering combined counts 7/1/6.
- **Expiry/isolation:** deleted Plan the week in the original list; after 5.5 seconds its Undo was gone and counts remained 4/1/3. The matching task in the second list remained intact.
- **Multiple recoveries/presentation:** deleted two tasks in quick succession and restored both independently. Mobile dark notifications fit without horizontal overflow; desktop light controls were also exercised.
- **Refresh:** deleted Keyboard task, scheduled immediate browser refresh while Undo was available, and verified the task remained deleted with no recovery control.
- **Restart:** optimized production restart with the same database retained the final original-list tasks Next small step / Same task / Finished note and counts 3/1/2, with no Undo opportunity.
- **Checks:** typecheck, lint, and production build passed.

## Independent review

### Standards

One P2 naming suggestion: transition state was still called toggling after it also handled deletion. Renamed it to mutationPending. No documented breaches or blockers.

### Spec

0 findings; immediate persistence, independent deadlines, original state/identity/order, navigation, and recovery boundaries were source-verified. The keyboard verification limitation was acknowledged.

Summary: Standards 1 suggestion, applied; Spec 0 findings.

## Limitations

A separate keyboard-Undo attempt correctly focused the native Undo button but expired during the subsequent DevTools tool round trip, so that attempt is not recorded as a passing keyboard test. Undo is implemented as a native, focusable button with an accessible label; functional restoration was verified by browser clicks. Task-entry, editing, and completion keyboard paths were verified in earlier slices. No timer was extended to accommodate testing.

Server recovery tokens and client notifications are transient, not stored in SQLite. The original row identity/order is restored. Parent existence is checked during restoration; list-deletion invalidation is verified in ticket 05.
