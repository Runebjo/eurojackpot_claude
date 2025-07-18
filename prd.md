# Product Requirements Document: EuroJackpot Simulator

## 1. Product Overview

### 1.1 Product Name

EuroJackpot Simulator

### 1.2 Product Description

A web-based application that simulates playing EuroJackpot lottery rounds, allowing users to experience the game mechanics without real money. Users can set a number of rounds to simulate, watch each round play out at a configurable speed, track their virtual spending and winnings, and view statistics about their performance.

### 1.3 Target Audience

- Lottery enthusiasts who want to understand EuroJackpot odds
- People curious about lottery statistics
- Educational users learning about probability
- Entertainment seekers

### 1.4 Key Value Proposition

Experience the thrill of playing EuroJackpot and understand the real odds of winning without spending actual money.

## 2. Game Rules & Structure

### 2.1 EuroJackpot Rules

- Players select 5 main numbers from 1-50
- Players select 2 Euro numbers from 1-12
- Cost per round: 50 NOK
- Draw happens for both main numbers and Euro numbers

### 2.2 Prize Tiers

Based on official EuroJackpot prize structure:

| Tier | Main Numbers | Euro Numbers | Approximate Odds | Average Prize (NOK) |
| ---- | ------------ | ------------ | ---------------- | ------------------- |
| 1    | 5            | 2            | 1:140,000,000    | 300,000,000         |
| 2    | 5            | 1            | 1:6,991,908      | 7,500,000           |
| 3    | 5            | 0            | 1:3,107,515      | 2,000,000           |
| 4    | 4            | 2            | 1:621,503        | 125,000             |
| 5    | 4            | 1            | 1:31,075         | 3,500               |
| 6    | 3            | 2            | 1:14,125         | 1,000               |
| 7    | 4            | 0            | 1:13,811         | 550                 |
| 8    | 2            | 2            | 1:985            | 300                 |
| 9    | 3            | 1            | 1:706            | 200                 |
| 10   | 3            | 0            | 1:314            | 125                 |
| 11   | 1            | 2            | 1:188            | 85                  |
| 12   | 2            | 1            | 1:49             | 60                  |

**Note**: The simulator uses these fixed average prize amounts for consistency and predictability in the simulation.

## 3. Functional Requirements

### 3.1 Core Features

#### 3.1.1 Number Selection

- **Manual Selection**: Users can manually pick 5 main numbers (1-50) and 2 Euro numbers (1-12)
- **Quick Pick**: Auto-generate random valid number combinations
- **Number Validation**: Prevent duplicate selections and invalid ranges

#### 3.1.2 Game Simulation

- **Round Configuration**: Users set the number of rounds to play (no maximum limit)
- **Sequential Display**: Each round is displayed one by one
- **Speed Control**:
  - Adjustable playback speed (1x, 2x, 5x, 10x, 50x, 100x, Instant)
  - Pause/Resume functionality
  - Skip to end option
- **Draw Animation**: Visual representation of number drawing (can be toggled based on speed)
- **Round Counter**: Display current round number (e.g., "Round 47 of 1000")
- **Running Totals**: Live update of profit/loss after each round

#### 3.1.3 Financial Tracking

- **Profit/Loss System**:
  - Each round costs 50 NOK
  - Track total spent (rounds × 50 NOK)
  - Track total won (sum of all prizes)
  - Display net profit/loss (total won - total spent)
  - Real-time updates during simulation
- **Round History**: Display of recent rounds with their outcomes (kept in memory during session only)

#### 3.1.4 Statistics Dashboard

- **Overall Statistics**:
  - Total rounds played
  - Total spent
  - Total won
  - Net profit/loss
  - Win rate percentage
  - Average win amount
- **Prize Distribution**:
  - Times won per tier
  - Highest win
  - Longest losing streak
  - Longest winning streak
- **Visual Analytics**:
  - Profit/loss over time graph
  - Prize tier distribution chart
  - Hot/cold number analysis

### 3.2 User Interface Requirements

#### 3.2.1 Main Game Screen

- Number selection grid for main numbers (1-50)
- Separate selection area for Euro numbers (1-12)
- **Simulation Controls**:
  - Number of rounds input field (no maximum)
  - Speed selector dropdown/slider
  - Start Simulation button
  - Pause/Resume button
  - Stop button
