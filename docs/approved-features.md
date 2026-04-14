# Approved Features: SubGuard

## Team Consensus
- Team: opencode-team
- Lead judge: Lead [claude/claude-opus-4-6]

{"type":"result","subtype":"success","is_error":false,"duration_ms":201277,"duration_api_ms":202833,"num_turns":6,"result":"Feature decomposition written to **`FEATURES.md`**. Here's the summary:\n\n**Winning choice: Blended** — primarily Agent 2's structure with additions from Agents 1 and 9.\n\n### What shipped\n\n**7 MUST HAVE features** (realistic for 3-5 day prototype):\n1. Auth & Role-Based Dashboard Shell\n2. GC Client Management\n3. Subcontractor CRUD + Status Badges\n4. Certificate Tracking (WC + GL)\n5. Compliance Dashboard with KPIs\n6. Agent Verification Portal (no-login email link)\n7. Document Upload & Storage\n\n**9 NICE TO HAVE** — including calendar view, bulk requests, draw grouping, email templates, CSV export\n\n**11 FUTURE** — AI parsing, automated alerts, IIC API, white-label, sub self-service\n\n**Full Supabase-ready data model** with 10 tables, proper constraints, indexes, and RLS-ready architecture. No `password_hash` in custom tables — Supabase Auth handles it via a `profiles` extension table.\n\n**Complete route map** (15 routes), **NPM package table** by feature, and **10-step build order** with dependency graph.
