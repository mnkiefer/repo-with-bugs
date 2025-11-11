# Bug Bash Campaign - Coordinator Guide

## Pre-Event Setup

### 1. Repository Setup
- [ ] Ensure all code is committed
- [ ] **Hide or delete `BUGS_LIST.md`** before sharing repo
- [ ] Set up GitHub Issues with labels
- [ ] Add participants as contributors
- [ ] Test the application works correctly

### 2. Define Event Details
- [ ] Set start and end date/time
- [ ] Decide duration (recommended: 2-4 hours)
- [ ] Create communication channel (Slack/Teams)
- [ ] Prepare prizes/recognition

### 3. Communication
- [ ] Send invitation email with:
  - Event date and time
  - Repository URL
  - Links to README and BUGBASH_GUIDE
  - Setup instructions
  - Scoring system
  - Prizes
- [ ] Create calendar invite
- [ ] Reminder 1 day before
- [ ] Reminder 1 hour before

### 4. GitHub Setup

#### Labels to Create:
```
bug - #d73a4a - Something isn't working
critical - #b60205 - Critical severity
major - #ff6600 - Major severity  
minor - #ffcc00 - Minor severity
duplicate - #cccccc - Duplicate issue
wontfix - #ffffff - Won't be fixed
good-catch - #00ff00 - Excellent find
```

#### Milestones:
- Create milestone for the bug bash event
- Set due date

### 5. Leaderboard Setup
Create a spreadsheet to track:
- Participant name
- Bugs found (count)
- Points earned
- Quality score
- Bonus points

## During the Event

### Kickoff (First 15 minutes)
1. Welcome participants
2. Explain the rules
3. Demo the application
4. Show how to report bugs
5. Answer questions
6. Start timer!

### Monitoring
- [ ] Watch GitHub issues come in
- [ ] Mark duplicates quickly
- [ ] Answer questions in chat
- [ ] Give hints if needed
- [ ] Update leaderboard periodically
- [ ] Share interesting finds

### Real-Time Support
- Be available in communication channel
- Help with technical issues
- Clarify rules or severity levels
- Encourage participation

### Midpoint Update (Optional)
- Share current standings
- Highlight interesting bugs found
- Give time remaining announcement

## Scoring Guide

### Points by Severity:
- **Critical** (10 points): 
  - App crashes
  - Data loss
  - Security vulnerabilities
  - Features completely broken
  
- **Major** (5 points):
  - Feature doesn't work
  - Significant functionality impaired
  - Major UX issues
  
- **Minor** (2 points):
  - Cosmetic issues
  - Small functional problems
  - Code quality issues

### Quality Bonus:
- **+3 points**: Exceptional bug report with:
  - Video reproduction
  - Root cause analysis
  - Suggested fix
  
- **+1 point**: Very clear reproduction steps

### Deductions:
- **-1 point**: Duplicate report
- **-2 points**: Not actually a bug
- **-3 points**: Spam or joke issues

## Bug Validation Checklist

For each bug report, verify:
1. Can you reproduce it?
2. Is it a duplicate?
3. Is severity appropriate?
4. Are reproduction steps clear?
5. Is it really a bug or a feature request?

## After the Event

### Immediate (Within 1 hour)
1. Stop accepting new bug reports
2. Validate all remaining bugs
3. Calculate final scores
4. Update leaderboard
5. Announce winners!

### Follow-Up (Within 1 day)
1. Send thank you email to all participants
2. Share final statistics:
   - Total bugs found
   - Total participants
   - Most common bug types
   - Interesting insights
3. Share leaderboard
4. Announce prizes/recognition

### Post-Event Analysis (Within 1 week)
1. Review all bugs found vs planted bugs
2. Calculate find rate
3. Create summary report:
   - Bugs found: X/31 (or more if they found unintended ones!)
   - Participation rate
   - Most commonly found bugs
   - Rarest bugs found
   - Surprises
4. Share lessons learned
5. Plan bug fixes (even though bugs are intentional!)

## Sample Communications

### Invitation Email Template
```
Subject: Bug Bash Campaign - [Date]

Hi Team,

You're invited to participate in our Bug Bash Campaign!

📅 Date: [DATE]
⏰ Time: [TIME]
⏱️ Duration: [HOURS]

🎯 Goal: Find as many bugs as possible in our Task Manager application

🏆 Prizes:
- Most bugs found
- Best bug report quality
- Most critical bug found

📚 Resources:
- Repository: [URL]
- Setup Guide: [README URL]
- Bug Bash Guide: [GUIDE URL]

🔧 Setup Instructions:
1. Clone the repo
2. Run npm install
3. Run npm start
4. Start testing!

Questions? Reply to this email or ask in [CHANNEL]

See you there! 🐛
```

### Midpoint Update Template
```
⏰ Halfway point! ⏰

Great work so far! Here's where we stand:

🐛 Bugs found: [X]
👥 Active participants: [X]
🏆 Current leader: [NAME] with [X] points

Keep going! Remember to check for:
- Mobile responsiveness
- Edge cases
- Error handling

[TIME] remaining!
```

### Winner Announcement Template
```
🎉 Bug Bash Results! 🎉

Thank you all for participating!

📊 Final Stats:
- Total bugs found: [X]
- Total participants: [X]
- Total issues created: [X]

🏆 Winners:

🥇 Most Bugs Found: [NAME] - [X] bugs
🥈 Best Quality Reports: [NAME] - [SCORE]
🥉 Most Critical Bug: [NAME] - [BUG DESCRIPTION]

🎁 Prizes will be distributed [WHEN]

📝 Full results and learnings: [LINK]

Great job everyone! 🎊
```

## Tips for Success

### Do's:
- ✅ Keep energy high and positive
- ✅ Respond quickly to questions
- ✅ Celebrate good finds publicly
- ✅ Be fair and consistent in scoring
- ✅ Have fun!

### Don'ts:
- ❌ Don't reveal bug locations
- ❌ Don't play favorites
- ❌ Don't change rules mid-event
- ❌ Don't forget to document learnings

## Troubleshooting

### "Application won't start"
- Check Node.js is installed
- Verify port 3000 is available
- Check npm install completed successfully

### "Can't create issues"
- Verify they're added as contributor
- Check GitHub permissions

### "Is this a bug?"
- If unclear, ask for more details
- Encourage defensive reporting
- Can always recategorize later

## Metrics to Track

- Participation rate
- Bugs found per hour
- Average time to first bug
- Bug severity distribution
- Most active participants
- Quality of reports
- Coverage (which bugs were found)

## Post-Event Ideas

- Share bug hunting techniques that worked
- Recognize creative testing approaches
- Plan follow-up bug bash with different app
- Consider making it a regular event
- Create team testing guidelines based on learnings

---

Good luck coordinating! 🎯
