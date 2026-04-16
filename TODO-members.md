# Extension: Add refresh to admin/members approve buttons

## Steps:
- [ ] Step 1: Update src/app/u/admin/members/page.js - Extract fetch logic to refreshDashboard fn, pass onRefresh to MembersAdmin.
- [ ] Step 2: Update src/app/components/ui/admin/Members.js - Add onRefresh prop, call after successful Approve().
- [ ] Step 3: Update src/app/components/ui/admin/MemberCard.js - Extract fetchData, pass onRefresh to Transactions.
- [ ] Step 4: Test - Admin/members → approve → list/modal transactions refresh.

All steps complete. Admin approve buttons on members page now refresh UI after approval.

