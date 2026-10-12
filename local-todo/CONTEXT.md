# Task Management

Organizes tasks into named lists and tracks what is complete and what remains to be done.

## Language

**List**:
A named collection of tasks. Distinct lists may have the same name.
_Avoid_: Project, board

**Task**:
A to-do entry belonging to exactly one list, with a required title and a completion state. Tasks with identical titles are independent, even within the same list.
_Avoid_: Item, to-do item

**Completed task**:
A task marked as done; it can become an unfinished task again.
_Avoid_: Archived task, closed task

**Unfinished task**:
A task not currently marked as done.
_Avoid_: Active task, pending task

**Total count**:
The number of tasks in a list, including both unfinished and completed tasks but excluding deleted tasks, even while Undo is available.
_Avoid_: List size

**Completed count**:
The number of completed tasks in a list.
_Avoid_: Done total

**Remaining count**:
The number of unfinished tasks in a list.
_Avoid_: Pending count

**Combined counts**:
The total, completed, and remaining task counts summed across all lists. Each count is zero when there are no lists.
_Avoid_: List count, number of lists
