# SubGuard User Guide

Welcome to SubGuard! This guide walks you through every feature of the application in plain language. No technical knowledge required.

## What is SubGuard?

SubGuard helps you track whether your subcontractors have valid insurance. Before paying a subcontractor on a construction project, general contractors need to verify that Workers' Compensation and General Liability insurance policies are current. SubGuard replaces the spreadsheets, phone calls, and email chains you've been using to manage this process.

## How to Log In

1. Open SubGuard in your web browser
2. On the login screen, enter your email address
3. Enter your password
4. Click **Sign In**

### Demo Accounts

For testing, you can use these accounts (any password works):

| Email | What you'll see |
|-------|----------------|
| dawn@subguard.io | Full consultant view (all GC clients) |
| sarah@acentralabs.com | Admin view |
| mark@tvbuilders.com | Contractor view |
| tom@beckettins.com | Insurance agent view |

## Pages & Features

### Dashboard

The Dashboard is your home base. When you log in, this is what you see first.

**What's on this page:**
- **Top row of cards**: Quick numbers showing how many GC clients you have, total subcontractors, how many are compliant (green), expiring soon (yellow), and expired/missing (red)
- **Compliance Rate**: A percentage showing overall compliance with a progress bar
- **Quick Actions**: Shortcuts to common tasks
- **Upcoming Expirations**: Certificates that are expiring soonest, so you know what needs attention
- **GC Client Summary**: A table showing each GC with their compliance rate

**What you can do:**
- Click **+ Add Subcontractor** to register a new sub
- Click **View Certificates** to see all certificates
- Click **Run Compliance Check** to trigger a check across all subs

### GC Clients

This page shows all General Contractor companies you manage.

**What's on this page:**
- A searchable list of GC companies
- Each card shows the company name, contact person, location, and compliance stats
- Below each company, you can see which subcontractors are assigned and their status

**What you can do:**
- Use the search box to find a specific GC by name, contact, or location
- Click **+ Add Sub** to add a new subcontractor to that GC
- Review compliance rates and insurance requirement minimums for each GC

### Subcontractors

This page lists every subcontractor across all your GC clients.

**What's on this page:**
- A list of all subcontractors with their compliance status
- Each sub shows their business type, EIN, and assigned GC
- Certificate status cards for Workers' Comp and General Liability
- Sole proprietor warnings (orange) when relevant

**What you can do:**
- **Search** by name or EIN using the search box
- **Filter** by status: All, Compliant, Expiring, Expired, or Pending
- Click **View Certs** to see a sub's certificates
- Click **+ Add Subcontractor** to register a new sub

**Understanding status colors:**
- **Green (Compliant)**: Insurance is current and verified
- **Yellow (Expiring)**: Insurance expires within 30 days — action needed soon
- **Red (Expired)**: Insurance has lapsed — do not pay until renewed
- **Gray (Pending)**: Waiting for certificate submission

### Add Subcontractor

This form lets you register a new subcontractor in the system.

**Required fields (marked with *):**
- Company Name
- Business Type (LLC, Sole Proprietor, or Corporation)
- EIN / Tax ID (format: XX-XXXXXXX)
- Assign to GC (which general contractor this sub works for)

**Optional fields:**
- Contact person name, email, phone
- Sole Proprietor checkbox (triggers a risk warning about Idaho Code §72-216)
- Insurance Agent information (name, agency, email, phone)

**Steps to add a sub:**
1. Click **+ Add Subcontractor** from the Dashboard or Subcontractors page
2. Fill in the required fields
3. If the sub is a sole proprietor, check the box and review the risk notice
4. Optionally add their insurance agent's contact info
5. Click **Add Subcontractor**
6. You'll see a success message and be taken back to the Subcontractors list

### Certificates

