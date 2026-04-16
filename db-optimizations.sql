-- Database Indexes for API Performance Optimization
-- Run this in your PostgreSQL database (psql, pgAdmin, etc.)
-- These target the slow queries: users, transactions, referrals

-- Indexes for /api/users (JOINs on user_id, lookup by referral_code)
CREATE INDEX IF NOT EXISTS idx_users_id ON users(id);
CREATE INDEX IF NOT EXISTS idx_user_profiles_user_id ON user_profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_user_contacts_user_id ON user_contacts(user_id);
CREATE INDEX IF NOT EXISTS idx_user_addresses_user_id ON user_addresses(user_id);
CREATE INDEX IF NOT EXISTS idx_users_referral_code ON users(referral_code);

-- Indexes for /api/transaction (user_id, created_at for ORDER BY, type filter)
CREATE INDEX IF NOT EXISTS idx_transactions_user_id_created_at ON transactions(user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_transactions_type_created_at ON transactions(type, created_at DESC);

-- Indexes for /api/portal/member (referred_by, referral_code, created_at)
CREATE INDEX IF NOT EXISTS idx_users_referred_by_created_at ON users(referred_by, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_referral_rewards_referrer_id ON referral_rewards(referrer_id);
CREATE INDEX IF NOT EXISTS idx_orders_user_id_product_id ON orders(user_id, product_id);

-- Additional for aggregates/JOINs
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON orders(user_id);

-- Analyze tables for stats
ANALYZE users;
ANALYZE transactions;
ANALYZE user_profiles;
ANALYZE user_contacts;
ANALYZE user_addresses;
ANALYZE referral_rewards;
ANALYZE orders;

-- Verify indexes created
-- SELECT schemaname, tablename, indexname FROM pg_indexes WHERE tablename IN ('users', 'transactions', 'user_profiles', 'user_contacts', 'user_addresses', 'referral_rewards', 'orders');
