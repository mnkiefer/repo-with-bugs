# Bug Bash Campaign - Bug List (Hidden)

## IMPORTANT: This file is for organizers only!
Do NOT share this with participants before the bug bash ends.

This document lists all intentionally planted bugs for reference.

---

## Backend Bugs (server.js)

### BUG 1: No Input Validation
- **Location**: POST `/api/tasks`
- **Issue**: Allows empty tasks to be created
- **Severity**: Major
- **Test**: Submit task with empty title/description

### BUG 2: Filter Not Working
- **Location**: GET `/api/tasks`
- **Issue**: Filter parameter ignored, always returns all tasks
- **Severity**: Major
- **Test**: Call API with `?filter=completed` or `?filter=active`

### BUG 3: No Task Existence Check
- **Location**: GET `/api/tasks/:id`
- **Issue**: Returns undefined without error when task doesn't exist
- **Severity**: Major
- **Test**: Request non-existent task ID

### BUG 4: Update Only Updates Title
- **Location**: PUT `/api/tasks/:id`
- **Issue**: Only updates title field, ignores description and priority
- **Severity**: Major
- **Test**: Try to update description or priority

### BUG 5: Race Condition in Toggle
- **Location**: PATCH `/api/tasks/:id/toggle`
- **Issue**: Artificial delay causes race condition if clicked multiple times
- **Severity**: Minor
- **Test**: Click complete button rapidly multiple times

### BUG 6: Delete Doesn't Actually Delete
- **Location**: DELETE `/api/tasks/:id`
- **Issue**: Returns success but doesn't remove task from array
- **Severity**: Critical
- **Test**: Delete task, then refresh - it's still there

### BUG 7: Case-Sensitive Search
- **Location**: GET `/api/tasks/search/:query`
- **Issue**: Search is case-sensitive, only searches title (not description)
- **Severity**: Minor
- **Test**: Search with different case or search for text in description

### BUG 8: Wrong Statistics Calculation
- **Location**: GET `/api/stats`
- **Issue**: Completion rate multiplied by 10 instead of 100
- **Severity**: Minor
- **Test**: Check completion rate with some completed tasks

---

## Frontend Bugs (app.js)

### BUG 9: Poor Error Handling
- **Location**: `loadTasks()` function
- **Issue**: Only logs error, doesn't show user-friendly message
- **Severity**: Minor
- **Test**: Stop server and reload page

### BUG 10: No Client-Side Validation
- **Location**: `handleAddTask()` function
- **Issue**: Sends empty data to server without validation
- **Severity**: Major
- **Test**: Submit form with empty fields

### BUG 11: Form Doesn't Reset
- **Location**: `handleAddTask()` function
- **Issue**: Form reset is commented out after adding task
- **Severity**: Minor
- **Test**: Add task, form fields remain filled

### BUG 12: Typo in Function Name
- **Location**: `handleAddTask()` function
- **Issue**: Calls `showNotificaton()` (typo) instead of `showNotification()`
- **Severity**: Minor (works because typo function exists)
- **Test**: Add task successfully

### BUG 13: Wrong API Endpoint for Search
- **Location**: `handleSearch()` function
- **Issue**: Uses `/api/tasks/search/` instead of correct endpoint
- **Severity**: Major
- **Test**: Commented in code but would fail

### BUG 14: Inverted Date Sort
- **Location**: `filterAndRenderTasks()` function
- **Issue**: Sorts newest first when should be oldest first (or vice versa)
- **Severity**: Minor
- **Test**: Create multiple tasks and sort by date

### BUG 15: Case-Sensitive Title Sort
- **Location**: `filterAndRenderTasks()` function
- **Issue**: Sorts by case-sensitive comparison
- **Severity**: Minor
- **Test**: Create tasks with different cases (aaa, AAA, bbb)

### BUG 16: No Confirmation Dialog
- **Location**: `deleteTask()` function
- **Issue**: Deletes without asking for confirmation
- **Severity**: Minor
- **Test**: Click delete button

### BUG 17: Optimistic Delete
- **Location**: `deleteTask()` function
- **Issue**: Removes from UI immediately even though server doesn't delete
- **Severity**: Major
- **Test**: Delete task, check it's gone, refresh page - it's back!

