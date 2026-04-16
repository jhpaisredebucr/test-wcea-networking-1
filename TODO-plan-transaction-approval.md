# Plan Transaction Approval on User Status Change

**Goal:** When admin approves user status, auto-approve their signup plan transaction (type='plan').

**Info Gathered:**
- Transaction approval API (`src/app/api/transaction/approve/route.js`): Updates status to 'approved'.
- No auto-creation of signup transactions (signup route doesn't insert).
- Transactions component (`src/app/components/ui/member/Transactions.js`): Approve button calls approve API.
- Users table has status field.
- Plan transactions likely created elsewhere (not found).

**Plan:**
1. [ ] Create TODO (done)
2. [ ] Find/create signup transaction logic
3. [ ] Enhance user approval API to check/approve plan txn
4. [ ] Update admin member approval button/component
5. [ ] Test
6. [ ] Complete

**Current:** Analyzing signup flow.


