/**
 * cCc Masters Of Battle Site Configuration
 */

const SITE_CONFIG = {
  // Clan Identity
  clanName: 'cCc Masters Of Battle',
  clanAbbr: 'mob',

  // Branding: the League One look (purple / indigo, League One icons)
  primaryColor: '#6c47d9',
  secondaryColor: '#1e1b4b',
  favicon: 'logo.png',

  // Authentication
  // Same Google sign-in client as the other cCc sites: add this site's address as an
  // authorized JavaScript origin on it (Google Cloud console → Credentials).
  googleClientId: '47674606892-0m90hd0cd01kijo69ssuqtn1j3igp32i.apps.googleusercontent.com',

  // Members hidden from progress stats when not logged in
  maskedMembers: [
    // e.g. the clan's own city account
  ],

  // Navigation Pages
  pages: [
    { name: 'Dashboard', file: 'dashboard.html', icon: 'chest.png' },
    { name: 'Events', file: 'events.html', icon: 'events.png' },
    { name: 'Members', file: 'members.html', icon: 'members.png' },
    { name: 'Warnings', file: 'warnings.html', icon: 'warning.png' },
    { name: 'Calendar', file: 'calendar.html', icon: 'calendar.png' }
  ]
};