This page tracks all insurance certificates (Workers' Comp and General Liability).

**What's on this page:**
- Every certificate on file, with status, policy details, and expiration dates
- Filter controls for status, type (WC or GL), and GC client

**What you can do:**
- **Filter** certificates by status, type, or GC to narrow your view
- **Mark Compliant**: Click the green button to confirm a certificate is valid
- **Request Verification**: Send a verification request to the insurance agent
- Review policy numbers, carriers, coverage limits, and whether additional insured is listed

### Agent Portal

This page simulates the experience insurance agents have when they receive a verification request.

**How it works in production:**
1. You send a verification request from the Certificates page
2. The agent receives an email with a secure link
3. The agent clicks the link and sees three options (no login required)

**The three response options:**

- **Option A — Upload New Certificate**: The agent fills in policy details and uploads a new COI PDF
- **Option B — Confirm Coverage is Still Valid**: One-click confirmation that the existing policy is still active
- **Option C — No Longer This Sub's Agent**: The agent indicates they no longer represent this subcontractor and can optionally provide the new agent's contact

After responding, the agent sees a confirmation message. You receive a notification in SubGuard.

### Reports

This page gives you a bird's-eye view of compliance across all your GC clients.

**What's on this page:**
- Overall compliance rate, total subs, compliant count, and non-compliant count
- Workers' Comp and General Liability breakdowns
- GC-by-GC compliance table with compliant, expiring, and expired counts
- List of certificates expiring within 60 days

**What you can do:**
- Click **Export CSV** to download report data (connects to backend in production)
- Review which GCs need the most attention
- Identify certificates that need immediate renewal

## Common Workflows

### How to Check Compliance Before a Payment Draw

1. Go to the **Dashboard**
2. Look at the GC Client Summary table
3. Find the GC whose draw is coming up
4. Check their compliance rate — it should be 100% (or close to it)
5. If any subs show yellow or red, go to **Certificates** and filter by that GC
6. Click **Request Verification** on any non-compliant certificates
7. Wait for agent responses, then verify updated certificates

### How to Add a New Subcontractor

1. Click **+ Add Subcontractor** (from Dashboard or Subcontractors page)
2. Enter the sub's company name, business type, and EIN
3. Select which GC they're working for
4. Add their insurance agent's contact info if you have it
5. Click **Add Subcontractor**
6. Go to Certificates and request verification for their coverage

### How to Handle an Expired Certificate

1. Go to **Certificates** and filter by "Expired"
2. Find the expired certificate
3. Click **Request Verification** to email the agent
4. When the agent responds (uploads new cert or confirms), click **Mark Compliant**
5. The sub's status will update across the system

## Frequently Asked Questions

**Q: What does "Sole Proprietor" mean and why does it show a warning?**
A: In Idaho, sole proprietors can exempt themselves from carrying Workers' Comp insurance on themselves. However, under Idaho Code §72-216, if they don't have coverage and get injured on your GC's job, the GC becomes legally responsible. The warning reminds you to verify coverage or get a signed exemption.

**Q: Can insurance agents see my other clients' information?**
A: No. Agents only see the specific verification request sent to them. They cannot browse the system or see other GCs' data.

**Q: What if an agent says they're no longer the sub's agent?**
A: You'll be notified, and you can update the sub's agent information. You'll need to send a new verification request to the correct agent.

**Q: How often should I check compliance?**
A: At minimum, before every payment draw. The Dashboard highlights expiring certificates so you can address them proactively.

**Q: Can I use SubGuard on my phone?**
A: Yes. SubGuard works on any modern phone or tablet browser. The interface adjusts automatically for smaller screens.

## Troubleshooting

**Page won't load or shows a blank screen:**
- Refresh the page in your browser
- Clear your browser cache
- Try a different browser (Chrome, Firefox, Safari, or Edge)

**Can't log in:**
- Double-check your email address for typos
- Make sure you're using the correct account
- For demo mode, any password works with the listed demo emails

**Data isn't updating:**
- Changes are reflected immediately in the current session
- If working with multiple tabs, refresh the other tab to see updates

**Buttons aren't responding:**
- Check your internet connection
- Look for a loading spinner — the action may be processing
- If stuck, refresh the page and try again

## Need Help?

Contact the SubGuard team at [Acentra Labs](https://acentralabs.com) for support, feature requests, or bug reports.
