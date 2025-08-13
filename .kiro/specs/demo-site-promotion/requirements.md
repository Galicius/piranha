# Requirements Document

## Introduction

This feature enhances the existing demo site watermark and adds promotional elements to indicate that the site is not yet officially live while promoting the developer's services to potential clients. The goal is to clearly communicate the site's demo status while showcasing the quality of work to attract new website development clients.

## Requirements

### Requirement 1

**User Story:** As a site visitor, I want to clearly understand that this is a demo/preview site, so that I know the business may not be fully operational yet.

#### Acceptance Criteria

1. WHEN a user visits any page THEN the system SHALL display a watermark overlay indicating demo status
2. WHEN the watermark is displayed THEN it SHALL be visible but not interfere with content readability
3. WHEN the watermark is shown THEN it SHALL use Slovenian text "DEMO STRAN/NEAKTIVNA" or similar
4. WHEN the watermark appears THEN it SHALL be positioned diagonally across the page for clear visibility

### Requirement 2

**User Story:** As a potential client viewing this demo site, I want to see who created this website, so that I can contact them for similar services.

#### Acceptance Criteria

1. WHEN a user scrolls to the footer THEN the system SHALL display a promotional section for the developer
2. WHEN the promotional section is shown THEN it SHALL include clear contact information for website development services
3. WHEN the promotion is displayed THEN it SHALL be visually distinct from the main site content
4. WHEN the promotional content appears THEN it SHALL include a call-to-action for potential clients

### Requirement 3

**User Story:** As the developer, I want the promotional content to be professional and non-intrusive, so that it enhances rather than detracts from the demo site's quality.

#### Acceptance Criteria

1. WHEN the promotional section is displayed THEN it SHALL maintain the site's existing design aesthetic
2. WHEN the promotion appears THEN it SHALL use appropriate typography and colors that complement the site
3. WHEN promotional content is shown THEN it SHALL be clearly separated from the main site footer
4. WHEN the developer promotion is visible THEN it SHALL include professional messaging about web development services

### Requirement 4

**User Story:** As a site owner, I want the demo indicators to be easily removable, so that they can be quickly disabled when the site goes live.

#### Acceptance Criteria

1. WHEN the site goes live THEN the system SHALL allow easy removal of demo watermarks
2. WHEN demo mode is disabled THEN the promotional footer SHALL also be easily removable
3. WHEN removing demo elements THEN the system SHALL not require extensive code changes
4. WHEN demo indicators are removed THEN the site SHALL function normally without any visual artifacts