# Transaction Views + Admin Members Search Fixes

## Steps:
- [ ] 1. Create TODO-v2 (done)
- [x] 2. Fix duplicate useEffect in src/app/u/admin/transactions/page.js and src/app/u/transactions/page.js
- [x] 3. Add refresh button to transaction pages
- [x] 4. Add pagination support to src/app/components/ui/member/Transactions.js (use ?limit=50&offset=0)
- [x] 5. Add username search to src/app/u/admin/members/page.js + src/app/components/ui/admin/Members.js (filter or API param)
- [x] 6. Update /api/users/route.js for username search param if needed (client filter used)
- [x] 7. Test all views, complete

**Summary:** Transactions views fixed (duplicates removed, refresh/pagination/load more added). Admin members now has username search + clear button. Revenue previously fixed. All working.


