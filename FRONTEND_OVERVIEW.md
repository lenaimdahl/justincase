# Frontend Codebase Overview

## 1. Responsive Design Approach

### Primary Framework: Material-UI (MUI)

- **NOT using Tailwind CSS** as the primary styling solution
- Uses Material-UI `@mui/material` v6.5.0 for all core components
- Styling is done via MUI's `sx` prop with responsive breakpoints
- Custom theme defined in [src/theme.ts](packages/frontend/src/theme.ts)

### Responsive Breakpoints (MUI Standard)

Built into all MUI components via `sx` prop:

- `xs`: 0px+ (mobile)
- `sm`: 600px+ (tablet)
- `md`: 960px+ (small desktop)
- `lg`: 1280px+ (desktop)
- `xl`: 1920px+ (large desktop)

### CSS-in-JS Approach

- **Emotion** (@emotion/react v11.14.0, @emotion/styled v11.14.1) is MUI's underlying CSS-in-JS solution
- All styling is scoped and generated at runtime
- Standard approach: `sx={{property: {xs: value, sm: value, md: value}}}`

### Note on Tailwind

- **ToastContainer** [src/components/ToastContainer.tsx](packages/frontend/src/components/ToastContainer.tsx) uses inline Tailwind classes
- This is the ONLY component using Tailwind in the codebase
- Appears to be an outlier approach in an otherwise MUI-consistent codebase
- Classes used: `fixed`, `bottom-4`, `right-4`, `flex`, `flex-col`, `gap-2`, `pointer-events-none`, `z-50`, `slide-in-from-right-4`, `duration-200`, `animate-in`, `fade-in`

---

## 2. Layout Structure

### Main App Structure

[src/App.tsx](packages/frontend/src/App.tsx)

```typescript
- NotificationProvider (context wrapper)
  - Router (route management)
  - ToastContainer (notifications)
```

### Layout Component

[src/components/Layout.tsx](packages/frontend/src/components/Layout.tsx)

- Uses MUI `Box` component with `flexDirection: column`
- `minHeight: '100vh'` for full viewport height
- Structure:
  - `Navigation` component (sticky header)
  - `<Outlet />` for page content (from react-router-dom)

### Root CSS

[src/index.css](packages/frontend/src/index.css)

```css
html,
body,
#root {
  height: 100%;
  margin: 0;
  padding: 0;
}

#root {
  display: flex;
  flex-direction: column;
}
```

### Theme Provider

[src/theme.ts](packages/frontend/src/theme.ts)