- Quick Pick button
- **Financial Display**:
  - Total spent: X NOK
  - Total won: X NOK
  - Net profit/loss: X NOK (with color coding: green for profit, red for loss)
- Round progress indicator (e.g., progress bar)
- Current round results display

#### 3.2.2 Results Display

- Drawn numbers prominently displayed
- User's numbers with matches highlighted
- Prize tier achieved (if any)
- Amount won
- Updated balance

#### 3.2.3 Statistics View

- Tab or separate screen for detailed statistics
- All statistics are session-based (reset on page refresh)

#### 3.2.4 Settings

- **Simulation Speed Preferences**:
  - Default speed setting
  - Animation toggle for different speeds
  - Auto-pause on big wins option

### 3.3 Non-Functional Requirements

#### 3.3.1 Performance

- Instant number generation and validation
- Smooth simulation at all speed settings:
  - 1x speed: ~1 second per round with animations
  - 100x speed: 100 rounds per second
  - Instant: Complete all rounds immediately with final results
- No lag or stuttering during continuous play
- Efficient memory usage for long simulations

#### 3.3.2 Usability

- Mobile-responsive design
- Intuitive UI requiring no instructions
- Clear visual feedback for all actions
- Accessibility compliant (WCAG 2.1 AA)

#### 3.3.3 Browser Support

- Chrome (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Edge (latest 2 versions)

## 4. Technical Specifications

### 4.1 Frontend Technologies

- **Framework**: React with Vite
- **Styling**: Tailwind CSS
- **State Management**: React Context API or useState/useReducer
- **Charts**: Chart.js or Recharts
- **Build Tool**: Vite

### 4.2 Data Storage

- **Local Storage**: Save game history and preferences
- **Session Storage**: Current game state
- **IndexedDB**: For extensive history (optional)

### 4.3 Random Number Generation

- Use cryptographically secure random number generator
- Ensure fair and unbiased number selection
- Seedable for testing purposes

## 5. Design Guidelines

### 5.1 Visual Design

- Clean, modern interface
- EuroJackpot brand colors (blue and yellow accents)
- Clear typography with good contrast
- Lottery ball animations for number draws

### 5.2 User Experience Principles

- Minimize clicks to play a round
- Clear visual hierarchy
- Immediate feedback on actions
- Celebrate wins appropriately
- Educational tooltips for odds and statistics

## 6. Future Enhancements

### 6.1 Phase 2 Features

- Multi-language support
- Social sharing of big wins
- Comparison with real EuroJackpot results
- "What-if" scenarios (playing same numbers over time)
- Achievement system
- Number pattern analysis

### 6.2 Phase 3 Features

- Multiple lottery game support
- Syndicate play simulation
- Historical jackpot data integration
- Machine learning predictions (for entertainment)
- Tournament mode with leaderboards

## 7. Success Metrics

### 7.1 User Engagement

- Average session duration > 10 minutes
- Rounds played per session > 20
- Return user rate > 30%

### 7.2 Educational Value

- Users viewing statistics > 80%
- Users playing bulk simulations > 50%
- Understanding of odds improvement (via survey)

## 8. Legal Considerations

### 8.1 Disclaimers

- Clear statement that this is a simulator, not real gambling
- No real money involved
- For entertainment and educational purposes only
- Age restriction notice (if required by jurisdiction)

### 8.2 Data Privacy

- No personal data collection
- Local storage only
- GDPR compliant if deployed in EU
- Cookie policy for analytics (if implemented)

## 9. Development Timeline

### 9.1 MVP (4-6 weeks)

- Week 1-2: Core game logic and number selection
- Week 3: Results calculation and basic UI
- Week 4: Statistics tracking
- Week 5: Polish and testing
- Week 6: Deployment and bug fixes

### 9.2 Full Version (additional 4-6 weeks)

- Enhanced UI/UX
- Advanced statistics
- Performance optimizations
- Mobile optimization
- Additional features from Phase 2

## 10. Acceptance Criteria

### 10.1 Functional Tests

- All prize tiers calculate correctly
- Random number generation is truly random
- Statistics accurately reflect game history
- All UI elements responsive on mobile

### 10.2 Performance Tests

- Page load time < 2 seconds
- Bulk simulation of 10,000 rounds < 5 seconds
- No memory leaks during extended play
- Smooth animations on mid-range devices

### 10.3 User Acceptance

- Beta testing with 20+ users
- 90% task completion rate
- User satisfaction score > 4/5
- No critical bugs in production
