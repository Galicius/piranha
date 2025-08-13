# Design Document

## Overview

This design enhances the existing demo site watermark system and adds a professional promotional footer to showcase the developer's web development services. The solution maintains the site's elegant dark theme with gold accents while clearly indicating the demo status and promoting the developer's services to potential clients.

## Architecture

The solution consists of two main components:

1. **Enhanced Watermark Component** - Improves the existing watermark with better positioning and styling
2. **Developer Promotion Footer** - A new component that appears above the main site footer

Both components are designed to be easily removable when the site goes live, using feature flags or simple component removal.

## Components and Interfaces

### 1. Enhanced Watermark Component (`Watermark.jsx`)

**Purpose**: Display diagonal watermark indicating demo status across all pages

**Key Features**:
- Diagonal "DEMO STRAN/NEAKTIVNA" text pattern
- Responsive positioning that works on all screen sizes
- Low opacity to maintain content readability
- Uses site's existing Playfair Display serif font
- Fixed positioning with high z-index but below navigation

**Props**:
```javascript
interface WatermarkProps {
  enabled?: boolean; // Default: true, allows easy disabling
  opacity?: number;  // Default: 0.03, customizable opacity
  text?: string;     // Default: "DEMO STRAN/NEAKTIVNA", customizable text
}
```

### 2. Developer Promotion Component (`DeveloperPromotion.jsx`)

**Purpose**: Professional promotional section for web development services

**Key Features**:
- Appears above the main site footer
- Matches site's glass morphism design aesthetic
- Includes call-to-action for potential clients
- Professional messaging about web development services
- Contact information and portfolio link

**Props**:
```javascript
interface DeveloperPromotionProps {
  enabled?: boolean;     // Default: true, allows easy disabling
  developerName?: string; // Developer/agency name
  contactEmail?: string;  // Contact email
  portfolioUrl?: string;  // Portfolio website URL
}
```

### 3. Layout Integration

The components integrate into the existing `Layout.jsx` component:
- Watermark renders at the top level for global coverage
- Developer promotion renders between main content and footer
- Both components respect the existing content container constraints

## Data Models

### Configuration Object
```javascript
const demoConfig = {
  watermark: {
    enabled: true,
    text: "DEMO STRAN/NEAKTIVNA",
    opacity: 0.03
  },
  promotion: {
    enabled: true,
    developerName: "Gal Rozman",
    tagline: "Full-Stack Web Developer",
    contactEmail: "gal@example.com",
    portfolioUrl: "https://galrozman.dev",
    message: "Všeč vam je ta spletna stran? Ustvarim podobno tudi za vas!"
  }
};
```

## Styling and Design System

### Color Palette
- Uses existing CSS custom properties from the site
- Primary gold: `hsl(var(--primary))` (#f4ce90)
- Background: `hsl(var(--background))` (black)
- Muted text: `hsl(var(--muted-foreground))` (70% white)
- Glass effect: `bg-white/5 backdrop-blur-xl border border-white/10`

### Typography
- Watermark: Playfair Display (serif) - matches site's heading font
- Promotion: Manrope (sans-serif) - matches site's body font
- Maintains existing font weight and size hierarchy

### Layout Principles
- Respects existing `content-container` max-width (1280px)
- Uses consistent padding and spacing from the site
- Maintains responsive design patterns
- Glass morphism effects match existing components

## Error Handling

### Watermark Component
- Graceful fallback if fonts fail to load
- Responsive calculations handle extreme viewport sizes
- Performance optimization for resize events (debounced)

### Developer Promotion Component
- Handles missing configuration gracefully
- Email and URL validation for contact links
- Responsive layout for mobile devices

### Integration Errors
- Components fail silently if disabled
- No impact on main site functionality if components error
- Easy removal without breaking existing layout

## Testing Strategy

### Unit Tests
- Watermark positioning calculations
- Responsive behavior across screen sizes
- Component prop validation
- Configuration object handling

### Integration Tests
- Watermark overlay doesn't interfere with site navigation
- Promotion footer integrates properly with existing footer
- Mobile responsiveness across all pages
- Performance impact measurement

### Visual Regression Tests
- Watermark appearance on all page types
- Footer integration visual consistency
- Dark theme compatibility
- Typography and spacing accuracy

### Accessibility Tests
- Watermark doesn't interfere with screen readers
- Promotion footer maintains proper heading hierarchy
- Keyboard navigation remains functional
- Color contrast meets WCAG guidelines

## Implementation Phases

### Phase 1: Enhanced Watermark
- Improve existing watermark positioning
- Add configuration options
- Optimize performance
- Test across all pages

### Phase 2: Developer Promotion Footer
- Create new promotion component
- Design professional messaging
- Integrate with existing layout
- Style to match site aesthetic

### Phase 3: Configuration System
- Implement easy enable/disable system
- Add customization options
- Create removal documentation
- Test deployment scenarios

## Removal Strategy

When the site goes live, removal is designed to be simple:

1. **Quick Disable**: Set `enabled: false` in configuration
2. **Component Removal**: Delete component files and imports
3. **Clean Removal**: Remove all demo-related code

The design ensures no residual styling or layout issues after removal.