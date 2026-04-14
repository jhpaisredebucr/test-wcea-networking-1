# Sign-out Fix Progress

## Steps:
- [x] 1. Create src/app/api/auth/signout/route.js (server-side cookie clear)
- [x] 2. Edit src/app/components/layout/DashboardSideBar.js (client-side call API)
- [ ] 3. Test implementation

## Status
Steps 1-2 complete. 

**Test:**
1. `npm run dev`
2. Login (via signin).
3. Go to dashboard, click Sign Out.
4. Check DevTools > Application > Cookies > http://localhost:3000 > no 'token'.
5. Try /u/dashboard → middleware redirects to /.