### BUG 18: Invalid Date Handling
- **Location**: `formatDate()` function
- **Issue**: Doesn't handle invalid dates gracefully
- **Severity**: Minor
- **Test**: Would show "Invalid Date" if bad data received

### BUG 19: Notification Not Implemented
- **Location**: `showNotification()` functions
- **Issue**: Just uses alert() instead of proper notification UI
- **Severity**: Minor
- **Test**: Trigger any notification

### BUG 20: Function Name Typo
- **Location**: Global scope
- **Issue**: `showNotificaton()` with typo exists alongside correct version
- **Severity**: Minor
- **Test**: Code smell, causes confusion

---

## CSS Bugs (styles.css)

### BUG 21: Typo in Border Property
- **Location**: `header` style
- **Issue**: `border-botto` instead of `border-bottom`
- **Severity**: Minor
- **Test**: Header has no bottom border

### BUG 22: Stats Panel Doesn't Wrap
- **Location**: `.stats-panel` style
- **Issue**: `flex-wrap: nowrap` prevents wrapping on small screens
- **Severity**: Major (mobile)
- **Test**: Resize window, cards overflow

### BUG 23: Stat Card Min-Width Too Large
- **Location**: `.stat-card` style
- **Issue**: `min-width: 300px` causes horizontal scroll on mobile
- **Severity**: Major (mobile)
- **Test**: View on mobile or small window

### BUG 24: Controls Don't Wrap
- **Location**: `.controls` style
- **Issue**: `flex-wrap: no-wrap` (should be `nowrap` or better `wrap`)
- **Severity**: Minor
- **Test**: Resize window, controls may overflow

### BUG 25: Task List Min-Height Too Small
- **Location**: `.task-list` style
- **Issue**: `min-height: 10px` instead of reasonable value like `200px`
- **Severity**: Minor (cosmetic)
- **Test**: Empty task list looks weird

### BUG 26: Box Shadow Commented Out
- **Location**: `.task-item` style
- **Issue**: Box shadow is commented out
- **Severity**: Minor (cosmetic)
- **Test**: Task items have no shadow

### BUG 27: Position Typo
- **Location**: `.close` style in modal
- **Issue**: `position: relatve` instead of `relative`
- **Severity**: Minor
- **Test**: Close button position may be off

### BUG 28: Wrong Media Query
- **Location**: Media query at bottom
- **Issue**: `min-width: 768px` should be `max-width: 768px`
- **Severity**: Critical (mobile)
- **Test**: Mobile styles never apply!

### BUG 29: Empty CSS Rule
- **Location**: `.task-empty` style
- **Issue**: Empty rule with no properties
- **Severity**: Minor (code smell)
- **Test**: Unused code

### BUG 30: Z-Index Conflict
- **Location**: `.task-item` style at bottom
- **Issue**: All task items have `z-index: 1000` same as modal
- **Severity**: Minor
- **Test**: May cause stacking issues

---

## HTML Bugs (index.html)

### BUG 31: Event Handlers in onclick
- **Location**: Task item buttons
- **Issue**: Uses inline `onclick` which is not best practice
- **Severity**: Minor (code quality)
- **Test**: Works but not modern approach

---

## Total Bugs: 31

### Breakdown by Severity:
- Critical: 2
- Major: 8  
- Minor: 21

### Breakdown by Category:
- Backend/API: 8
- Frontend/JavaScript: 12
- CSS/Styling: 10
- HTML: 1

---

## Expected Findings

Most participants should find:
- The obvious functional bugs (filter, delete, update)
- Mobile responsiveness issues
- Missing validation

Advanced participants may find:
- Race conditions
- Code quality issues
- Performance concerns
- Security issues (no rate limiting, no auth, XSS potential)

## Bonus Bugs (Not Intentional but Realistic)

Participants might also find:
- No loading states
- No empty state designs
- No pagination for large lists
- No task due dates
- No task categories
- No dark mode
- No offline support
- No internationalization
- Accessibility issues (missing ARIA labels, poor contrast)
- No unit tests!
