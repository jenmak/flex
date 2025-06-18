# Product Requirements Document (PRD)

## App Name
Flex

## Platform
iOS & Android (React Native)

## Target Users
Gym-goers of all fitness levels looking for workout partners, friends, or romantic matches

## 1. Objective
Create a mobile application that helps gym enthusiasts connect based on fitness goals, skill levels, and gym locations. The app should encourage real-world meetups, promote healthy lifestyles, and foster community among fitness-focused individuals.

## 2. User Personas
- **Beginner Brittany**: New to fitness, looking for an encouraging accountability partner.
- **Intermediate Ian**: Wants a reliable workout buddy at the same gym.
- **Advanced Ava**: Trains regularly, seeks someone serious about progress and potentially dating.
- **Elite Eli**: Competitive athlete who prefers high-level partners for motivation or companionship.

## 3. Key Features
### 3.1. User Onboarding
- Sign up via email, Google, or Apple ID
- Profile setup: name, age, photo, gender, pronouns, fitness level, gym location, goals, workout style, availability
- Optional integrations (Apple Health, Strava, Fitbit)

### 3.2. Profiles
- Bio
- Fitness level (Beginner → Elite)
- Preferred workouts (checkbox list)
- Gym check-ins (badge system)
- Photos (3–6 max)
- Availability schedule
- Matching goals: (Workouts / Friendship / Dating)

### 3.3. Matching
- Tinder-style swiping
- Matching filters:
  - Distance radius (5–50 miles)
  - Fitness level range
  - Matching goal (buddy/friend/date)
- Smart matching (optional, stretch goal):
  - Based on consistency (check-ins), schedule overlap, or goals
- Daily match limits for free users

### 3.4. Messaging
- 1-on-1 chat after mutual match
- Icebreaker questions
- Voice notes
- Gym meetup suggestions
- Option to share playlists or routines

### 3.5. Gym Check-ins
- Voluntary location-based check-in (verifies user goes to gym)
- Check-in streaks + badges
- Visibility of recent check-ins on profile (optional)

### 3.6. Notifications
- Match found
- New message
- Check-in reminders
- Streak/engagement milestones

### 3.7. Settings
- Account management
- Privacy controls (hide distance, hide profile)
- Block/report users
- Fitness integration settings

## 4. Technical Requirements
### 4.1. Frontend
- Framework: React Native + Expo
- Navigation: React Navigation
- State Management: Zustand with React Context (Context for global auth/theme, Zustand for modular state slices)
- Styling: Tailwind-RN (utility-first styling with Tailwind syntax for React Native)
- Authentication: Supabase Auth (email/password, OAuth via Google/Apple)
- Location Services: Expo Location or react-native-geolocation-service for gym check-ins and distance-based matching
- Messaging: Firestore (for simplicity) or Supabase Realtime (if unified backend preferred)

### 4.2. Backend
- Platform: Supabase (PostgreSQL, Auth, Realtime DB, Edge Functions)
- Database: PostgreSQL via Supabase with Row-Level Security (RLS)
- Match & Chat Logic: Supabase Realtime for chat, server-side matching logic using Edge Functions or client-driven with filters
- Push Notifications: Expo Push Notifications with server-side triggers via Supabase Functions or cron jobs
- Analytics: PostHog or Mixpanel for event tracking

## 5. Metrics of Success
- Daily active users (DAU)
- Matches made
- Repeat check-ins / streaks
- Chat engagement rate
- Retention: Day 1, Day 7, Day 30
- Conversion to paid (if monetized)

## 6. MVP Scope
**Included:**
- Basic sign-up and onboarding
- Profile creation/editing
- Fitness-level-based matching
- Swipe interface
- Messaging after matching
- Gym check-in feature
- Simple streaks and badges
- Push notifications

**Excluded (for post-MVP):**
- In-depth fitness integrations
- AI-based match suggestions
- Group workouts/events
- In-app video calls
- Subscription tiers / payments

## 8. Risks & Mitigation

| **Risk**                        | **Mitigation**                                                                 |
|----------------------------------|-------------------------------------------------------------------------------|
| Low initial user base            | Target gym communities, partner with local gyms, offer referral incentives, and run launch events. |
| Location spoofing for check-ins  | Use device GPS with proximity and timestamp validation; consider periodic re-checks and flagging suspicious patterns. |
| Misuse or harassment             | Implement robust reporting/blocking system, moderation tools, and clear community guidelines; consider automated flagging for abusive language. |
| Compatibility issues             | Focus on iOS/Android via Expo, maintain up-to-date dependencies, and test on a range of common devices and OS versions. | 