// Help texts for the superiors: the ? panel on each page (help.js) and the full
// guide (help.html) are both built from this list. Only this file differs per
// clan site; help.js and help.html are the same on every site.
//
// Writing rules, so Google Translate gives a good Turkish (or other) text:
//   - short sentences, one idea each, simple words, no slang
//   - name buttons exactly as on the page, with their emoji, in **bold**
//   - plain text only, except **bold** (no HTML)
//
// Per page:
//   file     the page it belongs to (the ? panel shows on that page)
//   summary  one or two sentences: what the page is for
//   parts    [{ title, text }] or [{ title, list: [...] }]: what you see and can do
//   howto    [{ q, steps: [...] }]: step-by-step tasks (only in the full guide)
//   owner    true on a part only the clan leader sees
window.HELP_CONTENT = {
  clanName: 'cCc Masters Of Battle',

  // General chapters at the top of the full guide.
  intro: [
    {
      id: 'start',
      title: '👋 Welcome, superior',
      text: [
        'This guide explains the clan website for superiors.',
        'Superiors can open the management pages and make changes. Regular members only see the Dashboard, the Calendar and their own profile.',
        'On every page you see a round **?** button next to the page title. Click it for a short explanation of that page. Only superiors see this button.'
      ]
    },
    {
      id: 'language',
      title: '🌐 Read the site in your own language',
      text: [
        'Click **🇹🇷 Türkçe** at the top of this guide or in the panel of any **?** button. The whole site is then shown in Turkish. Click **English** to go back.',
        'For other languages: use the 🌐 language box at the bottom right of each page, or the translate button of your browser (Chrome: right-click → Translate).',
        'The translation is done by a computer. Button names may be translated a little differently. The emoji on a button (for example 💾) stays the same, so look for the emoji.'
      ]
    },
    {
      id: 'login',
      title: '🔑 Signing in',
      text: [
        'Click **🔑 Login** at the top right and sign in with your Google account.',
        'Your Google account must be linked to your clan name. If you do not see the management pages after signing in, ask the clan leader to link your account and to make you a superior.',
        'You stay signed in for 30 days on the same device. Click **Logout** on a shared computer.'
      ]
    },
    {
      id: 'words',
      title: '📚 Important words',
      list: [
        '**Period**: the stretch of time in which chest points are counted. The Dashboard shows its start and end date. When a period ends, a new one starts.',
        '**Required points / target**: the number of chest points a member must collect in a period.',
        '**Chest points**: every chest a member opens is worth a number of points. The list is under **📋 Chest Points** on the Dashboard.',
        '**Chesttracker**: the program that reads the opened chests from the game and sends them to the website.',
        '**Penalty**: what a member gets for missing a target: silver (paid to the clan bank) or extra points on their next target.',
        '**Exemption**: a member who gets no automatic penalties (for example on holiday).',
        '**Troop category**: the troop level of a member, for example G7 (Guardsmen level 7) or T8. Used for troop targets in events.',
        '**Superior**: a member who may use the management pages.'
      ]
    },
    {
      id: 'safe',
      title: '🛟 Working safely',
      list: [
        'Changes are saved for the whole clan at once. Everybody sees them.',
        'When the site asks "Are you sure?", read the question before you click OK. Deleting cannot be undone.',
        'A green message at the bottom means the change was saved. A red message means something went wrong: nothing was saved.',
        'Not sure? Use the 👁️ preview buttons first, or ask the clan leader.'
      ]
    }
  ],

  pages: [
    {
      file: 'dashboard.html',
      icon: 'chest.png',
      title: 'Dashboard',
      who: 'Everyone',
      summary: 'Shows the chest points of every member in the current period, compared to the required points.',
      parts: [
        { title: 'Active Period / Previous Period', text: 'Switch between the current period and the period before it.' },
        { title: '⏳ Period Ends In', text: 'The time left until the current period ends.' },
        { title: 'The numbers at the top', text: 'Number of chests, total points of the clan, required points per member, and the number of members.' },
        { title: 'Colours', list: [
          '**Green**: the member has the required points.',
          '**Orange**: the member has at least 90% of the required points.',
          '**Red**: the member has less than 90%.'
        ] },
        { title: 'Player Rankings', text: 'All members, highest points first. Type a name in the filter box to find a member. Click a column title to sort. Click **▶** next to a crypt type to see the chests per level.' },
        { title: '📋 Chest Points', text: 'Opens the list of how many points each chest is worth. Use the search box to find a chest.' }
      ],
      howto: [
        { q: 'How do I check who is behind on the target?', steps: [
          'Open the Dashboard.',
          'Look at the red and orange names in **Player Rankings**.',
          'Check **⏳ Period Ends In** to see how much time they still have.'
        ] },
        { q: 'A member says chests are missing. What do I check?', steps: [
          'Look at **Last Imported** under the period name. Chests opened after that time are not counted yet.',
          'If the name in the chests is spelled wrong, see **Members → 🔧 Fix Chest Names**.'
        ] }
      ]
    },

    {
      file: 'events.html',
      icon: 'events.png',
      title: 'Events',
      who: 'Superiors',
      summary: 'Create clan events, record who took part, and give penalties to members who missed the event target.',
      parts: [
        { title: '📋 Manage', text: 'The list of events. Use **🟢 Active**, **🕐 Recent**, **📋 All** and **📁 Ended** to choose which events you see. In **Actions** you can edit or delete an event.' },
        { title: '📊 Chest Events', text: 'Events counted from chests (for example crypts during an event). Choose the event and click **🔄 Recalculate** to count the participation again from the chests.' },
        { title: '✏️ Manual Events', text: 'Events where you type in the points yourself. Choose the event, choose a member, type the points and click **💾 Save**.' },
        { title: '🎖️ Troop Events', text: 'Events with a different target per troop category (for example G7 or T8). Type the points, then click **🔄 Calculate Status**.' },
        { title: '➕ Create Event', text: 'Make a new event by hand, or click **📅 Generate Events** to make the coming events from the calendar automatically.' },
        { title: '⚙️ Event Types', text: 'The kinds of events (for example Ragnarok) and how each kind is counted: from chests, from troops, by hand, or as a period marker.' },
        { title: 'The buttons below each event', list: [
          '**Fill Non-Participants**: marks every member without an entry as "did not take part".',
          '**👁️ Preview Penalties**: shows which penalties would be given. Nothing is saved yet.',
          '**⚖️ Recalculate Penalties**: gives the penalties for real. Silver penalties go to the Bank. Point penalties raise the member\'s target.'
        ] }
      ],
      howto: [
        { q: 'How do I make the events for the coming month?', steps: [
          'Open **➕ Create Event**.',
          'Under **📅 Generate Upcoming Events from Calendar**, choose **Next 30 days**.',
          'Leave **All** ticked, or tick only the event types you want.',
          'Click **📅 Generate Events**. Events that already exist are skipped.'
        ] },
        { q: 'How do I enter the points of a manual event?', steps: [
          'Open **✏️ Manual Events** and choose the event.',
          'Choose a member, type the points and click **💾 Save**.',
          'Many members? Click **📋 Batch**. Choose a member, type the points and press Enter. Repeat. Click **💾 Save All** at the end.',
          'When everybody is entered, click **Fill Non-Participants**.'
        ] },
        { q: 'How do I give the penalties after an event?', steps: [
          'Choose the event on its tab (Chest, Manual or Troop).',
          'Make sure all points are entered, and click **Fill Non-Participants**.',
          'Click **👁️ Preview Penalties** and check the list.',
          'Is the list correct? Click **⚖️ Apply These Penalties**.',
          'Members on **🛡️ Exemptions** (Members page) get no penalty.'
        ] },
        { q: 'How do I create one event by hand?', steps: [
          'Open **➕ Create Event**.',
          'Type the name, choose the type, the start date, the end date and the target points.',
          'Want a penalty for a missed target? Tick **Enable missed-target penalty**, choose Silver or Points, and type the highest penalty. A member who missed half the target gets half the penalty.',
          'Click **Save Event**.'
        ] }
      ]
    },

    {
      file: 'members.html',
      icon: 'members.png',
      title: 'Members',
      who: 'Superiors',
      summary: 'The list of clan members with their troop levels and hero level. Here you add and remove members and set targets, exemptions and chest points.',
      parts: [
        { title: 'The member list', text: 'At the bottom of the page. Click a column title to sort. Per member: **⚔️** change troops, **🦸** change hero level, **✏️** rename (when the name changed in the game).' },
        { title: '👥 Member Management', list: [
          '**⚔️ Track Troops**: save the troop levels (G, S, M, E) and Carter level of a member.',
          '**🦸 Hero Level** and **🏗️ Carter Level**: save these levels. **📋 Batch Entry** lets you enter many members at once.',
          '**🔐 Login Accounts**: link a member to a Google account, so they can sign in.',
          '**➕ Add Member**: add a new member with the date they joined.',
          '**🚪 Remove Member**: a member who left. They are moved to the former members.'
        ] },
        { title: '⚙️ Member Configuration', list: [
          '**🎯 Point Targets**: a different target for one member in one period.',
          '**🛡️ Exemptions**: members who get no automatic penalties.',
          '**📦 Chest Points**: points per member for the last 5 periods.',
          '**🏷️ Chest Point Values**: how many points each chest is worth.',
          '**🔧 Fix Chest Names**: move chests that were saved under a wrongly read name to the right member.',
          '**🔤 OCR Corrections**: words the chesttracker reads wrong, and the correct word.'
        ] },
        { title: '👑 Superiors and ➕ Manual Chests', owner: true, text: 'Only the clan leader sees these tabs. **👑 Superiors** decides who may use the management pages. **➕ Manual Chests** adds chests the chesttracker missed.' }
      ],
      howto: [
        { q: 'A new member joined. What do I do?', steps: [
          'Open **➕ Add Member**. Type the player name exactly as in the game, and the join date. Click **➕ Add Member**.',
          'Open **⚔️ Track Troops**, choose the member, fill in the troop levels and click **💾 Save Changed Levels**.',
          'Does the member want to sign in? Open **🔐 Login Accounts**, type their Google e-mail next to their name and click **💾 Save Linked Accounts**.'
        ] },
        { q: 'A member left the clan. What do I do?', steps: [
          'Open **🚪 Remove Member**.',
          'Choose the member and the date they left. Type a reason if you want.',
          'Click **🚪 Remove Member** and confirm. Their history is kept with the former members.'
        ] },
        { q: 'A member changed their name in the game.', steps: [
          'Find the member in the list at the bottom.',
          'Click **✏️**, type the new name and click OK.',
          'Do not use **🔧 Fix Chest Names** for this. That tab is only for names the chesttracker read wrong.'
        ] },
        { q: 'A member goes on holiday.', steps: [
          'Open **⚙️ Member Configuration** → **🛡️ Exemptions**.',
          'Tick the member and click **💾 Save Exemptions**.',
          'Remove the tick when they are back, and save again.'
        ] },
        { q: 'One member needs a lower or higher target.', steps: [
          'Open **⚙️ Member Configuration** → **🎯 Point Targets**.',
          'Choose the period. Type the target next to the member. Leave it empty to use the normal target.',
          'Click **💾 Save Point Targets**.'
        ] }
      ]
    },

    {
      file: 'profiling.html',
      icon: 'profiling.png',
      title: 'Profiling',
      who: 'Superiors',
      summary: 'A score from 0 to 100 for every member, to see who performs well and who needs attention.',
      parts: [
        { title: 'How the score is made', list: [
          '**Target**: how much of the period target the member reached.',
          '**Events**: how well the member did in the events of the last 60 days.',
          '**Consistency**: in how many of the last 5 periods the member had chest points.',
          '**Warnings**: every warning takes 25% off this part.',
          'The weight of each part is shown on the page. A part with nothing to count (for example a new member without events) is left out.'
        ] },
        { title: '🏆 Rankings', text: 'All members from the best to the lowest score. Click a name to see the details.' },
        { title: '👤 Individual', text: 'Choose a member to see their score, every part of it, and the details.' }
      ],
      howto: [
        { q: 'How do I prepare a talk with a weak member?', steps: [
          'Open **👤 Individual** and choose the member.',
          'Look at **Full Breakdown**: which part has the lowest score?',
          'Check the **Warnings** page for their earlier warnings.'
        ] }
      ]
    },

    {
      file: 'warnings.html',
      icon: 'warning.png',
      title: 'Warnings',
      who: 'Superiors',
      summary: 'Give warnings to members and see all earlier warnings.',
      parts: [
        { title: '📋 Overview', text: 'All members who have warnings, with the number of warnings. **🧹** deletes all warnings of a member.' },
        { title: '➕ Issue Warning', text: 'Give a new warning: choose the member, the warning number (1st to 5th), the reason, and write a comment if you want.' },
        { title: '🎯 Auto-warn Custom Targets', text: 'Gives the warning "Penalty target for chests" to every member who got a penalty target (on 🎯 Point Targets) and does not have that warning yet.' },
        { title: '📜 History', text: 'All warnings, newest first. Filter on a member or on a reason. **🗑️** deletes one warning.' }
      ],
      howto: [
        { q: 'How do I give a warning?', steps: [
          'Open **📜 History** and choose the member. See how many warnings they already have.',
          'Open **➕ Issue Warning**.',
          'Choose the member, the next warning number and the reason. Write a short comment.',
          'Click **⚠️ Issue Warning**.'
        ] },
        { q: 'I gave a warning by mistake.', steps: [
          'Open **📜 History** and choose the member.',
          'Click **🗑️** on the wrong warning and confirm. This cannot be undone.'
        ] }
      ]
    },

    {
      file: 'calendar.html',
      icon: 'calendar.png',
      title: 'Calendar',
      who: 'Everyone',
      summary: 'The clan events per month.',
      parts: [
        { title: 'The month', text: 'Use **◀** and **▶** to go to another month. **Today** brings you back to this month.' },
        { title: 'An event', text: 'Click an event to see its type, dates, how it is counted and its target.' },
        { title: '📌 Upcoming & Active Events', text: 'The events that are running now or start soon.' },
        { title: 'Where do the events come from?', text: 'From the Events page. Use **📅 Generate Events** there to fill the calendar.' }
      ]
    },

    {
      file: 'bank.html',
      icon: 'bank.png',
      title: 'Bank',
      who: 'Superiors',
      summary: 'The silver of the clan bank: how much every member has, and every deposit, withdrawal, transfer and penalty.',
      parts: [
        { title: 'The numbers at the top', text: '**Total Bank Balance** is all silver in the bank. **Outstanding Debts** is the silver members still owe.' },
        { title: 'Transaction Entry', list: [
          '**Deposit**: a member gives silver to the bank.',
          '**Withdrawal**: a member takes silver out.',
          '**Transfer to member**: silver goes from one member to another.',
          '**Penalty**: a silver penalty (penalties from events are added here automatically).',
          '**Percentage Fee**: a fee the bank keeps on a deposit. A deposit of 1,000 with 10% fee gives a balance of 900.'
        ] },
        { title: "Members' Balances / Transaction History", text: 'Switch between the balance of every member and the list of all transactions. Use the filters to find a name.' },
        { title: 'Export Members Owing Silver (CSV)', text: 'Downloads a list of members with a negative balance, to share in the game.' }
      ],
      howto: [
        { q: 'A member deposited silver. What do I do?', steps: [
          'Under **Transaction Entry**, choose the member.',
          'Choose **Deposit** and type the amount. Fill in the fee if the clan uses one.',
          'Leave the date empty for today. Write a remark, for example "repayment".',
          'Click **Submit Transaction**.'
        ] },
        { q: 'I entered a wrong transaction.', steps: [
          'Open **Transaction History** and find the row.',
          'Remove it in **Actions** and enter it again correctly.',
          'A removed event penalty stays removed, also when the penalties of that event are given again.'
        ] },
        { q: 'Someone who is not a clan member pays or receives silver.', steps: [
          'Type their name in **Other Name** (or **Other Recipient**).',
          'Always use the same spelling. Then all their transactions stay on one row.'
        ] }
      ]
    },

    {
      file: 'myprofile.html',
      icon: 'member_profile.png',
      title: 'My Profile',
      who: 'Every member with a linked account',
      summary: 'Your own page: your target progress, point penalties, chest points per category, silver penalties and recent bank activity.',
      parts: [
        { title: 'Linked Member', text: 'Do you have more than one account in the game linked to your Google account? Choose which one you see.' },
        { title: 'For members', text: 'Every member whose Google account is linked (Members → 🔐 Login Accounts) can see this page. Send members here when they ask about their points or their bank balance.' }
      ]
    }
  ]
};