- Custom MUI theme created with `createTheme()`
- **Primary Color**: Purple (#9c27b0)
- **Secondary Color**: Pink (#e91e63)
- **Background**: Light gray (#fafafa)
- **Text**: Dark gray (#424242)
- Custom component overrides for AppBar and Button

### Root Entry Point

[src/main.tsx](packages/frontend/src/main.tsx)

- Wraps app with `ThemeProvider`
- Includes `CssBaseline` for consistent browser defaults
- Initializes i18n translations

---

## 3. Navigation Component Design

### File: [src/components/Navigation.tsx](packages/frontend/src/components/Navigation.tsx)

**Structure:**

- `AppBar` with `position="sticky"`
- `Toolbar` container
- Brand typography: flex: 1 (grows to fill space)
- Navigation links in a flexbox row with `gap: 3`

**Responsive Features:**

- No explicit responsive changes (appears the same on all breakpoints)
- Uses MUI's AppBar which is inherently responsive
- Contains three links:
  1. Home (/)
  2. Lists (/lists)
  3. Settings (/settings)

**Styling:**

```typescript
sx={{
  gradient background: linear-gradient(135deg, #9c27b0 0%, #e91e63 100%)
  boxShadow: 0 2px 8px rgba(156, 39, 176, 0.15)
}}
```

**Spacing:**

- Brand typography: `fontSize: 1.5rem`, `fontWeight: bold`
- Navigation links: `fontWeight: 500`, `gap: 3`
- Hover state: `opacity: 0.8`

---

## 4. Item Table Component Structure

### Main File: [src/components/items/tables/ItemTable.tsx](packages/frontend/src/components/items/tables/ItemTable.tsx)

**Props:**

```typescript
{
  listId: string
  items: Item[]
  fieldConfig?: FieldConfig
  loading?: boolean
  onItemsChange: () => Promise<void>
  readOnly?: boolean
}
```

**Structure:**

- `TableContainer` (Paper component) with custom scrollbar styling
- Custom horizontal scrollbar styles for webkit browsers
- `Table` with `minWidth: {xs: 600, sm: 700}` responsive width
- `TableHead` containing ItemTableHeader
- `TableBody` with ItemTableRow components + ItemTableNewItemRow

**Responsive Sizing:**

```typescript
sx={{
  minWidth: {xs: 600, sm: 700}  // Only grows wider on sm screen
}}
```

**Scrollbar Customization:**

```typescript
'&::-webkit-scrollbar': {height: 8},
'&::-webkit-scrollbar-track': {background: '#f1f1f1'},
'&::-webkit-scrollbar-thumb': {
  background: '#888',
  borderRadius: 4,
  '&:hover': {background: '#555'}
}
```

**States:**

- Loading: Shows `CircularProgress`
- Error: Shows `Alert` component with error message
- Editing: Manages inline editing state via `useItemOperations` hook

### Header Component: [src/components/items/tables/header/ItemTableHeader.tsx](packages/frontend/src/components/items/tables/header/ItemTableHeader.tsx)

**Features:**

- Conditional column display based on `fieldConfig`
- Dynamic action header label from checkbox configuration
- Background color: `#f5f5f5`
- Bold font weight for all headers
- Aligned center for action column

**Columns:**

1. Name (always visible)
2. Quantity (conditional)
3. Unit (conditional)
4. Expiry Date (conditional)
5. Notes/Comment (conditional)
6. Actions (always visible)

### Row Component: [src/components/items/tables/rows/ItemTableRow.tsx](packages/frontend/src/components/items/tables/rows/ItemTableRow.tsx)

**Responsive Features:**

```typescript
// Padding responsive
'&MuiTableCell-root': { padding: {xs: '8px 4px', sm: '16px'} }

// Font size responsive
<Typography sx={{fontSize: {xs: '0.875rem', sm: '1rem'}}}

// TextField width responsive
sx={{maxWidth: {xs: 80, sm: 120}}}

// Hidden on mobile
sx={{display: {xs: 'none', sm: 'table-cell'}}}  // Notes column
```

**Interactive Elements:**

- Quantity adjustment buttons: `+` and `-` icons
- Delete button with circular progress during saving
- Checkbox for primary action
- All fields are inline-editable via TextField components
- Unit, Expiry Date, Comment fields have standard variant for minimal UI

**Button Sizing:**

```typescript
sx={{
  padding: {xs: '6px', sm: '8px'},
  minWidth: {xs: 44, sm: 'auto'},
  minHeight: {xs: 44, sm: 'auto'}
}}
```

- Ensures 44x44px tap target on mobile (accessibility standard)

**Status Management:**

- Opacity change during saving (0.6)
- Background color change on error (#ffebee)
- Dynamic className from `getStatusClassName()` for expiry date colors
- Error field styling

---

## 5. Form Components

### ItemForm: [src/components/items/forms/ItemForm.tsx](packages/frontend/src/components/items/forms/ItemForm.tsx)

**Layout:**

- `Card` wrapper with padding
- Horizontal flexbox with `flexWrap: 'nowrap'` and `overflowX: 'auto'`
- `gap: 1.5` between fields

**Responsive Behavior:**

- Uses horizontal scroll on mobile when fields overflow
- All fields labeled with `size="small"` for compact appearance

**Fields (in order):**

1. Item name input - `minWidth: 150`
2. Quantity field (conditional)
3. Single expiry date field (conditional)
4. Priority field (conditional)
5. Notes field (conditional)
6. Add button (always visible, fixed height 40px)

**Primary Button Design:**

```typescript
sx={{
  background: 'linear-gradient(135deg, #9c27b0 0%, #e91e63 100%)',
  '&:hover': {
    background: 'linear-gradient(135deg, #7b1fa2 0%, #c2185b 100%)',
  },
  height: '40px',
  flexShrink: 0
}}
```

**Multi-Expiry Dates Section:**

- Appears below main form when `quantity > 1` and expiry dates enabled
- `Box` with border and light background (#f9f9f9)
- Grid layout: `gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))'`
- Responsive: Adapts columns based on available space

### ItemFormFields: [src/components/items/forms/ItemFormFields.tsx](packages/frontend/src/components/items/forms/ItemFormFields.tsx)

**Sub-components:**

#### QuantityField

- `TextField` with `type="number"` and `size="small"`
- `minWidth: 100`
- Dynamically manages `expiryDates` array on quantity change
- `slotProps={{htmlInput: {min: 1}}}`

#### SingleExpiryDateField

- `TextField` with `type="date"`, `size="small"`
- `minWidth: 140`
- Only visible when quantity <= 1

#### MultipleExpiryDatesField

- Grid-based layout for multiple dates
- `gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))'`
- Responsive grid that adapts column count
- Borders and background styling for visual separation

#### PriorityField

- `FormControl` with `Select` dropdown
- `minWidth: 130`
- Options: None, ⭐ High, 🔸 Medium, 🤍 Low

#### NotesField

- `TextField` for text input
- `minWidth: 150`
- Hidden conditional field based on `fieldConfig`

**Conditional Rendering Pattern:**

```typescript
if (!fieldConfig.hasFieldName) return null;
```

Each field component returns early if not enabled in list configuration.

---

## 6. Dialogs and Modals

### ListConfigurator Dialog: [src/components/lists/configurators/ListConfigurator.tsx](packages/frontend/src/components/lists/configurators/ListConfigurator.tsx)

**MUI Dialog Setup:**

```typescript
<Dialog open={open} onClose={handleReset} maxWidth="sm" fullWidth>
```

**Structure:**

- `DialogTitle`: "Liste erstellen" (Create List)
- `Stepper`: 4-step wizard
- `DialogContent`: MinHeight 300px, displays step-specific content
- `DialogActions`: Navigation and submission buttons

**Steps:**

1. **Template Selection** - ListTemplateStep component
2. **Color Selection** - ListColorStep component
3. **Icon Selection** - ListIconStep component
4. **Name Input** - ListNameStep component

**Button States:**

```typescript
<Button onClick={handleReset} disabled={loading}>Cancel</Button>
<Button onClick={handleBack} disabled={loading}>Back</Button>
<Button onClick={handleNext} variant="contained" disabled={validation || loading}>Next</Button>
<Button onClick={handleSubmit} variant="contained" disabled={!name.trim() || loading}>Create</Button>
```

**Progress Indicator:**

- Text showing "Step X of 4" at bottom of content area
- Color: #999 (subtle)

**Validation:**

- Name field required before submission
- Disabled states during async creation

---

## 7. Button Components and Sizes

### Button Styles Used Throughout Codebase

#### Primary Contained Button

```typescript
sx={{
  background: 'linear-gradient(135deg, #9c27b0 0%, #e91e63 100%)',
  '&:hover': {
    background: 'linear-gradient(135deg, #7b1fa2 0%, #c2185b 100%)',
  }
}}
```

#### Icon Buttons

```typescript
// Small icon buttons (quantity adjusters, delete)
<IconButton
  size="small"
  sx={{
    padding: {xs: '6px', sm: '8px'},
    minWidth: {xs: 44, sm: 'auto'},
    minHeight: {xs: 44, sm: 'auto'}
  }}
>
```

#### Text Buttons (Modal Actions)

```typescript
<Button onClick={handleReset} disabled={loading}>Cancel</Button>
```

#### Button Sizes

- **Form Add Button**: Fixed 40px height
- **Icon Buttons (Table)**: 44x44px minimum on mobile, auto on desktop
- **Wizard Buttons**: Default MUI sizes
- **Header Button**: Standard MUI Button with startIcon

### Button States

- Disabled state during async operations
- Loading state with `disabled={loading}`
- Hover effects: opacity or gradient changes
- Color states: `error` (delete button), `primary` (default), `contained` (emphasized)

---

## 8. Media Queries and Responsive Utilities

### MUI Responsive Patterns Used

#### 1. Typography Sizing

```typescript
// In ListHeader
sx={{fontSize: {xs: '1.75rem', sm: '2.125rem'}}}

// In ItemTableRow
sx={{fontSize: {xs: '0.875rem', sm: '1rem'}}}
```

#### 2. Padding/Margin

```typescript
// Container padding (pages)
sx={{py: {xs: 2, sm: 4}, px: {xs: 1, sm: 2}}}

// Standard spacing
sx={{gap: {xs: 1, sm: 3}}}
```

#### 3. Display Control

```typescript
// Hide on mobile
sx={{display: {xs: 'none', sm: 'table-cell'}}}

// Show on mobile only
sx={{display: {xs: 'block', sm: 'none'}}}
```

#### 4. Width/Min-Width

```typescript
// Responsive minimum width
sx={{minWidth: {xs: 150, sm: 200}}}

// Responsive max width
sx={{maxWidth: {xs: 80, sm: 120}}}
```

#### 5. Flexbox Responsiveness

```typescript
// Full width on mobile, constrained on desktop
sx={{width: '100%', maxWidth: 1200}}
```

#### 6. Grid Layout

```typescript
// ListsGrid - responsive columns
gridTemplateColumns: {
  xs: '1fr',           // 1 column on mobile
  sm: 'repeat(2, 1fr)', // 2 columns on tablet
  md: 'repeat(3, 1fr)',  // 3 columns on desktop
}
```

#### 7. Container Sizes

```typescript
// Page containers
<Container maxWidth="lg">  // ~1200px max
<Container maxWidth="xl">  // ~1536px max
```

### CSS Variables and Theming

- **No CSS custom properties** used in current codebase
- All theming done through MUI theme object in [src/theme.ts](packages/frontend/src/theme.ts)
- Theme provider applies globally to all components

### Scrolling on Mobile

```typescript
// Item form allows horizontal scroll on overflow
sx={{
  flexWrap: 'nowrap',
  overflowX: 'auto'
}}

// Table has custom scrollbar styling
'&::-webkit-scrollbar': {...}
```

---

## 9. List Components Structure

### List Overview Page: [src/pages/ListOverviewPage.tsx](packages/frontend/src/pages/ListOverviewPage.tsx)

**Container:**

```typescript
<Container
  component="main"
  maxWidth="xl"
  sx={{
    py: {xs: 2, sm: 4},
    flex: 1,
    px: {xs: 1, sm: 2},
  }}
>
```

**Components:**

1. `ListOverviewHeader` - Title, subtitle, create button
2. `ListsGrid` - Grid of list cards
3. `EmptyListsState` - Empty state component
4. `ListConfigurator` - Modal dialog for list creation

### ListsGrid: [src/components/lists/overview/ListsGrid.tsx](packages/frontend/src/components/lists/overview/ListsGrid.tsx)

**Responsive Grid Layout:**

```typescript
sx={{
  display: 'grid',
  gridTemplateColumns: {
    xs: '1fr',           // Full width on mobile
    sm: 'repeat(2, 1fr)', // 2 columns on tablet
    md: 'repeat(3, 1fr)',  // 3 columns on desktop
  },
  gap: 3,  // Consistent spacing
}}
```

### ListCard: [src/components/lists/card/ListCard.tsx](packages/frontend/src/components/lists/card/ListCard.tsx)

**Card Structure:**

```typescript
<Card
  sx={{
    height: '100%',  // Fill grid cell
    display: 'flex',
    flexDirection: 'column',
    transition: 'transform 0.2s, box-shadow 0.2s'
  }}
>
  <CardActionArea>
    <CardContent>
      <Typography variant="h6">{name}</Typography>
      <Chip label={`${itemCount} Items`} size="small" />
    </CardContent>
  </CardActionArea>
</Card>
```

**Hover Effects:**

```typescript
'&:hover': {
  transform: 'translateY(-4px)',
  boxShadow: '0 8px 16px rgba(156, 39, 176, 0.15)',
}
```

### ListOverviewHeader: [src/components/lists/overview/ListOverviewHeader.tsx](packages/frontend/src/components/lists/overview/ListOverviewHeader.tsx)

**Layout:**

```typescript
sx={{
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  mb: 4,
}}
```

**Note:** Not explicitly made responsive. Might stack on very small screens due to space constraints.

### ListDetailPage: [src/pages/ListDetailPage.tsx](packages/frontend/src/pages/ListDetailPage.tsx)

**Key Responsive Features:**

```typescript
<Container
  component="main"
  maxWidth="lg"
  sx={{
    py: {xs: 2, sm: 4},
    flex: 1,
    px: {xs: 1, sm: 2},
  }}
>
```

- Table wrapped in responsive Box
- `ListHeader` with responsive typography

---

## 10. Summary of Responsive Design Patterns

### Consistent Patterns

| Pattern           | Usage          | Breakpoints                                           |
| ----------------- | -------------- | ----------------------------------------------------- |
| Container padding | Page content   | `py: {xs: 2, sm: 4}`, `px: {xs: 1, sm: 2}`            |
| Grid layout       | Card grids     | `xs: 1fr`, `sm: repeat(2, 1fr)`, `md: repeat(3, 1fr)` |
| Font size         | Typography     | `{xs: '0.875rem', sm: '1rem'}`                        |
| Icon button size  | Touch targets  | `{xs: 44, sm: 'auto'}` min dimensions                 |
| Display control   | Hide/show      | `{xs: 'none', sm: 'table-cell'}`                      |
| Spacing           | Component gaps | `gap: {xs: 1.5, sm: 3}`                               |

### No Media Queries in CSS

- **Zero @media rules** in stylesheets
- All responsive behavior programmatic via MUI's sx prop
- Benefits: No CSS maintenance problems, type-safe in TypeScript

### Accessibility Considerations

- **Touch targets**: Minimum 44x44px on mobile (WCAG 2.1 AAA standard)
- **ARIA labels**: Used consistently on buttons and interactive elements
- **Keyboard support**: Dialog buttons fully keyboard navigable
- **Color contrast**: Theme enforced with sufficient contrast ratios
- **i18n**: All text translatable via react-i18next

### Material Design Compliance

- Consistent use of MUI components (AppBar, Card, Dialog, Button, TextField)
- Follows Material Design 3 design system
- Built-in accessibility from MUI components

---

## Directory Structure Quick Reference

```
packages/frontend/src/
├── App.tsx                           # Root component
├── main.tsx                          # Entry point
├── index.css                         # Root styles
├── theme.ts                          # MUI theme configuration
├── components/
│   ├── Layout.tsx                    # Main layout wrapper
│   ├── Navigation.tsx                # Header/navigation
│   ├── ToastContainer.tsx            # Notifications (Tailwind)
│   ├── items/
│   │   ├── tables/
│   │   │   ├── ItemTable.tsx        # Main table component
│   │   │   ├── header/              # Table header
│   │   │   ├── rows/                # Table row
│   │   │   └── new-row/             # New item row
│   │   └── forms/
│   │       ├── ItemForm.tsx         # Form wrapper
│   │       └── ItemFormFields.tsx   # Field components
│   └── lists/
│       ├── card/                    # List card component
│       ├── header/                  # List header
│       ├── overview/                # Overview section
│       └── configurators/           # List creation dialog
├── pages/
│   ├── Home.tsx                      # Home page
│   ├── ListDetailPage.tsx            # List detail view
│   └── ListOverviewPage.tsx          # List overview
├── routes/
│   └── Router.tsx                    # Route definitions
├── hooks/                            # Custom React hooks
├── api/                              # API client functions
├── types/                            # TypeScript types
├── utils/                            # Utility functions
├── i18n/                             # Translations
├── contexts/                         # React contexts
└── constants/                        # Constants
```

---

## Key Findings

### ✅ Strengths

1. **Consistent MUI usage** - Nearly 100% of components use MUI
2. **Mobile-first approach** - Responsive values start from mobile (`xs`)
3. **Type-safe styling** - TypeScript enforces responsive object structure
4. **Good touch targets** - 44x44px minimum on mobile
5. **Semantic HTML** - Proper use of MUI components with a11y built-in
6. **No CSS conflicts** - Emotion handles all scoping automatically

### ⚠️ Issues

1. **ToastContainer anomaly** - Uses inline Tailwind classes instead of MUI
   - Potential source of tech debt if not standardized
   - Would benefit from either: removing Tailwind or using it consistently
2. **ListOverviewHeader not responsive** - Flex layout might not handle small screens gracefully
3. **Table may overflow** - While scrollable, could benefit from better mobile UX (e.g., card view fallback)
4. **No dark mode** - Theme only supports light theme currently

### 💡 Recommendations

1. Migrate `ToastContainer` to use MUI's Snackbar component for consistency
2. Add explicit responsive handling to `ListOverviewHeader` (stack on mobile)
3. Consider mobile alternative for large tables (card-based layout on xs)
4. Add dark mode support to theme if needed
5. Document responsive design patterns in project AGENTS.md/README
